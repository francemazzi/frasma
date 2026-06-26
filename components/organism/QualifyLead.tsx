"use client";

import { motion } from "framer-motion";
import { useT } from "../../lib/i18n/context";

const ITEMS = [
  "qualify.item1",
  "qualify.item2",
  "qualify.item3",
  "qualify.item4",
] as const;

export default function QualifyLead() {
  const t = useT();

  return (
    <section className="py-20 sm:py-28 bg-farm-panel border-y border-farm-border">
      <div className="section-farm">
        <motion.div
          className="max-w-3xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-accent mb-3">
            {t("qualify.eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-farm-text tracking-tight">
            {t("qualify.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ITEMS.map((key, index) => (
            <motion.div
              key={key}
              className="bg-farm-surface rounded-2xl p-6 border border-farm-border shadow-sm flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-sage-500 shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-farm-secondary leading-relaxed">{t(key)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
