/**
 * Web lookup for tech/industry questions the knowledge base can't answer.
 * Uses Tavily (set TAVILY_API_KEY). Results are cached in memory for a short
 * time and always treated as untrusted data by the prompt.
 */

export interface WebResult {
  title: string;
  url: string;
  snippet: string;
}

const TTL_MS = 10 * 60 * 1000;
const MAX_CACHE = 100;
const cache = new Map<string, { at: number; results: WebResult[] }>();

export function isWebSearchConfigured(): boolean {
  return Boolean((process.env.TAVILY_API_KEY || "").trim());
}

export async function searchWeb(query: string, max = 4): Promise<WebResult[]> {
  const key = (process.env.TAVILY_API_KEY || "").trim().replace(/^["']|["']$/g, "");
  if (!key) return [];

  const cacheKey = query.toLowerCase().trim();
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.results;

  try {
    const resp = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        query,
        max_results: max,
        search_depth: "basic",
        include_answer: false,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!resp.ok) {
      console.warn(`[chat] Tavily failed: HTTP ${resp.status}`);
      return [];
    }
    const data = await resp.json();
    const results: WebResult[] = (Array.isArray(data?.results) ? data.results : [])
      .filter((r: { url?: unknown; content?: unknown }) => typeof r?.url === "string" && typeof r?.content === "string")
      .slice(0, max)
      .map((r: { title?: string; url: string; content: string }) => ({
        title: String(r.title || r.url).slice(0, 120),
        url: r.url,
        snippet: r.content.replace(/\s+/g, " ").trim().slice(0, 600),
      }));

    if (cache.size >= MAX_CACHE) cache.delete(cache.keys().next().value as string);
    cache.set(cacheKey, { at: Date.now(), results });
    return results;
  } catch (e) {
    console.warn("[chat] Tavily error:", e instanceof Error ? e.message : e);
    return [];
  }
}
