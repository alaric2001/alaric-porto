"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Shield, ArrowLeft, CheckCircle2, AlertCircle, Key } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthProvider";
import { useLang } from "@/app/components/LangProvider";

export default function AdminPage() {
  const { isAdmin, login } = useAuth();
  const { t } = useLang();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => { if (isAdmin) router.replace("/"); }, [isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push("/"), 1200);
    } else {
      setError(result.message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #020407 0%, #040a12 50%, #020407 100%)" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-violet-900/15 rounded-full blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors">
          <ArrowLeft size={15} />{t("admin", "back")}
        </Link>
      </motion.div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 items-center justify-center mb-5 shadow-2xl">
            <Lock size={28} className="text-slate-300" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{t("admin", "title")}</h1>
          <p className="text-slate-500 text-sm">{t("admin", "subtitle")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className={`rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl p-7 shadow-2xl ${shake ? "animate-shake" : ""}`}>
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3 py-4">
              <CheckCircle2 size={40} className="text-emerald-400" />
              <p className="text-white font-semibold">{t("admin", "successMsg")}</p>
              <p className="text-slate-400 text-sm">{t("admin", "successSub")}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">{t("admin", "emailLabel")}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@alaric.dev" required autoComplete="email" className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-slate-500 focus:bg-slate-800 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">{t("admin", "passLabel")}</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" required autoComplete="current-password" className="w-full px-4 py-3 pr-11 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-slate-500 focus:bg-slate-800 transition-all" />
                  <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  <AlertCircle size={13} />{error}
                </motion.div>
              )}
              <button type="submit" disabled={loading || !email || !password} className="w-full py-3 rounded-xl text-sm font-semibold bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 hover:border-slate-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg">
                {loading ? (<><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />{t("admin", "submitting")}</>) : (<><Shield size={15} />{t("admin", "submitBtn")}</>)}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-5 p-4 rounded-2xl border border-slate-800/60 bg-slate-950/40 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Key size={12} className="text-slate-500" />
            <span className="text-xs font-medium text-slate-500">{t("admin", "demoTitle")}</span>
          </div>
          <div className="font-mono text-[11px] text-slate-600 space-y-0.5">
            <div>Email: <button onClick={() => setEmail("admin@alaric.dev")} className="text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-2">admin@alaric.dev</button></div>
            <div>Password: <button onClick={() => setPassword("AlaricAdmin2025")} className="text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-2">AlaricAdmin2025</button></div>
          </div>
          <p className="text-[10px] text-slate-700 mt-2">{t("admin", "demoNote")}</p>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-center text-[11px] text-slate-700 mt-4">
          {t("admin", "rbacNote")}{" "}
          <span className="text-slate-500">{t("admin", "rbacHighlight")}</span>{" "}
          {t("admin", "rbacSuffix")}
        </motion.p>
      </div>
    </div>
  );
}
