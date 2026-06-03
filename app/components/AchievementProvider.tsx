"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { useLang } from "./LangProvider";

export type AchievementId = "scholar" | "verified" | "conversationist" | "prompt_engineer";

const ACHIEVEMENTS = [
  {
    id: "scholar" as AchievementId,
    icon: "🎓",
    nameId: "The Scholar",
    nameEn: "The Scholar",
    descId: "Membaca publikasi ilmiah",
    descEn: "Read academic publications",
  },
  {
    id: "verified" as AchievementId,
    icon: "🛡️",
    nameId: "Verified!",
    nameEn: "Verified!",
    descId: "Memverifikasi kredensial sertifikasi",
    descEn: "Verified certification credentials",
  },
  {
    id: "conversationist" as AchievementId,
    icon: "🤖",
    nameId: "AI Conversationist",
    nameEn: "AI Conversationist",
    descId: "Membuka AI Assistant",
    descEn: "Opened AI Assistant",
  },
  {
    id: "prompt_engineer" as AchievementId,
    icon: "🔮",
    nameId: "The Prompt Engineer",
    nameEn: "The Prompt Engineer",
    descId: "Mengirim pesan pertama ke AI",
    descEn: "Sent first message to AI",
  },
] as const;

type AchievementEntry = (typeof ACHIEVEMENTS)[number];

const STORAGE_KEY = "portfolio_achievements";

type AchievementContextType = {
  unlocked: Set<AchievementId>;
  unlock: (id: AchievementId) => void;
};

const AchievementContext = createContext<AchievementContextType>({
  unlocked: new Set(),
  unlock: () => {},
});

export function useAchievement() {
  return useContext(AchievementContext);
}

