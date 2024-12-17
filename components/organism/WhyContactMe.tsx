"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import profilePic from "/image/profilo.jpg";

export default function WhyContactMe() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const reasons = [
    {
      icon: "❤️",
      title: "I won't let you down",
      description:
        "I carefully select projects and support them from strategy to development.",
    },
    {
      icon: "🧑🏻‍🌾",
      title: "Focused on sustainability",
      description:
        "My expertise lies in agriculture, and I value sustainable solutions.",
    },
    {
      icon: "💸",
      title: "Lean Canvas",
      description: "Market testing to identify user needs.",
    },
    {
      icon: "🧑🏻‍💻",
      title: "Innovation",
      description:
        "Tools I use: Typescript, Python, Dart, SQL, Flutter, Prisma, PostgreSQL, Docker, MongoDB, React, Next.js, Remix, Three.js, web3.js, Firebase, Solidity.",
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8 bg-sand-50">
      <div className="flex flex-row items-center gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="shadow-lg rounded-full"
        >
          {/* <div className="rounded-[50%]  w-32 h-32 items-center ">
            <Image
              className="rounded-[50%]"
              src={"/image/profilo.jpg"}
              layout="fill"
              objectFit="cover"
              alt="francesco profilo"
              priority
            />
          </div> */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <Image
              className="rounded-[50%]"
              src={"/image/profilo.jpg"}
              alt="francesco profilo"
              fill
              sizes="(max-width: 128px) 100vw, 128px"
              priority
            />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-green-700"
        >
          Why Contact Me?
        </motion.h2>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="bg-green-50 p-6 rounded-lg shadow-md"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="text-4xl mb-4">{reason.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p>{reason.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
