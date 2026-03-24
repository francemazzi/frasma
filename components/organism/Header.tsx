"use client";

import { useT, useLang } from "../../lib/i18n/context";
import Cal from "./Cal";

export default function Header() {
  const t = useT();
  const { lang, setLang } = useLang();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl bg-farm-bg/80 border-b border-farm-border"
    >
      <nav className="section-farm py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold text-farm-text tracking-tight">
            Frasma
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <button
              type="button"
              onClick={() => setLang("it")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                lang === "it"
                  ? "font-semibold text-farm-text"
                  : "text-farm-secondary hover:text-farm-text"
              }`}
            >
              IT
            </button>
            <span className="text-farm-tertiary">|</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                lang === "en"
                  ? "font-semibold text-farm-text"
                  : "text-farm-secondary hover:text-farm-text"
              }`}
            >
              EN
            </button>
          </div>

          <div className="md:hidden">
            <Cal textButton={t("header.book")} buttonType="icon" />
          </div>
          <div className="hidden md:block">
            <Cal textButton={t("header.schedule")} buttonType="default" />
          </div>
        </div>
      </nav>
    </header>
  );
}
