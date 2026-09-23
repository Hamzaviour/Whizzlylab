export interface JobPosition {
  id: string;
  title: string;
  department: "AI & ML" | "Full-Stack" | "Data & Cloud" | "Leadership" | "General";
  type: string;
  location: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  isFeatured?: boolean;
}

export interface StudioPerk {
  title: string;
  description: string;
  category: string;
}

export const CAREER_STATS = [
  { value: "100%", label: "Remote & Async", desc: "Work from wherever you produce your best thinking." },
  { value: "0", label: "Bureaucracy", desc: "Direct engineering collaboration without middlemen." },
  { value: "Top 5%", label: "Stack Standards", desc: "Next.js 15, Python, LangGraph, Kafka, PyTorch, vLLM." },
  { value: "Annual", label: "Learning Stipend", desc: "Budget for GPU compute, courses, books, and tooling." },
];

export const STUDIO_VALUES = [
  {
    title: "Production-Grade or Nothing",
    description: "We don't build toy prototypes. Every line of code, prompt pipeline, and vector index is engineered for high throughput, sub-second latency, and resilience.",
    badge: "Engineering First",
  },
  {
    title: "Extreme Ownership & Autonomy",
    description: "You own systems from architectural RFC to production telemetry. We give you context, resources, and trust with no micromanagement.",
    badge: "Self-Directed",
  },
  {
    title: "Radical Speed & Pragmatism",
    description: "We favor shipping working increments over endless deliberation. Test hypotheses against real users, iterate fast, and build enduring architecture.",
    badge: "High Velocity",
  },
  {
    title: "Continuous Craft Elevation",
    description: "The AI landscape evolves weekly. We experiment with frontier models, open-source weights, and emerging paradigms to stay at the cutting edge.",
    badge: "Always Learning",
  },
];

export const STUDIO_PERKS: StudioPerk[] = [
  {
    title: "Work From Anywhere",
    description: "100% remote. Flexible hours designed around your flow state and peak focus hours, not clock-in times.",
    category: "Flexibility",
  },
  {
    title: "Cutting-Edge Compute & Tooling",
    description: "Access to top frontier models, GPU clusters, Cursor/Copilot licenses, and premium developer tooling.",
    category: "Equipment",
  },
  {
    title: "Performance & Milestone Bonuses",
    description: "Direct financial upside tied to client project success, high-impact launches, and studio growth.",
    category: "Compensation",
  },
  {
    title: "Dedicated Learning Stipend",
    description: "Generous annual budget for books, research papers, specialized ML courses, and technical conferences.",
    category: "Growth",
  },
  {
    title: "High-Impact Portfolio Projects",
    description: "Build production systems for venture-backed startups, healthcare innovators, and cybersecurity giants.",
    category: "Impact",
  },
  {
    title: "Recharge & Wellness",
    description: "Flexible paid time off, mental recharge days, and respect for weekends and personal focus boundaries.",
    category: "Wellness",
  },
];

