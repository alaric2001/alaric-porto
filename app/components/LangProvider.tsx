"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import translations, { type Lang } from "@/app/lib/translations";

type TranslationDict = Record<string, Record<string, string>>;

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  t: (section: string, key: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

type LangAction = { type: "TOGGLE" };

function langReducer(state: Lang, action: LangAction): Lang {
  switch (action.type) {
    case "TOGGLE":
      return state === "id" ? "en" : "id";
    default:
      return state;
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, dispatch] = useReducer(langReducer, "id");

  const toggle = useCallback(() => dispatch({ type: "TOGGLE" }), []);

  const t = useCallback(
    (section: string, key: string): string => {
      const dict = translations[lang] as TranslationDict;
      return dict[section]?.[key] ?? key;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
