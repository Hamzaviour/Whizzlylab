/**
 * Whizzly Lab Hybrid RAG Retrieval Engine
 * Provides BM25 / semantic hybrid search over domain knowledge chunks
 * with grounded prompt construction and concise, to-the-point synthesis.
 */

import { KNOWLEDGE_BASE, KnowledgeChunk } from "./knowledge";

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he",
  "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "were",
  "will", "with", "i", "you", "we", "they", "me", "my", "your", "can", "do",
  "does", "tell", "show", "give", "please", "want", "need", "like", "how", "what",
]);

/**
 * Tokenizes and normalizes text for keyword & n-gram matching.
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));
}

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
  matchedKeywords: string[];
}

/**
 * Hybrid retrieval scoring with intelligent intent routing:
 * - Direct phrase & keyword matching in chunk.keywords (High weight)
 * - Title match bonus
 * - Content token overlap (TF-IDF style)
 * - Specific intent boosts (greetings, meetings, founder, pricing, projects)
 */
export function retrieveKnowledge(
  query: string,
  topK = 3
): RetrievalResult[] {
  const queryTokens = tokenize(query);
  const queryLower = query.toLowerCase();

  const scoredResults: RetrievalResult[] = KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    const matchedKeywords: string[] = [];

    // 1. Check exact phrase and keyword list matches
    for (const kw of chunk.keywords) {
      if (queryLower.includes(kw)) {
        score += 8.0;
        matchedKeywords.push(kw);
      } else {
        const kwTokens = tokenize(kw);
        const overlap = kwTokens.filter((t) => queryTokens.includes(t)).length;
        if (overlap > 0) {
          score += overlap * 2.5;
        }
      }
    }

    // 2. Title matching
    const titleTokens = tokenize(chunk.title);
    for (const token of queryTokens) {
      if (titleTokens.includes(token)) {
        score += 4.0;
      }
    }

    // 3. Content tokens overlap
    const contentTokens = tokenize(chunk.content);
    const contentTokensSet = new Set(contentTokens);
    for (const token of queryTokens) {
      if (contentTokensSet.has(token)) {
        score += 1.0;
      }
    }

    // 4. Intent detection boosts
    // Greetings intent
    if (
      (queryLower === "hi" ||
        queryLower === "hello" ||
        queryLower.startsWith("hi ") ||
        queryLower.startsWith("hello ") ||
        queryLower.includes("how are you") ||
        queryLower.includes("good morning") ||
        queryLower.includes("good evening") ||
        queryLower.includes("hey")) &&
      chunk.id === "general-greeting"
    ) {
      score += 25.0;
    }

    // Identity intent ("who are you", "what are you")
    if (
      (queryLower.includes("who are you") ||
        /\bwhat are you\b/.test(queryLower) ||
        queryLower.includes("what can you do") ||
        queryLower.includes("your purpose")) &&
      chunk.id === "identity-who-are-you"
    ) {
      score += 25.0;
    }

    // Meeting / Call booking intent
    if (
      (queryLower.includes("meet") ||
        queryLower.includes("meeting") ||
        queryLower.includes("book") ||
        queryLower.includes("call") ||
        queryLower.includes("schedule") ||
        queryLower.includes("calendar") ||
        queryLower.includes("demo") ||
        queryLower.includes("talk") ||
        queryLower.includes("contact") ||
        queryLower.includes("phone") ||
        queryLower.includes("number")) &&
      chunk.id === "contact-meeting-booking"
    ) {
      score += 20.0;
    }

    // Founder intent (Hamza Younas)
    if (
      (queryLower.includes("founder") ||
        queryLower.includes("hamza") ||
        queryLower.includes("who founded") ||
        queryLower.includes("who created") ||
        queryLower.includes("who owns") ||
        queryLower.includes("who started") ||
        queryLower.includes("ceo")) &&
      chunk.id === "founder-hamza-younas"
    ) {
      score += 22.0;
    }

    // Team intent
    if (
      (queryLower.includes("team") ||
        queryLower.includes("squad") ||
        queryLower.includes("engineers") ||
        queryLower.includes("who works here") ||
        queryLower.includes("developers") ||
        queryLower.includes("sarah chen") ||
        queryLower.includes("marcus webb")) &&
      chunk.id === "team-squad"
    ) {
      score += 20.0;
    }

    // Pricing intent
    if (
      (queryLower.includes("price") ||
        queryLower.includes("cost") ||
        queryLower.includes("rate") ||
        queryLower.includes("budget") ||
        queryLower.includes("how much") ||
        queryLower.includes("quote") ||
        queryLower.includes("tier")) &&
      chunk.id === "pricing-overview"
    ) {
      score += 18.0;
    }

    // Project matches
    if (queryLower.includes("aldeewan") && chunk.id === "project-aldeewan") score += 20.0;
    if (queryLower.includes("option packaging") && chunk.id === "project-optionpackaging") score += 20.0;
    if (queryLower.includes("xecure") && chunk.id === "project-xecureai") score += 20.0;
    if (queryLower.includes("curecms") && chunk.id === "project-curecmsolution") score += 20.0;
    if (queryLower.includes("echosense") && chunk.id === "project-echosense") score += 20.0;
    if (queryLower.includes("marginalia") && chunk.id === "project-marginalia") score += 20.0;
    if (queryLower.includes("sentiment") && chunk.id === "project-sentiment-analyzer") score += 20.0;
    if (queryLower.includes("cyberbrain") && chunk.id === "project-cyberbrainids") score += 20.0;

    return {
      chunk,
      score,
      matchedKeywords,
    };
  });

  // Sort descending by score
  scoredResults.sort((a, b) => b.score - a.score);

  const filtered = scoredResults.filter((r) => r.score > 0);
  if (filtered.length === 0) {
    return [scoredResults[0]];
  }

  return filtered.slice(0, topK);
}

