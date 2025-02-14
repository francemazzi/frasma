"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const skills = [
  {
    category: "Full-Stack Development",
    projects: [
      {
        title: "Farm Management Software",
        description:
          "Developed software to manage over 500 tons of harvest and supply chain operations for a 190-hectare farm.",
        technologies: [
          "TypeScript for type-safe, scalable application structure",
          "React with Vite for building a responsive and interactive user interface (SPA architecture)",
          "TypeScript with Express for robust backend API development",
          "PostgreSQL for efficient data storage and retrieval of large-scale farm data",
        ],
      },
      {
        title: "GIS Agricultural Mapping System",
        description:
          "Implemented a GIS mapping system for digital farm management, handling over 190 hectares of agricultural land with precise activity tracking and soil analysis.",
        technologies: [
          "Leaflet.js for interactive map visualization",
          "GeoJSON for managing field boundaries and cultivation zones",
          "Turf.js for geometric calculations and spatial analysis",
          "OpenStreetMap and satellite imagery for base mapping",
          "Vite for mapping system user interface",
        ],
        highlights: [
          "Implementation of drawing tools for field boundary delimitation",
          "Automatic calculation of areas and distances",
          "Integration with IoT sensors for soil monitoring",
          "Georeferenced logging system for agricultural activities",
        ],
      },
      {
        title: "SaaS Order Management Solution",
        description:
          "Developed a SaaS solution backed by Berkeley University's Skydeck accelerator to streamline order management and enhance supply chain communication.",
        technologies: [
          "Python with FastAPI for high-performance API development",
          "React with Redux for complex state management in the frontend",
          "MongoDB for flexible document storage of supplier and buyer data in combination with bucket storage from Google Cloud Platform",
          "Docker for containerization and easy deployment",
        ],
      },
      {
        title: "Food Delivery Marketplace",
        description:
          "Developed a food delivery marketplace platform specializing in artisanal bakery products and showcasing heritage grain varieties.",
        technologies: [
          "Next.js for server-side rendering and improved SEO",
          "GraphQL for efficient data querying and reduced over-fetching",
          "Stripe integration for secure payment processing",
          "Elasticsearch for powerful search capabilities across product catalogs",
        ],
      },
    ],
  },
  {
    category: "Cloud & DevOps",
    projects: [
      {
        title: "AWS Infrastructure",
        description:
          "Utilized various AWS services for building resilient systems across multiple projects.",
        technologies: [
          "AWS Amplify for rapid development and deployment of web applications",
          "Route 53 for domain management and DNS configuration",
          "S3 for scalable object storage of user-generated content",
          "Lambda for serverless compute in various microservices",
          "RDS for managed relational databases in production environments",
        ],
      },
      {
        title: "Google Cloud Platform Solutions",
        description:
          "Architected and deployed scalable cloud solutions for farm management software.",
        technologies: [
          "Cloud Run for deploying and scaling containerized applications",
          "Container Registry for storing and managing Docker container images",
          "Cloud SQL for managed MySQL databases",
          "Pub/Sub for real-time messaging between microservices",
          "BigQuery for large-scale data analytics on farm production data",
        ],
      },
      {
        title: "Azure Services Integration",
        description:
          "Implemented enterprise-level applications leveraging Azure services for the SaaS order management solution.",
        technologies: [
          "Azure Kubernetes Service (AKS) for orchestrating containerized microservices",
          "Azure Functions for event-driven, serverless compute",
          "Azure Cosmos DB for globally distributed, multi-model database services",
          "Azure DevOps for CI/CD pipelines and project management",
          "Azure Monitor for comprehensive application and infrastructure monitoring",
        ],
      },
    ],
  },
  {
    category: "IoT & Embedded Systems",
    projects: [
      {
        title: "Modular Vertical Farming Systems",
        description:
          "Developed 2 modular vertical farming systems using Arduino, integrated with AWS cloud infrastructure and Telegram bot for production monitoring and control.",
        technologies: [
          "Raspberry Pi for sensor integration and control systems",
          "Python for embedded systems programming",
          "AWS IoT Core for secure device connectivity",
          "AWS Lambda for serverless processing of IoT data",
          "Telegram Bot API for real-time notifications and control",
        ],
      },
    ],
  },
  //   {
  //     category: "Web3 & Blockchain",
  //     projects: [
  //       {
  //         title: "Farm Irrigation Service",
  //         description:
  //           "Developed and debugged a web3-based farm irrigation service.",
  //         technologies: [
  //           "Solidity for smart contract development",
  //           "Hardhat for Ethereum development environment setup and testing",
  //           "Web3.js for interacting with Ethereum blockchain from the frontend",
  //           "IPFS for decentralized storage of irrigation data",
  //           "MetaMask integration for user authentication and transactions",
  //         ],
  //       },
  //     ],
  //   },
];

export default function TechnicalSkillsDetailed() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sand-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-700">
          More Technical Q&A
        </h2>
        <p className="text-xl text-center mb-10 text-gray-700">
          With over 8 years of software development experience, I&apos;ve
          applied my skills across various projects:
        </p>
        {skills.map((skillCategory, index) => (
          <div key={index} className="mb-6">
            <button
              className="w-full text-left p-4 bg-green-600 text-white rounded-lg flex justify-between items-center"
              onClick={() =>
                setOpenCategory(
                  openCategory === skillCategory.category
                    ? null
                    : skillCategory.category
                )
              }
            >
              <span className="text-2xl font-semibold">
                {skillCategory.category}
              </span>
              <ChevronDown
                className={`transform transition-transform duration-200 ${
                  openCategory === skillCategory.category ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {openCategory === skillCategory.category && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {skillCategory.projects.map((project, projectIndex) => (
                    <div
                      key={projectIndex}
                      className="bg-white p-6 rounded-lg shadow-md mt-4"
                    >
                      <h3 className="text-xl font-semibold mb-2 text-green-600">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>
                      <h4 className="text-lg font-semibold mb-2 text-green-500">
                        Technologies Used:
                      </h4>
                      <ul className="list-disc list-inside text-gray-600">
                        {project.technologies.map((tech, techIndex) => (
                          <li key={techIndex}>{tech}</li>
                        ))}
                      </ul>
                      {project.highlights && (
                        <div className="mt-4">
                          <h4 className="text-lg font-semibold mb-2 text-green-500">
                            Highlights:
                          </h4>
                          <ul className="list-disc list-inside text-gray-600">
                            {project.highlights.map(
                              (highlight, highlightIndex) => (
                                <li key={highlightIndex}>{highlight}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
