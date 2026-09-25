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

// 2. 3D Wireframe Cube (Screenshot 1: Airy stardust tube along 12 edges, empty dark interior)
function generateCube(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const half = 1.95;

  const edges = [
    { start: [-half, -half, -half], end: [half, -half, -half] },
    { start: [half, -half, -half], end: [half, -half, half] },
    { start: [half, -half, half], end: [-half, -half, half] },
    { start: [-half, -half, half], end: [-half, -half, -half] },
    { start: [-half, half, -half], end: [half, half, -half] },
    { start: [half, half, -half], end: [half, half, half] },
    { start: [half, half, half], end: [-half, half, half] },
    { start: [-half, half, half], end: [-half, half, -half] },
    { start: [-half, -half, -half], end: [-half, half, -half] },
    { start: [half, -half, -half], end: [half, half, -half] },
    { start: [half, -half, half], end: [half, half, half] },
    { start: [-half, -half, half], end: [-half, half, half] },
  ];

  // 94% on edges distributed as a soft stardust tube, 6% faint stray dust on faces
  const edgeCount = Math.floor(count * 0.94);
  const faceCount = count - edgeCount;

  for (let i = 0; i < edgeCount; i++) {
    const edge = edges[i % edges.length];
    const t = Math.random();
    const x = edge.start[0] + (edge.end[0] - edge.start[0]) * t;
    const y = edge.start[1] + (edge.end[1] - edge.start[1]) * t;
    const z = edge.start[2] + (edge.end[2] - edge.start[2]) * t;

    // Airy stardust dispersion radius around edge (not a solid line!)
    const angle = Math.random() * Math.PI * 2;
    const rad = Math.pow(Math.random(), 0.6) * 0.17;

    positions[i * 3] = x + Math.cos(angle) * rad;
    positions[i * 3 + 1] = y + Math.sin(angle) * rad;
    positions[i * 3 + 2] = z + (Math.random() - 0.5) * rad;
  }

  // Very sparse faint stray points on faces so interior stays clean and see-through
  for (let i = 0; i < faceCount; i++) {
    const face = i % 6;
    const u = (Math.random() * 2 - 1) * half * 0.9;
    const v = (Math.random() * 2 - 1) * half * 0.9;
    let x = 0, y = 0, z = 0;

    switch (face) {
      case 0: x = half; y = u; z = v; break;
      case 1: x = -half; y = u; z = v; break;
      case 2: y = half; x = u; z = v; break;
      case 3: y = -half; x = u; z = v; break;
      case 4: z = half; x = u; y = v; break;
      case 5: z = -half; x = u; y = v; break;
    }

    const idx = (edgeCount + i) * 3;
    positions[idx] = x;
    positions[idx + 1] = y;
    positions[idx + 2] = z;
  }

  return positions;
}

// 3. Code Brackets < / > (Screenshot 2: Luminous stardust strokes)
function generateBrackets(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  const leftCount = Math.floor(count * 0.36);
  const slashCount = Math.floor(count * 0.28);
  const rightCount = count - leftCount - slashCount;

  // 1. Left Bracket < (two straight angled strokes meeting at center-left point)
  for (let i = 0; i < leftCount; i++) {
    const isUpper = i % 2 === 0;
    const t = Math.random(); // 0 to 1
    let x = 0, y = 0;
    if (isUpper) {
      // Top stroke from (-1.1, 1.85) to (-2.3, 0.0)
      x = -1.1 + (-2.3 - -1.1) * t;
      y = 1.85 + (0.0 - 1.85) * t;
    } else {
      // Bottom stroke from (-2.3, 0.0) to (-1.1, -1.85)
      x = -2.3 + (-1.1 - -2.3) * t;
      y = 0.0 + (-1.85 - 0.0) * t;
    }
    const angle = Math.random() * Math.PI * 2;
    const rad = Math.pow(Math.random(), 0.6) * 0.18;

    positions[i * 3] = x + Math.cos(angle) * rad;
    positions[i * 3 + 1] = y + Math.sin(angle) * rad;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
  }

  // 2. Center Slash /
  for (let i = 0; i < slashCount; i++) {
    const t = Math.random();
    const x = -0.65 + (0.65 - -0.65) * t;
    const y = -2.05 + (2.05 - -2.05) * t;

    const angle = Math.random() * Math.PI * 2;
    const rad = Math.pow(Math.random(), 0.6) * 0.18;

    const idx = (leftCount + i) * 3;
    positions[idx] = x + Math.cos(angle) * rad;
    positions[idx + 1] = y + Math.sin(angle) * rad;
    positions[idx + 2] = (Math.random() - 0.5) * 0.25;
  }

  // 3. Right Bracket >
  for (let i = 0; i < rightCount; i++) {
    const isUpper = i % 2 === 0;
    const t = Math.random();
    let x = 0, y = 0;
    if (isUpper) {
      // Top stroke from (1.1, 1.85) to (2.3, 0.0)
      x = 1.1 + (2.3 - 1.1) * t;
      y = 1.85 + (0.0 - 1.85) * t;
    } else {
      // Bottom stroke from (2.3, 0.0) to (1.1, -1.85)
      x = 2.3 + (1.1 - 2.3) * t;
      y = 0.0 + (-1.85 - 0.0) * t;
    }
    const angle = Math.random() * Math.PI * 2;
    const rad = Math.pow(Math.random(), 0.6) * 0.18;

    const idx = (leftCount + slashCount + i) * 3;
    positions[idx] = x + Math.cos(angle) * rad;
    positions[idx + 1] = y + Math.sin(angle) * rad;
    positions[idx + 2] = (Math.random() - 0.5) * 0.25;
  }

  return positions;
}

