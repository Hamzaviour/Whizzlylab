/**
 * Whizzly Lab Hybrid RAG Retrieval Engine
 * Provides BM25 / semantic hybrid search over domain knowledge chunks
 * with grounded prompt construction and local deterministic fallback synthesis.
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
 * Hybrid retrieval scoring:
 * - Direct keyword matches in chunk.keywords (High weight)
 * - Title match bonus
 * - Content token overlap (TF-IDF style)
 * - Category intent matching
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
    if (
      (queryLower.includes("price") || queryLower.includes("cost") || queryLower.includes("rate") || queryLower.includes("budget") || queryLower.includes("how much") || queryLower.includes("quote")) &&
      chunk.category === "pricing"
    ) {
      score += 12.0;
    }

    if (
      (queryLower.includes("book") || queryLower.includes("call") || queryLower.includes("schedule") || queryLower.includes("contact") || queryLower.includes("hire") || queryLower.includes("whatsapp")) &&
      chunk.category === "contact"
    ) {
      score += 12.0;
    }

    if (
      (queryLower.includes("team") || queryLower.includes("founder") || queryLower.includes("who built") || queryLower.includes("experience")) &&
      chunk.id === "founder-profile"
    ) {
      score += 15.0;
    }

    if (
      (queryLower.includes("kafka") || queryLower.includes("spark") || queryLower.includes("stream") || queryLower.includes("pipeline")) &&
      chunk.id === "service-data-pipelines"
    ) {
      score += 15.0;
    }

    if (
      (queryLower.includes("rag") || queryLower.includes("langchain") || queryLower.includes("llm") || queryLower.includes("agent")) &&
      chunk.id === "service-ai-rag"
    ) {
      score += 15.0;
    }

    return {
      chunk,
      score,
      matchedKeywords,
    };
  });

  // Sort descending by score
  scoredResults.sort((a, b) => b.score - a.score);

  // Return topK with score > 0 (or top 1 if all scores are 0)
  const filtered = scoredResults.filter((r) => r.score > 0);
  if (filtered.length === 0) {
    return [scoredResults[0]];
  }

  return filtered.slice(0, topK);
}

/**
 * Builds the grounded system prompt with retrieved context and constraints.
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

  return `You are Whizzly Lab's Senior AI Solutions Architect & Technical Consultant.
Whizzly Lab is an elite AI engineering studio delivering production-grade AI systems.

### YOUR GOAL:
Provide direct, high-caliber, technical answers to client inquiries about Whizzly Lab's services, real-time data pipelines (Kafka/Spark), RAG systems, machine learning, web engineering, pricing, and project workflows.

### STRICT OPERATIONAL GUIDELINES:
1. **Be Grounded in the Knowledge Base**: Rely primarily on the provided context below. Do not make up services or pricing not supported by Whizzly Lab.
2. **Be Technically Precise**: Use exact technical terminology (e.g. multi-stage RAG, Apache Kafka broker partitions, PySpark streaming, Qdrant vector indexing, Next.js App Router, Docker).
3. **Format Clearly with Markdown**: Use bullet points, bold text for key terms, code blocks when illustrating tech stacks, and source links.
4. **Currency Handling**: The visitor's preferred currency is ${currency}. Provide figures in ${currency} (or both USD and PKR if estimating).
5. **Call to Action (CTA)**: When discussing projects, timelines, or pricing, naturally encourage the visitor to schedule a 1:1 technical call at \`/schedule\` or message us on WhatsApp at \`https://wa.me/923097404009\`.
6. **Tone**: Confident, elite, professional, responsive, and consultative.

### RETRIEVED GROUNDING CONTEXT:
${contextText}
`;
}

/**
 * Deterministic local RAG fallback generator in case external LLM API is unavailable.
 * Generates an intelligent, structured markdown answer using the retrieved knowledge chunks.
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
  const queryLower = query.toLowerCase();
  const primary = retrievedChunks[0]?.chunk || KNOWLEDGE_BASE[0];
  const sources = retrievedChunks.map((r) => ({
    title: r.chunk.title,
    url: r.chunk.url,
  }));

  let reply = "";
  let suggestedQuestions: string[] = [];
  let actionCta = {
    text: "Ready to discuss your technical architecture?",
    url: "/schedule",
    label: "📅 Book a Technical Call",
  };

  // Pricing intent
  if (
    queryLower.includes("price") ||
    queryLower.includes("cost") ||
    queryLower.includes("how much") ||
    queryLower.includes("quote") ||
    queryLower.includes("rate") ||
    queryLower.includes("budget")
  ) {
    reply = `### 💰 Whizzly Lab Project Pricing Overview

We provide transparent, milestone-based pricing across all engineering practices in both **USD** and **PKR**:

| Service Discipline | Starter Tier | Growth Tier | Enterprise Tier |
| :--- | :--- | :--- | :--- |
| **AI & RAG Systems** | $600 *(PKR 168k)* | $1,400 *(PKR 390k)* | $2,800+ *(PKR 780k+)* |
| **Real-Time Kafka / Spark Pipelines** | $800 *(PKR 225k)* | $1,800 *(PKR 500k)* | $3,500+ *(PKR 980k+)* |
| **Full-Stack Next.js Platforms** | $300 *(PKR 85k)* | $750 *(PKR 210k)* | $1,500+ *(PKR 420k+)* |
| **Machine Learning & MLOps** | $700 *(PKR 195k)* | $1,600 *(PKR 450k)* | $3,200+ *(PKR 900k+)* |
| **Workflow Automation (n8n/Voice)** | $250 *(PKR 70k)* | $600 *(PKR 170k)* | $1,200+ *(PKR 340k+)* |
| **Data Analytics & BI Dashboards** | $300 *(PKR 85k)* | $700 *(PKR 195k)* | $1,400+ *(PKR 390k+)* |

- **Payment Structure**: 50% upfront milestone, 50% upon successful staging sign-off.
- **Code Ownership**: You retain **100% IP ownership** of all code, model weights, and infra configurations.

Would you like a custom architecture breakdown or fixed-price quote for your project?`;

    suggestedQuestions = [
      "Can I get a custom quote for a RAG agent?",
      "How long does a typical Next.js project take?",
      "What is included in the Kafka data pipeline tier?",
      "How do milestone payments work?",
    ];
    actionCta = {
      text: "Get an exact scope & timeline estimate from our team:",
      url: "/schedule",
      label: "📅 Schedule Discovery Call",
    };
  }
  // AI & RAG Intent
  else if (
    queryLower.includes("rag") ||
    queryLower.includes("langchain") ||
    queryLower.includes("ai") ||
    queryLower.includes("autonomous") ||
    queryLower.includes("agent")
  ) {
    reply = `### ⚡ Production-Grade AI & RAG Architecture

At Whizzly Lab, we design **retrieval-augmented generation (RAG)** systems and autonomous agents built for enterprise reliability rather than fragile demos:

#### Core Technical Capabilities:
- **Multi-Stage Retrieval Pipelines**: Hybrid dense vector embeddings (OpenAI / Hugging Face) paired with BM25 sparse keyword ranking for high-precision recall.
- **Vector Database Indexing**: Configured with **Qdrant, Pinecone, ChromaDB, or Weaviate** with metadata filtering and re-ranking layers (Cohere Rerank / Cross-Encoders).
- **Hallucination Guardrails & LLM Eval**: Automated verification loops measuring context faithfulness, relevancy, and toxicity.
- **Tool-Augmented Agents**: LangChain & LlamaIndex agents capable of calling internal SQL databases, webhooks, and REST APIs.

**Tech Stack**: \`Python\`, \`LangChain\`, \`LlamaIndex\`, \`FastAPI\`, \`Qdrant\`, \`OpenAI\`, \`PyTorch\`.`;

    suggestedQuestions = [
      "What vector database do you recommend?",
      "How do you evaluate and benchmark RAG accuracy?",
      "What are your AI & RAG pricing tiers?",
      "Can you integrate RAG with our existing SQL database?",
    ];
  }
  // Data Pipelines & Kafka Intent
  else if (
    queryLower.includes("kafka") ||
    queryLower.includes("spark") ||
    queryLower.includes("stream") ||
    queryLower.includes("pipeline") ||
    queryLower.includes("etl")
  ) {
    reply = `### 🌐 Real-Time Data Streaming & Kafka Architectures

Whizzly Lab engineers high-throughput distributed event streaming systems capable of handling millions of real-time events with sub-second SLAs:

#### Engineering Deliverables:
- **Apache Kafka Clusters**: Multi-broker topologies, partitioned topics, replication factors, schema registries, and consumer group scaling.
- **Spark & PySpark Processing**: Micro-batch and continuous streaming transforms, anomaly detection engines, and windowed aggregations.
- **Downstream AI & Storage**: Direct streaming into ClickHouse, PostgreSQL, or real-time ML inference endpoints.
- **Observability & Health Telemetry**: End-to-end consumer lag tracking, Prometheus/Grafana metrics, and automated dead-letter queues (DLQ).

Check out our case study on **EchoSense AI** (our high-throughput streaming NLP pipeline).`;

    suggestedQuestions = [
      "Tell me about the EchoSense AI Kafka architecture",
      "How do you handle Kafka consumer lag and backpressure?",
      "What are the data pipeline pricing tiers?",
      "Do you support AWS Kinesis as well as Kafka?",
    ];
  }
  // Contact & Scheduling Intent
  else if (
    queryLower.includes("contact") ||
    queryLower.includes("schedule") ||
    queryLower.includes("book") ||
    queryLower.includes("call") ||
    queryLower.includes("hire") ||
    queryLower.includes("email") ||
    queryLower.includes("whatsapp")
  ) {
    reply = `### 📅 Connect Directly with Whizzly Lab

We operate globally with a **sub-24 hour response SLA**:

1. **Book a 1:1 Technical Call**:
   Schedule directly on our calendar: [**whizzlylab.com/schedule**](/schedule) (15-30 min scoping session with our lead AI engineers).

2. **Direct WhatsApp Chat**:
   Message us on WhatsApp: [**+92 309 7404009**](https://wa.me/923097404009) for rapid responses.

3. **Email Inquiry**:
   Send your project brief or RFP to [**whizzlylab@gmail.com**](mailto:whizzlylab@gmail.com).

What type of project are you looking to build?`;

    suggestedQuestions = [
      "How does the onboarding and discovery process work?",
      "What is your typical project delivery timeline?",
      "Can we sign an NDA before our call?",
      "What are your payment terms?",
    ];
    actionCta = {
      text: "Pick a time slot that works best for your timezone:",
      url: "/schedule",
      label: "📅 Open Live Calendar",
    };
  }
  // General / Fallback contextual reply
  else {
    reply = `### 🚀 Whizzly Lab — Technical Solutions

${primary.content}

#### Quick Capabilities Overview:
- ⚡ **Autonomous RAG & AI Agents** (LangChain, Qdrant, LlamaIndex, LLM Eval)
- 🌐 **Real-Time Data Pipelines** (Apache Kafka, Apache Spark, PySpark)
- 💻 **Full-Stack Web Engineering** (Next.js App Router, React, TypeScript, FastAPI)
- 🧠 **Custom ML & Computer Vision** (PyTorch, YOLO, MLflow, Hugging Face)

How can we assist with your product or engineering roadmap today?`;

    suggestedQuestions = [
      "What services does Whizzly Lab provide?",
      "What is your project pricing in USD / PKR?",
      "How can I book a discovery call with Whizzly Lab?",
      "Can you explain your RAG & Kafka pipelines?",
    ];
  }

  return {
    reply,
    sources,
    suggestedQuestions,
    actionCta,
  };
}
