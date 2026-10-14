/**
 * Whizzly Lab RAG Knowledge Base
 *
 * Two layers:
 *  1. Hand-written chunks (company, team, contact, process, FAQs, industries, policies).
 *  2. Chunks generated at module load from the site's own data files
 *     (services, pricing, projects, blog, careers), so the chatbot never drifts
 *     from what the website actually shows.
 *
 * Anything not in here is something the chatbot must NOT claim to know.
 */

import { SERVICES } from "@/lib/services";
import { SERVICE_PRICING, INFRASTRUCTURE_FEES } from "@/lib/pricing";
import { ALL_PROJECTS } from "@/lib/projectsData";
import { BLOG_POSTS } from "@/lib/blogData";
import {
  OPEN_POSITIONS,
  STUDIO_PERKS,
  STUDIO_VALUES,
  CAREER_STATS,
} from "@/lib/careers";

export type KnowledgeCategory =
  | "greeting"
  | "company"
  | "website"
  | "team"
  | "service"
  | "pricing"
  | "project"
  | "contact"
  | "careers"
  | "blog"
  | "industry"
  | "process"
  | "faq";

export interface KnowledgeChunk {
  id: string;
  category: KnowledgeCategory;
  title: string;
  content: string;
  keywords: string[];
  url?: string;
  actionText?: string;
  /** Suggested follow-up questions shown under the answer. */
  followUps?: string[];
}

const SITE = "https://www.whizzlylab.com";
const PHONE = "+1 (424) 451-0714";
const EMAIL = "whizzlylab@gmail.com";

// ── Currency helpers (site pricing is stored in PKR, shown in USD by default) ──
const PKR_PER_USD = 278; // same fallback rate the website's currency toggle uses

