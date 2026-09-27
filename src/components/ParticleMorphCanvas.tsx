"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ShapeType =
  | "globe"
  | "cube"
  | "brackets"
  | "chart"
  | "neural"
  | "dna"
  | "star"
  | "shield";

export interface ParticleMorphHandle {
  setShape: (shape: ShapeType) => void;
  setProgress: (progress: number) => void;
  setMeshPosition: (x: number, y: number, z?: number) => void;
  setOpacity: (opacity: number) => void;
  getUniforms: () => Record<string, { value: any }> | null;
  getMesh: () => THREE.Points | null;
}

interface ParticleMorphCanvasProps {
  currentShape?: ShapeType;
  className?: string;
  cameraZ?: number;
  rotationSpeed?: number;
  particleColor?: string;
  glowColor?: string;
}

// 25,000 particles: rich, luminous stardust constellation density with smooth 60fps performance
const PARTICLE_COUNT = 25000;
// Phones get fewer particles: 25k points at DPR 2 stalls mobile GPUs and makes scrolling janky
const MOBILE_PARTICLE_COUNT = 12000;

// --- GLSL SHADERS ---

const vertexShader = `
  uniform float uTime;
  uniform float uProgress;      // 0.0 = Hero Globe, 1.0 = Services Shape
  uniform float uServiceMorph;  // 0.0 to 1.0 for transitioning between service shapes
  uniform vec2 uMouse;          // Local 2D cursor coordinates relative to points mesh
  uniform float uRadius;        // How far repulsion reaches
  uniform float uMouseStrength; // Animated strength with elastic return
  uniform float uPointSize;
  uniform float uPixelRatio;

  attribute vec3 aGlobePosition;  // PERMANENT GLOBE (never overwritten!)
  attribute vec3 aServiceOrigin;  // Active service shape origin (e.g. Cube)
  attribute vec3 aServiceTarget;  // Active service shape target (e.g. Brackets)
  attribute float aRandom;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    // 1. Organic transition between service shapes
    float shapeProgress = clamp((uServiceMorph - aRandom * 0.1) / 0.9, 0.0, 1.0);
    float shapeEase = shapeProgress * shapeProgress * (3.0 - 2.0 * shapeProgress);
    vec3 servicePos = mix(aServiceOrigin, aServiceTarget, shapeEase);

    // 2. Direct GPU Morphing between Hero Globe and Services Shape
    // At uProgress = 0.0, heroEase is strictly 0.0, GUARANTEEING 100% Globe on Hero!
    float heroProgress = clamp(uProgress, 0.0, 1.0);
    float heroEase = heroProgress * heroProgress * (3.0 - 2.0 * heroProgress);
    vec3 mixedPos = mix(aGlobePosition, servicePos, heroEase);

    // 3. Subtle floating noise to make particles feel alive
    mixedPos.x += sin(uTime * 1.5 + mixedPos.z * 1.8) * 0.015;
    mixedPos.y += cos(uTime * 1.5 + mixedPos.x * 1.8) * 0.015;

    // 4. Transform to true 3D world space (accounts for position, scale, and 3D rotation)
    vec4 worldPos = modelMatrix * vec4(mixedPos, 1.0);

    // 5. Cursor Repulsion in World Space (Directly at the cursor hover location)
    float dist = distance(worldPos.xy, uMouse);
    if (dist < uRadius && dist > 0.001) {
      float force = (uRadius - dist) / uRadius;
      force = force * force; // Smooth quadratic falloff
      vec2 pushDir = normalize(worldPos.xy - uMouse);
      worldPos.xy += pushDir * force * uMouseStrength;
      worldPos.z += force * (uMouseStrength * 0.35);
    }

    vec4 mvPosition = viewMatrix * worldPos;

    // 5. Stardust point rendering with perspective size attenuation
    gl_PointSize = (uPointSize * uPixelRatio * (0.75 + aRandom * 0.5)) * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    // Ethereal subtle luminescence
    vAlpha = 0.85 + 0.15 * sin(uTime * 2.0 + aRandom * 6.28);
  }
`;

const fragmentShader = `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Soft circular star sprite with glowing center core
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // Soft Gaussian bloom falloff
    float intensity = exp(-dist * 5.2);
    float alpha = intensity * vAlpha * uOpacity;

    // Luminous core glow when overlapping
    vec3 coreGlow = vColor + vec3(pow(intensity, 2.6) * 0.35);

    gl_FragColor = vec4(coreGlow, alpha);
  }
`;

// --- GEOMETRY GENERATORS (Stardust Constellation Math matching Antimatter.ai screenshots) ---

// --- STROKE SAMPLING HELPERS ---
// Shapes are described as polylines; particles are spread evenly by arc length so long and
// short strokes get the same density, then jittered inside a thin 3D tube (uniform in all
// axes, so strokes stay crisp at any rotation instead of smearing diagonally).

type Vec3 = [number, number, number];
type Polyline = Vec3[];

function tubeJitter(radius: number): Vec3 {
  const u = Math.random() * 2 - 1;
  const theta = Math.random() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  // Bias toward the core so strokes have a bright spine with soft falloff
  const r = radius * Math.pow(Math.random(), 1.4);
  return [s * Math.cos(theta) * r, s * Math.sin(theta) * r, u * r];
}

