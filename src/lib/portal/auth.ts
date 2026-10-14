import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { sql, type PortalUser, type Role } from "./db";

const COOKIE = "wl_portal_session";
const SESSION_DAYS = 14;

function secret(): string {
  const s = process.env.PORTAL_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("PORTAL_SESSION_SECRET must be set (32+ chars)");
  return s;
}

// ── Passwords (scrypt) ─────────────────────────────────────────────────────
function scryptAsync(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scrypt(password, salt, 64, (err, key) => (err ? reject(err) : resolve(key)))
  );
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scryptAsync(password, salt);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltHex, keyHex] = stored.split("$");
  if (scheme !== "scrypt" || !saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, "hex");
  const actual = await scryptAsync(password, Buffer.from(saltHex, "hex"));
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

// ── Sessions (HMAC-signed cookie: userId.expiry.signature) ─────────────────
function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Sessions are bound to the current password hash, so changing a password signs out every other device. */
const fingerprint = (hash: string) => hash.slice(-24);

export async function createSession(userId: string): Promise<void> {
  const rows = (await sql()`SELECT password_hash FROM users WHERE id = ${userId}`) as { password_hash: string }[];
  if (!rows[0]) throw new Error("Cannot create a session for an unknown user");
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${userId}.${exp}`;
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(`${payload}.${fingerprint(rows[0].password_hash)}`)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

/** Current user, re-read from the DB on every request so role changes apply instantly. */
export const getUser = cache(async (): Promise<PortalUser | null> => {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [userId, exp, sig] = parts;
  if (!Number.isFinite(Number(exp)) || Number(exp) < Date.now()) return null;
  if (!/^[0-9a-f-]{36}$/i.test(userId)) return null;

  const rows = (await sql()`
    SELECT id, email, name, role, client_id, password_hash FROM users WHERE id = ${userId}
  `) as (PortalUser & { password_hash: string })[];
  const row = rows[0];
  if (!row) return null;

  const expected = Buffer.from(sign(`${userId}.${exp}.${fingerprint(row.password_hash)}`), "hex");
  const given = Buffer.from(sig, "hex");
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  return { id: row.id, email: row.email, name: row.name, role: row.role, client_id: row.client_id };
});

export async function requireUser(roles?: Role[]): Promise<PortalUser> {
  const user = await getUser();
  if (!user) redirect("/portal/login");
  if (roles && !roles.includes(user.role)) redirect("/portal");
  return user;
}

export const isStaff = (u: PortalUser) => u.role === "admin" || u.role === "team";
