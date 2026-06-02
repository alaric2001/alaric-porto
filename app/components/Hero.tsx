"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Linkedin, Github, Gitlab, MapPin, Download } from "lucide-react";

function WhatsAppIcon({ size = 13 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 448 512">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}
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

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 blur-md opacity-50 scale-110" />
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-0.5 bg-gradient-to-br from-blue-500 to-violet-600">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/Alaric casual.png"
                    alt={profile.name}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="inline-flex mb-6">
            <span className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass border border-white/10 text-slate-500 text-xs">
              <MapPin size={13} />
              <span>{profile.location}</span>
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">{profile.name.split(" ")[0]} </span>
            <span className="gradient-text">{profile.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-xl sm:text-2xl font-medium text-slate-400 mb-6">
            {t("hero", "title")}
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed mb-10">
            {summary}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:from-blue-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-blue-500/20 glow-blue">
              <Mail size={15} /> {t("hero", "contactBtn")}
            </a>
            <a href="/Alaric_curriculum vitae_2026_.pdf" download="Alaric_curriculum vitae_2026_.pdf" className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/15 text-slate-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-200">
              <Download size={15} /> {t("hero", "downloadBtn")}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Linkedin, label: "LinkedIn", href: profile.links.linkedin, color: "hover:text-blue-400" },
              { icon: Github, label: "GitHub", href: profile.links.github, color: "hover:text-white" },
              { icon: Gitlab, label: "GitLab", href: profile.links.gitlab, color: "hover:text-orange-400" },
              { icon: Mail, label: profile.email, href: `mailto:${profile.email}`, color: "hover:text-emerald-400" },
              { icon: WhatsAppIcon, label: "WhatsApp", href: profile.links.whatsapp, color: "hover:text-green-400" },
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
