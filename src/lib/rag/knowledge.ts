/**
 * Whizzly Lab RAG Knowledge Base
 * Structured domain knowledge chunks for grounded retrieval-augmented generation.
 */

export interface KnowledgeChunk {
  id: string;
  category: "service" | "pricing" | "case_study" | "company" | "technology" | "faq" | "contact";
  title: string;
  content: string;
  keywords: string[];
  url?: string;
  actionText?: string;
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // ── Company & Founder ────────────────────────────────────────────────────────
  {
    id: "company-overview",
    category: "company",
    title: "About Whizzly Lab",
    content: `Whizzly Lab (also known as Whizzly or WhizzlyLab) is an elite AI engineering studio and full-stack software development agency. We architect intelligent AI systems, custom machine learning pipelines, real-time distributed Kafka data streams, and high-performance Next.js web applications for startups and enterprises worldwide. We operate globally across North America, Europe, Middle East, and Asia with a sub-24 hour response SLA.`,
    keywords: ["whizzly", "whizzlylab", "whizzly lab", "ai studio", "software studio", "about", "agency", "company", "who are you"],
    url: "/about",
    actionText: "Read About Whizzly Lab",
  },
  {
    id: "founder-profile",
    category: "company",
    title: "Lead AI Engineering Team — Whizzly Lab",
    content: `Whizzly Lab is an elite AI & software engineering studio specializing in agentic RAG workflows, distributed Kafka event streaming, deep learning model deployment, and full-stack cloud architectures. The team personally oversees technical architecture, code quality, and delivery for every client engagement.`,
    keywords: ["team", "engineers", "lead engineer", "who built", "who founded", "ceo", "creator"],
    url: "/about",
    actionText: "Schedule a Technical Call",
  },

  // ── Services ────────────────────────────────────────────────────────────────
  {
    id: "service-ai-rag",
    category: "service",
    title: "AI & RAG Systems Service",
    content: `Whizzly Lab designs and deploys production-grade Retrieval-Augmented Generation (RAG) systems and autonomous agentic workflows. We build multi-stage retrieval pipelines with hybrid search (dense embeddings + BM25 keyword search), vector database indexing (Qdrant, Pinecone, ChromaDB, Weaviate), hallucination guardrails, and LLM evaluation benchmarks. Stack: Python, LangChain, LlamaIndex, OpenAI, Hugging Face, FastAPI, PyTorch.`,
    keywords: ["ai", "rag", "retrieval augmented generation", "autonomous agents", "langchain", "llamaindex", "chromadb", "qdrant", "vector database", "llm", "gpt", "embeddings"],
    url: "/services/ai",
    actionText: "Explore AI & RAG Services",
  },
  {
    id: "service-data-pipelines",
    category: "service",
    title: "Real-Time Data Pipelines & Event Streaming",
    content: `We build distributed high-velocity event streaming architectures using Apache Kafka, Apache Spark, and PySpark. Deliverables include Kafka cluster broker design, streaming consumer groups, anomaly detection engines, schema registries, and pipeline observability. Capable of handling millions of real-time events with sub-second latency for live analytics and downstream AI models.`,
    keywords: ["kafka", "spark", "pyspark", "data pipelines", "event streaming", "data engineering", "real-time data", "streaming", "etl", "kinesis"],
    url: "/services/data-pipelines",
    actionText: "View Data Pipeline Architecture",
  },
  {
    id: "service-web-development",
    category: "service",
    title: "Full-Stack Web Development & Next.js Platforms",
    content: `Whizzly Lab develops product-grade, high-performance web applications using React, Next.js (App Router), TypeScript, and Tailwind CSS, backed by robust Python (FastAPI/Flask) or Node.js microservices. We build authenticated SaaS portals, high-converting marketing sites, interactive dashboards, and Dockerized cloud deployments on AWS and Vercel.`,
    keywords: ["web development", "next.js", "react", "typescript", "full-stack", "frontend", "backend", "fastapi", "flask", "docker", "saas portal"],
    url: "/services/web-development",
    actionText: "Explore Web Engineering",
  },
  {
    id: "service-machine-learning",
    category: "service",
    title: "Machine Learning & MLOps",
    content: `Custom machine learning model development, dataset curation, neural network training, evaluation loops, and MLOps deployment. We use PyTorch, TensorFlow, scikit-learn, and MLflow, deploying inference APIs with automated drift monitoring on Hugging Face Spaces and cloud infrastructure.`,
    keywords: ["machine learning", "ml", "mlops", "pytorch", "tensorflow", "scikit-learn", "model training", "hugging face", "mlflow", "deep learning"],
    url: "/services/machine-learning",
    actionText: "Explore Machine Learning",
  },
  {
    id: "service-automation",
    category: "service",
    title: "Workflow Automation & Voice AI",
    content: `Autonomous workflow automation connecting CRMs, databases, messaging, and AI services using n8n and AWS orchestration. We also engineer voice AI pipelines using Whisper, Deepgram, and ElevenLabs to convert speech into structured actions and automated customer responses.`,
    keywords: ["automation", "n8n", "workflows", "voice ai", "whisper", "deepgram", "elevenlabs", "zapier", "integrations", "crm automation"],
    url: "/services/automation",
    actionText: "View Automation Services",
  },
  {
    id: "service-data-analytics",
    category: "service",
    title: "Data Analytics & Executive Dashboards",
    content: `Business intelligence dashboards and KPI reporting layers in Power BI, Tableau, and Looker Studio. We establish clean metric definitions, automated ETL connectors, and executive data visualizations so leadership can make decisions without digging for answers.`,
    keywords: ["data analytics", "power bi", "tableau", "looker studio", "bi", "dashboards", "business intelligence", "sql", "reporting"],
    url: "/services/data-analytics",
    actionText: "View Data Analytics",
  },
  {
    id: "service-computer-vision",
    category: "service",
    title: "Computer Vision & Visual Intelligence",
    content: `Object detection, classification, segmentation, and video stream analysis using YOLO, OpenCV, PyTorch, and TorchVision. We build vision models for industrial inspection, drone/satellite imagery, and real-time inference alerts.`,
    keywords: ["computer vision", "cv", "yolo", "opencv", "object detection", "image classification", "video analysis"],
    url: "/services/computer-vision",
    actionText: "View Computer Vision",
  },
  {
    id: "service-business-solutions",
    category: "service",
    title: "Custom Business Solutions & SaaS Platforms",
    content: `Domain-specific platform engineering for healthcare, compliance, and commerce. We build unified platforms with role-based access, automated workflows, and billing integrations, tailored to privacy regulations (HIPAA/GDPR) and business operational constraints.`,
    keywords: ["business solutions", "saas", "custom software", "healthcare cms", "compliance", "e-commerce platform"],
    url: "/services/business-solutions",
    actionText: "View Business Solutions",
  },

