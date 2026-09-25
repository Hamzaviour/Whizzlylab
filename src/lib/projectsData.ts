export type ProjectCategory = "website" | "ml-ai";

export interface ImpactMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  category: ProjectCategory;
  number?: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  domain: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  impactMetrics: ImpactMetric[];
  challenge: string;
  solution: string;
}

export const ALL_PROJECTS: ProjectItem[] = [
  // ─────────────────────────────────────────────────────────────────
  // WEBSITES WE BUILT (Client Production Platforms)
  // ─────────────────────────────────────────────────────────────────
  {
    id: "aldeewan",
    category: "website",
    title: "Al-Deewan Collection",
    tagline: "Sub-Second Global Retail Architecture for Luxury Fashion",
    description:
      "High-converting modern e-commerce storefront for designer apparel, seasonal lawn collections, and luxury fashion retail with automated cataloging.",
    image: "/images/websites/aldeewan.webp",
    domain: "High-Volume E-Commerce",
    tags: ["E-Commerce", "Fashion Retail", "Headless Next.js", "Edge CDN", "Stripe"],
    liveUrl: "https://aldeewancollection.com/",
    githubUrl: "https://github.com/Hamzaviour/Al-Deewan-Website",
    featured: true,
    impactMetrics: [
      { label: "Conversion Lift", value: "+42%" },
      { label: "Avg Page Load", value: "0.7s" },
      { label: "Peak Shoppers", value: "30k Peak" },
    ],
    challenge:
      "High checkout abandonment and 4.2-second initial page load times on a legacy monolithic platform during viral seasonal lawn launch events with 20k+ concurrent shoppers.",
    solution:
      "Re-architected the entire storefront into a headless Next.js architecture with edge-cached static assets, automated image optimization, and multi-threaded checkout queues.",
  },
  {
    id: "optionpackaging",
    category: "website",
    title: "Option Packaging",
    tagline: "Parametric 3D Carton Configuration & Quote Engine",
    description:
      "Full-scale custom packaging e-commerce platform offering wholesale boxes, automated quote estimation, category filtering, and client order workflows.",
    image: "/images/websites/optionpackaging.webp",
    domain: "B2B Manufacturing Platform",
    tags: ["Custom Packaging", "B2B E-Commerce", "WebGL 3D", "Automated Quoting", "Full-Stack"],
    liveUrl: "https://optionpackaging.com/",
    githubUrl: "https://github.com/Hamzaviour/optionpackaging",
    featured: true,
    impactMetrics: [
      { label: "Quoting Acceleration", value: "10x" },
      { label: "Pricing Precision", value: "100%" },
      { label: "Automated Pipeline", value: "$2M+" },
    ],
    challenge:
      "Packaging estimates required up to 48 hours of manual dieline calculation, resulting in dropped enterprise leads and customer pricing ambiguity.",
    solution:
      "Developed a browser-based 3D packaging visualizer paired with automated parametric dieline calculation and instant volume pricing algorithms.",
  },
  {
    id: "xecureai",
    category: "website",
    title: "XecureAI",
    tagline: "Enterprise AI Risk Governance & Threat Telemetry Platform",
    description:
      "Enterprise cybersecurity, GRC compliance, and AI governance portal featuring penetration testing services and global SOC advisory integrations.",
    image: "/images/websites/xecureai.webp",
    domain: "Cybersecurity & AI GRC",
    tags: ["Cybersecurity", "GRC & Compliance", "AI Governance", "Next.js", "Edge Telemetry"],
    liveUrl: "https://xecureai.com/",
    githubUrl: "https://github.com/Hamzaviour/XecureAi",
    featured: true,
    impactMetrics: [
      { label: "Alert Latency", value: "<12ms" },
      { label: "Daily Event Throughput", value: "5M+" },
      { label: "System Availability", value: "99.99%" },
    ],
    challenge:
      "Enterprise organizations needed continuous monitoring of LLM endpoints, automated SOC2 compliance checks, and real-time threat detection without adding inference latency.",
    solution:
      "Engineered an asynchronous streaming telemetry pipeline with Kafka and Next.js Edge Runtime, integrating automated eval benchmarks and anomaly classification models.",
  },
  {
    id: "whizzlylab",
    category: "website",
    title: "Whizzly Lab",
    tagline: "Autonomous Multi-Agent Systems & Real-Time Data Streaming",
    description:
      "Digital engineering agency platform showcasing intelligent AI systems, real-time data streaming pipelines, and production-grade client apps.",
    image: "/images/websites/whizzlylab.webp",
    domain: "Digital Engineering Studio",
    tags: ["Agency Studio", "AI Systems", "Engineering Studio", "WebGL Shaders", "Next.js"],
    liveUrl: "https://www.whizzlylab.com/",
    githubUrl: "https://github.com/Hamzaviour/Whizzlylab",
    featured: true,
    impactMetrics: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Client Velocity", value: "<3 Weeks" },
    ],
    challenge:
      "Communicating complex distributed systems engineering, AI agents, and real-time telemetry pipelines with visual clarity and sub-second load times.",
    solution:
      "Engineered custom GLSL shaders, 3D cylindrical carousels, and responsive typography on a zero-overhead Next.js architecture.",
  },
  {
    id: "curecmsolution",
    category: "website",
    title: "CureCMS Solution",
    tagline: "AI Healthcare Operations & RCM Intelligence Platform",
    description:
      "AI-powered medical billing and revenue cycle management platform built for healthcare providers — HIPAA compliant with intelligent RCM workflows.",
    image: "/images/websites/curecmsolution.webp",
    domain: "Healthcare & Medical Billing",
    tags: ["Healthcare", "Medical Billing", "AI Agents", "HIPAA Compliant", "RCM Intelligence"],
    liveUrl: "https://curercmsolution.com/",
    githubUrl: "https://github.com/Hamzaviour/Curecmsolution",
    featured: true,
    impactMetrics: [
      { label: "Claim Accuracy", value: "99.2%" },
      { label: "Reimbursement Cycle", value: "14 Days" },
      { label: "Staff Time Saved", value: "22h / wk" },
    ],
    challenge:
      "Legacy healthcare billing systems caused 18% claim rejections and 45-day reimbursement delays across distributed medical clinic networks.",
    solution:
      "Engineered an automated medical coding validation engine with HIPAA-compliant encrypted telemetry, reducing billing cycle errors and accelerating patient intake.",
  },

  // ─────────────────────────────────────────────────────────────────
  // ML & AI PROJECTS (Intelligent Systems & RAG Pipelines)
  // ─────────────────────────────────────────────────────────────────
  {
    id: "echosense",
    category: "ml-ai",
    number: "01",
    title: "EchoSense",
    tagline: "Real-Time Crisis NLP Streaming & Telemetry Pipeline",
    description:
      "Real-time crisis intervention pipeline using Kafka and Spark NLP to detect and flag high-priority crisis indicators with clinical AI assistant.",
    image: "/images/projects/echosense.webp",
    domain: "Distributed AI & Streaming",
    tags: ["Kafka", "Spark NLP", "Flask", "ChromaDB", "Python", "PyTorch"],
    liveUrl: "https://hamzavelous-echosense-ai.hf.space/login",
    githubUrl: "https://github.com/Hamzaviour",
    featured: true,
    impactMetrics: [
      { label: "Stream Latency", value: "<18ms" },
      { label: "Throughput", value: "50k / sec" },
      { label: "Triage Accuracy", value: "97.8%" },
    ],
    challenge:
      "High-throughput crisis monitoring systems struggled with 50,000+ unclassified events per minute, overwhelming operational response teams.",
    solution:
      "Built an event-driven streaming pipeline leveraging Apache Kafka, Spark, and transformer models for sub-second NLP triage and anomaly clustering.",
  },
  {
    id: "marginalia",
    category: "ml-ai",
    number: "02",
    title: "Marginalia",
    tagline: "Intelligent AI Research Companion for Deep arXiv Paper Synthesis",
    description:
      "Intelligent AI research companion that dives deep into scientific literature — searches arXiv, synthesizes papers, cites sources inline, and tracks research journeys.",
    image: "/images/projects/marginalia.webp",
    domain: "Scientific Literature Synthesis & RAG",
    tags: ["Next.js", "TypeScript", "arXiv API", "LLMs", "RAG", "Vector Search"],
    liveUrl: "https://marginalia-ochre-nu.vercel.app/chat",
    githubUrl: "https://github.com/Hamzaviour/Marginalia",
    featured: true,
    impactMetrics: [
      { label: "Synthesis Speed", value: "<3s" },
      { label: "Citation Grounding", value: "100%" },
      { label: "Paper Corpus", value: "2M+ Papers" },
    ],
    challenge:
      "Researchers lose hours manually sifting through dozens of dense PDF papers without verified source grounding or interactive synthesis.",
    solution:
      "Engineered an arXiv vector embedding pipeline with hybrid BM25 and dense retrieval, providing inline source citations and exploratory conversational research trees.",
  },
  {
    id: "sentiment-analyzer",
    category: "ml-ai",
    number: "03",
    title: "Sentiment Analyzer",
    tagline: "AI-Powered Opinion Mining & Multimodal Sentiment Telemetry",
    description:
      "AI-powered text classification and sentiment analytics web application for customer feedback, brand perception, and real-time opinion mining.",
    image: "/images/projects/sentiment-analyzer.webp",
    domain: "NLP & Real-Time Classification",
    tags: ["NLP", "Transformers", "React", "Python", "FastAPI", "Hugging Face"],
    liveUrl: "https://huaweisentiment.vercel.app/",
    githubUrl: "https://github.com/Hamzaviour/Sentiment-Analyzer",
    featured: true,
    impactMetrics: [
      { label: "Inference Latency", value: "<25ms" },
      { label: "Classification F1", value: "0.96" },
      { label: "Languages", value: "Multi-Lingual" },
    ],
    challenge:
      "Analyzing unstructured customer reviews and enterprise support tickets in real time to catch brand perception shifts and negative sentiment surges.",
    solution:
      "Fine-tuned transformer models deployed on high-concurrency FastAPI microservices, paired with a reactive frontend displaying sentiment polarity distribution.",
  },
  {
    id: "deewan-pos",
    category: "ml-ai",
    number: "04",
    title: "Al-Deewan POS System",
    tagline: "Advanced AI-Driven Enterprise Point-of-Sale & Accounting ERP",
    description:
      "Advanced AI-based enterprise point-of-sale ERP software with wholesale & retail inventory, double-entry accounting, SQLite, and Cloudflare Tunnel remote portal.",
    image: "/images/projects/deewan-pos.webp",
    domain: "Enterprise ERP & Retail Intelligence",
    tags: ["Electron", "React 18", "TypeScript", "Vite", "SQLite", "Cloudflare"],
    githubUrl: "https://github.com/Hamzaviour/Deewan-POS-System",
    featured: false,
    impactMetrics: [
      { label: "Inventory Latency", value: "<1ms" },
      { label: "Offline Resiliency", value: "100% Local" },
      { label: "Ledger Standard", value: "Double-Entry" },
    ],
    challenge:
      "Multi-branch luxury apparel retail required local-first zero-latency cashier operations that sync inventory safely across Cloudflare tunnels during network outages.",
    solution:
      "Engineered an Electron desktop POS client with SQLite WAL mode, real-time barcode scanning, automated double-entry ledger bookkeeping, and remote tunnel management.",
  },
  {
    id: "intelligent-support-engine",
    category: "ml-ai",
    number: "05",
    title: "Intelligent Support Engine",
    tagline: "LangGraph-Orchestrated Autonomous Support Triage & Resolution",
    description:
      "Autonomous multi-agent customer support engine powered by LangGraph, FastAPI, and Next.js for real-time ticket triage, intent routing, and self-service resolution.",
    image: "/images/projects/intelligent-support-engine.webp",
    domain: "Autonomous Multi-Agent AI",
    tags: ["LangGraph", "Multi-Agent AI", "FastAPI", "Python", "Next.js"],
    githubUrl: "https://github.com/Hamzaviour/Intelligent_Support_Engine",
    featured: false,
    impactMetrics: [
      { label: "Auto Resolution", value: "68%" },
      { label: "Triage Speed", value: "<1.2s" },
      { label: "CSAT Improvement", value: "+34%" },
    ],
    challenge:
      "Support teams face high volume recurring queries and slow escalation paths that degrade customer satisfaction and strain tier-2 engineers.",
    solution:
      "Architected a stateful LangGraph multi-agent loop with intent classification, tool invocation for DB lookups, and human-in-the-loop escalation gates.",
  },
  {
    id: "knowly",
    category: "ml-ai",
    number: "06",
    title: "Knowly",
    tagline: "Hybrid Semantic Document Search & Multi-Agent Deep Research",
    description:
      "Enterprise document AI workspace offering hybrid semantic search, multi-agent orchestration, deep research synthesis, and automated document analysis.",
    image: "/images/projects/knowly.webp",
    domain: "Enterprise Document Intelligence",
    tags: ["Next.js 16", "FastAPI", "Document AI", "Semantic Search", "RAG"],
    githubUrl: "https://github.com/Hamzaviour/Knowly",
    featured: false,
    impactMetrics: [
      { label: "Ingestion Speed", value: "100+ pgs/min" },
      { label: "Retrieval Precision", value: "99.1%" },
      { label: "Hallucination Guard", value: "Zero Drift" },
    ],
    challenge:
      "Extracting mission-critical insights from heterogeneous PDF reports, scanned contracts, and complex multi-page financial filings.",
    solution:
      "Built a hierarchical document chunking engine with layout-aware OCR parsing, Qdrant/ChromaDB vector indices, and synthesis agents.",
  },
  {
    id: "cyberbrainids",
    category: "ml-ai",
    number: "07",
    title: "CyberBrain IDS",
    tagline: "Live Packet Capture & Hybrid Anomaly Detection IDS with RAG SOC",
    description:
      "AI-powered Intrusion Detection System featuring live packet capture, Random Forest + XGBoost hybrid anomaly detection, ChromaDB RAG, and SOC dashboard.",
    image: "/images/projects/cyberbrainids.webp",
    domain: "AI Cybersecurity & Network Defense",
    tags: ["Python", "PyShark", "XGBoost", "ChromaDB", "React", "SOC Dashboard"],
    liveUrl: "https://cybervenoms.netlify.app/",
    githubUrl: "https://github.com/Hamzaviour/CyberBrainIDS",
    featured: true,
    impactMetrics: [
      { label: "Detection Rate", value: "99.4%" },
      { label: "Packet Throughput", value: "100k / sec" },
      { label: "False Positive Rate", value: "<0.08%" },
    ],
    challenge:
      "Modern network attacks bypass static signature rules through zero-day payload mutations and high-frequency port scanning.",
    solution:
      "Built a live packet sniffer with PyShark feeding a hybrid Random Forest + XGBoost classifier, coupled with ChromaDB RAG for instant MITRE ATT&CK mitigation playbooks.",
  },
];

export function getProjectsByCategory(category?: ProjectCategory | "all") {
  if (!category || category === "all") return ALL_PROJECTS;
  return ALL_PROJECTS.filter((p) => p.category === category);
}

export function getProjectById(id: string) {
  return ALL_PROJECTS.find((p) => p.id === id);
}
