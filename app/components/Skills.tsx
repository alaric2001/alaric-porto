"use client";

import { motion } from "framer-motion";
import { Code2, Monitor, Server, Cloud } from "lucide-react";
import type { SkillGroup } from "@/app/types";
import { useLang } from "./LangProvider";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = { Code2, Monitor, Server, Cloud };
const GRADIENT_MAP: Record<number, string> = {
  0: "from-blue-500/20 to-blue-600/10 border-blue-500/20",
  1: "from-violet-500/20 to-violet-600/10 border-violet-500/20",
  2: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20",
  3: "from-orange-500/20 to-orange-600/10 border-orange-500/20",
};
const ICON_COLOR: Record<number, string> = { 0: "text-blue-400", 1: "text-violet-400", 2: "text-emerald-400", 3: "text-orange-400" };

export default function Skills({ skills }: { skills: SkillGroup[] }) {
  const { lang, t } = useLang();

  return (
    <section id="skills" className="section-padding max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t("sections", "skillsTitle")}</h2>
        <p className="text-slate-400 mb-10">{t("sections", "skillsDesc")}</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((group, i) => {
          const Icon = ICON_MAP[group.icon] ?? Code2;
          return (
            <motion.div key={group.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`glass-card p-5 bg-gradient-to-br ${GRADIENT_MAP[i]} border`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl glass flex items-center justify-center ${ICON_COLOR[i]}`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold text-white text-sm">{lang === "en" ? group.categoryEn : group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="px-2 py-1 rounded-lg glass text-xs text-slate-300 border border-white/5">{item}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
