import { NextRequest, NextResponse } from "next/server";
import {
  retrieveKnowledge,
  buildGroundedSystemPrompt,
  generateSmartFallbackReply,
} from "@/lib/rag/engine";

export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * Clean and extract the Groq API key from environment variables.
 */
function getGroqApiKey(): string {
  const rawKey =
    process.env.GROQ_API_KEY ||
    process.env.GROQ_KEY ||
    process.env.NEXT_PUBLIC_GROQ_API_KEY ||
    "";
  return rawKey.trim().replace(/^["']|["']$/g, "");
}

/**
 * Diagnostic GET endpoint to verify Groq API connection and environment variable status.
 */
export async function GET(req: NextRequest) {
  const groqKey = getGroqApiKey();
  const hasGroqKey = Boolean(groqKey && groqKey.length > 5);

  let groqTestResult: { success: boolean; status: number; message: string; model?: string } = {
    success: false,
    status: 0,
    message: hasGroqKey ? "Not tested" : "GROQ_API_KEY is not set in environment variables.",
  };

  if (hasGroqKey) {
    try {
      const pingResp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: "ping" }],
          max_tokens: 5,
        }),
      });

      const data = await pingResp.json();
      if (pingResp.ok) {
        groqTestResult = {
          success: true,
          status: pingResp.status,
          message: "Groq API connected and operational!",
          model: "llama-3.1-8b-instant",
        };
      } else {
        groqTestResult = {
          success: false,
          status: pingResp.status,
          message: data?.error?.message || `HTTP ${pingResp.status}`,
          model: "openai/gpt-oss-120b",
        };
      }
    } catch (err: unknown) {
      groqTestResult = {
        success: false,
        status: 0,
        message: err instanceof Error ? err.message : String(err),
      };
    }
  }

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    groq: {
      isConfigured: hasGroqKey,
      keyPrefix: hasGroqKey ? `${groqKey.slice(0, 6)}...${groqKey.slice(-4)}` : "missing",
      test: groqTestResult,
    },
  });
}

/**
 * Main Chat Endpoint with RAG Grounding and Groq Acceleration.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const message: string = (body.message || "").trim();
    const history: ChatMessage[] = Array.isArray(body.history) ? body.history : [];
    const currency: string = (body.currency || "USD").toUpperCase();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // 1. Perform Hybrid RAG Retrieval over Whizzly Lab Knowledge Base
    const retrievedChunks = retrieveKnowledge(message, 4);
    const sources = retrievedChunks.map((r) => ({
      title: r.chunk.title,
      url: r.chunk.url,
    }));

    // 2. Build Grounded Prompt with retrieved context
    const systemPrompt = buildGroundedSystemPrompt(retrievedChunks, currency);

    // 3. API Keys Check (Groq is #1 Priority)
    const groqKey = getGroqApiKey();
    const geminiKey = (
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_AI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      ""
    ).trim().replace(/^["']|["']$/g, "");
    const openaiKey = (process.env.OPENAI_API_KEY || "").trim().replace(/^["']|["']$/g, "");

    let llmReply: string | null = null;
    let engineUsed = "local-rag-neural-synthesis";
    let groqError: string | null = null;

    // ── Primary Engine: Groq API (High-Velocity Llama 3.3 & 3.1) ───────────
    if (groqKey) {
      const groqModels = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"];
      for (const model of groqModels) {
        if (llmReply) break;
        try {
          const groqResp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: systemPrompt },
                ...history.slice(-4).map((h) => ({ role: h.role, content: h.content })),
                { role: "user", content: message },
              ],
              temperature: 0.3,
              max_tokens: 350,
            }),
          });

          if (groqResp.ok) {
            const groqData = await groqResp.json();
            const text = groqData?.choices?.[0]?.message?.content?.trim();
            if (text) {
              llmReply = text;
              engineUsed = `groq-${model}`;
            }
          } else {
            const errJson = await groqResp.json().catch(() => ({}));
            groqError = errJson?.error?.message || `HTTP ${groqResp.status}`;
            console.warn(`[Groq API Warning] (${model}): ${groqError}`);
          }
        } catch (groqErr) {
          groqError = groqErr instanceof Error ? groqErr.message : String(groqErr);
          console.warn(`[Groq API Exception] (${model}):`, groqError);
        }
      }
    } else {
      groqError = "GROQ_API_KEY not found in environment variables";
    }

    // ── Secondary Engine: Gemini API (if Groq is not configured/fails) ──────
    if (!llmReply && geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        const contents = [
          ...history.slice(-6).map((h) => ({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.content }],
          })),
          {
            role: "user",
            parts: [{ text: message }],
          },
        ];

        const geminiResp = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: {
              temperature: 0.35,
              maxOutputTokens: 1000,
            },
          }),
        });

        if (geminiResp.ok) {
          const geminiData = await geminiResp.json();
          const candidateText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            llmReply = candidateText.trim();
            engineUsed = "gemini-1.5-flash";
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed:", geminiErr);
      }
    }

    // ── Tertiary Engine: OpenAI (if configured) ─────────────────────────────
    if (!llmReply && openaiKey) {
      try {
        const openAiResp = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              ...history.slice(-6).map((h) => ({ role: h.role, content: h.content })),
              { role: "user", content: message },
            ],
            temperature: 0.3,
            max_tokens: 1000,
          }),
        });

        if (openAiResp.ok) {
          const openAiData = await openAiResp.json();
          llmReply = openAiData?.choices?.[0]?.message?.content?.trim() || null;
          if (llmReply) engineUsed = "openai-gpt-4o-mini";
        }
      } catch (openAiErr) {
        console.warn("OpenAI API call failed:", openAiErr);
      }
    }

    // ── Fallback Engine: Deterministic RAG Knowledge Synthesis ───────────────
    const fallbackMeta = generateSmartFallbackReply(message, retrievedChunks, currency);

    if (!llmReply) {
      return NextResponse.json({
        reply: fallbackMeta.reply,
        sources,
        suggestedQuestions: fallbackMeta.suggestedQuestions,
        actionCta: fallbackMeta.actionCta,
        groundedCount: retrievedChunks.length,
        engine: "local-rag-neural-synthesis",
        groqStatus: {
          hasKey: Boolean(groqKey),
          error: groqError,
        },
      });
    }

    return NextResponse.json({
      reply: llmReply,
      sources,
      suggestedQuestions: fallbackMeta.suggestedQuestions,
      actionCta: fallbackMeta.actionCta,
      groundedCount: retrievedChunks.length,
      engine: engineUsed,
      groqStatus: {
        success: true,
        engine: engineUsed,
      },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Chat API error:", errMessage);
    return NextResponse.json(
      { error: "Failed to process chat request", details: errMessage },
      { status: 500 }
    );
  }
}