  // ── Pricing & Budget ────────────────────────────────────────────────────────
  {
    id: "pricing-overview",
    category: "pricing",
    title: "Transparent Project Pricing (PKR & USD)",
    content: `Whizzly Lab offers transparent pricing with no hidden fees. Pricing is available in both USD and PKR:
- **Web Development**: Starter ($300 / PKR 85k), Growth ($750 / PKR 210k), Enterprise ($1,500+ / PKR 420k+)
- **AI & RAG Systems**: Starter ($600 / PKR 168k), Growth ($1,400 / PKR 390k), Enterprise ($2,800+ / PKR 780k+)
- **Real-Time Data Pipelines (Kafka/Spark)**: Starter ($800 / PKR 225k), Growth ($1,800 / PKR 500k), Enterprise ($3,500+ / PKR 980k+)
- **Machine Learning & MLOps**: Starter ($700 / PKR 195k), Growth ($1,600 / PKR 450k), Enterprise ($3,200+ / PKR 900k+)
- **Workflow Automation**: Starter ($250 / PKR 70k), Growth ($600 / PKR 170k), Enterprise ($1,200+ / PKR 340k+)
- **Data Analytics Dashboards**: Starter ($300 / PKR 85k), Growth ($700 / PKR 195k), Enterprise ($1,400+ / PKR 390k+)
- **Computer Vision**: Starter ($750 / PKR 210k), Growth ($1,700 / PKR 475k), Enterprise ($3,400+ / PKR 950k+)
- **Business Solutions**: Starter ($1,000 / PKR 280k), Growth ($2,500 / PKR 700k), Enterprise ($5,000+ / PKR 1.4M+)
We offer milestone-based payment schedules (50% upfront, 50% upon delivery and staging sign-off).`,
    keywords: ["pricing", "cost", "how much", "rate", "usd", "pkr", "budget", "quotes", "packages", "tiers", "estimate", "fees"],
    url: "/pricing",
    actionText: "View Interactive Pricing Table",
  },

