"use client";

import React, { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import ParticleMorphCanvas, { ShapeType } from "./ParticleMorphCanvas";

export interface ServiceItem {
  id: string;
  shape: ShapeType;
  number: string;
  title: string;
  description: string;
  services: string[];
  tools: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "product-design",
    shape: "cube",
    number: "01",
    title: "Product Design",
    description:
      "End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.",
    services: [
      "User Research & Strategy",
      "UX Flows & Wireframes",
      "UI Systems & Prototypes",
      "Design Ops & Dev Handoff",
    ],
    tools: ["Figma", "Sketch", "Blender", "Adobe XD", "Principle", "Framer"],
  },
  {
    id: "development",
    shape: "brackets",
    number: "02",
    title: "Development",
    description:
      "Robust, scalable products across web and mobile—from elegant UIs to reliable APIs and automated DevOps.",
    services: [
      "Frontend Platforms (React / Next)",
      "Backend APIs & Microservices",
      "Mobile & Cross-platform (Flutter)",
      "CI/CD & Cloud Ops (Docker / AWS)",
    ],
    tools: ["React", "Next.js", "TypeScript", "Node.js", "Docker", "Python"],
  },
  {
    id: "gtm-strategy",
    shape: "chart",
    number: "03",
    title: "GTM Strategy",
    description:
      "Data-driven go-to-market for SaaS and AI—clear positioning, smart pricing, and repeatable growth loops from ICP to post-launch analytics.",
    services: [
      "ICP & Segmentation",
      "Positioning, Narrative & Messaging",
      "Pricing & Packaging",
      "Demand Gen & Content Engine",
    ],
    tools: ["HubSpot", "Mixpanel", "Segment", "Zapier", "GA4", "PostHog"],
  },
  {
    id: "healthcare-apps",
    shape: "dna",
    number: "04",
    title: "Healthcare Apps",
    description:
      "Secure, compliant healthcare software—from telehealth to EHR integrations—built for HIPAA and auditability.",
    services: [
      "HIPAA & PHI Compliance",
      "Telehealth & Patient Portals",
      "EHR Integrations (FHIR / HL7)",
      "Audit Logging & Access Controls",
    ],
    tools: ["AWS Health", "FHIR", "HL7", "PostgreSQL", "Auth0", "Docker"],
  },
  {
    id: "ai-development",
    shape: "star",
    number: "05",
    title: "AI Development",
    description:
      "Build production-ready AI—rapid prototyping to deployed models with solid evals, observability, and safety.",
    services: [
      "LLM Apps & Agents (RAG / Tools)",
      "Fine-tuning & Prompt Optimization",
      "Model Evals, Guardrails & Monitoring",
      "Vision, NLP & Speech Pipelines",
    ],
    tools: ["PyTorch", "Hugging Face", "LangChain", "ChromaDB", "OpenAI", "Kafka"],
  },
  {
    id: "iot-development",
    shape: "shield",
    number: "06",
    title: "IoT Development",
    description:
      "From device firmware to cloud ingestion—secure, reliable IoT systems with OTA updates and real-time telemetry.",
    services: [
      "Embedded Firmware & Drivers",
      "BLE / Zigbee / LoRa Connectivity",
      "MQTT Ingestion & Stream Processing",
      "Edge AI & OTA Update Pipelines",
    ],
    tools: ["MQTT", "FreeRTOS", "Raspberry Pi", "ESP32", "AWS IoT", "Kafka"],
  },
];

interface AntimatterServicesSectionProps {
  activeCardIndex?: number;
  onSelectCard?: (index: number) => void;
  showSectionHeader?: boolean;
}

