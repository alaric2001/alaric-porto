"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileCode2, X, Layers, GitBranch, Zap, CheckCircle2, ChevronRight, Calendar, ArrowRight, BookOpen } from "lucide-react";
import type { Project, TechArchitecture } from "@/app/types";
import { useLang } from "./LangProvider";

interface Props { projects: Project[]; architectures: Record<string, TechArchitecture>; }

const STACK_COLOR: Record<string, string> = {
  "React Native": "badge-blue", "Express.js": "badge-green", "React.js": "badge-blue",
  "Next.js": "badge-violet", "Laravel 10": "badge-orange", "Laravel": "badge-orange",
  "MySQL": "badge-blue", "AWS EC2": "badge-orange", "PWA": "badge-violet",
  "Tailwind CSS": "badge-blue", "REST API": "badge-green", "IoT / BLE": "badge-violet",
  "Chart.js": "badge-green",
};
const LAYER_COLOR = ["text-blue-400", "text-violet-400", "text-emerald-400", "text-orange-400"];
const LAYER_BG = ["bg-blue-500/10 border-blue-500/20", "bg-violet-500/10 border-violet-500/20", "bg-emerald-500/10 border-emerald-500/20", "bg-orange-500/10 border-orange-500/20"];

export default function Dokumentasi({ projects, architectures }: Props) {
  const { lang, t } = useLang();
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const arch = activeDoc ? architectures[activeDoc] : null;

  useEffect(() => {
    document.body.style.overflow = activeDoc ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeDoc]);

  return (
    <>
      <section id="projects" className="section-padding max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t("sections", "projectsTitle")}</h2>
          <p className="text-slate-400 mb-10">{t("sections", "projectsDesc")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const bullets = lang === "en" ? project.bulletsEn : project.bullets;
            const subtitle = lang === "en" ? project.subtitleEn : project.subtitle;
            const role = lang === "en" ? project.roleEn : project.role;
            return (
              <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="glass-card p-5 flex flex-col gap-4 hover:bg-white/5 transition-all duration-300 group">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">{project.title}</h3>
                    {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-slate-500 hover:text-blue-400 transition-colors" onClick={(e) => e.stopPropagation()}><ExternalLink size={14} /></a>}
                  </div>
                  <p className="text-xs text-blue-400 font-medium">{subtitle}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar size={10} />{project.period}</span>
                    <span className="text-slate-600">·</span>
                    <span>{role}</span>
                  </div>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-xs text-slate-400">
                      <ChevronRight size={12} className="text-blue-500 flex-shrink-0 mt-0.5" />{bullet}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => <span key={tech} className={`badge text-[10px] py-0.5 ${STACK_COLOR[tech] ?? "badge-blue"}`}>{tech}</span>)}
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                  {project.docsKey && architectures[project.docsKey] && (
                    <button onClick={() => setActiveDoc(project.docsKey!)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all">
                      <FileCode2 size={12} />{t("project", "viewArch")}
                    </button>
                  )}
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium glass border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                      <ExternalLink size={12} />{t("project", "demo")}
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {activeDoc && arch && (
          <motion.div key="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setActiveDoc(null)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
            <motion.div key="modal-content" initial={{ opacity: 0, y: 60, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 60, scale: 0.96 }} transition={{ duration: 0.3, ease: "easeOut" }} className="relative w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl glass-card overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center flex-shrink-0"><Layers size={18} className="text-white" /></div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white">{lang === "en" ? arch.titleEn : arch.title}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">{lang === "en" ? arch.descriptionEn : arch.description}</p>
                  </div>
                </div>
                <button onClick={() => setActiveDoc(null)} className="flex-shrink-0 w-8 h-8 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"><X size={15} /></button>
              </div>

              <div className="overflow-y-auto custom-scrollbar flex-1 p-5 sm:p-6 space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-3"><Layers size={14} className="text-blue-400" />{t("project", "archTitle")}</h3>
                  <div className="space-y-3">
                    {arch.layers.map((layer, i) => (
                      <div key={i} className={`rounded-xl border p-4 ${LAYER_BG[i % LAYER_BG.length]}`}>
                        <span className={`text-xs font-bold uppercase tracking-wider ${LAYER_COLOR[i % LAYER_COLOR.length]}`}>{lang === "en" ? layer.labelEn : layer.label}</span>
                        <p className="text-xs text-slate-400 my-2">{lang === "en" ? layer.descriptionEn : layer.description}</p>
                        <div className="flex flex-wrap gap-1.5">{layer.tech.map((t) => <span key={t} className="px-2 py-0.5 rounded-lg glass border border-white/10 text-[11px] text-slate-300">{t}</span>)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-3"><GitBranch size={14} className="text-violet-400" />{t("project", "flowTitle")}</h3>
                  <div className="space-y-2">
                    {(lang === "en" ? arch.dataFlowEn : arch.dataFlow).map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-mono text-[10px] font-bold">{i + 1}</div>
                          {i < arch.dataFlow.length - 1 && <div className="w-px h-4 bg-violet-500/20 mt-1" />}
                        </div>
                        <p className="text-xs text-slate-300 pt-1 pb-2">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-3"><Zap size={14} className="text-amber-400" />{t("project", "highlightsTitle")}</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {(lang === "en" ? arch.highlightsEn : arch.highlights).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/8 border border-amber-500/15">
                        <CheckCircle2 size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border-t border-white/10 flex-shrink-0">
                <span className="flex items-center gap-1.5 text-xs text-slate-500"><BookOpen size={11} />{t("project", "fullDocs")}</span>
                <button onClick={() => setActiveDoc(null)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
                  {t("project", "close")}<ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
