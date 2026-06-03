"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Award } from "lucide-react";
import type { Publication } from "@/app/types";
import { useLang } from "./LangProvider";
import { useAchievement } from "./AchievementProvider";

const INDEXING_BADGE: Record<string, { bg: string; text: string; border: string }> = {
  "IEEE Scopus": { bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-500/25" },
  "Sinta 2": { bg: "bg-orange-500/15", text: "text-orange-300", border: "border-orange-500/25" },
};

export default function Publications({ publications }: { publications: Publication[] }) {
  const { t } = useLang();
  const { unlock } = useAchievement();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          unlock("scholar");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [unlock]);

  return (
    <section id="publications" ref={sectionRef} className="section-padding max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t("sections", "publicationsTitle")}</h2>
        <p className="text-slate-400 mb-4">{t("sections", "publicationsDesc")}</p>
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="badge badge-blue"><Award size={11} />{t("sections", "publicationsBadge4")}</span>
          <span className="badge badge-orange"><Award size={11} />{t("sections", "publicationsBadge1")}</span>
        </div>
      </motion.div>
      <div className="space-y-4">
        {publications.map((pub, i) => {
          const badge = pub.indexing ? INDEXING_BADGE[pub.indexing] : null;
          return (
            <motion.div key={pub.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="glass-card p-5 flex gap-4 hover:bg-white/5 transition-all duration-300 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors"><BookOpen size={18} /></div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-blue-300 transition-colors flex-1">{pub.title}</h3>
                  {pub.url && <a href={pub.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-slate-500 hover:text-blue-400 transition-colors"><ExternalLink size={14} /></a>}
                </div>
                <p className="text-xs text-slate-400 mb-2">{pub.journal}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-500">{pub.year}</span>
                  {badge && <span className={`badge ${badge.bg} ${badge.text} border ${badge.border}`}>{pub.indexing}</span>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
