import "server-only";
import MailComposer from "nodemailer/lib/mail-composer";

/**
 * Gmail API sender (OAuth2, gmail.send scope).
 * Env: GMAIL_USER, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN.
 * Sending never throws: failures are logged so a mail outage can't break the portal.
 */

export function isMailConfigured(): boolean {
  return Boolean(
    process.env.GMAIL_USER &&
      process.env.GMAIL_CLIENT_ID &&
      process.env.GMAIL_CLIENT_SECRET &&
      process.env.GMAIL_REFRESH_TOKEN
  );
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID!,
      client_secret: process.env.GMAIL_CLIENT_SECRET!,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
    signal: AbortSignal.timeout(10_000),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data.access_token) {
    throw new Error(`Google token refresh failed: ${data.error_description || data.error || resp.status}`);
  }
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return cachedToken.value;
}

function buildRaw(opts: { to: string; subject: string; html: string; text: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    new MailComposer({
      from: `"Whizzly Lab Portal" <${process.env.GMAIL_USER}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    })
      .compile()
      .build((err, message) => (err ? reject(err) : resolve(message.toString("base64url"))));
  });
}

/** Public base URL used in email links. Never derived from request headers. */
export function portalUrl(path = ""): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    (process.env.NODE_ENV === "production" ? "https://www.whizzlylab.com" : "http://localhost:3000");
  return `${base.replace(/\/$/, "")}/portal${path}`;
}

export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function layout(heading: string, bodyHtml: string, button?: { label: string; url: string }): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;background:#fafbfc;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:28px">
    <div style="font-weight:700;font-size:15px;color:#0f172a;margin-bottom:18px">Whizzly <span style="color:#066bf5">Portal</span></div>
    <h2 style="margin:0 0 12px;font-size:18px;color:#0f172a">${esc(heading)}</h2>
    <div style="font-size:14px;line-height:1.6;color:#334155">${bodyHtml}</div>
    ${
      button
        ? `<p style="margin:24px 0 0"><a href="${esc(button.url)}" style="background:#066bf5;color:#fff;text-decoration:none;padding:10px 20px;border-radius:999px;font-size:14px;font-weight:600;display:inline-block">${esc(button.label)}</a></p>`
        : ""
    }
    <p style="margin:28px 0 0;font-size:12px;color:#94a3b8">Whizzly Lab · whizzlylab.com</p>
  </div></div>`;
}

export async function sendMail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
}): Promise<boolean> {
  const recipients = [...new Set((Array.isArray(opts.to) ? opts.to : [opts.to]).filter(Boolean))];
  if (recipients.length === 0) return false;
  if (!isMailConfigured()) {
    console.warn("[portal mail] Gmail OAuth env vars not set; email skipped");
    return false;
  }
  try {
    const token = await accessToken();
    let allOk = true;
    // One message per recipient so addresses are never exposed to each other.
    for (const to of recipients) {
      const raw = await buildRaw({ to, subject: opts.subject, html: opts.html, text: opts.text });
      const resp = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ raw }),
        signal: AbortSignal.timeout(15_000),
      });
      if (!resp.ok) {
        allOk = false;
        console.error(`[portal mail] Gmail API ${resp.status}:`, (await resp.text()).slice(0, 300));
      }
    }
    return allOk;
  } catch (e) {
    console.error("[portal mail] send failed:", e instanceof Error ? e.message : e);
    return false;
  }
}
