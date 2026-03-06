"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { it } from "./it";
import { en } from "./en";

type Locale = "it" | "en";

const dictionaries: Record<Locale, Record<string, string>> = { it, en };

type LanguageContextValue = {
  lang: Locale;
  setLang: (l: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "it",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>("it");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "en") {
      setLangState("en");
      document.documentElement.lang = "en";
    }
  }, []);

  const setLang = useCallback((l: Locale) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string): string => dictionaries[lang][key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  return useContext(LanguageContext).t;
}

export function useLang() {
  const { lang, setLang } = useContext(LanguageContext);
  return { lang, setLang } as const;
}