// Fill positions[start .. start+n) with particles spread along a set of polylines
function fillStrokes(
  positions: Float32Array,
  start: number,
  n: number,
  lines: Polyline[],
  radius: number
) {
  const segs: { a: Vec3; b: Vec3; len: number; cum: number }[] = [];
  let total = 0;
  for (const line of lines) {
    for (let i = 1; i < line.length; i++) {
      const a = line[i - 1];
      const b = line[i];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
      total += len;
      segs.push({ a, b, len, cum: total });
    }
  }
  for (let i = 0; i < n; i++) {
    const target = Math.random() * total;
    let lo = 0;
    let hi = segs.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (segs[mid].cum < target) lo = mid + 1;
      else hi = mid;
    }
    const seg = segs[lo];
    const t = seg.len > 0 ? 1 - (seg.cum - target) / seg.len : 0;
    const j = tubeJitter(radius);
    const idx = (start + i) * 3;
    positions[idx] = seg.a[0] + (seg.b[0] - seg.a[0]) * t + j[0];
    positions[idx + 1] = seg.a[1] + (seg.b[1] - seg.a[1]) * t + j[1];
    positions[idx + 2] = seg.a[2] + (seg.b[2] - seg.a[2]) * t + j[2];
  }
}

// Soft glowing cluster (vertices, joints, sparkle cores)
function fillCluster(positions: Float32Array, start: number, n: number, c: Vec3, radius: number) {
  for (let i = 0; i < n; i++) {
    const j = tubeJitter(radius);
    const idx = (start + i) * 3;
    positions[idx] = c[0] + j[0];
    positions[idx + 1] = c[1] + j[1];
    positions[idx + 2] = c[2] + j[2];
  }
}

// Split n particles across clusters, giving the remainder to the last one
function fillClusters(positions: Float32Array, start: number, n: number, centers: Vec3[], radius: (i: number) => number) {
  const per = Math.floor(n / centers.length);
  centers.forEach((c, i) => {
    const count = i === centers.length - 1 ? n - per * (centers.length - 1) : per;
    fillCluster(positions, start + i * per, count, c, radius(i));
  });
}

function quadBezier(a: Vec3, ctrl: Vec3, b: Vec3, steps = 32): Polyline {
  const out: Polyline = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const m = 1 - t;
    out.push([
      m * m * a[0] + 2 * m * t * ctrl[0] + t * t * b[0],
      m * m * a[1] + 2 * m * t * ctrl[1] + t * t * b[1],
      m * m * a[2] + 2 * m * t * ctrl[2] + t * t * b[2],
    ]);
  }
  return out;
}

function boxEdges(cx: number, cy: number, cz: number, hx: number, hy: number, hz: number): Polyline[] {
  const c = (sx: number, sy: number, sz: number): Vec3 => [cx + sx * hx, cy + sy * hy, cz + sz * hz];
  return [
    [c(-1, -1, -1), c(1, -1, -1)], [c(1, -1, -1), c(1, -1, 1)], [c(1, -1, 1), c(-1, -1, 1)], [c(-1, -1, 1), c(-1, -1, -1)],
    [c(-1, 1, -1), c(1, 1, -1)], [c(1, 1, -1), c(1, 1, 1)], [c(1, 1, 1), c(-1, 1, 1)], [c(-1, 1, 1), c(-1, 1, -1)],
    [c(-1, -1, -1), c(-1, 1, -1)], [c(1, -1, -1), c(1, 1, -1)], [c(1, -1, 1), c(1, 1, 1)], [c(-1, -1, 1), c(-1, 1, 1)],
  ];
}

