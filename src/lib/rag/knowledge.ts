/**
 * Whizzly Lab RAG Knowledge Base
 * Comprehensive domain knowledge chunks for grounded retrieval-augmented generation.
 * Synchronized with the 8 official Whizzly Lab technical documents in src/lib/rag/docs/.
 */

export interface KnowledgeChunk {
  id: string;
  category:
    | "greeting"
    | "company"
    | "team"
    | "service"
    | "pricing"
    | "project"
    | "contact"
    | "careers"
    | "faq";
  title: string;
  content: string;
  keywords: string[];
  url?: string;
  actionText?: string;
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // ── 1. Greetings & Conversational Identity ──────────────────────────────────
  {
    id: "general-greeting",
    category: "greeting",
    title: "Greeting & Welcome",
    content: `Hello! I am Whizzly AI, the technical solutions architect assistant for Whizzly Lab. I'm doing great and ready to help you with our web development, workflow automation, RAG systems, SaaS products, apps, custom AI integration, pricing in USD, or scheduling a technical discovery call. How can I help you today?`,
    keywords: ["hi", "hello", "hey", "how are you", "how are you doing", "greetings", "good morning", "good evening", "good afternoon", "what's up", "sup"],
    url: "/services",
    actionText: "Explore Capabilities",
  },
  {
    id: "identity-who-are-you",
    category: "greeting",
    title: "Who is Whizzly AI",
    content: `I am Whizzly AI, the AI technical assistant for Whizzly Lab. I provide instant, to-the-point answers about our web development, workflow automation, RAG systems, SaaS platforms, apps, custom AI integration, pricing in USD, team, projects, and direct meeting booking.`,
    keywords: ["who are you", "what are you", "what can you do", "introduce yourself", "tell me about yourself", "your purpose"],
    url: "/about",
    actionText: "About Whizzly Lab",
  },

  // ── 2. Company & Mission ─────────────────────────────────────────────────────
  {
    id: "company-overview",
    category: "company",
    title: "About Whizzly Lab Studio",
    content: `Whizzly Lab is an elite AI engineering studio and full-stack software development collective. We design, architect, and deploy intelligent AI systems, autonomous multi-agent pipelines, RAG systems, workflow automation, scalable SaaS platforms, full-stack web development, mobile & web apps, digital products, and custom AI integration. We operate globally with a remote-first engineering model and 100% IP ownership transferred to clients.`,
    keywords: ["whizzly", "whizzlylab", "whizzly lab", "about", "company", "studio", "agency", "what is whizzly lab", "overview", "location", "where are you located"],
    url: "/about",
    actionText: "Read About Whizzly Lab",
  },
  {
    id: "company-philosophy",
    category: "company",
    title: "Engineering Principles & Standards",
    content: `Our engineering philosophy is built on 3 core pillars: Production-First Architecture (systems built from day 1 for real traffic and compliance), Observability & Guardrails (sub-second telemetry with zero hallucination drift), and Transparent Agile Cadence (weekly staging deployments with zero bureaucracy).`,
    keywords: ["philosophy", "principles", "standards", "values", "how you build", "why whizzly"],
    url: "/about",
    actionText: "Our Engineering Principles",
  },

  // ── 3. Founder & Team ────────────────────────────────────────────────────────
  {
    id: "founder-hamza-younas",
    category: "team",
    title: "Founder: Hamza Younas",
    content: `Whizzly Lab was founded by Hamza Younas, Lead Systems Architect specializing in Distributed AI, Neural Engines, Full-Stack Web Development, Workflow Automation, and Autonomous AI Integration. Hamza personally reviews architectural RFCs, code quality, and delivery for every client sprint. GitHub: https://github.com/Hamzaviour`,
    keywords: ["hamza", "hamza younas", "founder", "ceo", "creator", "who founded", "who created", "who runs", "architect", "lead engineer"],
    url: "/about",
    actionText: "Meet the Founder",
  },
  {
    id: "team-squad",
    category: "team",
    title: "The Whizzly Lab Engineering Squad",
    content: `Our team is an elite, distributed collective of specialists:
- Hamza Younas: Founder & Lead Systems Architect (Distributed AI & Neural Engines)
- Sarah Chen: Principal ML Researcher (Transformer Fine-Tuning & RAG)
- Marcus Webb: Distributed Systems Lead (Kafka Streaming & Telemetry)
- Jennifer Liu: Lead Full-Stack Architect (Next.js 15 & Cloud Infrastructure)
- David Park: DevOps & Cloud Architect (Kubernetes & AWS)
- Ayesha Rahman: AI Safety & Guardrails Lead (Hallucination Evals)
- Alexandre Moreau: Real-Time Systems Specialist (Low-Latency Vector Indexing)
- Elena Rostova: WebGL & 3D Graphics Engineer (Three.js & GLSL Shaders)
- Karan Mehta: Automation & Workflow Lead (n8n & Voice AI)`,
    keywords: ["team", "engineers", "squad", "staff", "who works here", "developers", "researchers", "sarah chen", "marcus webb", "jennifer liu", "david park"],
    url: "/about",
    actionText: "View Team Orbit",
  },

