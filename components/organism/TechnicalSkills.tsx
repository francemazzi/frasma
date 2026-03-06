"use client";

import { motion } from "framer-motion";
import { useT } from "../../lib/i18n/context";

const languages = [
  "TypeScript", "Python", "Java", "Kotlin", "Swift", "Dart",
];

const technologies = [
  "React", "Next.js", "Flutter", "FastAPI", "Langchain",
  "PostgreSQL", "MongoDB", "ChromaDB", "Docker", "AWS",
  "GCP", "Firebase",
];

const interests = [
  "Manufacturing", "Agriculture", "Food", "LLM Agents",
];

function PillGroup({
  title,
  items,
  accentClass,
}: {
  title: string;
  items: string[];
  accentClass: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-farm-secondary uppercase tracking-widest mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <span
            key={item}
            className={`text-sm font-medium px-4 py-2 rounded-full border
              border-farm-border ${accentClass}
              transition-colors duration-200`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechnicalSkillsDetailed() {
  const t = useT();

  return (
    <section className="py-20 sm:py-28">
      <motion.div
        className="section-farm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-farm-text tracking-tight mb-4">
            {t("skills.title")}
          </h2>
          <p className="text-lg text-farm-secondary">
            {t("skills.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <PillGroup
            title={t("skills.languages")}
            items={languages}
            accentClass="bg-farm-surface text-farm-text hover:bg-sage-50 hover:border-sage-200"
          />
          <PillGroup
            title={t("skills.technologies")}
            items={technologies}
            accentClass="bg-farm-surface text-farm-text hover:bg-wheat-50 hover:border-wheat-200"
          />
          <PillGroup
            title={t("skills.interests")}
            items={interests}
            accentClass="bg-farm-surface text-farm-text hover:bg-terra-50 hover:border-terra-200"
          />
        </div>
      </motion.div>
    </section>
  );
}
