import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "llms.txt");
    const content = fs.readFileSync(filePath, "utf-8");
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    return new NextResponse("Whizzly Lab: Elite AI Engineering Studio — Web Development, Automation, RAG, SaaS, Apps & AI Integration (https://whizzlylab.com)", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