  // ── 4. Contact, Meetings & Socials ───────────────────────────────────────────
  {
    id: "contact-meeting-booking",
    category: "contact",
    title: "Schedule a Meeting & Direct Contact",
    content: `To book a technical scoping call or speak directly with our lead architects:
- Book Call Online: https://www.whizzlylab.com/schedule (15–30 min 1:1 discovery call)
- Phone: +1 (424) 451-0714 (tel:+14244510714)
- Email: whizzlylab@gmail.com
- Response Time: We respond with technical scoping feedback within 4 to 12 hours.`,
    keywords: ["schedule", "meeting", "book", "book a call", "consultation", "demo", "contact", "phone", "number", "email", "call", "talk", "hire"],
    url: "/schedule",
    actionText: "Book Discovery Call",
  },
  {
    id: "social-channels",
    category: "contact",
    title: "Official Socials & Repositories",
    content: `Connect with Whizzly Lab across our official verified channels:
- Phone: +1 (424) 451-0714
- Email: whizzlylab@gmail.com
- LinkedIn: https://www.linkedin.com/company/whizzly-lab
- GitHub: https://github.com/Hamzaviour/whizzlylab
- Instagram: https://www.instagram.com/whizzlylab/
- Facebook: https://www.facebook.com/profile.php?id=61592686831558`,
    keywords: ["socials", "social media", "linkedin", "github", "instagram", "facebook", "links", "repo"],
    url: "/contact",
    actionText: "Get in Touch",
  },

  // ── 5. Pricing & Packages (USD Only) ─────────────────────────────────────────
  {
    id: "pricing-overview",
    category: "pricing",
    title: "Engineering Pricing & Sprint Rates (USD)",
    content: `Whizzly Lab offers transparent engineering sprint pricing strictly in USD with 100% IP ownership and 50/50 milestone billing:
- Web Development: Starter ($300–$600), Growth ($750–$1,200), Enterprise ($2,500–$5,000+)
- AI & Multi-Agent RAG: Starter ($600–$1,200), Growth ($1,400–$2,500), Enterprise ($2,800–$5,000+)
- Real-Time Kafka/Spark Pipelines: Starter ($800–$1,500), Growth ($1,800–$3,000), Enterprise ($3,500–$6,000+)
- Machine Learning & MLOps: Starter ($700–$1,300), Growth ($1,600–$2,800), Enterprise ($3,200–$5,500+)
- Workflow Automation & Voice AI: Starter ($250–$500), Growth ($600–$1,200), Enterprise ($1,200–$2,500+)
- Data Analytics & BI: Starter ($300–$600), Growth ($700–$1,400), Enterprise ($1,400–$3,000+)
- Computer Vision: Starter ($750–$1,400), Growth ($1,700–$3,000), Enterprise ($3,400–$6,000+)
- Business Solutions: Starter ($1,000–$2,000), Growth ($2,500–$4,500), Enterprise ($5,000+)`,
    keywords: ["pricing", "cost", "how much", "rate", "usd", "price", "packages", "quote", "budget", "fees", "tiers"],
    url: "/pricing",
    actionText: "View Interactive Pricing Table",
  },
  {
    id: "pricing-ip-milestones",
    category: "pricing",
    title: "Payment Structure & IP Ownership",
    content: `Engagements are structured on milestone terms (50% upfront sprint kickoff, 50% upon staging review and sign-off). Clients receive 100% intellectual property ownership of all source code, neural network weights, database schemas, and cloud configs with zero vendor retainers.`,
    keywords: ["payment terms", "milestone", "ip", "intellectual property", "ownership", "who owns code", "retainer"],
    url: "/pricing",
    actionText: "Review Pricing Terms",
  },

