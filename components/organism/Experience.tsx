"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useT } from "../../lib/i18n/context";

const projects = [
  {
    name: "Seminai",
    descKey: "projects.seminai",
    url: "https://seminai.tech/",
    tag: "AI / Agriculture",
    tagColor: "bg-sage-100 text-sage-600",
  },
  {
    name: "Formit",
    descKey: "projects.formit",
    url: "https://github.com/francemazzi/formit_local",
    tag: "Open Source",
    tagColor: "bg-lavender-100 text-lavender-400",
  },
  {
    name: "Bilanciami",
    descKey: "projects.bilanciami",
    url: "https://github.com/francemazzi/bilanciami",
    tag: "Finance",
    tagColor: "bg-wheat-100 text-wheat-500",
  },
  {
    name: "Tree Evaluator",
    descKey: "projects.tree",
    url: "https://github.com/francemazzi/tree-evaluator",
    tag: "Sustainability",
    tagColor: "bg-sage-100 text-sage-600",
  },
  {
    name: "Emilio",
    descKey: "projects.emilio",
    url: "https://agronomo.formit.tech/",
    tag: "LLM Agent",
    tagColor: "bg-terra-100 text-terra-500",
  },
  {
    name: "Rudolf AI",
    descKey: "projects.rudolf",
    url: "https://github.com/francemazzi/rudolf_ai",
    tag: "LLM Agent",
    tagColor: "bg-terra-100 text-terra-500",
  },
];

export default function Experience() {
  const t = useT();

  return (
    <section id="projects" className="py-20 sm:py-28 bg-farm-panel">
      <div className="section-farm">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-farm-text tracking-tight mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-lg text-farm-secondary max-w-xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-farm-surface rounded-2xl p-6 shadow-sm
                  hover:shadow-md transition-all duration-300
                  border border-farm-border hover:border-farm-tertiary
                  h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${project.tagColor}`}
                  >
                    {project.tag}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-farm-tertiary group-hover:text-sage-500
                      transition-colors duration-200"
                  />
                </div>
                <h3 className="text-lg font-semibold text-farm-text mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-farm-secondary leading-relaxed">
                  {t(project.descKey)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
