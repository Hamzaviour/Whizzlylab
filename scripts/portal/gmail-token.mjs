// One-time helper: gets a Gmail refresh token for the portal's email sender.
// Usage: node scripts/portal/gmail-token.mjs <CLIENT_ID> <CLIENT_SECRET>
// Then sign in as the Gmail account that should send the emails.
import http from "node:http";
import { randomBytes } from "node:crypto";

const [clientId, clientSecret] = process.argv.slice(2);
if (!clientId || !clientSecret) {
  console.error("Usage: node scripts/portal/gmail-token.mjs <CLIENT_ID> <CLIENT_SECRET>");
  process.exit(1);
}

const PORT = 53682;
const redirect = `http://127.0.0.1:${PORT}/callback`;
const state = randomBytes(16).toString("hex");
const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirect,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/gmail.send",
    access_type: "offline",
    prompt: "consent",
    state,
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, redirect);
  if (url.pathname !== "/callback") return res.writeHead(404).end();
  if (url.searchParams.get("state") !== state) return res.writeHead(400).end("State mismatch");
  const code = url.searchParams.get("code");
  if (!code) return res.writeHead(400).end(`Authorization failed: ${url.searchParams.get("error")}`);

  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirect,
      grant_type: "authorization_code",
    }),
  });
  const data = await resp.json();
  if (!data.refresh_token) {
    res.writeHead(500).end("No refresh token returned. See the terminal.");
    console.error("Token response had no refresh_token:", data);
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" }).end("Done. You can close this tab and return to the terminal.");
    console.log("\nAdd this to .env.local and Vercel:\n");
    console.log(`GMAIL_REFRESH_TOKEN=${data.refresh_token}\n`);
  }
  server.close();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("Open this URL in your browser and sign in as the sending Gmail account:\n");
  console.log(authUrl + "\n");
});