// 1. Globe: Hollow spherical surface shell (85%) with inner core volume (15%)
function generateGlobe(count: number): { positions: Float32Array; colors: Float32Array } {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phiSpan = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle
  const R = 2.15;

  const shellCount = Math.floor(count * 0.85);
  const coreCount = count - shellCount;

  for (let i = 0; i < shellCount; i++) {
    const yNorm = 1 - (i / (shellCount - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
    const theta = phiSpan * i;
    const r = R * (0.985 + Math.random() * 0.03);

    positions[i * 3] = Math.cos(theta) * radiusAtY * r;
    positions[i * 3 + 1] = yNorm * r;
    positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * r;

    // Diamond white (84%), cool electric white (12%), soft lavender (4%)
    const rand = Math.random();
    if (rand > 0.16) {
      colors[i * 3] = 1.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 1.0;
    } else if (rand > 0.04) {
      colors[i * 3] = 0.92; colors[i * 3 + 1] = 0.96; colors[i * 3 + 2] = 1.0;
    } else {
      colors[i * 3] = 0.88; colors[i * 3 + 1] = 0.82; colors[i * 3 + 2] = 1.0;
    }
  }

  for (let i = 0; i < coreCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = R * Math.pow(Math.random(), 0.7) * 0.85;

    const idx = (shellCount + i) * 3;
    positions[idx] = r * Math.sin(phi) * Math.cos(theta);
    positions[idx + 1] = r * Math.cos(phi);
    positions[idx + 2] = r * Math.sin(phi) * Math.sin(theta);

    colors[idx] = 1.0;
    colors[idx + 1] = 1.0;
    colors[idx + 2] = 1.0;
  }

  return { positions, colors };
}

// 2. 3D Wireframe Cube (Product Design): crisp stardust edges, glowing vertices, inner cube for depth
function generateCube(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const half = 1.85;

  const edgeN = Math.floor(count * 0.78);
  const vertexN = Math.floor(count * 0.1);
  const innerN = Math.floor(count * 0.08);
  const dustN = count - edgeN - vertexN - innerN;

  fillStrokes(positions, 0, edgeN, boxEdges(0, 0, 0, half, half, half), 0.13);

  const corners: Vec3[] = [];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) corners.push([sx * half, sy * half, sz * half]);
  fillClusters(positions, edgeN, vertexN, corners, () => 0.2);

  const innerHalf = half * 0.42;
  fillStrokes(positions, edgeN + vertexN, innerN, boxEdges(0, 0, 0, innerHalf, innerHalf, innerHalf), 0.06);

  // Sparse dust drifting inside the volume
  const dustStart = edgeN + vertexN + innerN;
  for (let i = 0; i < dustN; i++) {
    const idx = (dustStart + i) * 3;
    positions[idx] = (Math.random() * 2 - 1) * half * 0.95;
    positions[idx + 1] = (Math.random() * 2 - 1) * half * 0.95;
    positions[idx + 2] = (Math.random() * 2 - 1) * half * 0.95;
  }

  return positions;
}

// 3. Code Brackets < / > (Development): clean strokes with glowing joints
function generateBrackets(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  const strokeN = Math.floor(count * 0.9);
  const jointN = count - strokeN;

  const lines: Polyline[] = [
    [[-1.15, 1.75, 0], [-2.35, 0, 0], [-1.15, -1.75, 0]],
    [[0.6, 2.0, 0], [-0.6, -2.0, 0]],
    [[1.15, 1.75, 0], [2.35, 0, 0], [1.15, -1.75, 0]],
  ];
  fillStrokes(positions, 0, strokeN, lines, 0.16);

  const joints: Vec3[] = [
    [-2.35, 0, 0], [2.35, 0, 0],
    [-1.15, 1.75, 0], [-1.15, -1.75, 0], [1.15, 1.75, 0], [1.15, -1.75, 0],
    [0.6, 2.0, 0], [-0.6, -2.0, 0],
  ];
  fillClusters(positions, strokeN, jointN, joints, (i) => (i < 2 ? 0.2 : 0.14));

  return positions;
}

// 4. Sparkle Stars (Growth Marketing): three concave 4-point sparkles with bright cores
function generateStars(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  const stars = [
    { share: 0.58, cx: -0.5, cy: -0.15, R: 1.8 },
    { share: 0.25, cx: 1.35, cy: 1.3, R: 0.85 },
    { share: 0.17, cx: 1.5, cy: -1.25, R: 0.58 },
  ];

  // Concave astroid outline: sharp points, pinched waist
  const outlinePoint = (R: number, t: number): [number, number] => {
    const c = Math.cos(t);
    const s = Math.sin(t);
    return [R * Math.sign(c) * Math.pow(Math.abs(c), 3), R * Math.sign(s) * Math.pow(Math.abs(s), 3)];
  };

  let offset = 0;
  stars.forEach((star, si) => {
    const n = si === stars.length - 1 ? count - offset : Math.floor(count * star.share);
    const outlineN = Math.floor(n * 0.56);
    const coreN = Math.floor(n * 0.06);
    const fillN = n - outlineN - coreN;

    const outline: Polyline = [];
    for (let k = 0; k <= 256; k++) {
      const [x, y] = outlinePoint(star.R, (k / 256) * Math.PI * 2);
      outline.push([star.cx + x, star.cy + y, 0]);
    }
    fillStrokes(positions, offset, outlineN, [outline], 0.03 + 0.045 * star.R);

    fillCluster(positions, offset + outlineN, coreN, [star.cx, star.cy, 0], star.R * 0.22);

    // Interior fill fading from the core outward, with a gentle 3D lens bulge
    for (let i = 0; i < fillN; i++) {
      const [ox, oy] = outlinePoint(star.R, Math.random() * Math.PI * 2);
      const k = Math.pow(Math.random(), 1.6);
      const idx = (offset + outlineN + coreN + i) * 3;
      positions[idx] = star.cx + ox * k;
      positions[idx + 1] = star.cy + oy * k;
      positions[idx + 2] = (Math.random() - 0.5) * (1 - k) * star.R * 0.35;
    }

    offset += n;
  });

  return positions;
}

// 5. Security Shield (Security & Compliance): closed crest silhouette, inset rim, check mark
function generateShield(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  // Convex bulge so the shield reads as 3D when it rotates
  const bulge = (x: number, y: number): number =>
    0.45 * (1 - Math.min(1, (x * x) / 2.6 + ((y - 0.1) * (y - 0.1)) / 9));

  const buildOutline = (scale: number, cy: number): Polyline => {
    const w = 1.6 * scale;
    const top = cy + 1.55 * scale;
    const bottom = cy - 2.0 * scale;
    const pts: Polyline = [];
    // Top edge: gentle crest rising to a center peak
    for (let k = 0; k <= 24; k++) {
      const x = -w + (2 * w * k) / 24;
      pts.push([x, top + 0.22 * scale * (1 - Math.pow(x / w, 2)), 0]);
    }
    // Right side curving down to the point, then back up the left side
    pts.push(...quadBezier([w, top, 0], [w * 1.02, cy - 0.9 * scale, 0], [0, bottom, 0]).slice(1));
    pts.push(...quadBezier([0, bottom, 0], [-w * 1.02, cy - 0.9 * scale, 0], [-w, top, 0]).slice(1));
    return pts.map(([x, y]) => [x, y, bulge(x, y)] as Vec3);
  };

  const outerN = Math.floor(count * 0.4);
  const innerN = Math.floor(count * 0.2);
  const checkN = Math.floor(count * 0.24);
  const fillN = count - outerN - innerN - checkN;

  const outer = buildOutline(1, 0);
  fillStrokes(positions, 0, outerN, [outer], 0.12);
  fillStrokes(positions, outerN, innerN, [buildOutline(0.78, 0.05)], 0.07);

  const check: Polyline = ([[-0.75, 0.1], [-0.18, -0.55], [0.85, 0.8]] as [number, number][]).map(
    ([x, y]) => [x, y, bulge(x, y) + 0.12] as Vec3
  );
  fillStrokes(positions, outerN + innerN, checkN, [check], 0.13);

  // Faint body fill inside the silhouette (rejection sampled against the outer outline)
  const inside = (x: number, y: number): boolean => {
    let hit = false;
    for (let i = 0, j = outer.length - 1; i < outer.length; j = i++) {
      const [xi, yi] = outer[i];
      const [xj, yj] = outer[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
  };
  const fillStart = outerN + innerN + checkN;
  let filled = 0;
  while (filled < fillN) {
    const x = (Math.random() * 2 - 1) * 1.6;
    const y = -2.0 + Math.random() * 3.8;
    if (!inside(x, y)) continue;
    const idx = (fillStart + filled) * 3;
    positions[idx] = x;
    positions[idx + 1] = y;
    positions[idx + 2] = bulge(x, y) + (Math.random() - 0.5) * 0.1;
    filled++;
  }

  return positions;
}

// 6. Bar Chart + Trend Arrow (GTM Strategy): wireframe 3D bars, baseline, rising arrow
function generateChart(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  const baseY = -1.75;
  const bars = [
    { x: -1.5, h: 1.1 },
    { x: -0.5, h: 1.8 },
    { x: 0.5, h: 2.5 },
    { x: 1.5, h: 3.3 },
  ];
  const hw = 0.3;

  const barEdgeN = Math.floor(count * 0.42);
  const barFillN = Math.floor(count * 0.1);
  const axisN = Math.floor(count * 0.06);
  const lineN = Math.floor(count * 0.3);
  const nodeN = count - barEdgeN - barFillN - axisN - lineN;

  fillStrokes(
    positions,
    0,
    barEdgeN,
    bars.flatMap((b) => boxEdges(b.x, baseY + b.h / 2, 0, hw, b.h / 2, hw)),
    0.05
  );

  // Faint volume inside each bar, weighted by bar height
  const totalH = bars.reduce((sum, b) => sum + b.h, 0);
  let fillIdx = barEdgeN;
  bars.forEach((b, bi) => {
    const n = bi === bars.length - 1 ? barEdgeN + barFillN - fillIdx : Math.floor((b.h / totalH) * barFillN);
    for (let i = 0; i < n; i++) {
      const idx = (fillIdx + i) * 3;
      positions[idx] = b.x + (Math.random() * 2 - 1) * hw;
      positions[idx + 1] = baseY + Math.random() * b.h;
      positions[idx + 2] = (Math.random() * 2 - 1) * hw;
    }
    fillIdx += n;
  });

  fillStrokes(positions, barEdgeN + barFillN, axisN, [[[-2.2, baseY, 0], [2.2, baseY, 0]]], 0.04);

  // Trend line zig-zagging upward in front of the bars, ending in an aligned arrowhead
  const z = 0.55;
  const trend: Polyline = [
    [-2.0, -0.75, z],
    [-1.0, -0.05, z],
    [-0.1, -0.35, z],
    [0.9, 0.75, z],
    [1.95, 2.0, z],
  ];
  const tip = trend[trend.length - 1];
  const prev = trend[trend.length - 2];
  const dirLen = Math.hypot(tip[0] - prev[0], tip[1] - prev[1]);
  const dx = (tip[0] - prev[0]) / dirLen;
  const dy = (tip[1] - prev[1]) / dirLen;
  const head = 0.6;
  const wing = (angle: number): Vec3 => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return [tip[0] - head * (dx * c - dy * s), tip[1] - head * (dx * s + dy * c), z];
  };
  fillStrokes(positions, barEdgeN + barFillN + axisN, lineN, [trend, [wing(0.5), tip, wing(-0.5)]], 0.08);

  // Glowing data points at each vertex of the trend line
  fillClusters(positions, barEdgeN + barFillN + axisN + lineN, nodeN, trend.slice(0, -1), () => 0.15);

  return positions;
}

// 7. Neural Network (AI Transformation): clean 3-4-4-3 layered network, ringed neurons,
// fully connected synapses trimmed at the rings, and signal pulses travelling along a few links
function generateNeuralNet(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  const layerSizes = [3, 4, 4, 3];
  const layerX = [-2.1, -0.7, 0.7, 2.1];
  // Slight depth stagger per layer so the network reads as 3D when it rotates
  const layerZ = [0.3, -0.15, 0.15, -0.3];
  const spacing = 1.15;
  const ringR = 0.26;

  const layers: Vec3[][] = layerSizes.map((size, li) =>
    Array.from({ length: size }, (_, ni) => [layerX[li], ((size - 1) / 2 - ni) * spacing, layerZ[li]] as Vec3)
  );
  const nodes = layers.flat();

  // Fully connected between adjacent layers, trimmed so lines stop at the neuron rings
  const links: [Vec3, Vec3][] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    for (const a of layers[li]) {
      for (const b of layers[li + 1]) {
        const d = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
        const k = (ringR + 0.06) / d;
        links.push([
          [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k],
          [b[0] - (b[0] - a[0]) * k, b[1] - (b[1] - a[1]) * k, b[2] - (b[2] - a[2]) * k],
        ]);
      }
    }
  }

  const ringN = Math.floor(count * 0.26);
  const coreN = Math.floor(count * 0.14);
  const linkN = Math.floor(count * 0.5);
  const pulseN = count - ringN - coreN - linkN;

  // Neuron rings (circle outline facing the camera)
  const rings: Polyline[] = nodes.map((c) => {
    const ring: Polyline = [];
    for (let k = 0; k <= 48; k++) {
      const t = (k / 48) * Math.PI * 2;
      ring.push([c[0] + Math.cos(t) * ringR, c[1] + Math.sin(t) * ringR, c[2]]);
    }
    return ring;
  });
  fillStrokes(positions, 0, ringN, rings, 0.045);

  // Bright neuron cores
  fillClusters(positions, ringN, coreN, nodes, () => 0.11);

  // Thin synapse filaments
  fillStrokes(positions, ringN + coreN, linkN, links, 0.035);

  // Signal pulses: small bright clusters on every third link, placed a quarter of the way in
  // from either end. Link midpoints are where the fully connected lines cross, so pulses
  // there pile up into one bright blob in the middle of the network.
  const pulses = links
    .filter((_, i) => i % 3 === 0)
    .map(([a, b], i) => {
      const t = i % 2 === 0 ? 0.25 : 0.75;
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t] as Vec3;
    });
  fillClusters(positions, ringN + coreN + linkN, pulseN, pulses, () => 0.06);

  return positions;
}