  // ── 6. Services & Technical Capabilities ─────────────────────────────────────
  {
    id: "service-ai-rag",
    category: "service",
    title: "AI Transformation & Multi-Agent RAG",
    content: `We build production-grade Retrieval-Augmented Generation (RAG) systems and autonomous multi-agent loops with dense vector embeddings, BM25 sparse keyword ranking, and vector DB indexing (Qdrant, Pinecone, ChromaDB). Features hallucination guardrails, LLM evaluation benchmarks, and tool-augmented agents using LangChain, LangGraph, and LlamaIndex.`,
    keywords: ["ai", "rag", "retrieval augmented generation", "agents", "multi-agent", "langchain", "langgraph", "llamaindex", "qdrant", "pinecone", "chromadb", "embeddings", "vector db", "llm"],
    url: "/services/ai",
    actionText: "Explore AI & RAG Services",
  },
  {
    id: "service-data-pipelines",
    category: "service",
    title: "Real-Time Data Pipelines & Apache Kafka",
    content: `Distributed, high-throughput event streaming systems engineered with Apache Kafka, Spark, and PySpark. Deliverables include multi-broker clusters, partitioned topics, consumer group scaling, windowed stream transformations, and lag observability handling 50k+ events/sec with sub-second SLAs.`,
    keywords: ["kafka", "spark", "pyspark", "streaming", "data pipelines", "event streaming", "real-time data", "etl", "kinesis", "high throughput"],
    url: "/services/data-pipelines",
    actionText: "Explore Kafka Pipelines",
  },
  {
    id: "service-web-development",
    category: "service",
    title: "Full-Stack Web Development & Next.js Platforms",
    content: `High-performance web applications built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS. Backed by high-speed Python (FastAPI/Flask) or Node.js microservices with Dockerized deployments on AWS and Vercel. Average page loads under 0.8s.`,
    keywords: ["web development", "next.js", "react", "typescript", "frontend", "backend", "fastapi", "docker", "full-stack", "saas platform", "websites"],
    url: "/services/web-development",
    actionText: "Explore Web Engineering",
  },
  {
    id: "service-machine-learning",
    category: "service",
    title: "Machine Learning & MLOps",
    content: `Custom deep neural network training, transformer fine-tuning (LoRA/QLoRA), automated dataset curation, and MLOps deployment with drift monitoring. Stack: PyTorch, TensorFlow, Hugging Face, scikit-learn, and MLflow.`,
    keywords: ["machine learning", "ml", "mlops", "pytorch", "model training", "fine-tuning", "hugging face", "deep learning", "tensorflow"],
    url: "/services/machine-learning",
    actionText: "Explore Machine Learning",
  },
  {
    id: "service-automation-voice",
    category: "service",
    title: "Workflow Automation & Voice AI",
    content: `Autonomous workflow automation connecting CRMs, databases, and LLMs using n8n and AWS orchestration. Real-time conversational voice AI pipelines using Whisper, Deepgram, and ElevenLabs speech synthesis.`,
    keywords: ["automation", "n8n", "voice ai", "whisper", "deepgram", "elevenlabs", "workflows", "integrations"],
    url: "/services/automation",
    actionText: "Explore Automation & Voice",
  },
  {
    id: "service-computer-vision",
    category: "service",
    title: "Computer Vision & Industrial Visual Intelligence",
    content: `Object detection, classification, segmentation, and live video analysis using YOLO, OpenCV, PyTorch, and TorchVision for industrial inspection, security systems, and automated bounding box alerts.`,
    keywords: ["computer vision", "cv", "yolo", "opencv", "object detection", "image classification", "video analysis"],
    url: "/services/computer-vision",
    actionText: "Explore Computer Vision",
  },
  {
    id: "service-analytics-dashboards",
    category: "service",
    title: "Data Analytics & Executive BI Dashboards",
    content: `Executive business intelligence dashboards in Power BI, Tableau, and Looker Studio. Includes automated multi-source ETL pipelines, data warehouse modeling, and real-time metric tracking.`,
    keywords: ["data analytics", "power bi", "tableau", "looker studio", "bi", "dashboards", "business intelligence", "sql"],
    url: "/services/data-analytics",
    actionText: "Explore BI Dashboards",
  },
  {
    id: "service-business-solutions",
    category: "service",
    title: "Enterprise Business Solutions & Healthcare Platforms",
    content: `Vertical product engineering for healthcare (HIPAA compliance), enterprise compliance (SOC 2, ISO 27001), and custom e-commerce platforms with multi-tenant roles, audit trails, and billing integrations.`,
    keywords: ["business solutions", "saas", "healthcare", "compliance", "hipaa", "soc 2", "enterprise platform"],
    url: "/services/business-solutions",
    actionText: "Explore Business Solutions",
  },

