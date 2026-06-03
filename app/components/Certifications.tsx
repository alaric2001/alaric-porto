"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import type { Certification } from "@/app/types";
import { useLang } from "./LangProvider";
import { useAchievement } from "./AchievementProvider";

const BADGE_COLORS: Record<string, string> = {
  AI: "from-violet-600 to-purple-700", BNSP: "from-emerald-600 to-teal-700",
  React: "from-cyan-600 to-blue-700", Fullstack: "from-orange-600 to-red-700", Laravel: "from-red-600 to-rose-700",
};

export default function Certifications({ certifications }: { certifications: Certification[] }) {
  const { lang, t } = useLang();
  const { unlock } = useAchievement();
  return (
    <section id="certifications" className="section-padding max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t("sections", "certsTitle")}</h2>
        <p className="text-slate-400 mb-10">{t("sections", "certsDesc")}</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert, i) => {
          const gradient = cert.badge ? BADGE_COLORS[cert.badge] ?? "from-blue-600 to-violet-700" : "from-blue-600 to-violet-700";
          const description = lang === "en" ? cert.descriptionEn : cert.description;
          return (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="glass-card p-5 flex flex-col gap-4 hover:bg-white/5 transition-all duration-300 group">
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}><Award size={18} className="text-white" /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-blue-300 transition-colors">{cert.title}</h3>
                  <p className="text-xs text-blue-400 mt-0.5">{cert.issuer}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed flex-1">{description}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-slate-500"><Calendar size={11} />{cert.date}</span>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" onClick={() => unlock("verified")} className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-400 transition-colors">
                    <ExternalLink size={12} />{t("cert", "verifyLink")}
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
