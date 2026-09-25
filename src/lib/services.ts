export type ServicePage = {
  slug: string;
  title: string;
  short: string;
  tag: string;
  accentColor: string;
  image: string;
  headline: string;
  body: string[];
  deliverables: string[];
  stack: string[];
};

export const SERVICES: ServicePage[] = [
  {
    slug: "web-development",
    title: "Web Development",
    short:
      "High-performance Next.js and React web applications engineered with secure API layers, microservices, Docker containers, and scalable cloud deployments.",
    tag: "",
    accentColor: "#3b82f6",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    headline: "Product-grade web platforms that load fast and scale cleanly.",
    body: [
      "Whizzly Lab builds modern web products with React, Next.js, and hardened API layers, designed for performance, security, and maintainability.",
      "From marketing sites to authenticated dashboards, we ship interfaces that feel premium and backends that stay production-ready.",
    ],
    deliverables: [
      "Next.js / React frontends",
      "Flask / Node API layers",
      "Dockerized deployments",
      "Auth, CMS, and cloud hosting",
    ],
    stack: ["Next.js", "React", "TypeScript", "Flask", "Docker", "AWS"],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    short:
      "Bespoke machine learning engineering by Whizzly Lab. We train, evaluate, and deploy deep neural models, Hugging Face pipelines, and robust MLOps systems.",
    tag: "",
    accentColor: "#a855f7",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80",
    headline: "Models that train, evaluate, and ship into real systems.",
    body: [
      "We design supervised and deep learning pipelines with clear evaluation loops, from feature prep to Hugging Face deployment.",
      "Every model engagement starts with data quality, ends with measurable business outcomes, and stays monitorable after launch.",
    ],
    deliverables: [
      "Model training & evaluation",
      "Feature engineering pipelines",
      "Hugging Face deployments",
      "Monitoring & retraining loops",
    ],
    stack: ["Python", "PyTorch", "scikit-learn", "Hugging Face", "MLflow"],
  },
  {
    slug: "ai",
    title: "AI",
    short:
      "Production-grade agentic AI systems, multi-stage RAG pipelines, LangChain integrations, vector databases, and enterprise LLM applications with guardrails.",
    tag: "Popular",
    accentColor: "#00F0FF",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    headline: "Agentic AI and RAG systems built for production, not demos.",
    body: [
      "Whizzly Lab delivers retrieval-augmented generation, LangChain agents, and LLM apps that plug into your docs, tools, and workflows.",
      "We focus on grounding, latency, cost control, and safe tool use so AI features earn trust with real users.",
    ],
    deliverables: [
      "RAG knowledge bases",
      "Agentic tool workflows",
      "LangChain / ChromaDB stacks",
      "LLM eval & guardrails",
    ],
    stack: ["LangChain", "ChromaDB", "OpenAI", "Hugging Face", "Python"],
  },
  {
    slug: "automation",
    title: "Automation",
    short:
      "End-to-end workflow automation, n8n orchestrations, cloud microservices, and multimodal voice AI pipelines using Whisper, Deepgram, and ElevenLabs.",
    tag: "",
    accentColor: "#ec4899",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    headline: "Workflows that remove busywork and connect your stack.",
    body: [
      "From n8n graphs to AWS-orchestrated jobs, we automate handoffs between CRMs, data stores, messaging, and AI services.",
      "Voice pipelines with Whisper, Deepgram, and ElevenLabs turn speech into structured action across your product.",
    ],
    deliverables: [
      "n8n / Zapier-style workflows",
      "AWS job orchestration",
      "Voice AI pipelines",
      "Ops alerts & integrations",
    ],
    stack: ["n8n", "AWS", "Whisper", "Deepgram", "ElevenLabs"],
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    short:
      "Enterprise business intelligence dashboards in Power BI, Tableau, and Looker Studio. Reliable ETL data pipelines turning complex data into actionable metrics.",
    tag: "",
    accentColor: "#14b8a6",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    headline: "Dashboards that turn messy data into clear decisions.",
    body: [
      "We build analytics layers and executive dashboards in Power BI, Tableau, and Looker Studio, connected to the sources your team already trusts.",
      "Expect clean metrics definitions, reliable refresh, and visuals that leadership can act on without digging for answers.",
    ],
    deliverables: [
      "Executive KPI dashboards",
      "ETL / warehouse connectors",
      "Metric dictionaries",
      "Scheduled reporting",
    ],
    stack: ["Power BI", "Tableau", "Looker Studio", "SQL", "Python"],
  },
  {
    slug: "business-solutions",
    title: "Business Solutions",
    short:
      "Custom domain platforms for healthcare, compliance, and e-commerce. Production-grade software engineered with automated AI workflows and strict security.",
    tag: "Premium",
    accentColor: "#f43f5e",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80",
    headline: "Domain platforms for healthcare, compliance, and commerce.",
    body: [
      "We ship vertical products like CureCMS, COMPLYSECOPS, and OXO, blending product design, AI, and reliable engineering.",
      "Every engagement is scoped to your sector’s constraints: privacy, auditability, ops workflows, and customer experience.",
    ],
    deliverables: [
      "Domain discovery & architecture",
      "Full-stack product delivery",
      "AI-assisted operations",
      "Launch & iteration support",
    ],
    stack: ["Next.js", "AI agents", "Cloud", "Compliance-aware design"],
  },
  {
    slug: "computer-vision",
    title: "Computer Vision",
    short:
      "Custom computer vision pipelines, YOLO object detection, satellite image analysis, and deep neural inference systems engineered for operational scale.",
    tag: "",
    accentColor: "#8b5cf6",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
    headline: "Vision models that see what operators need to catch.",
    body: [
      "Whizzly Lab builds classification and detection systems for satellite, industrial, and operational imagery.",
      "We handle dataset curation, model training, and integration into dashboards or alerting so vision output becomes action.",
    ],
    deliverables: [
      "Object detection models",
      "Image classification pipelines",
      "Dataset tooling",
      "Inference APIs & alerts",
    ],
    stack: ["PyTorch", "OpenCV", "YOLO", "Hugging Face", "Python"],
  },
  {
    slug: "data-pipelines",
    title: "Data Pipelines",
    short:
      "Real-time distributed streaming architectures with Apache Kafka, Apache Spark, and PySpark for sub-second event processing, NLP, and AI pipelines.",
    tag: "New",
    accentColor: "#f59e0b",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    headline: "Real-time pipelines for events, NLP, and downstream AI.",
    body: [
      "We design Kafka and Spark pipelines that move data from producers to stores, models, and product surfaces with clear SLAs.",
      "Whether it’s EchoSense-style streaming NLP or batch warehouses, the goal is reliable, observable data flow.",
    ],
    deliverables: [
      "Kafka topics & consumers",
      "Spark / PySpark jobs",
      "Stream → store → model paths",
      "Observability & retries",
    ],
    stack: ["Kafka", "Spark", "PySpark", "Python", "Cloud"],
  },
  {
    slug: "product-design",
    title: "Product Design",
    short:
      "End-to-end product design, UX architecture, design systems, and rapid interactive prototyping for modern AI and enterprise SaaS.",
    tag: "Design Systems",
    accentColor: "#ec4899",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1400&q=80",
    headline: "Intuitive, high-converting product experiences engineered for complex digital workflows.",
    body: [
      "Whizzly Lab delivers full-lifecycle product design: from user research and journey mapping to design tokens and component libraries in Figma.",
      "We bridge the gap between design and engineering, delivering production-grade design systems with zero ambiguity during frontend implementation.",
    ],
    deliverables: [
      "Figma design systems & tokens",
      "UX journey maps & wireframes",
      "Interactive high-fidelity prototypes",
      "Component handoff & developer specs",
    ],
    stack: ["Figma", "Design Tokens", "Tailwind CSS", "Storybook", "Principle", "Framer"],
  },
  {
    slug: "development",
    title: "Development",
    short:
      "Robust, scalable products across web and mobile—from elegant Next.js frontends to reliable microservices and automated DevOps.",
    tag: "Full Stack",
    accentColor: "#3b82f6",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    headline: "Robust, production-grade applications that load fast, scale cleanly, and stay maintainable.",
    body: [
      "We engineer end-to-end web and mobile applications using modern frameworks like React, Next.js, TypeScript, and Python.",
      "From sub-second API layers and real-time WebSockets to Dockerized microservices, our code is tested, documented, and built to scale.",
    ],
    deliverables: [
      "Next.js / React web applications",
      "Scalable REST & GraphQL APIs",
      "Mobile apps (Flutter & React Native)",
      "Docker & CI/CD deployment pipelines",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "Python", "Docker", "AWS"],
  },
  {
    slug: "gtm-strategy",
    title: "GTM Strategy",
    short:
      "Data-driven go-to-market for SaaS and AI—clear positioning, competitive moats, pricing architecture, and repeatable growth loops.",
    tag: "Strategy & Growth",
    accentColor: "#f59e0b",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    headline: "Repeatable go-to-market loops designed to turn technical innovation into market leadership.",
    body: [
      "We formulate data-backed GTM playbooks that align product capabilities with high-value ICP segments, defensible pricing tiers, and distribution channels.",
      "From launch messaging and developer relations to post-launch analytics and churn reduction, our roadmaps drive sustained ARR expansion.",
    ],
    deliverables: [
      "ICP definition & market segmentation",
      "Value proposition & technical messaging",
      "Tiered pricing & packaging models",
      "Launch playbooks & funnel analytics",
    ],
    stack: ["HubSpot", "Segment", "PostHog", "Mixpanel", "Stripe", "Google Analytics"],
  },
  {
    slug: "ai-transformation",
    title: "AI Transformation",
    short:
      "Operationalize generative AI across your organization—autonomous agent workflows, custom fine-tuned LLMs, and enterprise RAG with compliance guardrails.",
    tag: "Enterprise AI",
    accentColor: "#00F0FF",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    headline: "Enterprise-grade AI systems that integrate directly into existing workflows with zero hallucination drift.",
    body: [
      "Whizzly Lab helps enterprise teams move beyond basic chat prompts into mission-critical autonomous agents, domain RAG pipelines, and fine-tuned models.",
      "We enforce strict observability, token cost controls, data privacy boundaries, and eval benchmarks so AI delivers measurable operational efficiency.",
    ],
    deliverables: [
      "Autonomous multi-agent systems",
      "Domain-specific RAG knowledge bases",
      "Model fine-tuning & evaluation suites",
      "Enterprise guardrails & compliance audits",
    ],
    stack: ["PyTorch", "LangChain", "Qdrant", "Hugging Face", "OpenAI", "LlamaIndex"],
  },
  {
    slug: "growth-marketing",
    title: "Growth Marketing",
    short:
      "High-velocity acquisition engines combining programmatic SEO, paid performance channels, and conversion rate optimization.",
    tag: "Performance",
    accentColor: "#10b981",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    headline: "Engineering-led growth engines that acquire high-intent users with predictable unit economics.",
    body: [
      "We build programmatic SEO architectures that index thousands of targeted landing pages, coupled with high-conversion landing page funnels.",
      "Our data-driven growth framework tests messaging, optimizes CAC/LTV ratios, and automates multi-channel retargeting.",
    ],
    deliverables: [
      "Programmatic SEO architecture",
      "Conversion rate optimization (CRO)",
      "Multi-channel paid ads funnels",
      "Attribution modeling & analytics",
    ],
    stack: ["Ahrefs", "Semrush", "Meta Ads", "Google Ads", "VWO", "Next.js"],
  },
  {
    slug: "security-compliance",
    title: "Security & Compliance",
    short:
      "Enterprise hardening and continuous governance—SOC 2 Type II readiness, zero-trust cloud perimeters, and automated penetration testing.",
    tag: "Security & SOC2",
    accentColor: "#6366f1",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80",
    headline: "Institutional-grade cloud perimeters and compliance automation built for enterprise scale.",
    body: [
      "We audit, harden, and continuously monitor cloud infrastructure to achieve SOC 2, HIPAA, and ISO 27001 readiness.",
      "From role-based access control (RBAC) and data encryption at rest/transit to automated secrets rotation and zero-trust VPC topology.",
    ],
    deliverables: [
      "SOC 2 Type II & HIPAA readiness audits",
      "Zero-trust cloud network architecture",
      "Automated penetration & vulnerability scans",
      "Secrets management & IAM hardening",
    ],
    stack: ["AWS IAM", "HashiCorp Vault", "Wiz", "Datadog", "Cloudflare", "Drata"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs() {
  return SERVICES.map((s) => s.slug);
}
