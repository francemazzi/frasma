"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Experience() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const experiences = [
    {
      title: "100,000 kg Sold",
      description:
        "Developed software to manage over 500 tons of harvest and supply chain operations for a 190-hectare farm.",
      link: "https://www.valbindola.it/",
    },
    {
      title: "Managed 80+ Suppliers and Buyers",
      description:
        "Developed a SaaS solution backed by Berkeley University's Skydeck accelerator to streamline order management and enhance supply chain communication.",
      link: "https://www.supplai.it",
    },
    {
      title: "Web3 Developer",
      description:
        "Developed web3-based online services and marketplaces, including testing and debugging of a farm irrigation service.",
      link: "#",
    },
    {
      title: "Web Developer",
      description:
        "Acquired first 34 corporate delivery clients, improving workplace welfare for companies like Sky and Chiesi. Implemented demand forecasting solutions for over 40 farmers.",
      link: "https://www.gazzettadimantova.it/territorio-mantovano/mantova-frutta-e-verdura-biologiche-consegnate-a-casa-o-in-azienda-1.12153803",
    },
    {
      title: "Vertical Farm Software Developer",
      description:
        "Developed 2 modular vertical farming systems using Arduino, integrated with AWS cloud infrastructure and Telegram bot for production monitoring and control.",
      link: "https://drive.google.com/file/d/1E1hMW8aibWGEf6dVqG6Vvcgvf3Rh7Pzf/view",
    },
    {
      title: "Web Development",
      description:
        "Developed a food delivery marketplace platform specializing in artisanal bakery products and showcasing heritage grain varieties.",
      link: "https://bologna.repubblica.it/cronaca/2022/07/04/news/food_delivery_i_prodotti_dei_forni_artigianali_a_domicilio_lidea_e_di_due_studenti_dellalma_mater-356510683/",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600 bg-opacity-80 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox=%220 0 80 40%22 width=%2280%22 height=%2240%22%3E%3Cpath fill=%22%23f0fdf4%22 fill-opacity=%22.15%22 d=%22M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z%22%3E%3C%2Fsvg%3E')] opacity-20"></div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          My Experience
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
              variants={itemVariants}
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">
                  {exp.title}
                </h3>
                <p className="mb-4 text-gray-600">{exp.description}</p>
              </div>
              <Link
                href={exp.link}
                className="text-green-600 hover:underline mt-auto"
              >
                Visit the site
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
