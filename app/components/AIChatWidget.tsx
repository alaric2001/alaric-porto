"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, ChevronDown } from "lucide-react";
import type { ChatMessage } from "@/app/types";
import { useLang } from "./LangProvider";

function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("> ")) return <div key={i} className="terminal-text text-xs my-0.5">{renderInline(line.slice(2))}</div>;
    if (line.startsWith("---")) return <hr key={i} className="border-white/10 my-2" />;
    if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-white mt-2 mb-0.5">{line.slice(2, -2)}</p>;
    if (line === "") return <div key={i} className="h-1" />;
    return <p key={i} className="text-xs text-slate-300 leading-relaxed">{renderInline(line)}</p>;
  });
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-cyan-300">{part.slice(1, -1)}</code>;
    return <span key={i}>{part}</span>;
  });
}

export default function AIChatWidget() {
  const { lang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset welcome message when language changes
  useEffect(() => {
    const welcomeContent = lang === "en"
      ? "Hello! I'm the AI assistant for **Alaric Rasendriya Aniko's** portfolio — powered by IBM Granite simulation.\n\nI can answer questions about his profile, projects, skills, and publications — or demonstrate agentic capabilities like entity extraction.\n\nTry one of the quick prompts below!"
      : "Halo! Saya asisten AI portofolio **Alaric Rasendriya Aniko**, disimulasikan dengan IBM Granite.\n\nSaya bisa menjawab pertanyaan tentang profil, proyek, keahlian, dan publikasi Alaric — atau mendemonstrasikan kemampuan agentic seperti ekstraksi entitas.\n\nCoba salah satu prompt di bawah!";
    setMessages([{ id: "welcome", role: "assistant", content: welcomeContent, timestamp: new Date() }]);
  }, [lang]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { id: `user-${Date.now()}`, role: "user", content: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg, { id: "typing", role: "assistant", content: "", timestamp: new Date(), isTyping: true }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, lang }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev.filter((m) => m.id !== "typing"), { id: `ai-${Date.now()}`, role: "assistant" as const, content: data.message ?? "Maaf, terjadi kesalahan.", timestamp: new Date() }]);
    } catch {
      setMessages((prev) => [...prev.filter((m) => m.id !== "typing"), { id: `err-${Date.now()}`, role: "assistant" as const, content: lang === "en" ? "Cannot connect to server. Please try again." : "Tidak dapat terhubung ke server. Coba lagi.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, lang]);

  const QUICK_PROMPTS = [
    t("chat", "suggestWho"),
    t("chat", "suggestSkills"),
    t("chat", "suggestProject"),
  ];

  return (
    <>
      <motion.button initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.5, type: "spring", stiffness: 200 }} onClick={() => setIsOpen((v) => !v)} style={{ width: 52, height: 52 }}
        className={`fixed bottom-5 right-5 z-40 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? "bg-slate-800 border border-white/10 text-slate-300" : "bg-gradient-to-br from-blue-600 to-violet-600 text-white glow-blue"}`}
        aria-label={isOpen ? "Close chat" : "Open AI Assistant"}
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><ChevronDown size={20} /></motion.div>
            : <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="relative">
              <Bot size={22} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
            </motion.div>
          }
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div key="chat-window" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-50 glass-card overflow-hidden flex flex-col bottom-[72px] left-4 right-4 sm:left-auto sm:right-5 sm:w-96 max-h-[70vh] sm:max-h-[500px]"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-violet-600/20 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center flex-shrink-0"><Bot size={16} className="text-white" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{t("chat", "headerTitle")}</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1"><Sparkles size={9} className="text-amber-400" />{t("chat", "headerSub")}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-7 h-7 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"><X size={13} /></button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3 min-h-0">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"><Bot size={11} className="text-white" /></div>}
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2.5 ${msg.role === "user" ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-tr-sm" : "bg-white/8 backdrop-blur-sm border border-white/10 rounded-tl-sm"}`}>
                    {msg.isTyping
                      ? <div className="flex items-center gap-1 py-1 px-1">{[0, 1, 2].map((d) => <div key={d} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />)}</div>
                      : msg.role === "user" ? <p className="text-xs text-white">{msg.content}</p>
                        : <div className="space-y-0.5">{renderMarkdown(msg.content)}</div>
                    }
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-3 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto custom-scrollbar flex-shrink-0">
              {QUICK_PROMPTS.map((prompt) => (
                <button key={prompt} onClick={() => sendMessage(prompt)} disabled={isLoading} className="flex-shrink-0 px-2.5 py-1 rounded-lg glass border border-white/10 text-[10px] text-slate-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50">
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex items-center gap-2 p-3 border-t border-white/10 flex-shrink-0">
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t("chat", "placeholder")} disabled={isLoading}
                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all disabled:opacity-50"
              />
              <button type="submit" disabled={isLoading || !input.trim()} className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white hover:from-blue-500 hover:to-violet-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg">
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