/**
 * Builds the grounded system prompt with strict conciseness and to-the-point constraints.
 */
export function buildGroundedSystemPrompt(
  retrievedChunks: RetrievalResult[],
  currency: string = "USD"
): string {
  const contextText = retrievedChunks
    .map(
      (r, idx) => `[Source ${idx + 1}: ${r.chunk.title} (${r.chunk.url || ""})]
${r.chunk.content}`
    )
    .join("\n\n");

  return `You are Whizzly AI, the technical solutions architect assistant for Whizzly Lab.
Whizzly Lab is an elite AI engineering studio and full-stack software development collective. We design, architect, and deploy intelligent AI systems, autonomous multi-agent pipelines, RAG systems, workflow automation, scalable SaaS platforms, full-stack web development, mobile & web apps, digital products, and custom AI integration.

### STRICT OPERATIONAL GUIDELINES:
1. **BE SHORT AND TO THE POINT**:
   - Give direct, crisp answers. Keep your reply concise (typically 2 to 4 sentences or a compact 2-3 bullet summary).
   - NEVER write long introductory fluff or overwhelming walls of text. Get straight to the answer.
2. **GREETINGS & CASUAL QUESTIONS**:
   - For greetings ("hi", "hello", "hey", "how are you"): Reply warmly and concisely in 1-2 short sentences as Whizzly AI.
   - For identity ("who are you", "what can you do"): State who you are directly in 1-2 sentences.
3. **MEETINGS & BOOKING**:
   - When asked to meet, talk, or schedule: Always provide our calendar link (\`/schedule\` or https://whizzlylab.com/schedule) and phone number \`+1 (424) 451-0714\`.
4. **FOUNDER & TEAM**:
   - Founded by Hamza Younas, Lead Systems Architect.
   - Core team includes Sarah Chen (ML/RAG), Marcus Webb (Kafka), Jennifer Liu (Next.js), David Park (DevOps), and Ayesha Rahman (AI Guardrails).
5. **PRICING**:
   - Engineering rates are transparently quoted strictly in USD (from $300 for basic web to $5,000+ for enterprise clusters).
6. **BE GROUNDED IN CONTEXT**:
   - Rely strictly on the retrieved context below. Do not hallucinate capabilities or prices.

### RETRIEVED GROUNDING CONTEXT:
${contextText}
`;
}

/**
 * Deterministic local RAG fallback generator in case external LLM API is unavailable.
 * Delivers short, to-the-point, and precise answers based on matched intent.
 */
