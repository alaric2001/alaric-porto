"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, Calendar } from "lucide-react";
import { useLang } from "./LangProvider";

const ITEMS = [
  {
    title: "AI Chatbot System",
    desc: "Sistem chat bot AI berbasis cloud — REST API endpoint AWS Lambda dengan pemrosesan natural language.",
    descEn: "Cloud-based AI chatbot system — AWS Lambda REST API endpoint with natural language processing.",
    url: "https://l2quu3tnw6.execute-api.ap-southeast-1.amazonaws.com/",
    period: "Apr – Mei 2026",
    tag: "AWS Lambda · AI",
  },
  {
    title: "iReport",
    desc: "Aplikasi pelaporan berbasis web — proyek tugas besar kuliah S1.",
    descEn: "Web-based reporting application — undergraduate final course project.",
    url: "https://ireport-alaric.netlify.app/",
    period: "Des 2022",
    tag: "Web App · College Project",
  },
];

export default function OtherPortfolio() {
  const { lang, t } = useLang();

  return (
    <section id="other-portfolio" className="section-padding max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t("sections", "otherPortfolioTitle")}</h2>
        <p className="text-slate-400 mb-10">{t("sections", "otherPortfolioDesc")}</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5">
        {ITEMS.map((item, i) => (
          <motion.a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="glass-card p-5 flex flex-col gap-3 hover:bg-white/5 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Globe size={18} className="text-blue-400" />
              </div>
              <ExternalLink size={14} className="text-slate-500 group-hover:text-blue-400 transition-colors mt-1 flex-shrink-0" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{lang === "en" ? item.descEn : item.desc}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="flex items-center gap-1 text-xs text-slate-500"><Calendar size={11} />{item.period}</span>
              <span className="text-[10px] text-slate-600 font-mono">{item.tag}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
