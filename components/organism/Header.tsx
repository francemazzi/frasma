"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Cal from "./Cal";

export default function Header() {
  return (
    <motion.header
      className="py-6 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold text-green-700"
          whileHover={{ scale: 1.1 }}
        >
          Frasma
        </motion.div>
        <Cal textButton="Schedule a Meeting Now" buttonType="default" />
      </nav>
    </motion.header>
  );
}
