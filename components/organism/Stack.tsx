"use client";

import { useT } from "../../lib/i18n/context";

const LANGUAGES = ["TypeScript", "Python", "Go", "SQL", "Bash"];
const TECHNOLOGIES = [
  "React",
  "Next.js",
  "Node",
  "FastAPI",
  "Postgres",
  "Redis",
  "Anthropic",
  "OpenAI",
  "LangChain",
  "Vercel",
  "Docker",
  "AWS",
];

export default function Stack() {
  const t = useT();
  const verticals = [
    t("stack.vert1"),
    t("stack.vert2"),
    t("stack.vert3"),
    t("stack.vert4"),
  ];

  return (
    <section id="stack" className="ed-section">
      <div className="section-farm">
        <div className="mb-10 sm:mb-14">
          <div className="ed-kicker">{t("stack.kicker")}</div>
          <h2 className="ed-title max-w-[28ch]">
            {t("stack.title1")} <em>{t("stack.titleEm")}</em> {t("stack.title2")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          <Column title={t("stack.langCol")} items={LANGUAGES} />
          <Column title={t("stack.techCol")} items={TECHNOLOGIES} />
          <Column title={t("stack.vertCol")} items={verticals} vertical />
        </div>
      </div>
    </section>
  );
}

function Column({
  title,
  items,
  vertical,
}: {
  title: string;
  items: string[];
  vertical?: boolean;
}) {
  return (
    <div className="relative">
      <h5 className="font-mono text-[11px] text-accent tracking-[0.16em] uppercase leading-none mb-[14px]">
        {title}
      </h5>
      <div className="w-[60px] h-px bg-accent mb-5" />
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`font-mono text-[12px] px-[13px] py-[7px] rounded-full transition-all border ${
              vertical
                ? "bg-accent text-paper border-accent hover:bg-ink hover:border-ink"
                : "bg-white/40 text-ink border-hairline-strong hover:bg-ink hover:text-paper hover:border-ink"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
