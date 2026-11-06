import { BASE_URL } from "./seo";
import { getAllServiceSlugs } from "./services";

export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "c79f4e2417a840e691c2c31e9a263641";
export const INDEXNOW_KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

/**
 * Returns all discoverable site URLs for instant indexing.
 */
export function getAllSiteUrls(): string[] {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/contact",
    "/schedule",
    "/privacy",
  ];

  const serviceSlugs = getAllServiceSlugs();
  const serviceRoutes = serviceSlugs.map((slug) => `/services/${slug}`);

  const allPaths = [...staticRoutes, ...serviceRoutes];
  return allPaths.map((path) => `${BASE_URL}${path}`);
}

export interface IndexNowResponse {
  success: boolean;
  status: number;
  message: string;
  urlsCount: number;
  submittedTo: string[];
}

/**
 * Submits one or multiple URLs to the IndexNow protocol (Bing, Yandex, Seznam, Naver).
 */
export async function submitToIndexNow(
  urls: string[] = getAllSiteUrls(),
  key = INDEXNOW_KEY,
  keyLocation = INDEXNOW_KEY_LOCATION
): Promise<IndexNowResponse> {
  const urlObj = new URL(BASE_URL);
  const host = urlObj.host;

  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls,
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  let lastStatus = 200;
  let lastMessage = "URLs submitted successfully to IndexNow";
  const submittedTo: string[] = [];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      lastStatus = response.status;
      if (response.ok || response.status === 200 || response.status === 202) {
        submittedTo.push(endpoint);
      } else {
        const text = await response.text();
        console.warn(`IndexNow warning (${endpoint}): ${response.status} - ${text}`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(`IndexNow error (${endpoint}):`, errorMessage);
      lastMessage = errorMessage;
    }
  }

  return {
    success: submittedTo.length > 0,
    status: lastStatus,
    message: submittedTo.length > 0 ? "Indexed successfully" : lastMessage,
    urlsCount: urls.length,
    submittedTo,
  };
}

/**
 * Pings Google and Bing with the sitemap location.
 */
export async function pingSitemaps(sitemapUrl = `${BASE_URL}/sitemap.xml`) {
  const pingEndpoints = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  ];

  const results = await Promise.allSettled(
    pingEndpoints.map(async (url) => {
      const res = await fetch(url, { method: "GET" });
      return { url, status: res.status, ok: res.ok };
    })
  );

  return results;
}
