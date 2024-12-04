"use client";

import { motion } from "framer-motion";
import Cal from "./Cal";

export default function CallToAction() {
  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-sand-50 text-center"
    >
      <motion.h2
        className="text-3xl font-bold mb-6 text-green-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Me Now!
      </motion.h2>
      <motion.p
        className="text-xl mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Open my digital calendar and schedule a call with me today! I&apos;ll
        respond right away with some initial questions to help solve your
        digital challenges.
      </motion.p>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Cal textButton="Schedule a Meeting Now" buttonType="default" />
      </motion.div>
    </section>
  );
}
