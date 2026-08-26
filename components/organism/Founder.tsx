"use client";

import Image from "next/image";
import { useT } from "../../lib/i18n/context";
import { Reveal } from "../atoms/Reveal";

export default function Founder() {
  const t = useT();

  return (
    <section className="section-farm py-20 sm:py-28">
      <Reveal className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-hairline-strong bg-paper-2 p-6 sm:grid-cols-[240px_minmax(0,1fr)] sm:gap-14 sm:p-8">
        <div className="relative aspect-square max-w-[240px] overflow-hidden rounded-2xl bg-paper-3 sm:max-w-none">
          <Image
            src="/image/use_case/francesco-mazzi.jpg"
            alt={t("founder.title")}
            fill
            sizes="(max-width: 640px) 200px, 240px"
            className="object-cover"
            style={{ filter: "saturate(0.95) contrast(1.02)" }}
          />
        </div>

        <div className="min-w-0">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
            {t("founder.role")}
          </div>
          <h2 className="mb-5 text-[30px] font-medium tracking-[-0.045em] text-ink sm:text-[40px]">
            {t("founder.title")}
          </h2>
          <p className="mb-4 max-w-[64ch] text-[15px] leading-[1.65] text-ink-2 sm:text-[16px]">
            {t("founder.bio1")}
          </p>
          <p className="max-w-[64ch] text-[15px] leading-[1.65] text-ink-2 sm:text-[16px]">
            {t("founder.bio2")}
          </p>
          <p className="mt-6 max-w-[56ch] text-[15px] font-medium text-accent">
            {t("founder.note")}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
