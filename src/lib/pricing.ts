export type PricingTier = {
  name: string;
  /** Lower bound in PKR (single value — format in the active currency at render time). */
  min: number;
  /** Upper bound in PKR. */
  max: number;
  features: string;
  delivery: string;
  featured?: boolean;
};

export type ServiceKey =
  | "web"
  | "ai"
  | "automation"
  | "mobile"
  | "analytics"
  | "vision"
  | "pipelines"
  | "solutions";

export type ServiceAddon = {
  label: string;
  /** Percentage uplift over the tier's max. */
  uplift: number;
};

export type ServicePricing = {
  key: ServiceKey;
  label: string;
  blurb: string;
  tiers: PricingTier[];
  /** Service-specific add-ons; falls back to generic ones if omitted. */
  addons?: ServiceAddon[];
};

export type InfraFee = {
  name: string;
  min: number;
  max: number;
  note: string;
};

/**
 * Market ranges per service (Whizzly Lab). `min`/`max` values are rendered
 * in the user's chosen currency (PKR or USD) via the currency context.
 */
export const SERVICE_PRICING: ServicePricing[] = [
  {
    key: "web",
    label: "Websites",
    blurb:
      "Marketing sites, CMS and e-commerce: from a portfolio page to an enterprise web app.",
    addons: [
      { label: "Content writing support", uplift: 0.06 },
      { label: "SEO optimization package", uplift: 0.05 },
      { label: "Priority / accelerated delivery", uplift: 0.15 },
    ],
    tiers: [
      {
        name: "Static Portfolio / Basic Business",
        min: 15_000,
        max: 60_000,
        features:
          "3 to 6 pages, contact form, mobile responsive, ideal for freelancers and small service startups",
        delivery: "2–4 weeks",
      },
      {
        name: "Standard Business CMS (WordPress)",
        min: 40_000,
        max: 150_000,
        features:
          "Dynamic layouts, premium themes, blog, interactive appointment setups",
        delivery: "4–8 weeks",
        featured: true,
      },
      {
        name: "Standard E-commerce Store",
        min: 80_000,
        max: 350_000,
        features:
          "WooCommerce or Shopify: cart, Easypaisa / JazzCash / bank gateways, basic inventory",
        delivery: "6–14 weeks",
      },
      {
        name: "Enterprise / Custom Web Application",
        min: 400_000,
        max: 1_500_000,
        features:
          "React / Node / Magento multi-vendor, ERP linkups, premium dashboards",
        delivery: "12–28+ weeks",
      },
    ],
  },
  {
    key: "ai",
    label: "AI & Machine Learning",
    blurb:
      "Chatbots, RAG knowledge bases, agentic workflows and custom model training for production.",
    addons: [
      { label: "Prompt engineering & fine-tuning", uplift: 0.12 },
      { label: "Data preparation & labeling", uplift: 0.10 },
      { label: "Priority / accelerated delivery", uplift: 0.15 },
    ],
    tiers: [
      {
        name: "AI Chatbot / Basic LLM Integration",
        min: 120_000,
        max: 350_000,
        features:
          "FAQ / support chatbot, prompt design, one integration, chat UI",
        delivery: "2–4 weeks",
      },
      {
        name: "RAG Knowledge Base / AI Agents",
        min: 350_000,
        max: 1_200_000,
        features:
          "Retrieval over your docs, LangChain agents, tool use, eval & guardrails",
        delivery: "4–10 weeks",
        featured: true,
      },
      {
        name: "Custom Model / LLM Platform",
        min: 1_200_000,
        max: 5_000_000,
        features:
          "Fine-tuned models, ML training, monitoring, retraining loops, scale",
        delivery: "10–24+ weeks",
      },
    ],
  },
  {
    key: "automation",
    label: "Automation",
    blurb:
      "Workflow automation, integrations and voice AI that remove manual busywork.",
    addons: [
      { label: "Multi-app integration", uplift: 0.10 },
      { label: "Error handling & monitoring", uplift: 0.08 },
      { label: "Priority / accelerated delivery", uplift: 0.15 },
    ],
    tiers: [
      {
        name: "Simple Workflow (n8n / Zapier)",
        min: 60_000,
        max: 200_000,
        features:
          "One workflow, 2–4 app integrations, alerts & logging",
        delivery: "1–3 weeks",
      },
      {
        name: "Standard Automation Stack",
        min: 200_000,
        max: 700_000,
        features:
          "Multi-step flows across CRM, data stores, messaging and AI services",
        delivery: "3–6 weeks",
        featured: true,
      },
      {
        name: "Complex Orchestration / Voice AI",
        min: 700_000,
        max: 2_500_000,
        features:
          "AWS orchestration, voice pipelines (Whisper / Deepgram / ElevenLabs), ops alerts",
        delivery: "6–14+ weeks",
      },
    ],
  },
  {
    key: "mobile",
    label: "Mobile Apps",
    blurb:
      "iOS & Android apps: React Native / Flutter products with APIs and admin panels.",
    addons: [
      { label: "Push notifications setup", uplift: 0.06 },
      { label: "App store optimization", uplift: 0.05 },
      { label: "Priority / accelerated delivery", uplift: 0.15 },
    ],
    tiers: [
      {
        name: "Basic Mobile App",
        min: 150_000,
        max: 400_000,
        features:
          "Single platform, 5–8 screens, simple backend or existing API",
        delivery: "4–8 weeks",
      },
      {
        name: "Standard App (API + Auth)",
        min: 400_000,
        max: 1_200_000,
        features:
          "Cross-platform, custom API, auth, payments, push notifications",
        delivery: "8–16 weeks",
        featured: true,
      },
      {
        name: "Complex / Enterprise App",
        min: 1_500_000,
        max: 5_000_000,
        features:
          "Multi-role apps, real-time features, integrations, admin dashboards",
        delivery: "16–32+ weeks",
      },
    ],
  },
  {
    key: "analytics",
    label: "Data Analytics",
    blurb:
      "Executive dashboards and BI in Power BI, Tableau and Looker Studio.",
    addons: [
      { label: "Data modeling & SQL layer", uplift: 0.08 },
      { label: "Scheduled report automation", uplift: 0.06 },
      { label: "Priority / accelerated delivery", uplift: 0.15 },
    ],
    tiers: [
      {
        name: "Executive Dashboard",
        min: 80_000,
        max: 250_000,
        features:
          "Single dashboard, 5–10 KPIs, one data source, scheduled refresh",
        delivery: "1–3 weeks",
      },
      {
        name: "Standard BI + ETL",
        min: 250_000,
        max: 800_000,
        features:
          "Multiple sources, ETL connectors, metric dictionary, reporting",
        delivery: "3–8 weeks",
        featured: true,
      },
      {
        name: "Enterprise Data Platform",
        min: 800_000,
        max: 3_000_000,
        features:
          "Warehouse setup, role-based dashboards, governance, team enablement",
        delivery: "8–20+ weeks",
      },
    ],
  },
  {
    key: "vision",
    label: "Computer Vision",
    blurb:
      "Object detection and classification for satellite, industrial and operational imagery.",
    addons: [
      { label: "Dataset curation & labeling", uplift: 0.12 },
      { label: "API deployment & integration", uplift: 0.10 },
      { label: "Priority / accelerated delivery", uplift: 0.15 },
    ],
    tiers: [
      {
        name: "Detection / Classification Model",
        min: 300_000,
        max: 900_000,
        features:
          "Curated dataset, trained YOLO / CNN model, basic inference endpoint",
        delivery: "4–10 weeks",
      },
      {
        name: "Standard Vision Pipeline",
        min: 900_000,
        max: 2_500_000,
        features:
          "Model + API, dashboard or alerting, dataset tooling, retraining loop",
        delivery: "8–16 weeks",
        featured: true,
      },
      {
        name: "Real-time / Industrial Vision",
        min: 2_500_000,
        max: 8_000_000,
        features:
          "Real-time streams, multi-camera, on-prem or cloud, monitoring & SLAs",
        delivery: "14–28+ weeks",
      },
    ],
  },
  {
    key: "pipelines",
    label: "Data Pipelines",
    blurb:
      "Kafka and Spark streams that turn raw events into real-time intelligence.",
    addons: [
      { label: "Real-time data validation", uplift: 0.08 },
      { label: "Monitoring & alerting setup", uplift: 0.06 },
      { label: "Priority / accelerated delivery", uplift: 0.15 },
    ],
    tiers: [
      {
        name: "Batch ETL Pipeline",
        min: 100_000,
        max: 300_000,
        features:
          "Scheduled data movement, transforms, error handling, observability",
        delivery: "2–5 weeks",
      },
      {
        name: "Streaming Pipeline (Kafka / Spark)",
        min: 300_000,
        max: 1_200_000,
        features:
          "Real-time events, stream → store → model paths, retries & SLAs",
        delivery: "5–12 weeks",
        featured: true,
      },
      {
        name: "Enterprise Real-time Platform",
        min: 1_200_000,
        max: 4_000_000,
        features:
          "High-volume streams, multi-tenant, HA, full observability & ops",
        delivery: "12–24+ weeks",
      },
    ],
  },
  {
    key: "solutions",
    label: "Business Solutions",
    blurb:
      "Vertical platforms for healthcare, compliance and e-commerce, engineered end-to-end.",
    addons: [
      { label: "Custom workflow configuration", uplift: 0.10 },
      { label: "Compliance & audit setup", uplift: 0.08 },
      { label: "Priority / accelerated delivery", uplift: 0.15 },
    ],
    tiers: [
      {
        name: "Basic Business Platform",
        min: 100_000,
        max: 300_000,
        features:
          "Scoped MVP, 5–10 core workflows, admin + user surfaces",
        delivery: "3–8 weeks",
      },
      {
        name: "Standard Vertical Product",
        min: 300_000,
        max: 1_200_000,
        features:
          "Full-stack delivery, AI-assisted ops, compliance-aware design",
        delivery: "8–20 weeks",
        featured: true,
      },
      {
        name: "Enterprise Vertical Platform",
        min: 1_200_000,
        max: 5_000_000,
        features:
          "Multi-tenant platform, integrations, audit trails, launch & iteration",
        delivery: "16–32+ weeks",
      },
    ],
  },
];

export function getServicePricing(key: ServiceKey) {
  return SERVICE_PRICING.find((s) => s.key === key) ?? SERVICE_PRICING[0];
}

/** Annual operational infrastructure (primarily applies to website projects). */
export const INFRASTRUCTURE_FEES: InfraFee[] = [
  {
    name: "Local domain (.pk)",
    min: 1_800,
    max: 2_500,
    note: "Often billed ~PKR 3,350–3,600 for a fixed 2-year cycle",
  },
  {
    name: "Global domain (.com)",
    min: 3_500,
    max: 5_000,
    note: "Standard international registration",
  },
  {
    name: "Shared business hosting",
    min: 4_500,
    max: 12_000,
    note: "Roughly PKR 375–1,000 / month for low-traffic sites",
  },
  {
    name: "Cloud / VPS hosting",
    min: 25_000,
    max: 120_000,
    note: "Heavy traffic / e-commerce on AWS, DigitalOcean, etc.",
  },
  {
    name: "SSL certificate",
    min: 2_500,
    max: 5_000,
    note: "Frequently bundled free by higher-tier hosts",
  },
];