  // ── Case Studies ────────────────────────────────────────────────────────────
  {
    id: "case-echosense",
    category: "case_study",
    title: "EchoSense AI — Real-Time Streaming NLP Architecture",
    content: `EchoSense AI is a high-throughput streaming NLP intelligence system architected with Apache Kafka, PySpark, and transformer-based sentiment/entity models. It processes real-time social and market data streams, generates instant semantic insights, and renders dynamic analytics dashboards with sub-second response times. Live demo: https://hamzavelous-echosense-ai.hf.space/login`,
    keywords: ["echosense", "echosense ai", "case study", "portfolio item", "kafka project", "streaming nlp"],
    url: "/#case-studies",
    actionText: "Explore EchoSense AI",
  },
  {
    id: "case-curecms",
    category: "case_study",
    title: "CureCMS — Healthcare Content & Clinic Operations",
    content: `CureCMS is a specialized healthcare management platform with patient appointment scheduling, HIPAA-conscious medical records, doctor directory workflows, and dynamic CMS capabilities built on Next.js and secure cloud infrastructure.`,
    keywords: ["curecms", "healthcare", "case study", "clinic platform"],
    url: "/#case-studies",
    actionText: "Explore CureCMS",
  },
  {
    id: "case-complysecops",
    category: "case_study",
    title: "COMPLYSECOPS — Automated Compliance Audit Suite",
    content: `COMPLYSECOPS is an enterprise compliance automation engine that scans cloud infrastructure, verifies security benchmarks (SOC2, ISO27001), and generates audit-ready reports with automated remediation triggers.`,
    keywords: ["complysecops", "compliance", "security", "case study"],
    url: "/#case-studies",
    actionText: "Explore COMPLYSECOPS",
  },

  // ── Booking & Contact ───────────────────────────────────────────────────────
  {
    id: "contact-booking",
    category: "contact",
    title: "Schedule a Consultation & Contact Whizzly Lab",
    content: `Ready to start a project or need architectural advice?
- **Schedule Call**: Book directly on our calendar at https://whizzlylab.com/schedule (Cal.com integration, 15-30 min intro call).
- **WhatsApp**: Message us directly at https://wa.me/923097404009 (+92 309 7404009) for instant messaging.
- **Email**: Reach out at whizzlylab@gmail.com.
- **LinkedIn**: https://www.linkedin.com/company/whizzly-lab
- **Instagram**: https://www.instagram.com/whizzlylab/
- **Facebook**: https://www.facebook.com/profile.php?id=61592686831558
- **GitHub**: https://github.com/Hamzaviour/whizzlylab
- **Response Time**: We respond to all inquiries within 24 hours.`,
    keywords: ["contact", "schedule", "book a call", "meeting", "call", "whatsapp", "email", "hire", "consultation", "phone", "calendar", "socials", "linkedin", "instagram", "facebook", "github"],
    url: "/schedule",
    actionText: "Book a Free 1:1 Technical Call",
  },

  // ── FAQs ────────────────────────────────────────────────────────────────────
  {
    id: "faq-workflow",
    category: "faq",
    title: "How Engagements Work & Delivery Process",
    content: `Our engagement workflow follows 4 distinct phases:
1. **Discovery & Architecture**: 30-min discovery call to define exact requirements, data flows, tech stack, and deliverable milestones.
2. **Rapid Prototyping & Iteration**: We ship working staging previews within 3 to 7 business days with weekly sprint reviews.
3. **Hardening & Quality Assurance**: Stress testing, security audits, evaluation benchmarks, and documentation.
4. **Production Deployment & Handover**: Complete source code transfer, CI/CD pipeline setup, Docker configuration, and 30-day post-launch support.`,
    keywords: ["process", "workflow", "how it works", "delivery", "timeline", "how long", "milestones", "handover", "support"],
    url: "/about",
    actionText: "Learn About Our Process",
  },
  {
    id: "faq-ip-ownership",
    category: "faq",
    title: "Intellectual Property & Code Ownership",
    content: `You own 100% of all intellectual property, source code, neural network weights, configuration scripts, and documentation created during the project. We do not retain vendor lock-in or proprietary licensing over your custom code.`,
    keywords: ["ip", "intellectual property", "ownership", "code ownership", "license", "copyright"],
    url: "/pricing",
    actionText: "Check Terms & Ownership",
  },
];
