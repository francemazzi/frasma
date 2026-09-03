"use client";

import Image from "next/image";
import { useT } from "../../lib/i18n/context";
import { BentoCard, BentoGrid } from "../atoms/Bento";
import { FieldAssignMock, MockStage, TicketsMock } from "./productMocks";

export function MaintenanceCaseHero() {
  const t = useT();

  return (
    <section className="ed-section border-t border-ink/8">
      <div className="section-farm">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div
            className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[24px] bg-paper-2"
            style={{ aspectRatio: "1122 / 1402" }}
          >
            <Image
              src="/image/use_case/impianti-frigo.png"
              alt={t("catalog.maintenance.imageAlt")}
              fill
              sizes="(max-width: 1024px) 90vw, 440px"
              className="object-cover mix-blend-darken"
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-ink/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-paper backdrop-blur">
              {t("results.case4.plate")}
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("results.case4.tag")}
            </div>
            <p className="mb-6 text-[17px] font-medium leading-[1.45] text-ink">
              {t("results.case4.pull")}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <p className="rounded-2xl bg-paper-2 p-4 text-[13.5px] leading-[1.55] text-ink-soft">
                <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.1em] text-accent">
                  {t("results.beforeLabel")}
                </span>
                {t("results.case4.before")}
              </p>
              <p className="rounded-2xl bg-paper-2 p-4 text-[13.5px] leading-[1.55] text-ink-soft">
                <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.1em] text-accent">
                  {t("results.afterLabel")}
                </span>
                {t("results.case4.after")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MaintenanceCaseDemos() {
  const t = useT();
  const working = t("mock.working");

  return (
    <section className="ed-section border-t border-ink/8">
      <div className="section-farm">
        <div className="ed-kicker">{t("catalog.maintenance.demoKicker")}</div>
        <h2 className="mb-3 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
          {t("catalog.maintenance.demoTitle")}
        </h2>
        <p className="mb-8 max-w-[62ch] text-[16px] leading-[1.6] text-ink-soft">
          {t("catalog.maintenance.demoIntro")}
        </p>

        <BentoGrid>
          <BentoCard
            className="h-[24rem] sm:h-[30rem]"
            name={t("catalog.maintenance.queueName")}
            description={t("catalog.maintenance.queueDesc")}
            background={
              <MockStage variant="teal" badge={working}>
                <TicketsMock />
              </MockStage>
            }
          />
          <BentoCard
            className="h-[24rem] sm:h-[30rem]"
            name={t("catalog.maintenance.assignName")}
            description={t("catalog.maintenance.assignDesc")}
            background={
              <MockStage variant="lavender" badge={working}>
                <FieldAssignMock />
              </MockStage>
            }
          />
        </BentoGrid>
      </div>
    </section>
  );
}