// 4. Three 4-Pointed Stars (Screenshot 3 - AI Development: 1 large star + 2 smaller stars)
function generateStars(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  const star1Count = Math.floor(count * 0.55); // Large Star (center-left)
  const star2Count = Math.floor(count * 0.25); // Medium Star (top-right)
  const star3Count = count - star1Count - star2Count; // Small Star (bottom-right)

  const stars = [
    { count: star1Count, cx: -0.35, cy: 0.05, cz: 0.0, R: 1.6 },
    { count: star2Count, cx: 1.25, cy: 0.95, cz: -0.15, R: 0.85 },
    { count: star3Count, cx: 1.15, cy: -1.05, cz: -0.1, R: 0.65 },
  ];

  let offset = 0;
  for (const star of stars) {
    for (let i = 0; i < star.count; i++) {
      const t = Math.random() * Math.PI * 2;
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);

      // Astroid / 4-pointed concave star formula
      const curveX = star.R * Math.sign(cosT) * Math.pow(Math.abs(cosT), 2.2);
      const curveY = star.R * Math.sign(sinT) * Math.pow(Math.abs(sinT), 2.2);

      // Volumetric stardust thickness
      const spread = (Math.random() - 0.5) * (0.16 * (star.R / 1.6));
      const zSpread = (Math.random() - 0.5) * 0.25;

      // 80% along star outline, 20% inner core nebula
      let finalX = star.cx + curveX + spread;
      let finalY = star.cy + curveY + spread;
      if (Math.random() < 0.2) {
        const innerT = Math.pow(Math.random(), 0.6);
        finalX = star.cx + curveX * innerT;
        finalY = star.cy + curveY * innerT;
      }

      const idx = (offset + i) * 3;
      positions[idx] = finalX;
      positions[idx + 1] = finalY;
      positions[idx + 2] = star.cz + zSpread;
    }
    offset += star.count;
  }

  return positions;
}

// 5. 3D Wireframe Shield (Screenshot 4 - IoT Development: perimeter crest + faceted horizontal ribs)
function generateShield(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  const outlineCount = Math.floor(count * 0.45);
  const ribsCount = count - outlineCount;

  // 1. Shield perimeter wireframe
  for (let i = 0; i < outlineCount; i++) {
    const t = (i / outlineCount) * 2 - 1; // -1 to 1
    const y = t * 1.85;
    // Shield width profile
    const widthAtY = Math.max(0, 1.45 * (1.0 - Math.pow(Math.max(0, -y) / 1.9, 2.0)));
    const isLeft = i % 2 === 0;
    const x = isLeft ? -widthAtY : widthAtY;
    const z = (1.0 - Math.abs(x) / (widthAtY + 0.001)) * 0.45;

    const angle = Math.random() * Math.PI * 2;
    const rad = Math.pow(Math.random(), 0.6) * 0.16;

    positions[i * 3] = x + Math.cos(angle) * rad;
    positions[i * 3 + 1] = y + Math.sin(angle) * rad;
    positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.15;
  }

  // 2. Horizontal chevron ribs across the body
  const numRibs = 6;
  for (let i = 0; i < ribsCount; i++) {
    const ribIdx = i % numRibs;
    const ribY = 1.3 - (ribIdx / (numRibs - 1)) * 2.6; // from top to bottom
    const widthAtY = Math.max(0.1, 1.4 * (1.0 - Math.pow(Math.max(0, -ribY) / 1.9, 2.0)));

    const t = (Math.random() * 2 - 1); // -1 to 1 across width
    const x = t * widthAtY;
    // Chevron dip in Y towards center
    const y = ribY - Math.abs(t) * 0.18;
    // 3D forward bend in Z along center line
    const z = (1.0 - Math.abs(t)) * 0.45;

    const angle = Math.random() * Math.PI * 2;
    const rad = Math.pow(Math.random(), 0.6) * 0.15;

    const idx = (outlineCount + i) * 3;
    positions[idx] = x + Math.cos(angle) * rad;
    positions[idx + 1] = y + Math.sin(angle) * rad;
    positions[idx + 2] = z + (Math.random() - 0.5) * 0.15;
  }

  return positions;
}