// 8. DNA Double Helix (Healthcare Apps)
function generateDNA(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const strandsCount = Math.floor(count * 0.75);
  const rungsCount = count - strandsCount;

  const helixHeight = 3.9;
  const radius = 1.2;
  const turns = 2.2;

  for (let i = 0; i < strandsCount; i++) {
    const t = i / strandsCount;
    const y = (t - 0.5) * helixHeight;
    const angle = t * Math.PI * 2 * turns;
    const isStrandA = i % 2 === 0;
    const finalAngle = isStrandA ? angle : angle + Math.PI;

    positions[i * 3] = Math.cos(finalAngle) * radius + (Math.random() - 0.5) * 0.14;
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.08;
    positions[i * 3 + 2] = Math.sin(finalAngle) * radius + (Math.random() - 0.5) * 0.14;
  }

  const rungSteps = 24;
  for (let i = 0; i < rungsCount; i++) {
    const step = Math.floor((i / rungsCount) * rungSteps);
    const t = step / rungSteps;
    const y = (t - 0.5) * helixHeight;
    const angle = t * Math.PI * 2 * turns;

    const interp = (Math.random() * 2 - 1) * radius * 0.95;
    positions[(strandsCount + i) * 3] = Math.cos(angle) * interp;
    positions[(strandsCount + i) * 3 + 1] = y;
    positions[(strandsCount + i) * 3 + 2] = Math.sin(angle) * interp;
  }

  return positions;
}

