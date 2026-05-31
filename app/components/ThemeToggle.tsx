"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 animate-pulse" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <Sun size={16} className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100 text-amber-400"}`} />
      <Moon size={16} className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0 scale-100 text-blue-300" : "opacity-0 -rotate-90 scale-50"}`} />
    </button>
  );
}
