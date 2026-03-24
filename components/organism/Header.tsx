"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useT, useLang } from "../../lib/i18n/context";
import Cal from "./Cal";

export default function Header() {
  const t = useT();
  const { lang, setLang } = useLang();

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-xl bg-farm-bg/80 border-b border-farm-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <nav className="section-farm py-4 flex justify-between items-center">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xl font-semibold text-farm-text tracking-tight">
            Frasma
          </span>
          <span className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-farm-border bg-farm-surface px-2.5 py-1 text-xs text-farm-secondary">
            <Image
              src="/bobby_chat_cuffie.png"
              alt="Bobby the Lagotto"
              width={18}
              height={18}
              className="rounded-full object-cover"
              priority
            />
            {t("header.companion")}
          </span>
        </motion.div>

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
    </motion.header>
  );
}