export default function AchievementProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  const [unlocked, setUnlocked] = useState<Set<AchievementId>>(new Set());
  const [toast, setToast] = useState<AchievementEntry | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  // Ref mirrors unlocked for synchronous reads inside unlock() without updater callbacks
  const unlockedRef = useRef<Set<AchievementId>>(new Set());
  const mountedRef = useRef(false);

  // Load from localStorage silently on mount (no toast)
  useEffect(() => {
    mountedRef.current = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ids = JSON.parse(stored) as AchievementId[];
        const loaded = new Set(ids) as Set<AchievementId>;
        unlockedRef.current = loaded;
        setUnlocked(loaded);
      }
    } catch {}
  }, []);

  // Persist to localStorage whenever unlocked set changes (after mount)
  useEffect(() => {
    if (!mountedRef.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlocked]));
  }, [unlocked]);

  // Auto-dismiss toast after 4 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const unlock = useCallback((id: AchievementId) => {
    if (unlockedRef.current.has(id)) return;
    unlockedRef.current = new Set([...unlockedRef.current, id]);
    setUnlocked(new Set(unlockedRef.current));
    setToast(ACHIEVEMENTS.find((a) => a.id === id)!);
  }, []);

  const unlockedCount = unlocked.size;

  return (
    <AchievementContext.Provider value={{ unlocked, unlock }}>
      {children}

      {/* Toast — top-right, appears on unlock */}
      <div className="fixed top-4 right-4 z-[200] pointer-events-none">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, y: -8 }}
              animate={{
                opacity: 1, x: 0, y: 0,
                boxShadow: [
                  "0 0 0px 0px rgba(96,165,250,0.0)",
                  "0 0 20px 4px rgba(96,165,250,0.35)",
                  "0 0 28px 6px rgba(139,92,246,0.45)",
                  "0 0 20px 4px rgba(96,165,250,0.35)",
                  "0 0 20px 4px rgba(139,92,246,0.4)",
                ],
              }}
              exit={{ opacity: 0, x: 60, y: -8 }}
              transition={{
                opacity: { duration: 0.3 },
                x: { duration: 0.3, ease: "easeOut" },
                y: { duration: 0.3, ease: "easeOut" },
                boxShadow: { duration: 2.5, delay: 0.3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="glass-card border border-blue-500/30 px-4 py-3 rounded-2xl flex items-center gap-3 pointer-events-auto"
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center text-xl flex-shrink-0"
                animate={{
                  boxShadow: [
                    "0 0 6px 2px rgba(96,165,250,0.5)",
                    "0 0 18px 5px rgba(139,92,246,0.75)",
                    "0 0 6px 2px rgba(96,165,250,0.5)",
                  ],
                }}
                transition={{ duration: 1.4, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                {toast.icon}
              </motion.div>
              <div>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-0.5">
                  Achievement Unlocked!
                </p>
                <p className="text-sm font-bold text-white leading-tight">
                  {lang === "en" ? toast.nameEn : toast.nameId}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {lang === "en" ? toast.descEn : toast.descId}
                </p>
              </div>
            </motion.div>

          )}
        </AnimatePresence>
      </div>

      {/* Badge & Panel — bottom-left, alongside chat button */}
      <div className="fixed bottom-5 left-4 z-[45]">
        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-2 w-64 glass-card border border-white/15 rounded-2xl p-4 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2 text-sm font-bold text-white">
                  <Trophy size={13} className="text-amber-400" />
                  Achievements
                </span>
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-2">
                {ACHIEVEMENTS.map((a) => {
                  const isUnlocked = unlocked.has(a.id);
                  return (
                    <div
                      key={a.id}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                        isUnlocked
                          ? "bg-blue-500/10 border-blue-500/20"
                          : "bg-white/3 border-white/8 opacity-50"
                      }`}
                    >
                      {isUnlocked ? (
                        <motion.span
                          className="text-lg leading-none flex-shrink-0"
                          animate={{
                            filter: [
                              "drop-shadow(0 0 3px rgba(96,165,250,0.5))",
                              "drop-shadow(0 0 9px rgba(139,92,246,0.8))",
                              "drop-shadow(0 0 3px rgba(96,165,250,0.5))",
                            ],
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {a.icon}
                        </motion.span>
                      ) : (
                        <span className="text-lg leading-none flex-shrink-0 opacity-50">🔒</span>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">
                          {lang === "en" ? a.nameEn : a.nameId}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {lang === "en" ? a.descEn : a.descId}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">{unlockedCount}/4 Unlocked</span>
                {unlockedCount === 4 && (
                  <span className="text-[10px] text-amber-400 font-bold">🏆 All done!</span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setShowPanel((v) => !v)}
          animate={{
            boxShadow: showPanel
              ? [
                  "0 0 10px 2px rgba(96,165,250,0.4)",
                  "0 0 22px 6px rgba(139,92,246,0.55)",
                  "0 0 10px 2px rgba(96,165,250,0.4)",
                ]
              : [
                  "0 0 4px 1px rgba(96,165,250,0.2)",
                  "0 0 14px 4px rgba(139,92,246,0.4)",
                  "0 0 4px 1px rgba(96,165,250,0.2)",
                ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
            showPanel
              ? "glass-card border border-blue-500/30 text-blue-400"
              : "glass-card border border-white/15 text-slate-300 hover:text-white hover:border-white/25"
          }`}
        >
          <motion.span
            animate={{ filter: ["drop-shadow(0 0 2px rgba(251,191,36,0.5))", "drop-shadow(0 0 8px rgba(251,191,36,0.9))", "drop-shadow(0 0 2px rgba(251,191,36,0.5))"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Trophy size={13} className="text-amber-400 flex-shrink-0" />
          </motion.span>
          <span className="hidden sm:inline text-slate-400 font-normal">Achievements</span>
          <span className={`font-bold tabular-nums ${unlockedCount === 4 ? "text-amber-400" : "text-blue-400"}`}>
            {unlockedCount}/4
          </span>
        </motion.button>
      </div>
    </AchievementContext.Provider>
  );
}