  // ── 7. Projects & Case Studies ───────────────────────────────────────────────
  {
    id: "project-aldeewan",
    category: "project",
    title: "Al-Deewan Collection (E-Commerce Storefront)",
    content: `High-converting luxury fashion retail platform. Built with headless Next.js, Edge CDN, and Stripe checkout. Impact: +42% conversion lift, 0.7s average page load, handles 30k peak concurrent shoppers. Live URL: https://aldeewancollection.com/ | GitHub: https://github.com/Hamzaviour/Al-Deewan-Website`,
    keywords: ["aldeewan", "al-deewan", "fashion", "e-commerce", "ecommerce website", "retail", "case study"],
    url: "/work",
    actionText: "View Al-Deewan Case Study",
  },
  {
    id: "project-optionpackaging",
    category: "project",
    title: "Option Packaging (3D WebGL Configurator)",
    content: `B2B manufacturing platform with interactive browser-based WebGL 3D box configurator and automated dieline quoting. Impact: 10x quoting acceleration, 100% pricing precision, $2M+ pipeline automated. Live URL: https://optionpackaging.com/ | GitHub: https://github.com/Hamzaviour/optionpackaging`,
    keywords: ["option packaging", "optionpackaging", "packaging", "3d configurator", "webgl", "quoting engine", "case study"],
    url: "/work",
    actionText: "View Option Packaging Case Study",
  },
  {
    id: "project-xecureai",
    category: "project",
    title: "XecureAI (Cybersecurity & AI Risk Governance)",
    content: `Enterprise AI governance and threat telemetry portal. Built with Kafka streaming, Next.js Edge Runtime, and SOC2 compliance monitoring. Impact: <12ms alert latency, 5M+ daily event throughput, 99.99% availability. Live URL: https://xecureai.com/ | GitHub: https://github.com/Hamzaviour/XecureAi`,
    keywords: ["xecureai", "xecure", "cybersecurity", "grc", "ai governance", "soc 2", "case study"],
    url: "/work",
    actionText: "View XecureAI Case Study",
  },
  {
    id: "project-curecmsolution",
    category: "project",
    title: "CureCMS Solution (Healthcare & Medical Billing)",
    content: `AI-powered revenue cycle management (RCM) and clinic operations platform. HIPAA-compliant with automated medical coding validation. Impact: 99.2% claim accuracy, 14-day reimbursement cycle, 22 hrs/week saved. Live URL: https://curercmsolution.com/ | GitHub: https://github.com/Hamzaviour/Curecmsolution`,
    keywords: ["curecms", "curecmsolution", "healthcare", "medical billing", "rcm", "hipaa", "case study"],
    url: "/work",
    actionText: "View CureCMS Case Study",
  },
  {
    id: "project-echosense",
    category: "project",
    title: "EchoSense AI (Real-Time Crisis NLP Streaming)",
    content: `Distributed real-time crisis NLP streaming pipeline built with Apache Kafka, Spark NLP, Flask, PyTorch, and ChromaDB. Processes 50,000 events/sec with <18ms latency and 97.8% triage accuracy. Live Demo: https://hamzavelous-echosense-ai.hf.space/login`,
    keywords: ["echosense", "echosense ai", "kafka project", "crisis nlp", "spark streaming", "ml project"],
    url: "/work",
    actionText: "View EchoSense Demo",
  },
  {
    id: "project-marginalia",
    category: "project",
    title: "Marginalia (arXiv AI Paper Synthesis Companion)",
    content: `AI research companion that searches, synthesizes, and grounds scientific literature from 2M+ arXiv papers with verified inline citations and vector trees. Live Demo: https://marginalia-ochre-nu.vercel.app/chat | GitHub: https://github.com/Hamzaviour/Marginalia`,
    keywords: ["marginalia", "arxiv", "paper synthesis", "scientific literature", "research assistant", "rag project"],
    url: "/work",
    actionText: "View Marginalia Demo",
  },
  {
    id: "project-sentiment-analyzer",
    category: "project",
    title: "Sentiment Analyzer (Multimodal Opinion Mining)",
    content: `AI text classification and opinion mining platform using fine-tuned transformers on FastAPI. Features <25ms inference latency and 0.96 classification F1 score. Live Demo: https://huaweisentiment.vercel.app/ | GitHub: https://github.com/Hamzaviour/Sentiment-Analyzer`,
    keywords: ["sentiment analyzer", "opinion mining", "nlp classification", "fastapi", "hugging face"],
    url: "/work",
    actionText: "View Sentiment Analyzer",
  },
  {
    id: "project-cyberbrainids",
    category: "project",
    title: "CyberBrain IDS (Network Anomaly Detection & SOC RAG)",
    content: `Intrusion Detection System with live packet capture (PyShark), hybrid Random Forest + XGBoost anomaly classification, and ChromaDB RAG for MITRE playbooks. 99.4% detection rate, 100k packets/sec. Live Demo: https://cybervenoms.netlify.app/ | GitHub: https://github.com/Hamzaviour/CyberBrainIDS`,
    keywords: ["cyberbrain", "cyberbrainids", "intrusion detection", "ids", "anomaly detection", "soc dashboard"],
    url: "/work",
    actionText: "View CyberBrain IDS",
  },
  {
    id: "project-intelligent-support",
    category: "project",
    title: "Intelligent Support Engine (LangGraph Multi-Agent)",
    content: `Autonomous multi-agent customer support engine using LangGraph and FastAPI. Delivers real-time ticket triage, intent routing, and 68% autonomous issue resolution. GitHub: https://github.com/Hamzaviour/Intelligent_Support_Engine`,
    keywords: ["intelligent support engine", "langgraph", "support agent", "multi-agent support", "customer support ai"],
    url: "/work",
    actionText: "View Support Engine",
  },
  {
    id: "project-knowly",
    category: "project",
    title: "Knowly (Enterprise Document AI & Research)",
    content: `Hybrid semantic document search and multi-agent research platform. Hierarchical document chunking, layout-aware OCR, and Qdrant/ChromaDB RAG ingesting 100+ pages/min with 99.1% precision. GitHub: https://github.com/Hamzaviour/Knowly`,
    keywords: ["knowly", "document ai", "semantic search", "pdf analysis", "ocr rag"],
    url: "/work",
    actionText: "View Knowly",
  },
  {
    id: "project-deewan-pos",
    category: "project",
    title: "Al-Deewan POS & ERP System",
    content: `AI enterprise point-of-sale ERP with offline-first SQLite WAL mode, real-time barcode scanning, double-entry accounting, and Cloudflare tunnel remote sync. GitHub: https://github.com/Hamzaviour/Deewan-POS-System`,
    keywords: ["deewan pos", "pos system", "erp", "electron", "accounting software"],
    url: "/work",
    actionText: "View POS System",
  },

