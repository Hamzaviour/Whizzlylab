"use client";

import React from "react";
import WavyTicker from "./WavyTicker";

// ── Accurate Brand SVGs for the 38 requested technologies ────────────
export function TechLogo({
  name,
  className = "w-6 h-6",
}: {
  name: string;
  className?: string;
}) {
  const n = name.toLowerCase().replace(/[\s\.\/\-]/g, "");

  // 1. GitHub
  if (n === "github") {
    return (
      <svg className={`${className} text-white`} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }

  // 2. Python
  if (n === "python") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M11.91 2c-5.18 0-4.86 2.25-4.86 2.25l.01 2.33h4.94v.7H5.06S2 7.02 2 12.23c0 5.2 2.67 5.01 2.67 5.01h1.59v-2.23s-.09-2.67 2.62-2.67h4.51s2.53.04 2.53-2.47V4.47S16.31 2 11.91 2zm-2.65 1.48a.86.86 0 11.01 1.72.86.86 0 01-.01-1.72z" fill="#387EB8" />
        <path d="M12.09 22c5.18 0 4.86-2.25 4.86-2.25l-.01-2.33h-4.94v-.7h6.93s3.06.26 3.06-4.95c0-5.2-2.67-5.01-2.67-5.01h-1.59v2.23s.09 2.67-2.62 2.67h-4.51s-2.53-.04-2.53 2.47v4.66s-.39 2.47 4.01 2.47zm2.65-1.48a.86.86 0 11-.01-1.72.86.86 0 01.01 1.72z" fill="#FFE052" />
      </svg>
    );
  }

  // 3. Docker
  if (n === "docker") {
    return (
      <svg className={`${className} text-[#2496ED]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.714h2.118a.186.186 0 00.186-.185V6.289a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.888c0 .102.082.185.185.185zm-2.954 0h2.119a.186.186 0 00.186-.185V6.289a.186.186 0 00-.186-.186H8.075a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185zm0 2.716h2.119a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186H8.075a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186zm-2.955 0H7.24a.185.185 0 00.185-.186V9.006a.185.185 0 00-.185-.186H5.12a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186zm5.909 0h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm-8.864 0h2.119a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186H2.211a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186zm19.646.612c-.224-.163-.984-.575-2.074-.537-.589.02-1.164.152-1.706.392-.325-.39-.775-.623-1.282-.623h-8.083c-.31 0-.56.25-.56.56v3.29c0 .77.29 1.48.77 2.02.02.03.04.05.07.07 1.09 1.04 2.65 1.63 4.41 1.63 4.19 0 7.64-3.12 8.35-7.23.08-.47.1-.47.1-.572z" />
      </svg>
    );
  }

  // 4. n8n
  if (n === "n8n") {
    return (
      <svg className={`${className} text-[#EA4B71]`} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="3" />
        <circle cx="19" cy="7" r="3" />
        <circle cx="19" cy="17" r="3" />
        <path d="M7.8 11h8.4M7.5 13.5l8.5 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  // 5. OpenAI
  if (n === "openai") {
    return (
      <svg className={`${className} text-[#10A37F]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 8.937a4.485 4.485 0 012.366-1.973V12.6a.766.766 0 00.388.677l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0l-4.83-2.786A4.504 4.504 0 012.34 8.937zm16.597 3.855l-5.833-3.387L15.119 8.24a.076.076 0 01.071 0l4.83 2.791a4.494 4.494 0 01-.674 8.105v-5.659a.79.79 0 00-.409-.685zm2.011-3.021l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 10.27V7.934a.08.08 0 01.033-.061l4.835-2.79a4.5 4.5 0 016.666 4.673zM9.409 13.064l-2.02-1.168a.071.071 0 01-.038-.052V6.261a4.494 4.494 0 017.37-3.453l-.142.08-4.778 2.758a.795.795 0 00-.392.681v6.737zm1.18-1.579l2.766-1.602 2.766 1.6v3.208l-2.766 1.602-2.766-1.602V11.485z" />
      </svg>
    );
  }

  // 6. Anthropic
  if (n === "anthropic") {
    return (
      <svg className={`${className} text-[#D97757]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.827 3.5h3.407L24 20.5h-3.407l-1.92-4.475H11.52L9.6 20.5H6.173L13.827 3.5zm2.053 9.775L14.44 9.94l-1.44 3.335h2.88zM4.173 3.5h3.407L0 20.5h3.407L4.173 3.5z" />
      </svg>
    );
  }

  // 7. Ollama
  if (n === "ollama") {
    return (
      <svg className={`${className} text-white`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.2.5 2.3 1.3 3.1L8 16c0 3 2 5.5 5 5.5s5-2.5 5-5.5l-.8-6.4c.8-.8 1.3-1.9 1.3-3.1C18.5 4 16.5 2 14 2h-2zm-1 4.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 7.5a1 1 0 112 0 1 1 0 01-2 0z" />
      </svg>
    );
  }

  // 8. LlamaIndex
  if (n === "llamaindex") {
    return (
      <svg className={`${className} text-[#A855F7]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2l6.8 3.8-3.3 1.8-6.8-3.8 3.3-1.8zm-7 4.9l6 3.3v7.3l-6-3.3V9.1zm8 10.6v-7.3l6-3.3v7.3l-6 3.3z" />
      </svg>
    );
  }

  // 9. Pinecone
  if (n === "pinecone") {
    return (
      <svg className={`${className} text-white`} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="6" r="3.2" />
        <circle cx="6.5" cy="12" r="3.2" />
        <circle cx="17.5" cy="12" r="3.2" />
        <circle cx="12" cy="18" r="3.2" />
      </svg>
    );
  }

  // 10. Chroma
  if (n === "chroma" || n === "chromadb") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="8" cy="8" r="5" fill="#FF4F00" opacity="0.9" />
        <circle cx="16" cy="8" r="5" fill="#00D2FF" opacity="0.9" />
        <circle cx="12" cy="15" r="5" fill="#9945FF" opacity="0.9" />
      </svg>
    );
  }

  // 11. Supabase
  if (n === "supabase") {
    return (
      <svg className={`${className} text-[#3ECF8E]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.435 2.193a1.5 1.5 0 00-2.316.645L6.082 14.86a1.5 1.5 0 001.408 2.012h5.727l-2.652 4.935a1.5 1.5 0 002.316 1.765l8.037-12.022a1.5 1.5 0 00-1.408-2.012h-5.727l2.652-7.345z" />
      </svg>
    );
  }

  // 12. Hugging Face
  if (n === "huggingface") {
    return (
      <svg className={`${className} text-[#FFD21E]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm-3 8.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm8 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-5 7c-2.33 0-4.32-1.45-5.12-3.5h10.24c-.8 2.05-2.79 3.5-5.12 3.5z" />
      </svg>
    );
  }

  // 13. LangSmith
  if (n === "langsmith" || n === "langchain") {
    return (
      <svg className={`${className} text-[#22C55E]`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 3v18M3 12h18M5 5l14 14M5 19L19 5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      </svg>
    );
  }

  // 14. TypeScript
  if (n === "typescript" || n === "ts") {
    return (
      <svg className={`${className} text-[#3178C6]`} viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="4.5" />
        <path d="M8 8h5M10.5 8v8M14 12c.5-.8 1.5-1 2.2-.6.7.4 1 1.2.6 2-.4.7-1.4 1-2.2 1.4-.8.4-1.2 1.2-.8 2 .4.7 1.4 1 2.2.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  // 15. Tailwind CSS
  if (n === "tailwindcss" || n === "tailwind") {
    return (
      <svg className={`${className} text-[#06B6D4]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.975 12 6.001 12z" />
      </svg>
    );
  }

  // 16. Shadcn/ui
  if (n === "shadcnui" || n === "shadcn") {
    return (
      <svg className={`${className} text-white`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 20L20 4M4 12L12 4M12 20L20 12" strokeLinecap="round" />
      </svg>
    );
  }

  // 17. Radix UI
  if (n === "radixui" || n === "radix") {
    return (
      <svg className={`${className} text-white`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h3V3H6zm6 0a3 3 0 000 6h3V3h-3zm0 9a3 3 0 100 6 3 3 0 000-6z" />
      </svg>
    );
  }

  // 18. Vite
  if (n === "vite") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.5 3.5l-9.2 17.2a.5.5 0 01-.88 0L2.5 3.5a.5.5 0 01.62-.71l8.5 3.5a.5.5 0 00.38 0l8.5-3.5a.5.5 0 01.62.71z" fill="#646CFF" />
        <path d="M12 7l-2 5h4l-2 5" stroke="#FFE052" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  // 19. Zustand
  if (n === "zustand") {
    return (
      <svg className={`${className} text-[#F59E0B]`} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="6.5" cy="6.5" r="3.2" />
        <circle cx="17.5" cy="6.5" r="3.2" />
        <circle cx="9.5" cy="11" r="1.2" fill="#000" />
        <circle cx="14.5" cy="11" r="1.2" fill="#000" />
        <path d="M10.5 14h3" stroke="#000" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  // 20. Redux
  if (n === "redux") {
    return (
      <svg className={`${className} text-[#764ABC]`} viewBox="0 0 24 24" fill="currentColor">
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(30 12 12)" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(90 12 12)" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(150 12 12)" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="1.8" />
      </svg>
    );
  }

  // 21. HTML5
  if (n === "html5" || n === "html") {
    return (
      <svg className={`${className} text-[#E34F26]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 2l1.8 18.2L12 22l7.2-1.8L21 2H3zm14.5 5.5H8.7l.2 2h8.2l-.6 6.3L12 17.1l-4.5-1.3-.3-3.3h2l.2 1.8 2.6.7 2.6-.7.3-3.2H6.5L5.8 4.5h12.4l-.7 3z" />
      </svg>
    );
  }

  // 22. CSS3
  if (n === "css3" || n === "css") {
    return (
      <svg className={`${className} text-[#1572B6]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 2l1.8 18.2L12 22l7.2-1.8L21 2H3zm14.5 5.5H8.7l.2 2h8.2l-.6 6.3L12 17.1l-4.5-1.3-.3-3.3h2l.2 1.8 2.6.7 2.6-.7.3-3.2H6.5L5.8 4.5h12.4l-.7 3z" />
      </svg>
    );
  }

  // 23. FastAPI
  if (n === "fastapi") {
    return (
      <svg className={`${className} text-[#009688]`} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 4l-4 8h4l-1 8 6-10h-4l1-6h-2z" fill="#fff" />
      </svg>
    );
  }

  // 24. PostgreSQL
  if (n === "postgresql" || n === "postgres") {
    return (
      <svg className={`${className} text-[#4169E1]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C7.5 2 4 4.5 4 8c0 2 1.2 3.8 3 5 .3 1.8 1.5 4 3 5.5.5-1 .8-2 1-3 1.5.3 3 .3 4.5 0 .2 1 .5 2 1 3 1.5-1.5 2.7-3.7 3-5.5 1.8-1.2 3-3 3-5 0-3.5-3.5-6-8.5-6z" />
      </svg>
    );
  }

  // 25. Prisma
  if (n === "prisma") {
    return (
      <svg className={`${className} text-white`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.5 2.5a.6.6 0 00-1 0l-8.7 15.6a.6.6 0 00.5.9h17.4a.6.6 0 00.5-.9L12.5 2.5zM12 5.5l6.5 11.7H5.5L12 5.5z" />
      </svg>
    );
  }

  // 26. MongoDB
  if (n === "mongodb") {
    return (
      <svg className={`${className} text-[#47A248]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C11.5 4.5 7 8 7 13.5c0 4 2.5 7.5 5 8.5 2.5-1 5-4.5 5-8.5C17 8 12.5 4.5 12 2zm0 18.5c-1.8-.8-3.5-3.5-3.5-7 0-3.8 3.5-6.8 3.5-8.5 0 1.7 3.5 4.7 3.5 8.5 0 3.5-1.7 6.2-3.5 7z" />
      </svg>
    );
  }

  // 27. Redis
  if (n === "redis") {
    return (
      <svg className={`${className} text-[#DC382D]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.2L5 8.1v7.8l7 3.9 7-3.9V8.1L12 4.2zm-2 5.8l4 2.3-4 2.3V10z" />
      </svg>
    );
  }

  // 28. Firebase
  if (n === "firebase") {
    return (
      <svg className={`${className} text-[#FFCA28]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.5 18.2L6.8 4.3a.5.5 0 01.9-.2l3.4 6.3-6.6 7.8zm14.3.4L13.7 8.3a.5.5 0 00-.9-.1l-2.4 4.5 8.4 5.9zM12 22l6.8-3.4-6.8-13.8L5.2 18.6 12 22z" />
      </svg>
    );
  }

  // 29. GraphQL
  if (n === "graphql") {
    return (
      <svg className={`${className} text-[#E10098]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.3L5.34 8.5v7l6.66 4.2 6.66-4.2v-7L12 4.3z" />
        <circle cx="12" cy="2" r="2.2" />
        <circle cx="20.66" cy="7" r="2.2" />
        <circle cx="20.66" cy="17" r="2.2" />
        <circle cx="12" cy="22" r="2.2" />
        <circle cx="3.34" cy="17" r="2.2" />
        <circle cx="3.34" cy="7" r="2.2" />
      </svg>
    );
  }

  // 30. Node.js
  if (n === "nodejs" || n === "node") {
    return (
      <svg className={`${className} text-[#5FA04E]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2zm0 2.4L5.5 8.2v7.6L12 19.6l6.5-3.8V8.2L12 4.4z" />
      </svg>
    );
  }

  // 31. Vercel
  if (n === "vercel") {
    return (
      <svg className={`${className} text-white`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L24 22H0L12 2z" />
      </svg>
    );
  }

  // 32. AWS
  if (n === "aws") {
    return (
      <svg className={`${className} text-[#FF9900]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6c-3.5 0-6 1.5-7 3.5l1.8 1C7.5 9 9.3 8 12 8c2.8 0 4.5 1 5.2 2.5l1.8-1C18 7.5 15.5 6 12 6zm-7.5 7.5c2 2.5 5 4 8.5 4 2.8 0 5-1 6.5-2.5l1.5 1.5c-2 2-4.8 3-8 3-4.2 0-7.8-1.8-10-4.8l1.5-1.2z" />
      </svg>
    );
  }

  // 33. Kubernetes
  if (n === "kubernetes" || n === "k8s") {
    return (
      <svg className={`${className} text-[#326CE5]`} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="currentColor" strokeWidth="2.2" />
      </svg>
    );
  }

  // 34. GitHub Actions
  if (n === "githubactions" || n === "actions") {
    return (
      <svg className={`${className} text-[#2088FF]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" />
      </svg>
    );
  }

  // 35. Netlify
  if (n === "netlify") {
    return (
      <svg className={`${className} text-[#00C7B7]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 8l3 12 6 2 6-2 3-12-9-6zm0 3.2L17.5 9 15 18.5 12 19.5l-3-1L6.5 9 12 5.2z" />
      </svg>
    );
  }

  // 36. Render
  if (n === "render") {
    return (
      <svg className={`${className} text-white`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 3h8a5 5 0 015 5c0 2.2-1.4 4-3.5 4.7L20 21h-4l-4-7.5H9V21H6V3zm3 3v5h5a2.5 2.5 0 000-5H9z" />
      </svg>
    );
  }

  // 37. Linux
  if (n === "linux") {
    return (
      <svg className={`${className} text-[#FCC624]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.8 2 8 4 8 6.5c0 1.2.5 2.3 1.2 3.1-.7 1.2-1.2 2.6-1.2 4.2 0 1.8.8 3.5 2 4.7-1 .8-2 1.8-2 3 0 1.4 3 2.5 6 2.5s6-1.1 6-2.5c0-1.2-1-2.2-2-3 1.2-1.2 2-2.9 2-4.7 0-1.6-.5-3-1.2-4.2.7-.8 1.2-1.9 1.2-3.1C16 4 14.2 2 12 2zm-1.5 5a1 1 0 112 0 1 1 0 01-2 0zm3 0a1 1 0 112 0 1 1 0 01-2 0z" />
      </svg>
    );
  }

  // 38. Sentry
  if (n === "sentry") {
    return (
      <svg className={`${className} text-[#906BFF]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.2 2.5a1.2 1.2 0 00-2.4 0v3.1a6.8 6.8 0 00-4.8 4.8H2.9a1.2 1.2 0 000 2.4h3.1a6.8 6.8 0 004.8 4.8v3.1a1.2 1.2 0 002.4 0v-3.1a6.8 6.8 0 004.8-4.8h3.1a1.2 1.2 0 000-2.4h-3.1a6.8 6.8 0 00-4.8-4.8V2.5zm0 5.6a4.4 4.4 0 013.2 3.2h-6.4a4.4 4.4 0 013.2-3.2zm-3.2 5.6h6.4a4.4 4.4 0 01-3.2 3.2 4.4 4.4 0 01-3.2-3.2z" />
      </svg>
    );
  }

  // Fallback high-tech chip
  return (
    <svg className={`${className} text-indigo-300`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </svg>
  );
}

// ── Pill Component for Each Tech (Enlarged icons with 3D glowy blue ring) ────
function TechPill({ name }: { name: string }) {
  return (
    <div className="group flex items-center gap-4 px-5 py-3 rounded-2xl border border-white/[0.09] bg-[#080912]/92 hover:border-indigo-400/50 hover:bg-[#12162a] transition-all duration-300 backdrop-blur-xl shadow-[0_6px_24px_rgba(0,0,0,0.55)] select-none cursor-default">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] border border-[#3b82f6]/30 p-2 group-hover:scale-115 group-hover:bg-white/10 transition-all duration-300 shadow-[0_0_12px_rgba(59,130,246,0.25),inset_0_0_8px_rgba(59,130,246,0.08)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.45),0_0_40px_rgba(59,130,246,0.15),inset_0_0_12px_rgba(59,130,246,0.12)]">
        {/* Subtle 3D blue glow ring */}
        <div className="absolute inset-0 rounded-xl border border-[#3b82f6]/20 group-hover:border-[#3b82f6]/50 transition-colors duration-300" />
        <TechLogo name={name} className="w-8 h-8" />
      </div>
      <span className="text-sm sm:text-[15px] font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors font-sans whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

// ── Tech Lists: Row 1 & Row 2 (38 total items) ───────────────────────
const ROW_1_TECHS = [
  "OpenAI",
  "Anthropic",
  "Ollama",
  "LlamaIndex",
  "Pinecone",
  "Chroma",
  "Supabase",
  "Hugging Face",
  "LangSmith",
  "Python",
  "TypeScript",
  "FastAPI",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
];

const ROW_2_TECHS = [
  "GitHub",
  "n8n",
  "Tailwind CSS",
  "Shadcn/ui",
  "Radix UI",
  "Vite",
  "Zustand",
  "Redux",
  "HTML5",
  "CSS3",
  "Firebase",
  "GraphQL",
  "Node.js",
  "Vercel",
  "GitHub Actions",
  "Netlify",
  "Render",
  "Linux",
  "Sentry",
];

/**
 * TechStackWavyTicker Component
 *
 * Implements the requested Framer Wavy Ticker with 38 technologies:
 * - Enlarged icon sizes (w-6 h-6 in h-9 w-9 frosted icon containers)
 * - Row 1 flows left with a smooth sinusoidal wave
 * - Row 2 flows right with an inverted sinusoidal wave
 * - Hovering decelerates the motion for inspection
 */
export default function TechStackWavyTicker() {
  const row1Items = ROW_1_TECHS.map((tech) => (
    <TechPill key={`r1-${tech}`} name={tech} />
  ));

  const row2Items = ROW_2_TECHS.map((tech) => (
    <TechPill key={`r2-${tech}`} name={tech} />
  ));

  return (
    <section className="relative w-full py-12 sm:py-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[340px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.09)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Subtle top subtitle */}
      <div className="relative z-10 text-center mb-7 px-4">
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-indigo-300/85">
          Enterprise Stack &amp; AI Ecosystem
        </span>
      </div>

      {/* Row 1: Flowing Left with Sine Wave */}
      <div className="relative z-10 w-full mb-4">
        <WavyTicker
          items={row1Items}
          direction="left"
          speed={48}
          slowdownOnHover={0.25}
          waveStyle="wavy"
          waveAmplitude={18}
          waveFrequency={0.005}
          itemSize={72}
          gap={22}
          padding={22}
          fadeEdges={true}
          fadeDistance={14}
        />
      </div>

      {/* Row 2: Flowing Right with Sine Wave */}
      <div className="relative z-10 w-full">
        <WavyTicker
          items={row2Items}
          direction="right"
          speed={42}
          slowdownOnHover={0.25}
          waveStyle="wavy"
          waveAmplitude={18}
          waveFrequency={0.0048}
          itemSize={72}
          gap={22}
          padding={22}
          fadeEdges={true}
          fadeDistance={14}
        />
      </div>
    </section>
  );
}