// 6. Bar Chart + Trend Arrow (GTM Strategy)
function generateChart(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const arrowPoints = Math.floor(count * 0.45);
  const barPoints = count - arrowPoints;

  const bars = [
    { x: -1.3, width: 0.65, depth: 0.65, height: 1.2, yBase: -1.6 },
    { x: -0.15, width: 0.65, depth: 0.65, height: 2.0, yBase: -1.6 },
    { x: 1.0, width: 0.65, depth: 0.65, height: 2.8, yBase: -1.6 },
  ];

  for (let i = 0; i < barPoints; i++) {
    const bar = bars[i % 3];
    positions[i * 3] = bar.x + (Math.random() - 0.5) * bar.width;
    positions[i * 3 + 1] = bar.yBase + Math.random() * bar.height;
    positions[i * 3 + 2] = (Math.random() - 0.5) * bar.depth;
  }

  const linePoints = Math.floor(arrowPoints * 0.75);
  const headPoints = arrowPoints - linePoints;

  for (let i = 0; i < linePoints; i++) {
    const t = i / linePoints;
    const x = -1.8 + t * 3.4;
    const y = -0.9 + Math.pow(t, 1.25) * 2.8;
    const idx = (barPoints + i) * 3;
    positions[idx] = x + (Math.random() - 0.5) * 0.12;
    positions[idx + 1] = y + (Math.random() - 0.5) * 0.12;
    positions[idx + 2] = 0.2 + (Math.random() - 0.5) * 0.2;
  }

  const tipX = 1.6;
  const tipY = 1.9;
  for (let i = 0; i < headPoints; i++) {
    const isUpper = i % 2 === 0;
    const t = Math.random() * 0.65;
    const x = isUpper ? tipX - t * 0.65 : tipX - t * 0.25;
    const y = isUpper ? tipY - t * 0.25 : tipY - t * 0.65;
    const idx = (barPoints + linePoints + i) * 3;
    positions[idx] = x;
    positions[idx + 1] = y;
    positions[idx + 2] = 0.2 + (Math.random() - 0.5) * 0.2;
  }

  return positions;
}

