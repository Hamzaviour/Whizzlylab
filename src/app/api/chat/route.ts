import { NextRequest, NextResponse } from "next/server";
import {
  retrieve,
  buildGroundedSystemPrompt,
  generateSmartFallbackReply,
  outOfScopeMeta,
  suggestFollowUps,
  type ChatTurn,
  type ChatMeta,
} from "@/lib/rag/engine";
import { isWebSearchConfigured, searchWeb, type WebResult } from "@/lib/rag/web";

export const dynamic = "force-dynamic";

const MAX_MESSAGE_CHARS = 800;
const MAX_HISTORY_TURNS = 8;
const LLM_TIMEOUT_MS = 20_000;

function clean(key: string | undefined): string {
  return (key || "").trim().replace(/^["']|["']$/g, "");
}

function getGroqApiKey(): string {
  return clean(process.env.GROQ_API_KEY || process.env.GROQ_KEY);
}

/** Keeps only well-formed, size-limited user/assistant turns. */
function sanitizeHistory(raw: unknown, currentMessage: string): ChatTurn[] {
  if (!Array.isArray(raw)) return [];
  const turns: ChatTurn[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") continue;
    const text = content.trim().slice(0, 1200);
    if (text) turns.push({ role, content: text });
  }
  // The widget sends the current message as the last history item; drop it.
  const last = turns[turns.length - 1];
  if (last && last.role === "user" && last.content === currentMessage.slice(0, 1200)) turns.pop();
  return turns.slice(-MAX_HISTORY_TURNS);
}

/** Diagnostic endpoint: reports configuration only, never key material. */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    providers: {
      groq: Boolean(getGroqApiKey()),
      webSearch: isWebSearchConfigured(),
      gemini: Boolean(clean(process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || process.env.GOOGLE_API_KEY)),
      openai: Boolean(clean(process.env.OPENAI_API_KEY)),
    },
  });
}

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

async function callOpenAICompatible(
  url: string,
  apiKey: string,
  model: string,
  messages: ChatMessage[]
): Promise<{ text: string | null; error?: string }> {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 700 }),
      signal: AbortSignal.timeout(LLM_TIMEOUT_MS),
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      return { text: null, error: err?.error?.message || `HTTP ${resp.status}` };
    }
    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    return { text: text || null };
  } catch (e) {
    return { text: null, error: e instanceof Error ? e.message : String(e) };
  }
}

async function callGemini(
  apiKey: string,
  model: string,
  systemPrompt: string,
  history: ChatTurn[],
  message: string
): Promise<{ text: string | null; error?: string }> {
  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [
            ...history.map((h) => ({
              role: h.role === "assistant" ? "model" : "user",
              parts: [{ text: h.content }],
            })),
            { role: "user", parts: [{ text: message }] },
          ],
          generationConfig: { temperature: 0.2, maxOutputTokens: 700 },
        }),
        signal: AbortSignal.timeout(LLM_TIMEOUT_MS),
      }
    );
    if (!resp.ok) return { text: null, error: `HTTP ${resp.status}` };
    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return { text: text || null };
  } catch (e) {
    return { text: null, error: e instanceof Error ? e.message : String(e) };
  }
}

/** Tries each configured provider in order until one answers. */
async function generateWithLLM(
  systemPrompt: string,
  history: ChatTurn[],
  message: string
): Promise<{ text: string; engine: string } | null> {
  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...history.map((h) => ({ role: h.role as "user" | "assistant", content: h.content })),
    { role: "user", content: message },
  ];

  const groqKey = getGroqApiKey();
  if (groqKey) {
    for (const model of ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]) {
      const r = await callOpenAICompatible("https://api.groq.com/openai/v1/chat/completions", groqKey, model, messages);
      if (r.text) return { text: r.text, engine: `groq-${model}` };
      console.warn(`[chat] Groq ${model} failed: ${r.error}`);
    }
  }

  const geminiKey = clean(process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || process.env.GOOGLE_API_KEY);
  if (geminiKey) {
    for (const model of ["gemini-2.0-flash", "gemini-1.5-flash"]) {
      const r = await callGemini(geminiKey, model, systemPrompt, history, message);
      if (r.text) return { text: r.text, engine: model };
      console.warn(`[chat] Gemini ${model} failed: ${r.error}`);
    }
  }

  const openaiKey = clean(process.env.OPENAI_API_KEY);
  if (openaiKey) {
    const r = await callOpenAICompatible("https://api.openai.com/v1/chat/completions", openaiKey, "gpt-4o-mini", messages);
    if (r.text) return { text: r.text, engine: "openai-gpt-4o-mini" };
    console.warn(`[chat] OpenAI failed: ${r.error}`);
  }

  return null;
}

const NO_INFO_RE = /\bI don['’]t have any information about this\b/i;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const message: string = typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE_CHARS) : "";
    const currency: string = typeof body.currency === "string" ? body.currency.toUpperCase() : "USD";

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const history = sanitizeHistory(body.history, message);

    // 1. Retrieve (conversation-aware) and decide whether this is answerable.
    const outcome = retrieve(message, 6, history);
    const kbSources = outcome.results.slice(0, 3).map((r) => ({ title: r.chunk.title, url: r.chunk.url }));

    // 2. Tech/industry questions the KB can't fully answer may use a web lookup.
    let web: WebResult[] = [];
    if (outcome.webEligible) {
      web = await searchWeb(`${message} (technology explanation)`, 4);
    }

    // 3. Clearly unrelated / unanswerable: honest "no information", no LLM call.
    if (!outcome.inScope && web.length === 0) {
      const meta = outOfScopeMeta();
      return NextResponse.json({
        ...meta,
        groundedCount: 0,
        outOfScope: true,
        engine: "scope-guard",
      });
    }

    const sources: { title: string; url?: string }[] = web.length > 0 ? [...web.slice(0, 2).map((w) => ({ title: w.title, url: w.url })), ...kbSources.slice(0, 1)] : kbSources;

    // 4. Generate a grounded answer with the first available LLM.
    const systemPrompt = buildGroundedSystemPrompt(outcome.results, currency, outcome.intents, web);
    const llm = await generateWithLLM(systemPrompt, history, message);

    if (llm) {
      const outOfScope = NO_INFO_RE.test(llm.text);
      const fallback: ChatMeta = outOfScope ? outOfScopeMeta() : generateSmartFallbackReply(message, outcome, web);
      return NextResponse.json({
        reply: llm.text,
        sources: outOfScope ? [] : sources,
        suggestedQuestions: outOfScope ? fallback.suggestedQuestions : suggestFollowUps(outcome.results, message),
        actionCta: fallback.actionCta,
        groundedCount: outcome.results.length,
        outOfScope,
        usedWeb: web.length > 0 && !outOfScope,
        engine: llm.engine,
      });
    }

    // 5. No LLM reachable: answer straight from the knowledge base (or web snippets).
    const meta = generateSmartFallbackReply(message, outcome, web);
    return NextResponse.json({
      ...meta,
      groundedCount: outcome.results.length,
      outOfScope: false,
      engine: "local-rag",
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Chat API error:", errMessage);
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 });
  }
}