function fmtPkr(n: number): string {
  return `PKR ${n.toLocaleString("en-US")}`;
}
function fmtUsd(pkr: number): string {
  const usd = pkr / PKR_PER_USD;
  const rounded = usd >= 1000 ? Math.round(usd / 10) * 10 : Math.round(usd);
  return `$${rounded.toLocaleString("en-US")}`;
}
function range(min: number, max: number): string {
  return `${fmtUsd(min)} – ${fmtUsd(max)} (${fmtPkr(min)} – ${fmtPkr(max)})`;
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. HAND-WRITTEN CHUNKS
// ═══════════════════════════════════════════════════════════════════════════
const CORE_CHUNKS: KnowledgeChunk[] = [
  // ── Conversation ──────────────────────────────────────────────────────────
  {
    id: "general-greeting",
    category: "greeting",
    title: "Greeting & Welcome",
    content: `Hello! I'm Whizzly AI, the assistant for Whizzly Lab. I can tell you about our services (AI & RAG, web, mobile apps, automation, data pipelines, ML, computer vision, analytics, business solutions), pricing, past projects, the team, careers, or help you book a call. What would you like to know?`,
    keywords: ["hi", "hello", "hey", "hii", "heyy", "how are you", "greetings", "good morning", "good evening", "good afternoon", "what's up", "sup", "salam", "assalamualaikum", "hola"],
    followUps: ["What services do you offer?", "How much does a project cost?", "How do I book a call?"],
  },
  {
    id: "identity-who-are-you",
    category: "greeting",
    title: "Who is Whizzly AI (this chatbot)",
    content: `I'm Whizzly AI, the website assistant for Whizzly Lab. I answer questions about Whizzly Lab only: its services, pricing, projects, team, process, careers and how to get in touch. I can't answer questions unrelated to Whizzly Lab, and if something isn't in my knowledge base I'll say so and point you to the team.`,
    keywords: ["who are you", "what are you", "what can you do", "introduce yourself", "your name", "are you a bot", "are you human", "are you ai", "your purpose", "how can you help", "what can you help with", "help"],
    followUps: ["What services do you offer?", "Show me your past projects", "How do I contact the team?"],
  },
  {
    id: "smalltalk-thanks-bye",
    category: "greeting",
    title: "Thanks & Goodbye",
    content: `You're welcome! If you'd like to take things further, you can book a scoping call at ${SITE}/schedule, call ${PHONE}, or email ${EMAIL}. Have a great day!`,
    keywords: ["thanks", "thank you", "thx", "bye", "goodbye", "see you", "great", "awesome", "perfect", "cool", "ok thanks", "appreciate"],
    url: "/schedule",
    actionText: "Book a Call",
  },

  // ── Website ───────────────────────────────────────────────────────────────
  {
    id: "website-overview",
    category: "website",
    title: "The Whizzly Lab Website & Its Pages",
    content: `The official Whizzly Lab website is ${SITE} (whizzlylab.com). It is the studio's own platform, built with Next.js and WebGL/3D visuals. Main pages:
- Home (/): overview of the studio, services, industries, reviews and FAQs.
- Services (/services): all service lines with detail pages (e.g. /services/ai, /services/web-development).
- Work (/work): shipped projects with live demos; Case Studies (/case-studies).
- Pricing (/pricing): interactive pricing calculator with a PKR/USD toggle.
- About (/about): story, principles and the team.
- Blog (/blog): engineering articles.
- Careers (/careers): open roles.
- Contact (/contact) and Schedule (/schedule): reach the team or book a call.`,
    keywords: ["website", "site", "web site", "url", "link", "domain", "whizzlylab.com", "what is this website", "what is the website", "this website", "your website", "official website", "pages", "navigation", "menu", "sitemap", "where can i find", "home page"],
    url: "/",
    actionText: "Visit Homepage",
    followUps: ["What services do you offer?", "Show me your past projects", "How do I book a call?"],
  },

  // ── Company ───────────────────────────────────────────────────────────────
  {
    id: "company-overview",
    category: "company",
    title: "About Whizzly Lab",
    content: `Whizzly Lab is an AI engineering studio and full-stack software development collective. We design, build and deploy AI systems (RAG, agents, chatbots), machine learning models, real-time data pipelines (Kafka/Spark), web platforms, mobile apps, workflow automation, analytics dashboards, computer vision and custom business software, plus product design, GTM, growth and security/compliance support. We are remote-first, serve clients globally, and clients keep 100% ownership of the code and IP. Founder: Hamza Younas. Website: ${SITE}.`,
    keywords: ["whizzly", "whizzlylab", "whizzly lab", "about", "company", "studio", "agency", "what is whizzly lab", "what do you do", "what does whizzly do", "overview", "tell me about", "who is whizzly", "about us", "business"],
    url: "/about",
    actionText: "Read About Whizzly Lab",
    followUps: ["Who founded Whizzly Lab?", "What services do you offer?", "Where are you located?"],
  },
  {
    id: "company-philosophy",
    category: "company",
    title: "Engineering Principles & Values",
    content: `How Whizzly Lab works:
- Production-first: systems are built from day one for real traffic, security and compliance, not toy prototypes.
- Observability & guardrails: monitoring, evaluation benchmarks and hallucination guardrails on AI systems.
- Transparent agile cadence: working staging previews early, weekly demos, no bureaucracy.
- Speed & pragmatism: ship working increments, iterate with real users.
- Ownership: clients get 100% of source code, model weights, schemas and infrastructure configs with no vendor lock-in.`,
    keywords: ["philosophy", "principles", "standards", "values", "how you build", "why whizzly", "why choose", "why choose you", "why should i hire you", "what makes you different", "differentiator", "advantage", "quality", "approach", "mission"],
    url: "/about",
    actionText: "Our Engineering Principles",
    followUps: ["How does your process work?", "Do I own the code?", "Show me your past projects"],
  },
  {
    id: "company-location",
    category: "company",
    title: "Location, Operating Model & Timezones",
    content: `Whizzly Lab is a 100% remote-first, asynchronous engineering studio with no single physical office to visit. We work with clients across the USA, Canada, UK, Europe, UAE, Pakistan, Singapore and the wider North America, Europe, Middle East and Asia regions. Sprints can be structured around US Eastern/Pacific, GMT/BST and Asia-Pacific working hours. Calls are held online via Google Meet / Zoom.`,
    keywords: ["location", "located", "where are you", "where are you based", "office", "address", "headquarters", "hq", "country", "city", "remote", "timezone", "time zone", "based in", "visit", "pakistan", "usa", "global", "worldwide", "international"],
    url: "/contact",
    actionText: "Get in Touch",
    followUps: ["How do I book a call?", "How do you communicate during a project?"],
  },
  {
    id: "company-industries",
    category: "industry",
    title: "Industries We Serve",
    content: `Whizzly Lab has delivered for and designs solutions around these sectors:
- Healthcare & MedTech: HIPAA-aware platforms, private/zero-data-leakage RAG, de-identified data pipelines, revenue cycle management (e.g. CureCMS).
- FinTech & Payments: real-time Kafka/Spark event streaming, anomaly and fraud detection, audit-logged decisioning.
- E-Commerce & Retail: headless Next.js storefronts, semantic product search, cart-recovery agents, support automation (e.g. Al-Deewan Collection).
- Logistics & Fleet: IoT/telemetry streaming, predictive dispatch and ETA.
- Cybersecurity & Compliance: threat telemetry, AI governance, SOC 2 / ISO 27001 readiness (e.g. XecureAI, CyberBrain IDS).
- Manufacturing & Packaging: 3D configurators and automated quoting (e.g. Option Packaging).
- CTOs & tech founders: AI feature builds, engineering augmentation and architecture support.
If your industry isn't listed, ask via a scoping call; we scope custom work.`,
    keywords: ["industries", "industry", "sectors", "sector", "healthcare", "medical", "fintech", "finance", "banking", "ecommerce", "e-commerce", "retail", "logistics", "fleet", "supply chain", "manufacturing", "cybersecurity", "startups", "founders", "cto", "who do you work with", "clients", "do you work with", "experience in"],
    url: "/",
    actionText: "Explore Industries",
    followUps: ["Show me your healthcare work", "Do you build e-commerce stores?", "Book a scoping call"],
  },
  {
    id: "company-reviews-clients",
    category: "company",
    title: "Clients, Testimonials & Track Record",
    content: `Whizzly Lab has shipped 11+ production platforms and AI systems, including client websites Al-Deewan Collection, Option Packaging, XecureAI and CureCMS Solution, plus AI/ML systems EchoSense, Marginalia, Sentiment Analyzer, CyberBrain IDS, Intelligent Support Engine, Knowly and the Al-Deewan POS System. Client reviews and logos are on the homepage (${SITE}), and every project with a public demo is linked on the Work page (${SITE}/work).`,
    keywords: ["reviews", "testimonials", "clients", "client list", "trust", "track record", "references", "reputation", "proof", "experience", "years of experience", "how many projects", "customers", "logos", "rating"],
    url: "/work",
    actionText: "See Our Work",
    followUps: ["Show me your past projects", "How do I book a call?"],
  },

  // ── Team ──────────────────────────────────────────────────────────────────
  {
    id: "founder-hamza-younas",
    category: "team",
    title: "Founder: Hamza Younas",
    content: `Whizzly Lab was founded by Hamza Younas, Founder & Lead Systems Architect, specializing in Distributed AI, Neural Engines, Full-Stack Web Development, Workflow Automation and Autonomous AI Integration. He founded the studio to bridge the gap between fragile AI proofs-of-concept and mission-critical production systems, and personally oversees architecture decisions, code quality and client sprints. He architected flagship projects like EchoSense, Marginalia, CyberBrain IDS, Al-Deewan Collection and Option Packaging. GitHub: https://github.com/Hamzaviour`,
    keywords: ["hamza", "hamza younas", "younas", "founder", "ceo", "creator", "owner", "who founded", "who created", "who owns", "who runs", "who started", "who is the founder", "lead architect", "lead engineer", "boss", "head of company"],
    url: "/about",
    actionText: "Meet the Founder",
    followUps: ["Who else is on the team?", "Who is the CPO?", "Show me your past projects"],
  },
  {
    id: "team-umair-dogar",
    category: "team",
    title: "Chief Product Officer: Umair Dogar",
    content: `Umair Dogar is the Chief Product Officer (CPO) at Whizzly Lab. He owns product strategy, the roadmap, and alignment between client goals and engineering delivery, working alongside founder Hamza Younas and the core team.`,
    keywords: ["umair", "umair dogar", "dogar", "cpo", "chief product officer", "product officer", "head of product", "product strategy", "who is the cpo", "product head", "roadmap"],
    url: "/about",
    actionText: "View the Team",
    followUps: ["Who founded Whizzly Lab?", "Who else is on the team?"],
  },
  {
    id: "team-squad",
    category: "team",
    title: "The Whizzly Lab Team",
    content: `The Whizzly Lab team (as shown on the About page):
Inner core:
- Hamza Younas: Founder & Lead Systems Architect (distributed AI, neural engines, system architecture)
- Umair Dogar: Chief Product Officer (product strategy, roadmap, delivery alignment)
- Sarah Chen: Principal ML Researcher (transformer fine-tuning, RAG, embeddings)
- Marcus Webb: Distributed Systems Lead (Kafka streaming, telemetry)
- Jennifer Liu: Lead Full-Stack Architect (Next.js, cloud architecture, micro-frontends)
Outer orbit specialists:
- David Park: DevOps & Cloud Architect (Kubernetes, AWS, Terraform, CI/CD)
- Ayesha Rahman: AI Safety & Guardrails Lead (hallucination benchmarks, evals)
- Alexandre Moreau: Real-Time Systems Specialist (low-latency vector indexing, caching)
- Elena Rostova: WebGL & 3D Graphics Engineer (Three.js, GLSL shaders)
- Karan Mehta: Automation & Workflow Lead (n8n, voice AI, CRM integrations)`,
    keywords: ["team", "engineers", "squad", "staff", "employees", "who works here", "developers", "researchers", "members", "people", "sarah chen", "sarah", "marcus webb", "marcus", "jennifer liu", "jennifer", "david park", "david", "ayesha rahman", "ayesha", "alexandre moreau", "elena rostova", "karan mehta", "karan", "meet the team", "how many people", "team size"],
    url: "/about",
    actionText: "View the Team",
    followUps: ["Who founded Whizzly Lab?", "Who is the CPO?", "How do I book a call?"],
  },

  // ── Contact & Meetings ────────────────────────────────────────────────────
  {
    id: "contact-meeting-booking",
    category: "contact",
    title: "Book a Meeting / Call With the Team",
    content: `To meet or talk to the team:
- Book online: ${SITE}/schedule, a 1:1 technical scoping/discovery call of about 15–30 minutes via Google Meet or Zoom with a senior AI/software architect. You'll review your requirements, data, compliance needs, timeline and deliverables.
- Phone: ${PHONE} (tel:+14244510714)
- Email: ${EMAIL}
- Contact form: ${SITE}/contact
The team replies with concrete technical feedback within 4–12 hours (always under 24 hours).`,
    keywords: ["schedule", "meeting", "meet", "book", "book a call", "booking", "appointment", "consultation", "consult", "discovery call", "scoping call", "demo", "talk to", "speak to", "call you", "call me", "calendar", "slot", "available", "availability", "zoom", "google meet", "speak with someone", "talk with someone"],
    url: "/schedule",
    actionText: "Book Discovery Call",
    followUps: ["What happens during the call?", "How much does a project cost?", "Do you sign NDAs?"],
  },
  {
    id: "contact-details",
    category: "contact",
    title: "Contact Details: Phone, Email, WhatsApp, Form",
    content: `Reach Whizzly Lab:
- Phone / call: ${PHONE} (tel:+14244510714)
- Email: ${EMAIL}
- Contact form: ${SITE}/contact
- Book a call: ${SITE}/schedule
Response time: technical feedback within 4–12 hours, always under 24 hours. Inquiries are reviewed by lead engineering architects.`,
    keywords: ["contact", "contact us", "phone", "phone number", "number", "mobile number", "email", "email address", "mail", "whatsapp", "reach you", "reach out", "get in touch", "support", "customer support", "customer service", "help desk", "response time", "how fast do you reply", "reply"],
    url: "/contact",
    actionText: "Contact Us",
    followUps: ["How do I book a call?", "Where are you located?"],
  },
  {
    id: "social-channels",
    category: "contact",
    title: "Official Socials & Repositories",
    content: `Official Whizzly Lab channels:
- LinkedIn: https://www.linkedin.com/company/whizzly-lab
- GitHub (studio): https://github.com/Hamzaviour/whizzlylab
- GitHub (founder): https://github.com/Hamzaviour
- Instagram: https://www.instagram.com/whizzlylab/
- Facebook: https://www.facebook.com/profile.php?id=61592686831558`,
    keywords: ["socials", "social media", "linkedin", "github", "instagram", "facebook", "twitter", "x", "youtube", "links", "repo", "repository", "follow", "social"],
    url: "/contact",
    actionText: "Get in Touch",
  },

  // ── How to get started / service requests ─────────────────────────────────
  {
    id: "lead-get-started",
    category: "process",
    title: "How to Get Started / Request a Service",
    content: `To start a project with Whizzly Lab:
1. Tell us what you need. Share your business, the problem, and any deadline or budget. (You can describe it right here or via ${SITE}/contact.)
2. Book a 15–30 min scoping call: ${SITE}/schedule, or call ${PHONE}, or email ${EMAIL}.
3. Receive a fixed-scope proposal with milestones and an architecture blueprint.
4. Kick off: typically 50% upfront, 50% on staging sign-off. You own 100% of the code.
Useful details to share: what you want built, who the users are, existing tools/systems to integrate with, target launch date and rough budget. For an instant range, see the pricing calculator at ${SITE}/pricing.`,
    keywords: ["get started", "start a project", "start project", "hire", "hire you", "hire whizzly", "work with you", "work with us", "i want", "i need", "i would like", "looking for", "interested", "interested in your services", "need a service", "want this service", "for my business", "for my company", "for my startup", "my business", "my company", "my startup", "request a service", "order", "proposal", "get a quote", "free quote", "build me", "develop for me", "outsource", "engage", "onboard", "sign up", "next step", "next steps", "how do i start", "how to start", "how to hire"],
    url: "/schedule",
    actionText: "Start Your Project",
    followUps: ["How much will it cost?", "How long will it take?", "Do you sign NDAs?"],
  },
  {
    id: "lead-custom-requests",
    category: "service",
    title: "Custom / Unusual Requests: Can You Build X?",
    content: `Whizzly Lab builds custom software, so most product ideas can be scoped: web apps and websites, SaaS platforms, e-commerce stores, mobile apps (Flutter / React Native), AI chatbots and RAG assistants, AI agents, workflow automation, dashboards, data pipelines, ML models, computer vision and enterprise or healthcare platforms. If your idea doesn't clearly fit one service line, describe it in a scoping call (${SITE}/schedule) and the architects will confirm feasibility, scope and cost. We don't promise anything outside the services listed on this site without a scoping review.`,
    keywords: ["custom", "custom software", "bespoke", "my idea", "app idea", "startup idea", "saas idea", "possible", "is it possible", "feasible", "food delivery", "marketplace", "crm", "erp", "booking app", "chat app", "social app", "game", "blockchain", "something else", "other services"],
    url: "/schedule",
    actionText: "Discuss Your Idea",
    followUps: ["What services do you offer?", "How much does a project cost?", "Book a scoping call"],
  },

  // ── Process, delivery & policies ──────────────────────────────────────────
  {
    id: "process-engagement",
    category: "process",
    title: "Engagement Process (4 Phases)",
    content: `How a Whizzly Lab engagement runs:
1. Architecture & scope audit (week 0): 15–30 min scoping call to define requirements, data flows, latency targets and compliance needs. Output: fixed-scope proposal, milestone breakdown and architecture blueprint.
2. Rapid increment delivery (weeks 1–3): working staging previews early; weekly Loom/live walkthroughs and staging URLs.
3. Hardening & testing (weeks 3–5): load testing, hallucination evaluations for AI pipelines, security audits, edge caching.
4. Production handover & deployment: full source code transfer, GitHub handover, Docker configs, CI/CD setup and 30 days of post-launch support.
Timelines vary by scope: a targeted feature or pipeline 2–4 weeks, an end-to-end AI system 4–8 weeks, a full enterprise SaaS platform 2–4 months.`,
    keywords: ["process", "how it works", "how do you work", "workflow", "methodology", "steps", "phases", "onboarding", "delivery", "approach", "agile", "sprint", "stages", "what happens after", "what happens during", "after we sign", "kickoff"],
    url: "/about",
    actionText: "How We Build",
    followUps: ["How long does a project take?", "What do I get at handover?", "How does pricing work?"],
  },
  {
    id: "process-timeline",
    category: "process",
    title: "Project Timelines & Delivery Speed",
    content: `Typical delivery windows (from the pricing calculator):
- Static / business website: 2–4 weeks; CMS site: 4–8 weeks; e-commerce store: 6–14 weeks; enterprise web app: 12–28+ weeks.
- AI chatbot: 2–4 weeks; RAG knowledge base / agents: 4–10 weeks; custom model/LLM platform: 10–24+ weeks.
- Simple automation: 1–3 weeks; automation stack: 3–6 weeks; voice AI / complex orchestration: 6–14+ weeks.
- Mobile app: basic 4–8 weeks, standard 8–16 weeks, enterprise 16–32+ weeks.
- Dashboards: 1–3 weeks (executive) up to 8–20+ weeks (data platform).
General guide: a targeted feature or pipeline takes 2–4 weeks, an end-to-end AI system 4–8 weeks, a full enterprise SaaS 2–4 months. Working staging previews usually arrive within the first few weeks. An accelerated (priority) delivery add-on exists (+15%). The exact timeline is confirmed after the scoping call.`,
    keywords: ["how long", "timeline", "time", "duration", "how fast", "how soon", "deadline", "turnaround", "delivery time", "when will it be ready", "weeks", "months", "urgent", "rush", "asap", "mvp", "quick"],
    url: "/pricing",
    actionText: "View Pricing & Timelines",
    followUps: ["How much does it cost?", "Can you deliver faster?", "Book a scoping call"],
  },
  {
    id: "policy-ip-nda-security",
    category: "faq",
    title: "IP Ownership, NDAs, Security & Compliance",
    content: `- IP ownership: you own 100% of the source code, model weights, database schemas and infrastructure configs, transferred on milestone completion, with no vendor lock-in or retainer.
- NDAs: yes, we sign mutual NDAs before detailed architectural discovery or code access. Your IP, proprietary algorithms and datasets stay confidential.
- Security & compliance: we follow SOC 2 Type II readiness patterns, zero-trust network boundaries and HIPAA-compliant encryption standards, and offer SOC 2 / HIPAA / ISO 27001 readiness work.`,
    keywords: ["nda", "non disclosure", "non-disclosure", "confidential", "confidentiality", "ip", "intellectual property", "ownership", "who owns the code", "do i own", "own the code", "source code", "security", "secure", "privacy", "data privacy", "compliance", "soc 2", "soc2", "hipaa", "gdpr", "iso 27001", "lock-in", "vendor lock", "retainer", "safe"],
    url: "/about",
    actionText: "Learn More",
    followUps: ["How does your process work?", "How does pricing work?"],
  },
  {
    id: "policy-payment-terms",
    category: "pricing",
    title: "Payment Terms & Milestones",
    content: `Engagements are milestone-based: typically 50% upfront to start the architecture sprint and 50% on final staging delivery and sign-off. There are no hidden fees or surprise retainers; scope and milestones are fixed in the proposal after the scoping call. Which payment methods/gateways we accept for client invoices is agreed during proposal, so ask the team via ${SITE}/schedule or ${EMAIL}.`,
    keywords: ["payment", "payment terms", "pay", "paying", "deposit", "advance", "upfront", "50/50", "milestone", "milestones", "invoice", "billing", "installments", "installment", "refund", "payment method", "payment methods", "how do i pay", "hidden fees", "retainer"],
    url: "/pricing",
    actionText: "View Pricing",
    followUps: ["How much does a project cost?", "How long does it take?"],
  },
  {
    id: "policy-handover-support",
    category: "process",
    title: "Handover & Post-Launch Support",
    content: `At production handover you receive the full source code and GitHub repository, Docker configurations and CI/CD pipeline setup, deployed to your own cloud accounts, plus 30 days of post-launch support. Ongoing support or maintenance beyond the first 30 days is not detailed on the website, so it's agreed with the team during scoping (${SITE}/schedule).`,
    keywords: ["handover", "hand over", "support", "post launch", "post-launch", "maintenance", "after launch", "after delivery", "warranty", "bug fixes", "updates", "ongoing", "30 days", "hosting after", "what do i get", "deliverables"],
    url: "/schedule",
    actionText: "Discuss Support",
    followUps: ["How does your process work?", "Do I own the code?"],
  },
  {
    id: "policy-communication",
    category: "process",
    title: "Communication & Team Augmentation",
    content: `During active sprints we work in your preferred workspace (Slack, Discord, GitHub, Jira) with weekly live milestone demos and direct communication with lead engineers. Whizzly Lab works both as a standalone delivery partner and as engineering augmentation: we can embed into your CI/CD pipelines, code reviews and sprint planning alongside your in-house team.`,
    keywords: ["communication", "communicate", "slack", "discord", "jira", "updates", "progress", "weekly demo", "augment", "augmentation", "in-house", "existing team", "collaborate", "work with our team", "staff augmentation", "embed", "dedicated team", "pod"],
    url: "/schedule",
    actionText: "Talk to the Team",
    followUps: ["How does your process work?", "How do I book a call?"],
  },
  {
    id: "faq-tech-stack",
    category: "service",
    title: "Technologies & Tech Stack",
    content: `Whizzly Lab's main technologies:
- Frontend/web: Next.js (App Router), React, TypeScript, Tailwind CSS, Three.js/WebGL.
- Backend: Python (FastAPI, Flask), Node.js/Express, REST & GraphQL, WebSockets.
- Mobile: Flutter and React Native.
- AI/LLM: LangChain, LangGraph, LlamaIndex, OpenAI, Anthropic, Hugging Face, vLLM; vector DBs Qdrant, Pinecone, ChromaDB, Weaviate, pgvector.
- ML: PyTorch, TensorFlow, scikit-learn, MLflow, LoRA/QLoRA fine-tuning.
- Data: Apache Kafka, Spark/PySpark, Redis, ClickHouse, PostgreSQL, Snowflake, BigQuery.
- Automation/voice: n8n, Whisper, Deepgram, ElevenLabs, AWS Step Functions.
- BI: Power BI, Tableau, Looker Studio.
- Vision: YOLO, OpenCV, TorchVision.
- Cloud/DevOps: Docker, Kubernetes, AWS, Vercel, Cloudflare, Terraform, CI/CD.
- Design: Figma, design systems, Storybook.`,
    keywords: ["tech stack", "technology", "technologies", "stack", "tools", "frameworks", "languages", "which language", "python", "javascript", "react", "nextjs", "next.js", "node", "flutter", "react native", "aws", "docker", "kubernetes", "postgres", "database", "cloud", "wordpress", "shopify", "openai", "anthropic", "gpt", "llm models"],
    url: "/services",
    actionText: "View Services",
    followUps: ["What services do you offer?", "Show me your past projects"],
  },
  {
    id: "faq-ai-rag-explained",
    category: "service",
    title: "RAG, Chatbots & AI Agents (What We Build)",
    content: `Whizzly Lab builds production AI systems:
- AI chatbots / assistants: FAQ and support bots, custom chat UI, prompt design, integration with your tools (like the assistant you're talking to now, which is a RAG chatbot).
- RAG knowledge bases: retrieval over your own documents with hybrid BM25 + dense vector search (Qdrant, Pinecone, ChromaDB), cross-encoder re-ranking, verified citations and guardrails against hallucination.
- AI agents: multi-agent workflows with LangChain, LangGraph and LlamaIndex, tool use, human-in-the-loop escalation (e.g. Intelligent Support Engine: 68% autonomous resolution).
- Fine-tuning & evaluation: LoRA/QLoRA, eval suites for faithfulness and regression tests.
Pricing runs from a basic chatbot to enterprise multi-agent platforms (see the AI pricing tiers).`,
    keywords: ["rag", "retrieval augmented generation", "chatbot", "chat bot", "ai chatbot", "ai assistant", "assistant", "agents", "ai agent", "multi-agent", "langchain", "langgraph", "llamaindex", "vector database", "vector db", "embeddings", "knowledge base", "fine-tune", "fine tuning", "llm", "gpt", "generative ai", "copilot", "ai integration", "custom ai"],
    url: "/services/ai",
    actionText: "Explore AI & RAG",
    followUps: ["How much does an AI chatbot cost?", "Show me your RAG projects", "Book a scoping call"],
  },
  {
    id: "faq-mobile-apps",
    category: "service",
    title: "Mobile App Development (iOS & Android)",
    content: `Whizzly Lab builds iOS and Android mobile apps with Flutter and React Native, including APIs, authentication, payments, push notifications and admin dashboards. Pricing tiers: Basic app (single platform, 5–8 screens), Standard app (cross-platform with API, auth, payments, push), and Complex/Enterprise (multi-role, real-time, integrations, admin). See the mobile pricing details and timelines in the pricing chunk, or the Development service page.`,
    keywords: ["mobile app", "mobile apps", "app development", "android", "ios", "iphone", "flutter", "react native", "cross platform", "app store", "play store", "build an app", "make an app", "mobile application", "apps"],
    url: "/services/development",
    actionText: "Explore Development",
    followUps: ["How much does a mobile app cost?", "How long does an app take?", "Book a scoping call"],
  },
  {
    id: "faq-websites-ecommerce",
    category: "service",
    title: "Websites, E-Commerce & Web Apps",
    content: `Whizzly Lab builds business and portfolio websites, CMS sites (WordPress), e-commerce stores (WooCommerce/Shopify or headless Next.js, with Stripe and local gateways like Easypaisa/JazzCash/bank), and custom web applications and SaaS platforms (React/Next.js, Node, FastAPI, admin dashboards, multi-tenant roles, ERP links). Example: Al-Deewan Collection, a headless Next.js luxury fashion store with +42% conversion lift and 0.7s page loads. Add-ons: SEO optimization, content writing support, priority delivery. Hosting and domain costs are paid directly to the provider (see infrastructure costs).`,
    keywords: ["website", "build a website", "make a website", "website development", "web development", "ecommerce", "e-commerce", "online store", "shop", "shopify", "woocommerce", "wordpress", "landing page", "portfolio website", "business website", "web app", "saas", "seo", "redesign", "website redesign", "cms", "next.js website"],
    url: "/services/web-development",
    actionText: "Explore Web Development",
    followUps: ["How much does a website cost?", "Show me Al-Deewan Collection", "How long does a website take?"],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 2. GENERATED CHUNKS (from the website's own data files)
// ═══════════════════════════════════════════════════════════════════════════

// ── Services ────────────────────────────────────────────────────────────────
const SERVICE_EXTRA_KEYWORDS: Record<string, string[]> = {
  "web-development": ["website", "web app", "next.js", "react", "frontend", "backend"],
  "machine-learning": ["ml", "model training", "deep learning", "pytorch", "mlops", "hugging face"],
  ai: ["rag", "chatbot", "llm", "agents", "langchain", "generative ai", "ai integration"],
  automation: ["n8n", "zapier", "voice ai", "workflow", "integrations", "whisper", "elevenlabs", "automate"],
  "data-analytics": ["power bi", "tableau", "looker", "dashboard", "bi", "reports", "kpi", "etl"],
  "business-solutions": ["healthcare", "compliance", "saas", "enterprise platform", "vertical", "hipaa"],
  "computer-vision": ["cv", "yolo", "object detection", "opencv", "image", "video", "satellite"],
  "data-pipelines": ["kafka", "spark", "pyspark", "streaming", "etl", "real-time", "event"],
  "product-design": ["ui", "ux", "design", "figma", "design system", "prototype", "wireframes"],
  development: ["app development", "mobile app", "flutter", "react native", "api", "microservices", "devops"],
  "gtm-strategy": ["gtm", "go to market", "marketing strategy", "positioning", "launch", "pricing strategy"],
  "ai-transformation": ["ai strategy", "enterprise ai", "digital transformation", "fine-tuned", "agents", "guardrails"],
  "growth-marketing": ["marketing", "seo", "ads", "cro", "growth", "programmatic seo", "paid ads", "lead generation"],
  "security-compliance": ["security", "soc 2", "hipaa", "iso 27001", "penetration test", "pentest", "zero trust", "compliance"],
};

const SERVICE_PRICING_KEY: Record<string, string> = {
  "web-development": "web",
  ai: "ai",
  automation: "automation",
  development: "mobile",
  "data-analytics": "analytics",
  "computer-vision": "vision",
  "data-pipelines": "pipelines",
  "business-solutions": "solutions",
  "machine-learning": "ai",
  "ai-transformation": "ai",
};

const SERVICE_CHUNKS: KnowledgeChunk[] = SERVICES.map((s) => {
  const priceKey = SERVICE_PRICING_KEY[s.slug];
  const priceNote = priceKey
    ? `\nPricing for this area: see the "${SERVICE_PRICING.find((p) => p.key === priceKey)?.label}" tiers (${SITE}/pricing).`
    : `\nPricing for this area isn't listed in the public calculator; the team quotes it after a scoping call (${SITE}/schedule).`;
  return {
    id: `service-${s.slug}`,
    category: "service" as const,
    title: `Service: ${s.title}`,
    content: `${s.title}: ${s.headline}
${s.short}
${s.body.join(" ")}
Deliverables: ${s.deliverables.join("; ")}.
Tech stack: ${s.stack.join(", ")}.
Page: ${SITE}/services/${s.slug}${priceNote}`,
    keywords: [s.title.toLowerCase(), s.slug.replace(/-/g, " "), ...(SERVICE_EXTRA_KEYWORDS[s.slug] ?? []), ...s.stack.map((t) => t.toLowerCase())],
    url: `/services/${s.slug}`,
    actionText: `Explore ${s.title}`,
    followUps: [
      `How much does ${s.title.toLowerCase()} cost?`,
      "Show me related projects",
      "Book a scoping call",
    ],
  };
});

const SERVICES_OVERVIEW: KnowledgeChunk = {
  id: "services-overview",
  category: "service",
  title: "All Services Overview",
  content: `Whizzly Lab offers ${SERVICES.length} service lines (${SITE}/services):
${SERVICES.map((s) => `- ${s.title}: ${s.short.split(/(?<=\.)\s/)[0]}`).join("\n")}
Pricing is listed publicly for: Websites, AI & Machine Learning, Automation, Mobile Apps, Data Analytics, Computer Vision, Data Pipelines and Business Solutions. Design, GTM, growth marketing and security/compliance engagements are scoped on a call.`,
  keywords: ["services", "service", "what services", "what do you offer", "what do you provide", "offerings", "capabilities", "what can you build", "solutions", "what do you do", "list of services", "all services", "products", "expertise", "specialize", "specialization", "skills", "areas"],
  url: "/services",
  actionText: "Browse All Services",
  followUps: ["How much do your services cost?", "Show me your past projects", "Book a scoping call"],
};

// ── Pricing ─────────────────────────────────────────────────────────────────
const PRICING_CHUNKS: KnowledgeChunk[] = SERVICE_PRICING.map((p) => ({
  id: `pricing-${p.key}`,
  category: "pricing" as const,
  title: `Pricing: ${p.label}`,
  content: `${p.label} pricing (USD approx., converted at ~${PKR_PER_USD} PKR/USD; PKR amounts shown on the site):
${p.tiers.map((t) => `- ${t.name}: ${range(t.min, t.max)}. ${t.features}. Delivery: ${t.delivery}.`).join("\n")}
${p.addons ? `Optional add-ons (uplift on top of the tier): ${p.addons.map((a) => `${a.label} +${Math.round(a.uplift * 100)}%`).join("; ")}.` : ""}
These are market ranges; the exact quote depends on scope and is confirmed after a scoping call. Use the interactive calculator at ${SITE}/pricing.`,
  keywords: [p.label.toLowerCase(), p.key, "price", "cost", "pricing", "how much", "rate", "quote", "budget", "estimate", "charges", "fee", ...p.tiers.map((t) => t.name.toLowerCase())],
  url: "/pricing",
  actionText: "Open Pricing Calculator",
  followUps: ["How do payments work?", "How long will it take?", "Book a scoping call"],
}));

const PRICING_OVERVIEW: KnowledgeChunk = {
  id: "pricing-overview",
  category: "pricing",
  title: "Pricing Overview (All Services)",
  content: `Whizzly Lab publishes transparent starting ranges (USD approx.; the site's pricing page lets you switch between USD and PKR with a live exchange rate):
${SERVICE_PRICING.map((p) => {
    const min = Math.min(...p.tiers.map((t) => t.min));
    const max = Math.max(...p.tiers.map((t) => t.max));
    return `- ${p.label}: ${fmtUsd(min)} – ${fmtUsd(max)} (${fmtPkr(min)} – ${fmtPkr(max)})`;
  }).join("\n")}
Each service has 3 tiers (starter, standard, enterprise), delivery estimates and optional add-ons, all on ${SITE}/pricing. Payment is milestone-based (typically 50% upfront, 50% on sign-off) with 100% IP ownership and no hidden fees. Final quotes are fixed after a scoping call.`,
  keywords: ["pricing", "price", "prices", "cost", "costs", "how much", "rate", "rates", "quote", "budget", "fees", "charges", "packages", "package", "plans", "tiers", "affordable", "cheap", "expensive", "estimate", "starting price", "usd", "pkr", "dollars", "rupees", "currency", "calculator", "what do you charge", "pricing page"],
  url: "/pricing",
  actionText: "Open Pricing Calculator",
  followUps: ["How much does a website cost?", "How much does an AI chatbot cost?", "How do payments work?"],
};

const PRICING_INFRA: KnowledgeChunk = {
  id: "pricing-infrastructure",
  category: "pricing",
  title: "Infrastructure & Running Costs (Domain, Hosting)",
  content: `Annual running costs, paid directly to the provider (mainly for website projects):
${INFRASTRUCTURE_FEES.map((f) => `- ${f.name}: ${range(f.min, f.max)} per year. ${f.note}.`).join("\n")}
These are separate from the development fee and billed to your own cloud accounts.`,
  keywords: ["domain", "hosting", "infrastructure", "server", "cloud costs", "running cost", "annual cost", "yearly cost", "maintenance cost", "monthly cost", "ssl", "vercel", "aws cost", "database cost"],
  url: "/pricing",
  actionText: "View Pricing",
};

// ── Projects ────────────────────────────────────────────────────────────────
const PROJECT_ALIASES: Record<string, string[]> = {
  aldeewan: ["al-deewan", "al deewan", "aldeewan", "deewan collection", "fashion store"],
  optionpackaging: ["option packaging", "optionpackaging", "3d configurator", "dieline"],
  xecureai: ["xecure", "xecure ai", "ai governance"],
  curecmsolution: ["curecms", "cure cms", "curecm", "medical billing", "rcm"],
  echosense: ["echo sense", "crisis nlp"],
  marginalia: ["arxiv", "research companion"],
  "sentiment-analyzer": ["sentiment", "opinion mining"],
  "deewan-pos": ["deewan pos", "pos system", "point of sale", "erp"],
  "intelligent-support-engine": ["support engine", "support agent", "customer support ai"],
  knowly: ["document search", "document ai"],
  cyberbrainids: ["cyberbrain", "cyber brain", "intrusion detection", "ids"],
  whizzlylab: ["whizzly website", "your own website", "agency platform"],
};

const PROJECT_CHUNKS: KnowledgeChunk[] = ALL_PROJECTS.map((p) => ({
  id: `project-${p.id}`,
  category: "project" as const,
  title: `Project: ${p.title}`,
  content: `${p.title} (${p.category === "website" ? "client website/platform" : "AI / ML system"}), ${p.domain}.
${p.tagline}. ${p.description}
Impact: ${p.impactMetrics.map((m) => `${m.label}: ${m.value}`).join("; ")}.
Challenge: ${p.challenge}
Solution: ${p.solution}
Tags: ${p.tags.join(", ")}.${p.liveUrl ? `\nLive: ${p.liveUrl}` : ""}${p.githubUrl ? `\nGitHub: ${p.githubUrl}` : ""}`,
  keywords: [p.title.toLowerCase(), p.id.replace(/-/g, " "), ...(PROJECT_ALIASES[p.id] ?? []), p.domain.toLowerCase(), ...p.tags.map((t) => t.toLowerCase()), "case study", "project"],
  url: "/work",
  actionText: `View ${p.title}`,
  followUps: ["Show me other projects", "Can you build something similar?", "Book a scoping call"],
}));

const EXTRA_PROJECT_CHUNK: KnowledgeChunk = {
  id: "project-legacy-case-studies",
  category: "project",
  title: "More Case Studies: COMPLYSECOPS & OXO Packaging",
  content: `Additional shipped platforms:
- COMPLYSECOPS: unified compliance and cybersecurity consulting platform with a built-in AI documentation assistant; replaced multiple disjointed tools and saved engineering teams 15+ hours per week. Live: https://complysecops.netlify.app/
- OXO Packaging: high-volume custom e-commerce with a quoting engine, dynamic packaging price calculator and wholesale order flows; handles 500+ daily bulk orders. Live: https://umairpackaging.netlify.app/`,
  keywords: ["complysecops", "oxo", "oxo packaging", "compliance platform", "wholesale", "packaging", "case study"],
  url: "/case-studies",
  actionText: "View Case Studies",
};

const PORTFOLIO_OVERVIEW: KnowledgeChunk = {
  id: "projects-overview",
  category: "project",
  title: "Portfolio Overview: Projects We've Built",
  content: `Whizzly Lab's shipped work (${SITE}/work):
Client websites & platforms:
${ALL_PROJECTS.filter((p) => p.category === "website").map((p) => `- ${p.title}: ${p.tagline}`).join("\n")}
AI / ML systems:
${ALL_PROJECTS.filter((p) => p.category === "ml-ai").map((p) => `- ${p.title}: ${p.tagline}`).join("\n")}
Also: COMPLYSECOPS (compliance SaaS) and OXO Packaging (wholesale e-commerce). Ask about any of them for metrics, tech stack and live demo links.`,
  keywords: ["projects", "project", "portfolio", "work", "our work", "past work", "previous work", "examples", "case studies", "case study", "what have you built", "what did you build", "shipped", "built", "demos", "demo", "samples", "showcase", "references", "live demos", "show me"],
  url: "/work",
  actionText: "View Our Work",
  followUps: ["Tell me about EchoSense", "Tell me about Al-Deewan Collection", "Can you build something similar?"],
};

// ── Blog ────────────────────────────────────────────────────────────────────
const BLOG_CHUNKS: KnowledgeChunk[] = BLOG_POSTS.map((b) => ({
  id: `blog-${b.slug}`,
  category: "blog" as const,
  title: `Blog: ${b.title}`,
  content: `Article: "${b.title}" (${b.category}, ${b.date}, ${b.readingTime}, by ${b.author.name}, ${b.author.role}).
${b.excerpt}
Key takeaways: ${b.takeaways.join(" ")}
Read it: ${SITE}/blog/${b.slug}`,
  keywords: [b.title.toLowerCase(), b.category.toLowerCase(), "blog", "article", ...b.tags.map((t) => t.toLowerCase())],
  url: `/blog/${b.slug}`,
  actionText: "Read Article",
}));

const BLOG_OVERVIEW: KnowledgeChunk = {
  id: "blog-overview",
  category: "blog",
  title: "Blog & Engineering Articles",
  content: `The Whizzly Lab blog (${SITE}/blog) publishes in-depth engineering articles:
${BLOG_POSTS.map((b) => `- ${b.title} (${b.category}, ${b.date})`).join("\n")}`,
  keywords: ["blog", "articles", "article", "posts", "post", "read", "insights", "news", "writing", "resources", "learn", "tutorials", "guides"],
  url: "/blog",
  actionText: "Read the Blog",
};

// ── Careers ─────────────────────────────────────────────────────────────────
const CAREER_CHUNKS: KnowledgeChunk[] = OPEN_POSITIONS.map((j) => ({
  id: `career-${j.id}`,
  category: "careers" as const,
  title: `Open Role: ${j.title}`,
  content: `${j.title} (${j.department}, ${j.type}, ${j.location}, ${j.experience} experience).
${j.summary}
Responsibilities: ${j.responsibilities.join(" ")}
Requirements: ${j.requirements.join(" ")}
Skills: ${j.skills.join(", ")}.
Apply: ${SITE}/careers or email ${EMAIL} with portfolio/GitHub and subject "Application: ${j.title}".`,
  keywords: [j.title.toLowerCase(), j.department.toLowerCase(), "job", "role", "hiring", "position", "vacancy", "career", ...j.skills.map((s) => s.toLowerCase())],
  url: "/careers",
  actionText: "Apply Now",
}));

const CAREER_OVERVIEW: KnowledgeChunk = {
  id: "careers-overview",
  category: "careers",
  title: "Careers, Culture & Perks",
  content: `Whizzly Lab hires remote engineers. Open roles (${SITE}/careers):
${OPEN_POSITIONS.map((j) => `- ${j.title} (${j.type}, ${j.experience})`).join("\n")}
Culture: ${CAREER_STATS.map((s) => `${s.value} ${s.label}`).join("; ")}.
Values: ${STUDIO_VALUES.map((v) => v.title).join("; ")}.
Perks: ${STUDIO_PERKS.map((p) => p.title).join("; ")}.
How to apply: use the careers page or email ${EMAIL} with your portfolio and GitHub, subject "Application: [Role Title]". Don't see your role? There is an open application / engineering fellowship.`,
  keywords: ["careers", "career", "jobs", "job", "hiring", "work at whizzly", "work for you", "join", "join the team", "open roles", "open positions", "vacancies", "vacancy", "apply", "application", "internship", "intern", "fellowship", "recruit", "employment", "salary", "remote job", "perks", "benefits", "culture", "freelance", "contract", "resume", "cv"],
  url: "/careers",
  actionText: "Explore Open Roles",
  followUps: ["What is the Senior AI engineer role?", "How do I apply?", "Is the job remote?"],
};

// ── FAQs (from the homepage FAQ section and docs) ───────────────────────────
const FAQ_CHUNKS: KnowledgeChunk[] = [
  {
    id: "faq-services",
    category: "faq",
    title: "FAQ: What services does Whizzly Lab offer?",
    content: `We offer AI engineering, machine learning, RAG multi-agent pipelines, real-time data pipelines (Kafka/Spark), full-stack web platforms, mobile apps, automation, computer vision, analytics and custom software systems, all production-grade and shipped to global clients. See all services at ${SITE}/services.`,
    keywords: ["what services", "services offered", "what do you offer", "offer"],
    url: "/services",
    actionText: "Browse Services",
  },
  {
    id: "faq-nda",
    category: "faq",
    title: "FAQ: Do you sign NDAs?",
    content: `Yes. We sign mutual NDAs before any sensitive project discussion. Your intellectual property, proprietary algorithms and datasets remain 100% confidential and secure.`,
    keywords: ["nda", "sign nda", "confidential", "secret", "idea stolen", "protect my idea"],
    url: "/schedule",
    actionText: "Book a Call",
  },
  {
    id: "faq-existing-team",
    category: "faq",
    title: "FAQ: Can you work with our existing team?",
    content: `Yes. We operate both as a standalone delivery partner and as specialized engineering augmentation, embedding into your CI/CD pipelines, code reviews and sprint planning.`,
    keywords: ["existing team", "in-house team", "augment", "collaborate", "work alongside", "join our team"],
    url: "/schedule",
    actionText: "Talk to the Team",
  },
  {
    id: "faq-discovery-call",
    category: "faq",
    title: "FAQ: What happens during the discovery call?",
    content: `The call is a 15–30 minute 1:1 technical scoping session (Google Meet/Zoom) with a senior AI/software architect, with no sales fluff. You'll go through your architecture and idea, data boundaries, compliance requirements, timeline and deliverables. Afterwards you receive a fixed-scope proposal with milestone breakdown and architecture blueprint. Book at ${SITE}/schedule.`,
    keywords: ["discovery call", "scoping call", "what happens", "during the call", "call about", "first meeting", "consultation", "prepare for call", "what to expect", "what to prepare"],
    url: "/schedule",
    actionText: "Book Discovery Call",
  },
  {
    id: "faq-free-consultation",
    category: "faq",
    title: "FAQ: Is the consultation free? Do you offer free trials or discounts?",
    content: `The website doesn't state whether the scoping call is free, and it doesn't mention free trials or discounts. For that, ask the team directly: ${SITE}/schedule, ${PHONE} or ${EMAIL}.`,
    keywords: ["free", "free consultation", "free call", "free trial", "free quote", "discount", "offer", "coupon", "promo", "cheaper", "negotiate", "lower price"],
    url: "/schedule",
    actionText: "Ask the Team",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// FINAL KNOWLEDGE BASE
// ═══════════════════════════════════════════════════════════════════════════
export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  ...CORE_CHUNKS,
  SERVICES_OVERVIEW,
  ...SERVICE_CHUNKS,
  PRICING_OVERVIEW,
  ...PRICING_CHUNKS,
  PRICING_INFRA,
  PORTFOLIO_OVERVIEW,
  ...PROJECT_CHUNKS,
  EXTRA_PROJECT_CHUNK,
  BLOG_OVERVIEW,
  ...BLOG_CHUNKS,
  CAREER_OVERVIEW,
  ...CAREER_CHUNKS,
  ...FAQ_CHUNKS,
];

/** Chunks always injected into the prompt so basic facts are never missing. */
export const CORE_FACTS = `Whizzly Lab: AI engineering studio and full-stack software collective. Website: ${SITE}. Founder: Hamza Younas (Lead Systems Architect). CPO: Umair Dogar. Remote-first, global. Phone: ${PHONE}. Email: ${EMAIL}. Book a call: ${SITE}/schedule. Contact form: ${SITE}/contact. Pricing: ${SITE}/pricing. Work: ${SITE}/work. Careers: ${SITE}/careers. Clients keep 100% IP. Payments are milestone-based (50% upfront / 50% on sign-off). Replies within 4–12 hours.`;
