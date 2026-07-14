"use client";

import { useEffect, useState } from "react";
import { useLang, useT } from "../../lib/i18n/context";
import Cal from "./Cal";

const HERO_POINTS = ["hero.point1", "hero.point2", "hero.point3"] as const;

export default function Intro() {
  const t = useT();
  const { lang } = useLang();
  const heroMessages = HERO_POINTS.map((key) => t(key));

  return (
    <section id="top" className="section-farm">
      <div className="pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28 text-center">
        <p className="inline-flex rounded-full border border-accent/15 bg-accent/[0.06] px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mb-7">
          {t("hero.eyebrow")}
        </p>
        <h1
          className="mx-auto font-sans font-semibold text-ink leading-[0.98] tracking-[-0.06em] mb-10 max-w-[17ch] [text-wrap:balance]"
          style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
        >
          {t("hero.title1")}{" "}
          <span className="text-accent">{t("hero.titleEm")}</span>{" "}
          {t("hero.title2")}
        </h1>

        <Typewriter key={lang} messages={heroMessages} />

        <div className="flex gap-5 mt-10 items-center justify-center flex-wrap">
          <Cal textButton={t("hero.cta")} buttonType="ink" showArrow />
          <a href="#casi-studio" className="ed-link-secondary">
            {t("hero.projects")} →
          </a>
        </div>
      </div>
    </section>
  );
}

function Typewriter({ messages }: { messages: string[] }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const message = messages[messageIndex % messages.length] ?? "";

  useEffect(() => {
    if (!message) return;

    let delay = isDeleting ? 18 : 34;

    if (!isDeleting && visibleLength === message.length) {
      delay = 2200;
    } else if (isDeleting && visibleLength === 0) {
      delay = 320;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && visibleLength === message.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && visibleLength === 0) {
        setMessageIndex((current) => (current + 1) % messages.length);
        setIsDeleting(false);
        return;
      }

      setVisibleLength((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, message, messages.length, visibleLength]);

  return (
    <div className="mx-auto flex min-h-[72px] max-w-3xl items-start justify-center px-4 sm:min-h-[58px]">
      <p
        className="text-[18px] font-medium leading-[1.45] tracking-[-0.02em] text-ink-2 sm:text-[21px]"
        aria-hidden="true"
      >
        <span className="mr-3 text-[11px] font-semibold tracking-[0.08em] text-accent">
          {String(messageIndex + 1).padStart(2, "0")}
        </span>
        {message.slice(0, visibleLength)}
        <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-pulse bg-accent" />
      </p>
      <span className="sr-only">{messages.join(". ")}</span>
    </div>
  );
}
