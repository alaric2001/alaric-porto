"use client";

import { Globe } from "lucide-react";
import { useLang } from "./LangProvider";

export default function LangToggle() {
  const { lang, toggle } = useLang();

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 h-9 px-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
      aria-label={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
    >
      <Globe size={13} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
      <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors tracking-wider">
        {lang === "id" ? (
          <>
            <span className="text-blue-400">ID</span>
            <span className="text-slate-600 mx-0.5">/</span>
            <span>EN</span>
          </>
        ) : (
          <>
            <span>ID</span>
            <span className="text-slate-600 mx-0.5">/</span>
            <span className="text-blue-400">EN</span>
          </>
        )}
      </span>
    </button>
  );
}
