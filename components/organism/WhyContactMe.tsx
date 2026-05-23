"use client";

import { motion } from "framer-motion";
import { useT } from "../../lib/i18n/context";
import Cal from "./Cal";

const steps = [
  { number: "01", titleKey: "how.title1", descKey: "how.desc1" },
  { number: "02", titleKey: "how.title2", descKey: "how.desc2" },
  { number: "03", titleKey: "how.title3", descKey: "how.desc3" },
];

export default function WhyContactMe() {
  const t = useT();

  return (
    <section className="py-20 sm:py-28 bg-farm-panel">
      <div className="section-farm">
        <motion.div
          className="max-w-3xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-farm-text tracking-tight mb-4">
            {t("how.title")}
          </h2>
          <p className="text-lg text-farm-secondary leading-relaxed">
            {t("how.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="bg-farm-surface rounded-2xl p-6 border border-farm-border shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-sage-500 mb-3">
                {step.number}
              </p>
              <h3 className="text-xl font-semibold text-farm-text mb-2">
                {t(step.titleKey)}
              </h3>
              <p className="text-farm-secondary leading-relaxed">
                {t(step.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <Cal textButton={t("about.rateReveal")} buttonType="default" />
        </motion.div>
      </div>
    </section>
  );
}
