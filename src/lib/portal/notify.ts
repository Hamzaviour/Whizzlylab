import "server-only";
import { sql } from "./db";
import { esc, layout, portalUrl, sendMail } from "./mail";

/** Email helpers for portal events. All are best-effort and never throw. */

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n).trimEnd()}…` : s);

async function clientEmails(projectId: string): Promise<string[]> {
  const rows = (await sql()`
    SELECT u.email FROM users u JOIN projects p ON p.client_id = u.client_id
    WHERE p.id = ${projectId} AND u.role = 'client'
  `) as { email: string }[];
  return rows.map((r) => r.email);
}

async function staffEmails(): Promise<string[]> {
  const rows = (await sql()`SELECT email FROM users WHERE role IN ('admin','team')`) as { email: string }[];
  return rows.map((r) => r.email);
}

async function projectName(projectId: string): Promise<string> {
  const rows = (await sql()`SELECT name FROM projects WHERE id = ${projectId}`) as { name: string }[];
  return rows[0]?.name ?? "your project";
}

export async function notifyUpdatePosted(projectId: string, title: string, body: string, authorName: string) {
  try {
    const [to, project] = await Promise.all([clientEmails(projectId), projectName(projectId)]);
    const url = portalUrl(`/projects/${projectId}`);
    await sendMail({
      to,
      subject: `New update on ${project}: ${title}`,
      text: `${authorName} posted an update on ${project}:\n\n${title}\n\n${clip(body, 600)}\n\nView it: ${url}`,
      html: layout(
        `New update on ${project}`,
        `<p style="margin:0 0 6px"><strong>${esc(title)}</strong></p>
         <p style="margin:0 0 12px;white-space:pre-wrap">${esc(clip(body, 600))}</p>
         <p style="margin:0;color:#64748b">Posted by ${esc(authorName)}</p>`,
        { label: "View in portal", url }
      ),
    });
  } catch (e) {
    console.error("[portal notify] update:", e);
  }
}

/** A client commented: tell the team. A staff comment (non-internal): tell the client. */
export async function notifyComment(projectId: string, body: string, authorName: string, authorIsClient: boolean) {
  try {
    const project = await projectName(projectId);
    const to = authorIsClient ? await staffEmails() : await clientEmails(projectId);
    const url = portalUrl(`/projects/${projectId}`);
    await sendMail({
      to,
      subject: `New comment on ${project} from ${authorName}`,
      text: `${authorName} commented on ${project}:\n\n${clip(body, 600)}\n\nReply: ${url}`,
      html: layout(
        `New comment on ${project}`,
        `<p style="margin:0 0 6px;color:#64748b">${esc(authorName)} wrote:</p>
         <p style="margin:0;white-space:pre-wrap">${esc(clip(body, 600))}</p>`,
        { label: "Open conversation", url }
      ),
    });
  } catch (e) {
    console.error("[portal notify] comment:", e);
  }
}

export async function sendPasswordReset(email: string, name: string, token: string) {
  const url = portalUrl(`/reset/${token}`);
  await sendMail({
    to: email,
    subject: "Reset your Whizzly Portal password",
    text: `Hi ${name},\n\nUse this link to set a new password (valid for 1 hour):\n${url}\n\nIf you didn't ask for this, you can ignore this email.`,
    html: layout(
      "Reset your password",
      `<p style="margin:0 0 8px">Hi ${esc(name)},</p>
       <p style="margin:0">Use the button below to set a new password. The link works once and expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>`,
      { label: "Set new password", url }
    ),
  });
}

export async function sendLoginCreated(email: string, name: string) {
  const url = portalUrl("/login");
  await sendMail({
    to: email,
    subject: "Your Whizzly Lab client portal is ready",
    text: `Hi ${name},\n\nYour client portal account is ready. Sign in at ${url} with this email address. Your project contact will share your password separately. You can change it any time under Account.`,
    html: layout(
      "Your client portal is ready",
      `<p style="margin:0 0 8px">Hi ${esc(name)},</p>
       <p style="margin:0">Track your project progress, tasks and updates from the Whizzly Lab team in one place. Sign in with this email address. Your project contact will share your password separately, and you can change it any time under <em>Account</em>.</p>`,
      { label: "Open portal", url }
    ),
  });
}
