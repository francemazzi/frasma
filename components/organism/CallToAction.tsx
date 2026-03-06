"use client";

import { motion } from "framer-motion";
import { useT } from "../../lib/i18n/context";
import Cal from "./Cal";

export default function CallToAction() {
  const t = useT();

  return (
    <section id="contact" className="py-20 sm:py-28">
      <motion.div
        className="section-farm text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-farm-text tracking-tight mb-6">
          {t("cta.title1")}
          <br />
          <span className="text-farm-secondary">{t("cta.title2")}</span>
        </h2>
        <p className="text-lg text-farm-secondary max-w-xl mx-auto mb-10 leading-relaxed">
          {t("cta.desc")}
        </p>
        <div className="flex justify-center">
          <Cal textButton={t("cta.button")} buttonType="default" />
        </div>
      </motion.div>
    </section>
  );
}