// --- PARTICLE MORPH CANVAS COMPONENT ---

const ParticleMorphCanvas = forwardRef<ParticleMorphHandle, ParticleMorphCanvasProps>(
  function ParticleMorphCanvas(
    {
      currentShape = "globe",
      className = "",
      cameraZ = 7.5,
      rotationSpeed = 0.0045,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
    const geometryRef = useRef<THREE.BufferGeometry | null>(null);
    const shapesRef = useRef<Record<ShapeType, Float32Array> | null>(null);
    const currentServiceShapeRef = useRef<ShapeType>("cube");
    const pointsRef = useRef<THREE.Points | null>(null);

    useImperativeHandle(ref, () => ({
      setShape: (nextShape: ShapeType) => {
        if (!shaderMaterialRef.current || !geometryRef.current || !shapesRef.current) return;
        if (nextShape === currentServiceShapeRef.current) return;

        const shapes = shapesRef.current;
        const originAttr = geometryRef.current.getAttribute("aServiceOrigin") as THREE.BufferAttribute;
        const targetAttr = geometryRef.current.getAttribute("aServiceTarget") as THREE.BufferAttribute;

        originAttr.copyArray(shapes[currentServiceShapeRef.current]);
        originAttr.needsUpdate = true;

        targetAttr.copyArray(shapes[nextShape]);
        targetAttr.needsUpdate = true;

        currentServiceShapeRef.current = nextShape;

        gsap.killTweensOf(shaderMaterialRef.current.uniforms.uServiceMorph);
        shaderMaterialRef.current.uniforms.uServiceMorph.value = 0.0;
        gsap.to(shaderMaterialRef.current.uniforms.uServiceMorph, {
          value: 1.0,
          duration: 1.1,
          ease: "power2.inOut",
        });
      },

      setProgress: (progress: number) => {
        if (!shaderMaterialRef.current) return;
        shaderMaterialRef.current.uniforms.uProgress.value = Math.min(Math.max(progress, 0), 1);
      },

      setMeshPosition: (x: number, y: number, z: number = 0) => {
        if (!pointsRef.current) return;
        pointsRef.current.position.set(x, y, z);
      },

      setOpacity: (opacity: number) => {
        if (!shaderMaterialRef.current) return;
        shaderMaterialRef.current.uniforms.uOpacity.value = Math.min(Math.max(opacity, 0), 1);
      },

      getUniforms: () => {
        return shaderMaterialRef.current ? shaderMaterialRef.current.uniforms : null;
      },

      getMesh: () => {
        return pointsRef.current;
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const particleCount =
        isCoarsePointer || window.innerWidth < 768 ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;

      const globeData = generateGlobe(particleCount);

      const shapes: Record<ShapeType, Float32Array> = {
        globe: globeData.positions,
        cube: generateCube(particleCount),
        brackets: generateBrackets(particleCount),
        chart: generateChart(particleCount),
        neural: generateNeuralNet(particleCount),
        dna: generateDNA(particleCount),
        star: generateStars(particleCount),
        shield: generateShield(particleCount),
      };
      shapesRef.current = shapes;

      const randoms = new Float32Array(particleCount);
      for (let i = 0; i < particleCount; i++) {
        randoms[i] = Math.random();
      }

      // Three.js Scene Setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = cameraZ;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isCoarsePointer,
        powerPreference: "high-performance",
      });
      const pixelRatio = Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1.5 : 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);

      // Buffer Geometry with GLSL Attributes
      const geometry = new THREE.BufferGeometry();

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(shapes.globe), 3)
      );
      geometry.setAttribute(
        "aGlobePosition",
        new THREE.BufferAttribute(new Float32Array(shapes.globe), 3)
      );
      geometry.setAttribute(
        "aServiceOrigin",
        new THREE.BufferAttribute(new Float32Array(shapes.cube), 3)
      );
      geometry.setAttribute(
        "aServiceTarget",
        new THREE.BufferAttribute(new Float32Array(shapes.cube), 3)
      );
      geometry.setAttribute(
        "aColor",
        new THREE.BufferAttribute(globeData.colors, 3)
      );
      geometry.setAttribute(
        "aRandom",
        new THREE.BufferAttribute(randoms, 1)
      );
      geometryRef.current = geometry;

      // GLSL Custom Shader Material with Additive Blending
      const isMobileInit = typeof window !== "undefined" && window.innerWidth < 768;
      const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0.0 },
          uProgress: { value: 0.0 },
          uServiceMorph: { value: 0.0 },
          uMouse: { value: new THREE.Vector2(9999, 9999) },
          uRadius: { value: 0.68 },
          uMouseStrength: { value: 0.0 },
          uPointSize: { value: isMobileInit ? 16.0 : 22.0 },
          uPixelRatio: { value: pixelRatio },
          uOpacity: { value: 0.0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      shaderMaterialRef.current = shaderMaterial;

      const points = new THREE.Points(geometry, shaderMaterial);
      pointsRef.current = points;
      scene.add(points);

      // Responsive sizing helper: scales down globe on mobile so it fits gracefully without crowding screen
      const getResponsiveSettings = () => {
        const width = typeof window !== "undefined" ? window.innerWidth : 1200;
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1024;
        const isDesktop = width >= 1024;

        // Mobile scale: 0.65 (prominently sized ~85% screen width while maintaining breathing room)
        const heroScale = isMobile ? 0.65 : isTablet ? 0.78 : 1.0;
        const servicesScale = isMobile ? 0.40 : isTablet ? 0.52 : 0.62;
        // On mobile, lift the globe slightly (+0.22 world units) so it centers behind the headline and away from bottom buttons
        const heroPosY = isMobile ? 0.22 : isTablet ? 0.12 : 0.0;

        return { isMobile, isTablet, isDesktop, heroScale, servicesScale, heroPosY };
      };

      // Set initial scale and position
      const initialResponsive = getResponsiveSettings();
      points.scale.set(initialResponsive.heroScale, initialResponsive.heroScale, initialResponsive.heroScale);
      points.position.set(0, initialResponsive.heroPosY, 0);

      // Cinematic loading transition: materialization of celestial globe from stardust
      gsap.to(shaderMaterial.uniforms.uOpacity, {
        value: 1.0,
        duration: 1.4,
        delay: 0.15,
        ease: "power2.out",
      });
      gsap.from(points.scale, {
        x: initialResponsive.heroScale * 0.88,
        y: initialResponsive.heroScale * 0.88,
        z: initialResponsive.heroScale * 0.88,
        duration: 1.6,
        delay: 0.15,
        ease: "power2.out",
      });

      // Helper function: Compute exact 3D world coordinates for the left dock element
      const computeDockWorldPos = () => {
        const isDesktop = window.innerWidth >= 1024;
        const dock = document.getElementById("services-3d-dock");
        if (!dock || !isDesktop) {
          return { x: isDesktop ? -3.4 : 0, y: isDesktop ? 0 : 0.55 };
        }
        const rect = dock.getBoundingClientRect();
        const screenX = rect.left + rect.width / 2;
        const screenY = rect.top + rect.height / 2;
        const ndcX = (screenX / window.innerWidth) * 2 - 1;
        const ndcY = -(screenY / window.innerHeight) * 2 + 1;

        const vFOV = THREE.MathUtils.degToRad(camera.fov);
        const visibleH = 2 * Math.tan(vFOV / 2) * camera.position.z;
        const visibleW = visibleH * (window.innerWidth / window.innerHeight);

        return {
          x: ndcX * (visibleW / 2),
          y: ndcY * (visibleH / 2),
        };
      };

      // Render loop control. Declared before the ScrollTriggers because their callbacks can fire
      // synchronously on create; the loop only actually starts once `animate` exists (loopReady).
      let animId = 0;
      let loopRunning = false;
      let loopWanted = true;
      let loopReady = false;
      const startLoop = () => {
        loopWanted = true;
        if (!loopReady || loopRunning) return;
        loopRunning = true;
        animId = requestAnimationFrame(animate);
      };
      const stopLoop = () => {
        loopWanted = false;
        loopRunning = false;
        cancelAnimationFrame(animId);
      };

      // --- GSAP SCROLL CONTROL WITH DYNAMIC 3D DOCKING ---
      const morphTrigger = ScrollTrigger.create({
        trigger: ".services-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        onUpdate: (self) => {
          const p = self.progress;
          const { heroScale, servicesScale, heroPosY } = getResponsiveSettings();

          // 1. Morph progress (0 = Globe, 1 = Services Shape)
          shaderMaterial.uniforms.uProgress.value = p;

          // 2. Responsive scale interpolation
          const currentScale = heroScale + (servicesScale - heroScale) * p;
          points.scale.set(currentScale, currentScale, currentScale);

          // 3. Responsive position interpolation
          const dockPos = computeDockWorldPos();
          points.position.x = dockPos.x * p;
          points.position.y = heroPosY + (dockPos.y - heroPosY) * p;
        },
        onLeaveBack: () => {
          const { heroScale, heroPosY } = getResponsiveSettings();
          shaderMaterial.uniforms.uProgress.value = 0.0;
          points.scale.set(heroScale, heroScale, heroScale);
          points.position.set(0, heroPosY, 0);
        },
      });

      // Teardown past services section so no ghost particles appear below (no premature blank screen!)
      const exitTrigger = ScrollTrigger.create({
        trigger: ".services-section",
        start: "bottom top",
        end: "bottom+=120px top",
        scrub: true,
        onUpdate: (self) => {
          const remaining = 1.0 - self.progress;
          shaderMaterial.uniforms.uOpacity.value = Math.max(0, remaining);
          if (remaining <= 0.01) {
            canvas.style.display = "none";
            stopLoop();
          } else {
            canvas.style.display = "block";
            startLoop();
          }
        },
        onLeave: () => {
          canvas.style.display = "none";
          shaderMaterial.uniforms.uOpacity.value = 0.0;
          stopLoop();
        },
        onEnterBack: () => {
          canvas.style.display = "block";
          shaderMaterial.uniforms.uOpacity.value = 1.0;
          startLoop();
        },
      });

      // --- CURSOR INTERACTION (Precise Local Hover & Smooth Repulsion) ---
      const targetMouse2D = new THREE.Vector2(9999, 9999);
      const currentMouse2D = new THREE.Vector2(9999, 9999);
      let isHoveringShape = false;

      const raycaster = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      let targetTiltX = 0;
      let targetTiltY = 0;
      let currentTiltX = 0;
      let currentTiltY = 0;

      const deactivateHover = () => {
        if (isHoveringShape) {
          isHoveringShape = false;
          gsap.to(shaderMaterial.uniforms.uMouseStrength, {
            value: 0.0,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
            onComplete: () => {
              targetMouse2D.set(9999, 9999);
              currentMouse2D.set(9999, 9999);
            },
          });
        }
        targetTiltX = 0;
        targetTiltY = 0;
      };

      const onPointerMove = (e: MouseEvent | TouchEvent) => {
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        // 1. If cursor is hovering over any service card or interactive UI element, immediately disable particle interaction
        const targetEl = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
        if (targetEl) {
          if (
            targetEl.closest(".service-card") ||
            targetEl.closest(".services-section [role='button']") ||
            targetEl.closest("button") ||
            targetEl.closest("a") ||
            targetEl.closest("input")
          ) {
            deactivateHover();
            return;
          }
        }

        if (!pointsRef.current) return;

        const progress = shaderMaterial.uniforms.uProgress.value;
        const isServices = progress > 0.4;
        const isDesktop = window.innerWidth >= 1024;

        // 2. In the Services section, the shape is physically constrained to the left docking bay (#services-3d-dock).
        // If the cursor is on the right side of the screen or outside the dock, NEVER interact with the shape!
        if (isServices && isDesktop) {
          const dock = document.getElementById("services-3d-dock");
          if (dock) {
            const dockRect = dock.getBoundingClientRect();
            if (
              clientX < dockRect.left ||
              clientX > dockRect.right - 10 ||
              clientY < dockRect.top ||
              clientY > dockRect.bottom
            ) {
              deactivateHover();
              return;
            }
          } else {
            // Fallback: cards are on the right 58% of the viewport on desktop
            if (clientX > window.innerWidth * 0.45) {
              deactivateHover();
              return;
            }
          }
        }

        // 3. Screen to NDC raycasting onto the Z=0 world plane
        const rect = canvas.getBoundingClientRect();
        const mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -((clientY - rect.top) / rect.height) * 2 + 1;

        if (Math.abs(mouseX) > 1.2 || Math.abs(mouseY) > 1.2) {
          deactivateHover();
          return;
        }

        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
        const intersectPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersectPoint);

        if (!intersectPoint) {
          deactivateHover();
          return;
        }

        // 4. Check distance from the current shape's center in world space
        const currentPos = pointsRef.current.position;
        const distFromCenter = Math.hypot(
          intersectPoint.x - currentPos.x,
          intersectPoint.y - currentPos.y
        );

        // Max shape radius in world units (Globe in hero ≈ 2.15, Services shapes ≈ 1.9 * 0.62 ≈ 1.2)
        const shapeRadiusWorld = isServices ? 1.35 : 2.25;

        // Only interact when cursor is directly hovering over the particle shape!
        if (distFromCenter <= shapeRadiusWorld) {
          targetMouse2D.set(intersectPoint.x, intersectPoint.y);

          // Calibrate repulsion radius according to shape scale
          shaderMaterial.uniforms.uRadius.value = isServices ? 0.48 : 0.68;

          if (!isHoveringShape) {
            isHoveringShape = true;
            gsap.to(shaderMaterial.uniforms.uMouseStrength, {
              value: 0.35,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          // Subtle organic parallax tilt
          const relX = (intersectPoint.x - currentPos.x) / shapeRadiusWorld;
          const relY = (intersectPoint.y - currentPos.y) / shapeRadiusWorld;
          targetTiltX = -relY * 0.06;
          targetTiltY = relX * 0.08;
        } else {
          deactivateHover();
        }
      };

      const onPointerLeave = () => {
        deactivateHover();
      };

      window.addEventListener("mousemove", onPointerMove, { passive: true });
      window.addEventListener("mouseleave", onPointerLeave);

      const startTime = performance.now();

      const animate = () => {
        if (!loopRunning) return;
        animId = requestAnimationFrame(animate);
        const time = (performance.now() - startTime) * 0.001;

        if (isHoveringShape) {
          currentMouse2D.lerp(targetMouse2D, 0.2);
        } else {
          currentMouse2D.set(9999, 9999);
        }
        currentTiltX = THREE.MathUtils.lerp(currentTiltX, targetTiltX, 0.06);
        currentTiltY = THREE.MathUtils.lerp(currentTiltY, targetTiltY, 0.06);

        shaderMaterial.uniforms.uTime.value = time;
        shaderMaterial.uniforms.uMouse.value.copy(currentMouse2D);

        // 3D rotation & parallax tilt
        if (shaderMaterial.uniforms.uProgress.value < 0.25) {
          // Free spinning for the celestial globe in Hero
          points.rotation.y += rotationSpeed;
        } else {
          // For service shapes (Cube, Brackets, Stars, Shield), maintain optimal front isometric angle
          const targetAngleY = 0.32 + currentTiltY * 0.45;
          let curAngle = points.rotation.y % (Math.PI * 2);
          if (curAngle < 0) curAngle += Math.PI * 2;
          let diff = targetAngleY - curAngle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          points.rotation.y += diff * 0.05;
        }
        points.rotation.x = currentTiltX + Math.sin(time * 0.3) * 0.035;
        points.rotation.z = currentTiltY * 0.18;

        renderer.render(scene, camera);
      };

      loopReady = true;
      if (loopWanted) startLoop();

      const ro = new ResizeObserver(() => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);

        shaderMaterial.uniforms.uPointSize.value = w < 768 ? 16.0 : 22.0;
        if (shaderMaterial.uniforms.uProgress.value <= 0.05) {
          const { heroScale, heroPosY } = getResponsiveSettings();
          points.scale.set(heroScale, heroScale, heroScale);
          points.position.set(0, heroPosY, 0);
        }
        ScrollTrigger.refresh();
      });
      ro.observe(container);

      return () => {
        stopLoop();
        window.removeEventListener("mousemove", onPointerMove);
        window.removeEventListener("mouseleave", onPointerLeave);
        ro.disconnect();
        morphTrigger.kill();
        exitTrigger.kill();
        geometry.dispose();
        shaderMaterial.dispose();
        renderer.dispose();
      };
    }, [cameraZ, rotationSpeed]);

    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full flex items-center justify-center select-none overflow-visible ${className}`}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block pointer-events-none touch-none"
        />
      </div>
    );
  }
);

export default ParticleMorphCanvas;
