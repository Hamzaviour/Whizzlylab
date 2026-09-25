import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Whizzly Lab: AI & Full-Stack Engineering Studio",
    short_name: "Whizzly Lab",
    description:
      "Elite AI engineering studio and software collective delivering web development, workflow automation, RAG systems, SaaS products, apps, and custom AI integration.",
    start_url: "/",
    display: "standalone",
    background_color: "#05010f",
    theme_color: "#05010f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