// 7. 3D Neural Network / Synaptic Mesh (AI Transformation & Deep Learning)
function generateNeuralNet(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  // 19 distinct 3D Neuron Nodes across 4 depth layers + central intelligence core
  const nodes = [
    // Layer 1: Input Layer (Left, X ≈ -1.9)
    { x: -1.9, y: 1.25, z: -0.45, r: 0.22, weight: 1.0 },
    { x: -1.9, y: 0.42, z: 0.55, r: 0.22, weight: 1.0 },
    { x: -1.9, y: -0.42, z: -0.55, r: 0.22, weight: 1.0 },
    { x: -1.9, y: -1.25, z: 0.45, r: 0.22, weight: 1.0 },

    // Layer 2: Hidden Layer 1 (Mid-Left, X ≈ -0.7)
    { x: -0.7, y: 1.65, z: 0.25, r: 0.24, weight: 1.1 },
    { x: -0.7, y: 0.85, z: -0.55, r: 0.24, weight: 1.1 },
    { x: -0.7, y: 0.05, z: 0.65, r: 0.24, weight: 1.1 },
    { x: -0.7, y: -0.75, z: -0.35, r: 0.24, weight: 1.1 },
    { x: -0.7, y: -1.55, z: 0.3, r: 0.24, weight: 1.1 },

    // Central Intelligence Core (Center Hub, X = 0, Y = 0.05, Z = 0)
    { x: 0.0, y: 0.05, z: 0.0, r: 0.42, weight: 2.8 },

    // Layer 3: Hidden Layer 2 (Mid-Right, X ≈ 0.7)
    { x: 0.7, y: 1.55, z: -0.3, r: 0.24, weight: 1.1 },
    { x: 0.7, y: 0.75, z: 0.55, r: 0.24, weight: 1.1 },
    { x: 0.7, y: -0.05, z: -0.65, r: 0.24, weight: 1.1 },
    { x: 0.7, y: -0.85, z: 0.35, r: 0.24, weight: 1.1 },
    { x: 0.7, y: -1.65, z: -0.25, r: 0.24, weight: 1.1 },

    // Layer 4: Output / Decision Layer (Right, X ≈ 1.9)
    { x: 1.9, y: 1.15, z: 0.35, r: 0.22, weight: 1.0 },
    { x: 1.9, y: 0.38, z: -0.45, r: 0.22, weight: 1.0 },
    { x: 1.9, y: -0.38, z: 0.45, r: 0.22, weight: 1.0 },
    { x: 1.9, y: -1.15, z: -0.35, r: 0.22, weight: 1.0 },
  ];

  // Synaptic connections (Directed & cross-connected neural axons)
  const connections: [number, number][] = [
    // Layer 1 to Layer 2
    [0, 4], [0, 5], [1, 5], [1, 6], [2, 6], [2, 7], [3, 7], [3, 8],
    [0, 6], [1, 4], [2, 8], [3, 6],

    // Layer 2 to Central Core (Index 9)
    [4, 9], [5, 9], [6, 9], [7, 9], [8, 9],

    // Central Core to Layer 3
    [9, 10], [9, 11], [9, 12], [9, 13], [9, 14],

    // Layer 2 to Layer 3 bypass synapses (ResNet / Skip connections)
    [4, 10], [5, 11], [6, 12], [7, 13], [8, 14],
    [5, 12], [7, 11],

    // Layer 3 to Layer 4
    [10, 15], [10, 16], [11, 15], [11, 16], [12, 16], [12, 17],
    [13, 17], [13, 18], [14, 17], [14, 18],
    [11, 17], [12, 15],

    // Intra-layer synaptic lateral loops
    [4, 5], [7, 8], [10, 11], [13, 14]
  ];

  // 38% of particles forming glowing neuron clusters
  const nodeParticlesCount = Math.floor(count * 0.38);
  // 52% of particles along synaptic axon lines
  const synapseParticlesCount = Math.floor(count * 0.52);
  // 10% ambient neural stardust cloud
  const ambientParticlesCount = count - nodeParticlesCount - synapseParticlesCount;

  // Calculate total weight of nodes
  const totalWeight = nodes.reduce((sum, n) => sum + n.weight, 0);

  // 1. Generate Node Clusters
  let pIdx = 0;
  for (let n = 0; n < nodes.length; n++) {
    const node = nodes[n];
    const nodeCount = Math.floor((node.weight / totalWeight) * nodeParticlesCount);

    for (let i = 0; i < nodeCount && pIdx < nodeParticlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const rad = Math.pow(Math.random(), 0.6) * node.r;

      const x = node.x + rad * Math.sin(phi) * Math.cos(theta);
      const y = node.y + rad * Math.sin(phi) * Math.sin(theta);
      const z = node.z + rad * Math.cos(phi);

      const idx = pIdx * 3;
      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;
      pIdx++;
    }
  }

  // 2. Generate Synaptic Axons
  const perConn = Math.floor(synapseParticlesCount / connections.length);
  let sIdx = 0;
  for (let c = 0; c < connections.length; c++) {
    const [fromIdx, toIdx] = connections[c];
    const fromNode = nodes[fromIdx];
    const toNode = nodes[toIdx];

    const currentConnCount = (c === connections.length - 1)
      ? (synapseParticlesCount - sIdx)
      : perConn;

    for (let i = 0; i < currentConnCount; i++) {
      const t = Math.random();
      let x = fromNode.x + (toNode.x - fromNode.x) * t;
      let y = fromNode.y + (toNode.y - fromNode.y) * t;
      let z = fromNode.z + (toNode.z - fromNode.z) * t;

      // Organic synaptic curve (sinusoidal pulse)
      const curve = Math.sin(t * Math.PI) * 0.12;
      y += curve * 0.5;
      z += curve;

      // Dispersion around axon filament
      const angle = Math.random() * Math.PI * 2;
      const spread = Math.pow(Math.random(), 0.7) * 0.075;
      x += Math.cos(angle) * spread;
      y += Math.sin(angle) * spread;
      z += (Math.random() - 0.5) * spread;

      const idx = (nodeParticlesCount + sIdx) * 3;
      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;
      sIdx++;
    }
  }

  // 3. Generate Ambient Neural Aura
  for (let i = 0; i < ambientParticlesCount; i++) {
    const nA = nodes[Math.floor(Math.random() * nodes.length)];
    const nB = nodes[Math.floor(Math.random() * nodes.length)];
    const t = Math.random();

    const x = nA.x + (nB.x - nA.x) * t + (Math.random() - 0.5) * 0.45;
    const y = nA.y + (nB.y - nA.y) * t + (Math.random() - 0.5) * 0.45;
    const z = nA.z + (nB.z - nA.z) * t + (Math.random() - 0.5) * 0.45;

    const idx = (nodeParticlesCount + synapseParticlesCount + i) * 3;
    positions[idx] = x;
    positions[idx + 1] = y;
    positions[idx + 2] = z;
  }

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

      const globeData = generateGlobe(PARTICLE_COUNT);

      const shapes: Record<ShapeType, Float32Array> = {
        globe: globeData.positions,
        cube: generateCube(PARTICLE_COUNT),
        brackets: generateBrackets(PARTICLE_COUNT),
        chart: generateChart(PARTICLE_COUNT),
        neural: generateNeuralNet(PARTICLE_COUNT),
        dna: generateDNA(PARTICLE_COUNT),
        star: generateStars(PARTICLE_COUNT),
        shield: generateShield(PARTICLE_COUNT),
      };
      shapesRef.current = shapes;

      const randoms = new Float32Array(PARTICLE_COUNT);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
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
        antialias: true,
        powerPreference: "high-performance",
      });
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
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
          uPointSize: { value: 22.0 },
          uPixelRatio: { value: pixelRatio },
          uOpacity: { value: 1.0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      shaderMaterialRef.current = shaderMaterial;

      const points = new THREE.Points(geometry, shaderMaterial);
      pointsRef.current = points;
      scene.add(points);

      // Helper function: Compute exact 3D world coordinates for the left dock element
      const computeDockWorldPos = () => {
        const isDesktop = window.innerWidth >= 1024;
        const dock = document.getElementById("services-3d-dock");
        if (!dock || !isDesktop) {
          return { x: isDesktop ? -3.4 : 0, y: isDesktop ? 0 : 0.6 };
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

      // --- GSAP SCROLL CONTROL WITH DYNAMIC 3D DOCKING ---
      const morphTrigger = ScrollTrigger.create({
        trigger: ".services-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        onUpdate: (self) => {
          const p = self.progress;
          const isDesktop = window.innerWidth >= 1024;

          // 1. Morph progress (0 = Globe, 1 = Services Shape)
          shaderMaterial.uniforms.uProgress.value = p;

          // 2. Scale: 1.0x in Hero down to 0.62x in Services
          const targetScale = isDesktop ? 1.0 - 0.38 * p : 1.0 - 0.40 * p;
          points.scale.set(targetScale, targetScale, targetScale);

          // 3. Position: Centered (0, 0, 0) in Hero to exact Left Docking Bay in Services
          const dockPos = computeDockWorldPos();
          points.position.x = dockPos.x * p;
          points.position.y = dockPos.y * p;
        },
        onLeaveBack: () => {
          // Absolute guarantee of 100% Globe reset when scrolling back into Hero
          shaderMaterial.uniforms.uProgress.value = 0.0;
          points.scale.set(1.0, 1.0, 1.0);
          points.position.set(0, 0, 0);
        },
      });

      // Teardown past services section so no ghost particles appear below
      const exitTrigger = ScrollTrigger.create({
        trigger: ".services-section",
        start: "bottom-=120px top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const remaining = 1.0 - self.progress;
          shaderMaterial.uniforms.uOpacity.value = Math.max(0, remaining);
          if (remaining <= 0.01) {
            canvas.style.display = "none";
          } else {
            canvas.style.display = "block";
          }
        },
        onLeave: () => {
          canvas.style.display = "none";
          shaderMaterial.uniforms.uOpacity.value = 0.0;
        },
        onEnterBack: () => {
          canvas.style.display = "block";
          shaderMaterial.uniforms.uOpacity.value = 1.0;
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

      let animId = 0;
      let startTime = performance.now();

      const animate = () => {
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

      animId = requestAnimationFrame(animate);

      const ro = new ResizeObserver(() => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        ScrollTrigger.refresh();
      });
      ro.observe(container);

      return () => {
        cancelAnimationFrame(animId);
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
