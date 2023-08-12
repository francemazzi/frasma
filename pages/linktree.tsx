import React from "react";
import { motion, Variants } from "framer-motion";

interface Props {
  emoji: string;
  hueA: number;
  hueB: number;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

type LinkMap = {
  [key: string]: string;
};

const linkMap: LinkMap = {
  "Linkedin 🧑🏻‍💻":
    "https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/",
  "Github 🐈‍⬛": "https://github.com/francemazzi",
  "Spotify 🥷🏻":
    "https://open.spotify.com/playlist/0CZjfbV2kqCjtDBQTwoPzd?si=1857c09296d04f6a",
};

function Card({ emoji, hueA, hueB }: Props) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  const link = linkMap[emoji];

  return (
    <a href={link} target="_blank" rel="noreferrer">
      <motion.div
        className="card-container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <div className="splash" style={{ background }} />
        <motion.div
          className="card"
          variants={cardVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          {emoji}
        </motion.div>
      </motion.div>
    </a>
  );
}

const food: [string, number, number][] = [
  ["Linkedin 🧑🏻‍💻", 340, 10],
  ["Github 🐈‍⬛", 20, 40],
  ["Spotify 🥷🏻", 60, 90],
];

export default function Linktree() {
  return (
    <div className="h-screen flex justify-center flex-col items-center">
      {food.map(([emoji, hueA, hueB]) => (
        <Card emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
      ))}
    </div>
  );
}
