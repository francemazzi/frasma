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
          className="max-w-3xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-farm-text tracking-tight mb-5">
            {t("about.title")}
          </h2>
          <p className="text-lg text-farm-secondary leading-relaxed">
            {t("about.bio")}
          </p>
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
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 mb-12 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/profilo_home.jpg"
                alt="Francesco Saverio Mazzi"
                fill
                sizes="(max-width: 640px) 96px, 128px"
                quality={68}
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-base text-farm-secondary leading-relaxed text-center lg:text-left">
            {t("about.team")}
          </p>
        </motion.div>

        <motion.div
          className="bg-farm-surface rounded-2xl p-8 border border-farm-border text-center max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-farm-text mb-2">
            {t("about.rateCta.title")}
          </h3>
          <p className="text-sm text-farm-secondary leading-relaxed mb-6">
            {t("about.rateCta.desc")}
          </p>
          <div className="flex justify-center">
            <Cal textButton={t("about.rateReveal")} buttonType="default" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
