"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Star } from "lucide-react";
import type { Education } from "@/app/types";
import { useLang } from "./LangProvider";

export default function EducationSection({ education }: { education: Education[] }) {
  const { lang, t } = useLang();
  return (
    <section id="education" className="section-padding max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t("sections", "eduTitle")}</h2>
        <p className="text-slate-400 mb-10">{t("sections", "eduDesc")}</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 gap-5">
        {education.map((edu, i) => (
          <motion.div key={edu.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="glass-card p-6 hover:bg-white/5 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center shadow-lg flex-shrink-0"><GraduationCap size={22} className="text-white" /></div>
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">{edu.institution}</h3>
                  <p className="text-blue-400 text-sm font-medium">{lang === "en" ? edu.degreeEn : edu.degree}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar size={11} />{edu.period}</span>
                <span className="flex items-center gap-1"><MapPin size={11} />{edu.location}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 w-fit">
                <Star size={13} className="text-amber-400" />
                <span className="text-sm font-semibold text-amber-300">{t("edu", "gpaLabel")} {edu.gpa}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
