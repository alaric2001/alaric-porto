"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, LogOut, Menu, X, Shield } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import { useAuth } from "./AuthProvider";
import { useLang } from "./LangProvider";

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const NAV_LINKS = [
    { label: t("nav", "about"), href: "#hero" },
    { label: t("nav", "skills"), href: "#skills" },
    { label: t("nav", "experience"), href: "#experience" },
    { label: t("nav", "projects"), href: "#projects" },
    { label: t("nav", "publications"), href: "#publications" },
    { label: t("nav", "education"), href: "#education" },
  ];

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-slate-950/80 border-b border-white/5 shadow-2xl" : "bg-transparent"}`}>
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-3">
          <Link href="/" className="flex-shrink-0 font-bold text-white text-lg tracking-tight hover:text-blue-400 transition-colors">
            <span className="gradient-text">AR</span>
            <span className="text-white/60 font-light ml-1 hidden sm:inline">Aniko</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => handleNav(link.href)} className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <LangToggle />
            <ThemeToggle />

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  <Shield size={12} /> Admin
                </span>
                <button onClick={logout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-slate-300 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all duration-200">
                  <LogOut size={14} />
                  <span className="hidden sm:inline">{t("nav", "logout")}</span>
                </button>
              </div>
            ) : (
              <Link href="/admin" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium bg-slate-950 border border-slate-700 text-slate-300 hover:bg-slate-900 hover:border-slate-500 hover:text-white transition-all duration-200 shadow-lg">
                <Lock size={13} />
                <span className="hidden sm:inline">{t("nav", "adminGateway")}</span>
              </Link>
            )}

            <button className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all" onClick={() => setMobileOpen((v) => !v)}>
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
          <nav className="absolute top-16 left-0 right-0 mx-4 rounded-2xl glass-card p-4 space-y-1 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => handleNav(link.href)} className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                {link.label}
              </button>
            ))}
            {!isAdmin && (
              <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                <Lock size={14} /> {t("nav", "adminGateway")}
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
