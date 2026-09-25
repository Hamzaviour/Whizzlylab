"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Send,
  X,
  Bot,
  User,
  RotateCcw,
  Calendar,
  ExternalLink,
  ChevronDown,
  MessageSquare,
  Check,
  Copy,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useCurrency } from "@/lib/currency";

interface SourceCitation {
  title: string;
  url?: string;
}

interface ActionCta {
  text: string;
  url: string;
  label: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SourceCitation[];
  suggestedQuestions?: string[];
  actionCta?: ActionCta;
  engine?: string;
  timestamp: string;
}


/** Cybernetic Neural Core Hologram Shape for Whizzly AI */
function NeuralCoreShape({
  size = 32,
  className = "",
  glow = true,
}: {
  size?: number;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Pulsing Glow Halo */}
      {glow && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00F0FF] via-[#6366f1] to-[#a855f7] opacity-60 blur-md animate-pulse" />
      )}

      {/* Futuristic Cybernetic Quantum Core SVG */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_0_10px_rgba(0,240,255,0.7)]"
      >
        <defs>
          <linearGradient id="neuralCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="neuralRingGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>

        {/* Outer Rotating Dotted Orbital Ring */}
        <circle
          cx="24"
          cy="24"
          r="21"
          stroke="url(#neuralRingGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          className="animate-[spin_12s_linear_infinite]"
        />

        {/* Counter-rotating Inner Hexagonal Geometry */}
        <polygon
          points="24,6 39,15 39,33 24,42 9,33 9,15"
          stroke="url(#neuralCoreGrad)"
          strokeWidth="1.2"
          strokeDasharray="6 4"
          fill="url(#neuralCoreGrad)"
          fillOpacity="0.12"
          className="animate-[spin_18s_linear_infinite_reverse]"
          style={{ transformOrigin: "24px 24px" }}
        />

        {/* Inner Diamond Core Shard */}
        <polygon
          points="24,11 36,24 24,37 12,24"
          fill="url(#neuralCoreGrad)"
          fillOpacity="0.45"
          stroke="#00F0FF"
          strokeWidth="1.5"
        />

        {/* Quantum Center Node */}
        <circle cx="24" cy="24" r="4.5" fill="#ffffff" />
        <circle
          cx="24"
          cy="24"
          r="7"
          stroke="#00F0FF"
          strokeWidth="1.5"
          className="animate-ping opacity-40"
          style={{ transformOrigin: "24px 24px" }}
        />

        {/* Satellite Nodes */}
        <circle cx="24" cy="6" r="2.5" fill="#00F0FF" />
        <circle cx="39" cy="24" r="2.5" fill="#a855f7" />
        <circle cx="24" cy="42" r="2.5" fill="#00F0FF" />
        <circle cx="9" cy="24" r="2.5" fill="#38bdf8" />
      </svg>
    </div>
  );
}

