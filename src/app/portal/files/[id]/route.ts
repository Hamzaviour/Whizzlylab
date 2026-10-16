import { getUser } from "@/lib/portal/auth";
import { getFileContent } from "@/lib/portal/data";

// Raster images and PDFs can be previewed in the browser; everything else downloads.
const INLINE = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "application/pdf"]);

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const file = await getFileContent(user, id);
  if (!file) return new Response("Not found", { status: 404 });

  const download = new URL(req.url).searchParams.has("download") || !INLINE.has(file.mime);
  const encoded = encodeURIComponent(file.name);
  const ascii = file.name.replace(/[^\x20-\x7e]|["\\]/g, "_");
  return new Response(new Uint8Array(file.data), {
    headers: {
      "Content-Type": file.mime,
      "Content-Length": String(file.data.length),
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${ascii}"; filename*=UTF-8''${encoded}`,
      "Cache-Control": "private, max-age=3600",
      "X-Content-Type-Options": "nosniff",
      // Uploaded content never runs scripts in the portal origin. Chrome's PDF viewer
      // refuses to load in a sandboxed document, so PDFs get a script-free policy instead.
      "Content-Security-Policy":
        file.mime === "application/pdf" ? "script-src 'none'; object-src 'self'" : "default-src 'none'; img-src 'self'; sandbox",
    },
  });
}
