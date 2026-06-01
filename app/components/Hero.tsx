"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Linkedin, Github, Gitlab, MapPin, Download } from "lucide-react";
import type { Profile } from "@/app/types";
import { useLang } from "./LangProvider";

export default function Hero({ profile }: { profile: Profile }) {
  const { lang, t } = useLang();
  const summary = lang === "en" ? profile.summaryEn : profile.summary;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center w-full">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex mb-8">
            <span className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass border border-white/10 text-slate-500 text-xs">
              <MapPin size={13} />
              <span>{profile.location}</span>
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">{profile.name.split(" ")[0]} </span>
            <span className="gradient-text">{profile.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl sm:text-2xl font-medium text-slate-400 mb-6">
            {t("hero", "title")}
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed mb-10">
            {summary}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:from-blue-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-blue-500/20 glow-blue">
              <Mail size={15} /> {t("hero", "contactBtn")}
            </a>
            <a href="https://drive.google.com/file/d/1r7DK1MKIOm-399PDCbRMwGvA31kBs4Xm/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/15 text-slate-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-200">
              <Download size={15} /> {t("hero", "downloadBtn")}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Linkedin, label: "LinkedIn", href: profile.links.linkedin, color: "hover:text-blue-400" },
              { icon: Github, label: "GitHub", href: profile.links.github, color: "hover:text-white" },
              { icon: Gitlab, label: "GitLab", href: profile.links.gitlab, color: "hover:text-orange-400" },
              { icon: Mail, label: profile.email, href: `mailto:${profile.email}`, color: "hover:text-emerald-400" },
              { icon: MessageCircle, label: "WhatsApp", href: profile.links.whatsapp, color: "hover:text-green-400" },
            ].map(({ icon: Icon, label, href, color }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className={`flex items-center gap-2 px-3 py-2 rounded-xl glass border border-white/10 text-slate-400 text-xs ${color} transition-all duration-200 hover:bg-white/5 hover:border-white/20`}>
                <Icon size={13} />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} className="relative z-10 pb-8 flex flex-col items-center gap-1 text-slate-600">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-slate-600 animate-pulse" />
        <span className="text-xs">{t("hero", "scroll")}</span>
      </motion.div>
    </section>
  );
}
