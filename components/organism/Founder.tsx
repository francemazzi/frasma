"use client";

import Image from "next/image";
import { useT } from "../../lib/i18n/context";

export default function Founder() {
  const t = useT();

  return (
    <section className="section-farm">
      <div className="grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)] gap-6 sm:gap-12 items-start py-14 sm:py-20 border-t border-hairline">
        <div className="relative aspect-square border border-hairline-strong overflow-hidden bg-paper-2 max-w-[200px] sm:max-w-none">
          <Image
            src="/image/use_case/francesco-mazzi.jpg"
            alt="Francesco Saverio Mazzi"
            fill
            sizes="(max-width: 640px) 200px, 220px"
            className="object-cover"
            style={{ filter: "saturate(0.95) contrast(1.02)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 font-mono text-[10px] tracking-[0.12em] text-paper bg-ink/85 px-[10px] py-[6px]">
            F. S. MAZZI · FOUNDER
          </div>
        </div>

        <div className="min-w-0">
          <div className="font-mono text-[11px] text-accent tracking-[0.12em] uppercase mb-3">
            {t("founder.role")}
          </div>
          <h4 className="font-serif text-[28px] sm:text-[36px] font-normal tracking-[-0.018em] mb-5 text-ink">
            {t("founder.title")}
          </h4>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-ink-2 max-w-[64ch] mb-4">
            {t("founder.bio1")}
          </p>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-ink-2 max-w-[64ch] mb-4">
            {t("founder.bio2")}
          </p>
          <p className="font-serif italic text-[16px] text-accent mt-6 pl-4 border-l-2 border-accent max-w-[56ch]">
            {t("founder.note")}
          </p>
        </div>
      </div>
    </section>
  );
}
