"use client";

import Image from "next/image";
import Link from "next/link";
import { BentoCard, BentoGrid } from "../atoms/Bento";
import { useT } from "../../lib/i18n/context";
import type { ResolvedFaq } from "../../lib/knowledge";
import ProcessAssessment from "./ProcessAssessment";
import {
  BriefIntakeMock,
  ChannelMergeMock,
  FaqExploreMock,
  InboxChaosMock,
  RelatedPickMock,
  SharedTimelineMock,
} from "./maintenanceMocks";
import { FieldAssignMock, MockStage, TicketsMock } from "./productMocks";

type RelatedLink = {
  href: string;
  title: string;
  summary: string;
};

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
              src="/image/use_case/caso-03-cella-frigo.jpg"
              alt={t("catalog.maintenance.imageAlt")}
              fill
              sizes="(max-width: 1024px) 90vw, 440px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-full bg-ink/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-paper backdrop-blur">
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

        <div className="mt-10">
          <BentoGrid>
            <BentoCard
              className="h-[24rem] lg:col-span-2 sm:h-[28rem]"
              name={t("catalog.maintenance.channelsName")}
              description={t("catalog.maintenance.channelsDesc")}
              background={
                <MockStage variant="peach" badge={t("mock.working")}>
                  <ChannelMergeMock />
                </MockStage>
              }
            />
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}

export function MaintenanceCaseFlow() {
  const t = useT();
  const working = t("mock.working");

  return (
    <section className="ed-section border-t border-ink/8">
      <div className="section-farm">
        <div className="ed-kicker">{t("catalog.maintenance.flowKicker")}</div>
        <h2 className="mb-3 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
          {t("catalog.howTitle")}
        </h2>
        <p className="mb-8 max-w-[62ch] text-[16px] leading-[1.6] text-ink-soft">
          {t("catalog.maintenance.flowIntro")}
        </p>

        <BentoGrid>
          <BentoCard
            className="h-[24rem] sm:h-[30rem]"
            name={t("catalog.maintenance.beforeName")}
            description={t("catalog.maintenance.beforeDesc")}
            background={
              <MockStage variant="mist" badge={working}>
                <InboxChaosMock />
              </MockStage>
            }
          />
          <BentoCard
            className="h-[24rem] sm:h-[30rem]"
            name={t("catalog.maintenance.afterName")}
            description={t("catalog.maintenance.afterDesc")}
            background={
              <MockStage variant="teal" badge={working}>
                <SharedTimelineMock />
              </MockStage>
            }
          />
        </BentoGrid>
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

export function MaintenanceCaseFaq({ faqs }: { faqs: ResolvedFaq[] }) {
  const t = useT();

  return (
    <section className="ed-section border-t border-ink/8">
      <div className="section-farm">
        <h2 className="mb-3 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
          {t("catalog.faqTitle")}
        </h2>
        <p className="mb-8 max-w-[62ch] text-[16px] leading-[1.6] text-ink-soft">
          {t("catalog.maintenance.faqIntro")}
        </p>

        <BentoGrid>
          <div className="rounded-3xl border border-hairline-strong bg-paper-2 p-4 sm:p-7">
            <dl className="space-y-5">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-[17px] font-medium text-ink">{faq.question}</dt>
                  <dd className="mt-1 text-[15px] leading-[1.55] text-ink-soft">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
          <BentoCard
            className="h-[24rem] sm:h-[30rem]"
            name={t("catalog.maintenance.faqName")}
            description={t("catalog.maintenance.faqDesc")}
            background={
              <MockStage variant="lavender" badge={t("mock.working")}>
                <FaqExploreMock />
              </MockStage>
            }
          />
        </BentoGrid>
      </div>
    </section>
  );
}

export function MaintenanceCaseRelated({ items }: { items: RelatedLink[] }) {
  const t = useT();

  return (
    <section className="ed-section border-t border-ink/8">
      <div className="section-farm">
        <h2 className="mb-3 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
          {t("catalog.relatedTitle")}
        </h2>
        <p className="mb-8 max-w-[62ch] text-[16px] leading-[1.6] text-ink-soft">
          {t("catalog.maintenance.relatedIntro")}
        </p>

        <BentoGrid>
          <div className="rounded-3xl border border-hairline-strong bg-paper-2 p-4 sm:p-7">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[16px] font-medium text-accent underline-offset-2 hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 text-[15px] leading-[1.55] text-ink-soft">{item.summary}</p>
                </li>
              ))}
            </ul>
          </div>
          <BentoCard
            className="h-[24rem] sm:h-[30rem]"
            name={t("catalog.maintenance.relatedName")}
            description={t("catalog.maintenance.relatedDesc")}
            background={
              <MockStage variant="mist" badge={t("mock.working")}>
                <RelatedPickMock />
              </MockStage>
            }
          />
        </BentoGrid>
      </div>
    </section>
  );
}

export function MaintenanceCaseCta() {
  const t = useT();

  return (
    <section className="ed-section border-t border-ink/8">
      <div className="section-farm">
        <h2 className="mb-3 text-[28px] font-medium tracking-[-0.03em] sm:text-[34px]">
          {t("catalog.ctaTitle")}
        </h2>
        <p className="mb-8 max-w-[62ch] text-[16px] leading-[1.6] text-ink-soft">
          {t("catalog.ctaBody")}
        </p>

        <BentoGrid>
          <BentoCard
            className="h-[24rem] sm:h-[30rem]"
            name={t("catalog.maintenance.briefName")}
            description={t("catalog.maintenance.briefDesc")}
            background={
              <MockStage variant="peach" badge={t("mock.working")}>
                <BriefIntakeMock />
              </MockStage>
            }
          />
          <div className="flex min-h-[24rem] flex-col justify-between rounded-3xl border border-hairline-strong bg-paper-2 p-4 sm:min-h-[30rem] sm:p-7">
            <div>
              <h3 className="text-[18px] font-medium leading-[1.15] tracking-[-0.035em] text-ink sm:text-[22px]">
                {t("catalog.maintenance.briefCtaName")}
              </h3>
              <p className="mt-1.5 max-w-[46ch] text-[13px] leading-[1.5] text-ink-soft sm:mt-2 sm:text-[14px] sm:leading-[1.55]">
                {t("catalog.maintenance.briefCtaDesc")}
              </p>
              <ul className="mt-5 space-y-3 text-[14px] leading-[1.5] text-ink-soft sm:text-[15px]">
                <li>{t("catalog.maintenance.briefPoint1")}</li>
                <li>{t("catalog.maintenance.briefPoint2")}</li>
                <li>{t("catalog.maintenance.briefPoint3")}</li>
              </ul>
            </div>
            <ProcessAssessment textButton={t("catalog.ctaButton")} showArrow />
          </div>
        </BentoGrid>
      </div>
    </section>
  );
}