export default function WhizzlyChatbot() {
  const { currency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle user submitting message
  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setHasInteracted(true);
    setInput("");

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    // Scroll smoothly only when the user submits their message so the prompt is visible
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: newHistory.map((m) => ({ role: m.role, content: m.content })),
          currency,
        }),
      });

      if (!response.ok) {
        throw new Error("Chat service unavailable");
      }

      const data = await response.json();

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "I encountered an issue processing your request. Please try again.",
        sources: data.sources || [],
        suggestedQuestions: data.suggestedQuestions || [],
        actionCta: data.actionCta,
        engine: data.engine,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          "I apologize, but I'm currently unable to reach the neural gateway. You can schedule a call directly at **/schedule** or call us at **+1 (424) 451-0714**.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionCta: {
          text: "Schedule directly with our Lead AI Engineer:",
          url: "/schedule",
          label: "📅 Book Discovery Call",
        },
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([]);
    setHasInteracted(false);
  };

  // Helper to render markdown-like bold, lists, and links simply
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Heading 3 / 4
      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-bold text-white text-base mt-2 mb-1">
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("#### ")) {
        return (
          <h5 key={idx} className="font-semibold text-purple-300 text-sm mt-2 mb-1">
            {line.replace("#### ", "")}
          </h5>
        );
      }
      // Bullet list
      if (line.startsWith("- ") || line.startsWith("* ")) {
        const itemText = line.substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-sm text-slate-200">
            <span className="text-purple-400 mt-1">•</span>
            <span>{parseInlineStyles(itemText)}</span>
          </div>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      // Normal paragraph
      return (
        <p key={idx} className="text-sm text-slate-200 leading-relaxed my-0.5">
          {parseInlineStyles(line)}
        </p>
      );
    });
  };

  // Parses **bold**, `code`, and [links](url)
  const parseInlineStyles = (text: string) => {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith("**") && token.endsWith("**")) {
        parts.push(
          <strong key={match.index} className="font-semibold text-white">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith("`") && token.endsWith("`")) {
        parts.push(
          <code
            key={match.index}
            className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-cyan-300 font-mono text-xs"
          >
            {token.slice(1, -1)}
          </code>
        );
      } else if (token.startsWith("[") && token.includes("](")) {
        const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          parts.push(
            <a
              key={match.index}
              href={linkMatch[2]}
              target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
              rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-medium transition-colors inline-flex items-center gap-0.5"
            >
              {linkMatch[1]}
              {linkMatch[2].startsWith("http") && <ExternalLink className="w-3 h-3 inline" />}
            </a>
          );
        }
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <>
      {/* ── Floating Launcher Trigger ────────────────────────────────────────── */}
      <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-center gap-1.5 pointer-events-auto">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0518]/95 border border-cyan-400/30 shadow-[0_4px_20px_rgba(0,240,255,0.25)] backdrop-blur-xl cursor-pointer hover:border-cyan-400/60 transition-all group select-none whitespace-nowrap"
              onClick={() => setIsOpen(true)}
            >
              <NeuralCoreShape size={12} glow={false} />
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-200 group-hover:text-white transition-colors tracking-wide">
                Ask Whizzly AI
              </span>
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className={`relative flex items-center justify-center w-14 h-14 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.35)] transition-all duration-300 ${
            isOpen
              ? "bg-[#140628] border border-cyan-400/50 text-white"
              : "bg-gradient-to-br from-[#0c051a] via-[#150a2e] to-[#0a1832] text-white border border-cyan-400/40"
          }`}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        >
          {/* Ambient energy ring behind button */}
          {!isOpen && (
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#00F0FF] via-[#6366f1] to-[#a855f7] opacity-40 blur-md animate-pulse" />
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 flex items-center justify-center"
              >
                <X className="w-6 h-6 text-cyan-300" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 flex items-center justify-center"
              >
                <NeuralCoreShape size={34} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat Modal / Drawer ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-24 md:inset-auto md:bottom-24 md:right-8 z-50 md:w-[440px] h-[580px] max-h-[82vh] flex flex-col rounded-3xl bg-[#090714]/95 border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(99,102,241,0.18)] backdrop-blur-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-gradient-to-r from-purple-950/30 via-transparent to-cyan-950/20">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 shadow-inner">
                  <Image
                    src="/whizzly-icon-crisp.png"
                    alt="Whizzly AI"
                    width={24}
                    height={24}
                    unoptimized
                    className="w-6 h-6 object-contain filter drop-shadow-[0_1px_6px_rgba(99,102,241,0.5)]"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-[#090314]"></span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-sm tracking-tight font-sans">Whizzly AI</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      RAG Active
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-light">Solutions Architect</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={handleClear}
                    title="Clear Conversation"
                    className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Conversation Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.length === 0 ? (
                <div className="flex flex-col h-full items-center justify-center text-center px-4 py-8 select-none">
                  {/* Whizzly Lab Icon with Soft Ambient Glow */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle,rgba(99,102,241,0.35)_0%,rgba(0,240,255,0.15)_50%,transparent_75%)] blur-2xl scale-150 pointer-events-none" />
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                      <Image
                        src="/whizzly-icon-crisp.png"
                        alt="Whizzly AI"
                        width={42}
                        height={42}
                        unoptimized
                        className="w-10 h-10 object-contain filter drop-shadow-[0_2px_10px_rgba(99,102,241,0.6)]"
                        priority
                      />
                    </div>
                  </div>

                  <h3 className="text-white font-medium text-lg tracking-tight font-sans">
                    Welcome to Whizzly AI
                  </h3>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-[0_4px_15px_rgba(147,51,234,0.3)]"
                          : "bg-white/[0.04] border border-white/[0.09] text-slate-100 rounded-bl-none shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <div className="space-y-2">
                          {renderFormattedContent(msg.content)}

                          {/* Source Citations */}
                          {msg.sources && msg.sources.length > 0 && (
                            <div className="pt-2.5 mt-2.5 border-t border-white/[0.08] flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                                Sources:
                              </span>
                              {msg.sources.map((src, i) => (
                                <Link
                                  key={i}
                                  href={src.url || "#"}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-[11px] text-cyan-300 hover:text-cyan-200 hover:border-cyan-400/50 transition-colors"
                                >
                                  <span>{src.title}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </Link>
                              ))}
                            </div>
                          )}

                          {/* Action CTA Button */}
                          {msg.actionCta && (
                            <div className="pt-2 mt-2">
                              <Link
                                href={msg.actionCta.url}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md transition-all"
                              >
                                <span>{msg.actionCta.label}</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 px-1 mt-1">
                      <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                      {msg.role === "assistant" && (
                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="text-slate-500 hover:text-slate-300 transition-colors"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Follow-up Question Chips */}
                    {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                        {msg.suggestedQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(q)}
                            className="px-2.5 py-1 rounded-full bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/20 hover:border-purple-400 text-[11px] text-slate-300 hover:text-white transition-all text-left"
                          >
                            + {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] w-fit">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-xs text-slate-400">Analyzing knowledge base...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/[0.08] bg-[#060410]/90">
              <div className="flex items-end gap-2 bg-white/[0.03] border border-white/10 focus-within:border-indigo-400/50 rounded-2xl p-1.5 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about AI, systems architecture, or engineering..."
                  rows={1}
                  className="flex-1 bg-transparent border-0 text-white placeholder-slate-400 text-xs md:text-sm px-3 py-1.5 focus:outline-none resize-none max-h-24 min-h-[36px] scrollbar-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                    input.trim() && !isLoading
                      ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] cursor-pointer hover:opacity-90"
                      : "bg-white/5 text-slate-500 cursor-not-allowed"
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Actions Footer */}
              <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Link
                    href="/schedule"
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    <Calendar className="w-3 h-3 text-purple-400" />
                    <span>Book Call</span>
                  </Link>
                  <span>•</span>
                  <a
                    href="tel:+14244510714"
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    <span>+1 (424) 451-0714</span>
                  </a>
                </div>
                <span className="text-[10px] text-slate-400">Whizzly Lab Studio</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
