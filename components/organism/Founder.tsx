"use client";

import Image from "next/image";
import { useT } from "../../lib/i18n/context";

export default function Founder() {
  const t = useT();

  return (
    <section className="section-farm py-20 sm:py-28">
      <div className="grid grid-cols-1 sm:grid-cols-[240px_minmax(0,1fr)] gap-8 sm:gap-14 items-center rounded-[32px] border border-white/60 bg-white/25 p-6 sm:p-10">
        <div className="relative aspect-square rounded-[24px] overflow-hidden bg-paper-2 max-w-[240px] sm:max-w-none">
          <Image
            src="/image/use_case/francesco-mazzi.jpg"
            alt="Francesco Saverio Mazzi"
            fill
            sizes="(max-width: 640px) 200px, 220px"
            className="object-cover"
            style={{ filter: "saturate(0.95) contrast(1.02)" }}
          />
        </div>

        <div className="min-w-0">
          <div className="text-[11px] font-semibold text-accent tracking-[0.12em] uppercase mb-3">
            {t("founder.role")}
          </div>
          <h4 className="text-[30px] sm:text-[40px] font-semibold tracking-[-0.045em] mb-5 text-ink">
            {t("founder.title")}
          </h4>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-ink-2 max-w-[64ch] mb-4">
            {t("founder.bio1")}
          </p>
          <p className="text-[15px] font-medium text-accent mt-6 max-w-[56ch]">
            {t("founder.note")}
          </p>
        </div>
      </div>
    </section>
  );
}
