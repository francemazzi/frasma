"use client";

import { motion } from "framer-motion";

export default function Intro() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-green-700 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        I optimize processes with lightweight software in the manufacturing
        sector
      </motion.h1>
      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="text-2xl mb-6" variants={itemVariants}>
          Hi, I&apos;m Fra!
        </motion.p>
        <motion.p className="text-xl mb-6" variants={itemVariants}>
          I&apos;m a software developer with a strong passion for manufacturing
          companies and agri-tech.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={containerVariants}
        >
          {[
            "🛠️ Backend",
            "🌐 Frontend Web Development",

            "🤖 LLM",
            "🚀 Startups Launch",
            "🔎 Market Testing",
            "🔒 Smart Contracts",
          ].map((item, index) => (
            <motion.span
              key={index}
              className="bg-sand-100 text-green-800 px-4 py-2 rounded-full"
              variants={itemVariants}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
