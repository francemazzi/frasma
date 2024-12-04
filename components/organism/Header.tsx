"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Cal from "./Cal";
import { CalendarIcon } from "@heroicons/react/24/outline";

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
        <div className="md:hidden">
          <Cal textButton={"🗓️"} buttonType="icon" />
        </div>
        <div className="hidden md:block">
          <Cal textButton="Schedule a Meeting Now" buttonType="default" />
        </div>
      </nav>
    </motion.header>
  );
}
