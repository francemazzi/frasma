"use client";

import Image from "next/image";
import { useT } from "../../lib/i18n/context";
import { Reveal } from "../atoms/Reveal";

export default function StageProof() {
  const t = useT();

  return (
    <section className="ed-section">
      <div className="section-farm">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div className="ed-kicker">{t("proof.eyebrow")}</div>
          <h2 className="ed-title">{t("proof.title")}</h2>
          <p className="ed-intro mx-auto mt-6">{t("proof.caption")}</p>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-hairline-strong">
            <div className="relative aspect-[16/10] bg-paper-3 sm:aspect-[21/10]">
              <Image
                src="/image/founder/stage-talk.png"
                alt={t("proof.photoAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-cover object-center"
              />
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-hairline-strong bg-paper-2 p-6">
              <dt className="text-[28px] font-medium tracking-[-0.04em] text-ink sm:text-[36px]">
                50%
              </dt>
              <dd className="mt-2 text-[14px] leading-[1.55] text-ink-soft">
                {t("proof.stat1")}
              </dd>
            </div>
            <div className="rounded-3xl border border-hairline-strong bg-paper-2 p-6">
              <dt className="text-[28px] font-medium tracking-[-0.04em] text-ink sm:text-[36px]">
                8 {t("proof.hours")}
              </dt>
              <dd className="mt-2 text-[14px] leading-[1.55] text-ink-soft">
                {t("proof.stat2")}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
