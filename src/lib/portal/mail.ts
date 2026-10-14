import "server-only";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * Gmail SMTP sender (app password). Set GMAIL_USER and GMAIL_APP_PASSWORD.
 * Sending never throws: failures are logged so a mail outage can't break the portal.
 */

let _transport: Transporter | null = null;

export function isMailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

function transport(): Transporter {
  if (!_transport) {
    _transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        // Google shows app passwords with spaces; SMTP wants them without.
        pass: (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, ""),
      },
    });
  }
  return _transport;
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
  const recipients = (Array.isArray(opts.to) ? opts.to : [opts.to]).filter(Boolean);
  if (recipients.length === 0) return false;
  if (!isMailConfigured()) {
    console.warn("[portal mail] GMAIL_USER / GMAIL_APP_PASSWORD not set; email skipped");
    return false;
  }
  try {
    await transport().sendMail({
      from: `"Whizzly Lab Portal" <${process.env.GMAIL_USER}>`,
      // Each recipient gets their own copy so addresses are never exposed to each other.
      to: recipients.length === 1 ? recipients[0] : process.env.GMAIL_USER,
      bcc: recipients.length === 1 ? undefined : recipients,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    });
    return true;
  } catch (e) {
    console.error("[portal mail] send failed:", e instanceof Error ? e.message : e);
    return false;
  }
}
