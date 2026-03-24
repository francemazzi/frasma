"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useT } from "../../lib/i18n/context";
import Cal from "./Cal";

export default function WhyContactMe() {
  const t = useT();

  const valueProps = [
    { title: t("about.prop1.title"), description: t("about.prop1.desc") },
    { title: t("about.prop2.title"), description: t("about.prop2.desc") },
    { title: t("about.prop3.title"), description: t("about.prop3.desc") },
    { title: t("about.prop4.title"), description: t("about.prop4.desc") },
  ];

  return (
    <section className="py-20 sm:py-28 bg-farm-panel">
      <div className="section-farm">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-shrink-0">
            <div className="relative w-40 h-40 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/profilo_home.jpg"
                alt="Francesco Saverio Mazzi"
                fill
                sizes="(max-width: 640px) 112px, 160px"
                quality={68}
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-farm-text tracking-tight mb-4">
              {t("about.title")}
            </h2>
            <p className="text-lg text-farm-secondary leading-relaxed max-w-xl">
              {t("about.bio")}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {valueProps.map((item, index) => (
            <motion.div
              key={index}
              className="bg-farm-surface rounded-2xl p-6 border border-farm-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <h3 className="text-base font-semibold text-farm-text mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-farm-secondary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative bg-farm-surface rounded-2xl p-8 border border-farm-border text-center max-w-lg mx-auto overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="select-none" aria-hidden="true">
            <h3 className="text-sm font-semibold text-farm-secondary uppercase tracking-widest mb-4">
              {t("about.rates")}
            </h3>
            <div className="text-4xl font-bold text-farm-text mb-2 blur-md">
              40&euro;<span className="text-lg font-normal text-farm-secondary">{t("about.rateUnit")}</span>
            </div>
            <div className="space-y-1 text-sm text-farm-secondary blur-md">
              <p>{t("about.rateOutside")}</p>
              <p>{t("about.rateOnsite")}</p>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-farm-surface/60">
            <Cal textButton={t("about.rateReveal")} buttonType="default" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
