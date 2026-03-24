"use client";

import { motion } from "framer-motion";
import { useT } from "../../lib/i18n/context";
import Cal from "./Cal";

export default function Intro() {
  const t = useT();

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="section-farm text-center">
        <motion.p
          className="text-sage-500 font-medium text-lg mb-4 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-farm-text leading-tight tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t("hero.title1")}
          <br />
          <span className="text-farm-secondary">
            {t("hero.title2")}
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-farm-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t("hero.desc")}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Cal textButton={t("hero.cta")} buttonType="default" />
          <a
            href="#projects"
            className="text-sage-500 font-medium hover:text-sage-600 transition-colors"
          >
            {t("hero.projects")} &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
