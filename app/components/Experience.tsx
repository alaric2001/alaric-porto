"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import type { Experience } from "@/app/types";
import { useLang } from "./LangProvider";

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const { lang, t } = useLang();

  return (
    <section id="experience" className="section-padding max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t("sections", "experienceTitle")}</h2>
        <p className="text-slate-400 mb-10">{t("sections", "experienceDesc")}</p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-violet-500/30 to-transparent" />
        <div className="space-y-8">
          {experiences.map((exp, i) => {
            const bullets = lang === "en" ? exp.bulletsEn : exp.bullets;
            const role = lang === "en" ? exp.roleEn : exp.role;
            return (
              <motion.div key={exp.id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="relative pl-12 sm:pl-16">
                <div className="absolute left-2 sm:left-3.5 top-5 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Briefcase size={10} className="text-white" />
                </div>
                <div className="glass-card p-6 hover:bg-white/5 transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">{exp.company}</h3>
                      <p className="text-blue-400 font-medium text-sm">{role}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={11} />{exp.period}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} />{exp.location}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {bullets.map((bullet, bi) => (
                      <li key={bi} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