export const OPEN_POSITIONS: JobPosition[] = [
  {
    id: "senior-ai-llm-engineer",
    title: "Senior AI & LLM Systems Engineer",
    department: "AI & ML",
    type: "Full-Time",
    location: "100% Remote (Global)",
    experience: "4+ years",
    isFeatured: true,
    summary:
      "Design and deploy production-grade agentic workflows, multi-modal RAG systems, and low-latency LLM microservices handling tens of thousands of queries.",
    responsibilities: [
      "Architect stateful, multi-agent pipelines with LangGraph, LangChain, or custom orchestrators.",
      "Implement hybrid vector search, chunking strategies, cross-encoders, and semantic caching layers.",
      "Fine-tune open-weight models (Llama 3, Mistral, DeepSeek) and deploy them via vLLM or Modal with strict latency SLAs.",
      "Build rigorous automated evaluation suites (Ragas, TruLens) for hallucination detection and prompt regression tests.",
      "Work directly with founding teams and enterprise clients to define and deliver AI product features.",
    ],
    requirements: [
      "4+ years of software engineering experience with deep Python and FastAPI expertise.",
      "Demonstrated track record deploying LLM applications into high-availability production environments.",
      "Deep understanding of vector databases (pgvector, Pinecone, Qdrant) and semantic search algorithms.",
      "Strong background in token economics, streaming response architecture, and prompt engineering.",
      "Experience with Docker, cloud deployments (AWS/GCP), and CI/CD pipelines.",
    ],
    skills: ["Python", "PyTorch", "FastAPI", "LangChain", "RAG", "vLLM", "pgvector", "Docker"],
  },
  {
    id: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer (Next.js / TypeScript)",
    department: "Full-Stack",
    type: "Full-Time",
    location: "100% Remote (Global)",
    experience: "3+ years",
    isFeatured: true,
    summary:
      "Craft high-performance, visually stunning web applications, real-time dashboards, and robust API backends that interface seamlessly with our AI engines.",
    responsibilities: [
      "Lead frontend and full-stack development using Next.js 15 App Router, React 19, and TypeScript.",
      "Engineer intuitive, fluid user interfaces with TailwindCSS, Framer Motion, and custom micro-interactions.",
      "Design and implement secure RESTful and streaming WebSocket/SSE endpoints for real-time AI responses.",
      "Architect robust data models and relational schemas using PostgreSQL, Prisma, Drizzle, and Redis.",
      "Ensure sub-second page loads, 95+ Lighthouse scores, and pixel-perfect responsive layouts across devices.",
    ],
    requirements: [
      "3+ years building and scaling production web applications with Next.js and TypeScript.",
      "Strong aesthetic sensibility and pride in craft: typography, layout spacing, and animation physics.",
      "Solid understanding of server-side rendering (SSR), streaming responses, caching, and edge computing.",
      "Experience with modern authentication (NextAuth, Clerk), payment systems (Stripe), and PostgreSQL.",
      "Excellent communication and ability to work asynchronously with minimal supervision.",
    ],
    skills: ["Next.js", "TypeScript", "React", "TailwindCSS", "PostgreSQL", "Prisma", "Framer Motion"],
  },
  {
    id: "data-streaming-engineer",
    title: "Distributed Systems & Streaming Data Engineer",
    department: "Data & Cloud",
    type: "Full-Time",
    location: "100% Remote (Global)",
    experience: "3+ years",
    summary:
      "Build resilient, high-throughput streaming data backbones for real-time NLP classification, crisis alert systems, and enterprise data sync pipelines.",
    responsibilities: [
      "Construct and maintain scalable Kafka and Spark streaming architectures processing millions of daily events.",
      "Implement real-time feature stores, telemetry ingestion, and automated data quality checks.",
      "Provision and automate cloud infrastructure using Terraform, Kubernetes, and containerized microservices.",
      "Optimize query performance, partitioning schemes, and hybrid caching tiers across Redis and ClickHouse/PostgreSQL.",
      "Establish monitoring, alerting, and automated failover mechanisms across distributed clusters.",
    ],
    requirements: [
      "3+ years of experience with distributed message brokers (Apache Kafka, RabbitMQ) and stream processing (Spark / Flink).",
      "Proficiency in Python and/or Go, SQL, and distributed system design principles.",
      "Hands-on experience with cloud platforms (AWS/GCP), containerization (Docker, K8s), and infrastructure-as-code.",
      "Proven ability to debug concurrency issues, network partitions, and data pipeline bottlenecks.",
    ],
    skills: ["Apache Kafka", "Spark NLP", "Python", "Docker", "Kubernetes", "Redis", "AWS/GCP"],
  },
  {
    id: "ai-solutions-architect",
    title: "AI Solutions Architect & Tech Lead",
    department: "Leadership",
    type: "Full-Time / Contract",
    location: "100% Remote (Global)",
    experience: "5+ years",
    summary:
      "Act as the technical bridge between client vision and studio delivery, shaping architecture blueprints and leading high-velocity engineering squads.",
    responsibilities: [
      "Lead technical discovery workshops with clients, translating business requirements into scalable architectures.",
      "Draft comprehensive system design documents, API contracts, and delivery roadmaps.",
      "Provide technical mentorship, code review standards, and architectural guidance to studio engineers.",
      "Advise clients on AI governance, data privacy (HIPAA/GDPR), and enterprise cloud migration strategies.",
      "Participate in high-level client presentations and executive strategy briefings.",
    ],
    requirements: [
      "5+ years of software engineering experience with at least 2 years in tech leadership or systems architecture.",
      "Deep cross-disciplinary knowledge spanning full-stack web, cloud infrastructure, and modern AI/ML systems.",
      "Proven track record delivering 0-to-1 enterprise systems from inception to high-volume production.",
      "Exceptional technical writing, visual diagramming, and consultative communication skills.",
    ],
    skills: ["System Design", "Cloud Architecture", "AI Governance", "Leadership", "Technical Scoping"],
  },
  {
    id: "open-application",
    title: "Open Application / Engineering Fellowship",
    department: "General",
    type: "Flexible",
    location: "100% Remote (Global)",
    experience: "Any level",
    summary:
      "Don't see your specific role above? If you're a high-output builder, AI researcher, or design engineer who loves crafting extraordinary software, we'd love to hear from you.",
    responsibilities: [
      "Pitch us your unique craft and how you want to contribute to Whizzly Lab's production builds.",
      "Collaborate on cutting-edge internal prototypes, open-source projects, or specialized client initiatives.",
    ],
    requirements: [
      "A portfolio of shipped projects, open-source contributions, or real-world systems you've built.",
      "Self-driven curiosity, attention to detail, and a relentless focus on shipping high-quality code.",
    ],
    skills: ["Engineering Passion", "Craftsmanship", "Curiosity", "Autonomous Execution"],
  },
];
