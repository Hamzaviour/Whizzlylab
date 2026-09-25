import { ShapeType } from "@/components/ParticleMorphCanvas";

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
    tools: ["HubSpot", "Segment", "Mixpanel", "Stripe", "PostHog", "Google Analytics"],
  },
  {
    id: "ai-transformation",
    shape: "neural",
    number: "04",
    title: "AI Transformation",
    description:
      "Operationalize generative AI—custom copilots, intelligent workflows, and fine-tuned models built for compliance and real business ROI.",
    services: [
      "AI Strategy & Feasibility",
      "Custom Copilots & RAG Systems",
      "Workflow & Ops Automation",
      "Model Fine-Tuning & Evaluation",
    ],
    tools: ["OpenAI", "Anthropic", "LangChain", "LlamaIndex", "Pinecone", "Hugging Face"],
  },
  {
    id: "growth-marketing",
    shape: "star",
    number: "05",
    title: "Growth Marketing",
    description:
      "High-velocity acquisition engines combining programmatic SEO, paid performance channels, and conversion rate optimization.",
    services: [
      "Full-Funnel Acquisition",
      "Programmatic SEO Architecture",
      "Paid Performance (Meta / LinkedIn)",
      "Conversion Rate Optimization (CRO)",
    ],
    tools: ["Ahrefs", "Semrush", "Meta Ads", "Google Ads", "VWO", "Webflow"],
  },
  {
    id: "security-compliance",
    shape: "shield",
    number: "06",
    title: "Security & Compliance",
    description:
      "Enterprise hardening and continuous governance—SOC 2 Type II readiness, zero-trust cloud perimeters, and automated penetration testing.",
    services: [
      "SOC 2 & ISO 27001 Readiness",
      "Cloud Perimeter Hardening (AWS / GCP)",
      "Automated Vulnerability Scanning",
      "Zero-Trust Architecture Design",
    ],
    tools: ["Vanta", "Drata", "HashiCorp Vault", "Wiz", "Cloudflare", "Datadog"],
  },
];