  // ── 8. Careers & Culture ─────────────────────────────────────────────────────
  {
    id: "careers-hiring",
    category: "careers",
    title: "Careers & Open Engineering Roles",
    content: `We are hiring remote engineers who take pride in their craft:
- Senior AI & LLM Systems Engineer (LangGraph, Qdrant, vLLM)
- Distributed Systems & Kafka Architect (Kafka clusters, Spark streaming)
- Full-Stack Next.js 15 Engineer (React 19, TypeScript, Edge)
- Lead Machine Learning Researcher (Model fine-tuning, LoRA)
Apply at https://www.whizzlylab.com/careers or email whizzlylab@gmail.com.`,
    keywords: ["careers", "jobs", "hiring", "work at whizzly", "open roles", "apply", "engineer jobs"],
    url: "/careers",
    actionText: "Explore Open Roles",
  },

  // ── 9. FAQs & Engagement Process ─────────────────────────────────────────────
  {
    id: "faq-engagement-process",
    category: "faq",
    title: "Engagement Process & Timelines",
    content: `Our engagement workflow moves fast in 4 phases:
1. Architecture Scoping Call: 15–30 min technical review and fixed-milestone blueprint.
2. Rapid Sprint Delivery: Working staging previews delivered within 3–7 business days.
3. Hardening & Testing: Security audits, latency optimization, and automated eval benchmarks.
4. Production Handover: 100% code transfer, Docker/CI-CD setup, and 30 days post-launch support.`,
    keywords: ["process", "how it works", "timeline", "how long", "steps", "onboarding", "delivery"],
    url: "/about",
    actionText: "How We Build",
  },
];