export function generateSmartFallbackReply(
  query: string,
  retrievedChunks: RetrievalResult[],
  currency: string = "USD"
): {
  reply: string;
  sources: { title: string; url?: string }[];
  suggestedQuestions: string[];
  actionCta?: { text: string; url: string; label: string };
} {
  const queryLower = query.toLowerCase().trim();
  const primary = retrievedChunks[0]?.chunk || KNOWLEDGE_BASE[0];
  const sources = retrievedChunks.map((r) => ({
    title: r.chunk.title,
    url: r.chunk.url,
  }));

  let reply = "";
  let suggestedQuestions: string[] = [];
  let actionCta = {
    text: "Discuss your project with our lead architects:",
    url: "/schedule",
    label: "📅 Book Discovery Call",
  };

  // 1. Greetings ("hi", "hello", "how are you")
  if (
    queryLower === "hi" ||
    queryLower === "hello" ||
    queryLower === "hey" ||
    queryLower.startsWith("hi ") ||
    queryLower.startsWith("hello ") ||
    queryLower.includes("how are you") ||
    queryLower.includes("good morning") ||
    queryLower.includes("good evening") ||
    queryLower.includes("how's it going")
  ) {
    reply = `Hello! I'm **Whizzly AI**, the technical solutions architect for Whizzly Lab. I'm doing great! How can I assist with your engineering, AI systems, or project roadmap today?`;
    suggestedQuestions = [
      "What services does Whizzly Lab provide?",
      "Can we schedule a discovery call?",
      "What are your project pricing rates in USD?",
      "Who founded Whizzly Lab?",
    ];
  }
  // 2. Identity ("who are you", "what are you")
  else if (
    queryLower.includes("who are you") ||
    /\bwhat are you\b/.test(queryLower) ||
    queryLower.includes("what can you do") ||
    queryLower.includes("your purpose")
  ) {
    reply = `I am **Whizzly AI**, the technical assistant for Whizzly Lab. I provide quick, to-the-point answers about our web development, workflow automation, RAG systems, SaaS platforms, apps, custom AI integration, pricing in USD, team, projects, and direct meeting booking.`;
    suggestedQuestions = [
      "Tell me about your RAG & AI services",
      "What are your pricing packages in USD?",
      "How do I book a meeting with the team?",
    ];
  }
  // 3. Meeting / Schedule / Contact / Phone / Email
  else if (
    queryLower.includes("meet") ||
    queryLower.includes("meeting") ||
    queryLower.includes("schedule") ||
    queryLower.includes("book") ||
    queryLower.includes("call") ||
    queryLower.includes("demo") ||
    queryLower.includes("talk") ||
    queryLower.includes("phone") ||
    queryLower.includes("contact") ||
    queryLower.includes("email")
  ) {
    reply = `You can book a 1:1 technical discovery call on our calendar at [**whizzlylab.com/schedule**](/schedule), call us directly at [**+1 (424) 451-0714**](tel:+14244510714), or email [**whizzlylab@gmail.com**](mailto:whizzlylab@gmail.com). We respond within 4–12 hours.`;
    actionCta = {
      text: "Schedule your 1:1 technical scoping session:",
      url: "/schedule",
      label: "📅 Open Live Calendar",
    };
    suggestedQuestions = [
      "What happens during the discovery call?",
      "What are your project pricing tiers in USD?",
      "Do you sign NDAs before discussions?",
    ];
  }
  // 4. Founder (Hamza Younas)
  else if (
    queryLower.includes("founder") ||
    queryLower.includes("hamza") ||
    queryLower.includes("who founded") ||
    queryLower.includes("who created") ||
    queryLower.includes("who owns") ||
    queryLower.includes("who started") ||
    queryLower.includes("ceo")
  ) {
    reply = `Whizzly Lab was founded by **Hamza Younas**, Lead Systems Architect specializing in Distributed AI, Neural Engines, Full-Stack Web Development, Workflow Automation, and Autonomous AI Integration. Hamza personally reviews technical architecture and code delivery for every client engagement. (GitHub: https://github.com/Hamzaviour)`;
    suggestedQuestions = [
      "Who else is on the engineering team?",
      "What projects has Hamza architected?",
      "How can I book a call with Hamza?",
    ];
  }
  // 5. Team & Squad
  else if (
    queryLower.includes("team") ||
    queryLower.includes("squad") ||
    queryLower.includes("who works here") ||
    queryLower.includes("engineers")
  ) {
    reply = `Our engineering squad is an elite collective led by **Hamza Younas** (Founder & Lead Architect), **Sarah Chen** (Principal ML Researcher), **Marcus Webb** (Kafka Distributed Systems Lead), **Jennifer Liu** (Lead Next.js Architect), **David Park** (DevOps & Cloud), and **Ayesha Rahman** (AI Safety & Guardrails).`;
    suggestedQuestions = [
      "How do you structure client engagements?",
      "Can we schedule a call with the team?",
      "What tech stacks do you specialize in?",
    ];
  }
  // 6. Pricing & Rates
  else if (
    queryLower.includes("price") ||
    queryLower.includes("cost") ||
    queryLower.includes("how much") ||
    queryLower.includes("rate") ||
    queryLower.includes("quote") ||
    queryLower.includes("budget")
  ) {
    reply = `Whizzly Lab offers transparent engineering rates strictly in **USD** with 100% IP ownership and 50/50 milestone billing:
- **Web Development**: $300 – $5,000+
- **AI & Multi-Agent RAG**: $600 – $5,000+
- **Kafka & Data Pipelines**: $800 – $6,000+
- **Machine Learning & MLOps**: $700 – $5,500+
- **Workflow Automation**: $250 – $2,500+

Full breakdown available on our [Pricing Page](/pricing).`;
    actionCta = {
      text: "Explore all tiers on our interactive pricing calculator:",
      url: "/pricing",
      label: "💰 View Pricing Calculator",
    };
    suggestedQuestions = [
      "What is included in the AI & RAG tier?",
      "How do 50/50 milestone payments work?",
      "How long does a typical 2-week MVP take?",
    ];
  }
  // 7. Specific Project Queries
  else if (queryLower.includes("echosense")) {
    reply = `**EchoSense AI** is our real-time crisis NLP streaming pipeline built with Apache Kafka, Spark NLP, PyTorch, and ChromaDB. It handles 50,000 events/sec with <18ms latency and 97.8% triage accuracy. (Demo: https://hamzavelous-echosense-ai.hf.space/login)`;
    suggestedQuestions = [
      "Tell me about the Kafka stream architecture",
      "What are your Kafka & data pipeline rates?",
      "Can we schedule a call with the architect?",
    ];
  } else if (queryLower.includes("aldeewan") || queryLower.includes("al-deewan")) {
    reply = `**Al-Deewan Collection** is a luxury fashion e-commerce platform built with headless Next.js, Edge CDN, and Stripe checkout. Impact: +42% conversion lift, 0.7s average page load, and handles 30k peak concurrent shoppers. (Live: https://aldeewancollection.com/)`;
    suggestedQuestions = [
      "What is your web development pricing in USD?",
      "Can you audit our current e-commerce store?",
      "How fast can you build a Next.js platform?",
    ];
  } else if (queryLower.includes("marginalia")) {
    reply = `**Marginalia** is an AI research companion that dives deep into scientific literature from 2M+ arXiv papers with verified inline citations, hybrid BM25/dense vector retrieval, and interactive research trees. (Demo: https://marginalia-ochre-nu.vercel.app/chat)`;
    suggestedQuestions = [
      "How does your RAG citation grounding work?",
      "What vector database was used for Marginalia?",
      "Can you build a private RAG assistant for us?",
    ];
  } else if (queryLower.includes("xecure")) {
    reply = `**XecureAI** is an enterprise AI governance and threat telemetry platform with <12ms alert latency, 5M+ daily event throughput, and automated SOC 2 compliance verification. (Live: https://xecureai.com/)`;
    suggestedQuestions = [
      "How do you monitor LLM endpoints?",
      "What compliance standards do you support?",
      "Can we schedule a security scoping call?",
    ];
  } else if (queryLower.includes("curecms")) {
    reply = `**CureCMS Solution** is a specialized healthcare operations and medical billing platform built with HIPAA-compliant encrypted telemetry, achieving 99.2% claim accuracy and a 14-day reimbursement cycle. (Live: https://curercmsolution.com/)`;
    suggestedQuestions = [
      "How do you ensure HIPAA compliance?",
      "What healthcare CMS features do you support?",
      "Can we schedule a healthcare scoping call?",
    ];
  }
  // 8. General Projects & Portfolio
  else if (
    queryLower.includes("project") ||
    queryLower.includes("portfolio") ||
    queryLower.includes("case study") ||
    queryLower.includes("work") ||
    queryLower.includes("what have you built")
  ) {
    reply = `We've built and shipped flagship production platforms including:
- **EchoSense AI**: Real-time Kafka/Spark crisis NLP streaming (50k events/sec).
- **Al-Deewan Collection**: Luxury retail headless Next.js storefront (+42% conversion lift).
- **Marginalia**: arXiv scientific research synthesis companion (2M+ papers).
- **XecureAI**: Enterprise cybersecurity threat telemetry (<12ms latency).
- **CureCMS Solution**: AI healthcare revenue cycle management (99.2% accuracy).

Explore live demos on our [Work Page](/work).`;
    suggestedQuestions = [
      "Tell me more about EchoSense AI",
      "How does the Al-Deewan e-commerce platform work?",
      "Can you build a custom platform for us?",
    ];
  }
  // 8. General / Fallback
  else {
    reply = `${primary.content.split("\n")[0]} 

Whizzly Lab specializes in web development, workflow automation, RAG systems, SaaS products, mobile apps, and custom AI integration. Schedule a discovery call at [whizzlylab.com/schedule](/schedule) or call [+1 (424) 451-0714](tel:+14244510714).`;
    suggestedQuestions = [
      "What services does Whizzly Lab provide?",
      "What are your project pricing rates in USD?",
      "How can I book a discovery call?",
    ];
  }

  return {
    reply,
    sources,
    suggestedQuestions,
    actionCta,
  };
}