export default function AntimatterServicesSection({
  activeCardIndex: externalIndex,
  onSelectCard: externalOnSelect,
  showSectionHeader = true,
}: AntimatterServicesSectionProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  const setActiveIndex = (index: number) => {
    if (externalOnSelect) {
      externalOnSelect(index);
    } else {
      setInternalIndex(index);
    }
  };

  const carouselRef = useRef<HTMLDivElement>(null);
  const currentService = SERVICES_DATA[activeIndex];

  const handleCardClick = (idx: number) => {
    setActiveIndex(idx);
    if (carouselRef.current) {
      const cardEl = carouselRef.current.children[idx] as HTMLElement | undefined;
      if (cardEl) {
        cardEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return (
    <section
      id="services"
      className="relative w-full bg-black py-20 lg:py-28 overflow-hidden text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        {showSectionHeader && (
          <div className="mb-14 lg:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white">
                Our Services
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-gray-400 font-light">
              We offer comprehensive digital solutions that transform your business
              and drive innovation across every touchpoint.
            </p>
          </div>
        )}

        {/* Main Grid: Left 3D Canvas, Right Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: 3D Particle Morph Canvas */}
          <div className="lg:col-span-5 h-[380px] sm:h-[460px] lg:h-[540px] relative rounded-3xl overflow-hidden flex items-center justify-center">
            {/* Deep Indigo/Purple Radial Ambient Glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.28)_0%,rgba(79,70,229,0.12)_45%,transparent_75%)] blur-2xl" />
            </div>

            {/* Particle Canvas */}
            <ParticleMorphCanvas
              currentShape={currentService.shape}
              particleColor="#e2e8f0"
              glowColor="rgba(99, 102, 241, 0.25)"
              cameraZ={8.2}
              rotationSpeed={0.007}
            />
          </div>

          {/* RIGHT COLUMN: Interactive Horizontal Service Cards */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {SERVICES_DATA.map((service, idx) => {
                const isActive = activeIndex === idx;

                if (isActive) {
                  // Active Card: Deep rich purple/indigo container
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleCardClick(idx)}
                      className="relative shrink-0 w-[310px] sm:w-[350px] md:w-[370px] rounded-3xl p-7 sm:p-8 cursor-pointer transition-all duration-500 overflow-hidden select-none bg-[#2e3568]/95 border border-indigo-400/35 shadow-[0_12px_45px_rgba(46,53,104,0.45)]"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-8">
                        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                          {service.title}
                        </h3>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300 group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm sm:text-[15px] leading-relaxed text-indigo-100/90 mb-10 min-h-[70px]">
                        {service.description}
                      </p>

                      {/* Footer Details: Services & Tools */}
                      <div className="grid grid-cols-2 gap-4 border-t border-indigo-400/20 pt-6">
                        <div>
                          <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-200/60 mb-2.5">
                            Services
                          </div>
                          <ul className="space-y-1.5 text-xs text-indigo-100/80">
                            {service.services.slice(0, 4).map((s, i) => (
                              <li key={i} className="line-clamp-1">
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-200/60 mb-2.5">
                            Tools
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {service.tools.slice(0, 6).map((tool, i) => (
                              <span
                                key={i}
                                className="inline-block px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-[10px] font-medium text-white/90"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Inactive Card: Sleek dark glass container
                return (
                  <div
                    key={service.id}
                    onClick={() => handleCardClick(idx)}
                    className="group relative shrink-0 w-[240px] sm:w-[270px] rounded-3xl p-7 sm:p-8 cursor-pointer transition-all duration-300 overflow-hidden select-none bg-[#0a0a0f]/90 border border-white/10 hover:border-white/25 hover:bg-[#111118]"
                  >
                    {/* Header: Number & Arrow */}
                    <div className="flex items-start justify-between mb-28">
                      <span className="text-3xl sm:text-4xl font-light text-white/80 font-mono tracking-tighter">
                        {service.number}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-white/50 group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    {/* Bottom Title */}
                    <div className="relative z-10">
                      <h4 className="text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                        {service.title}
                      </h4>
                    </div>

                    {/* Subtle Dot Matrix Accent in Bottom Right */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute bottom-4 right-4 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
                        backgroundSize: "6px 6px",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2 mt-4 px-2">
              {SERVICES_DATA.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Select service ${i + 1}`}
                  onClick={() => handleCardClick(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-indigo-400"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
