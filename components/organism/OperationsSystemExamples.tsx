"use client";

import Link from "next/link";
import { useLang, useT } from "../../lib/i18n/context";
import {
  cadCamExamples,
  canonicalPath,
  erpExamples,
  examplesForService,
  getKnowledgeEntry,
  type OperationsServiceId,
  type SystemExample,
} from "../../lib/knowledge";

function ExampleList({
  examples,
  linkToService,
}: {
  examples: SystemExample[];
  linkToService: boolean;
}) {
  const { lang } = useLang();

  return (
    <ul className="space-y-6">
      {examples.map((example) => {
        const service = getKnowledgeEntry(example.serviceIds[0]);
        const href = service ? canonicalPath(service) : undefined;
        const name = example.name[lang];

        return (
          <li key={example.id}>
            {linkToService && href ? (
              <Link
                href={href}
                className="text-[18px] font-medium text-ink underline-offset-2 hover:text-accent hover:underline"
              >
                {name}
              </Link>
            ) : (
              <p className="text-[18px] font-medium text-ink">{name}</p>
            )}
            <p className="mt-1 text-[15px] leading-[1.55] text-ink-soft">
              {example.sector[lang]}. {example.process[lang]}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

type Props = {
  variant: "hub" | OperationsServiceId;
};

export default function OperationsSystemExamples({ variant }: Props) {
  const t = useT();
  const isHub = variant === "hub";
  const groups = isHub
    ? { erp: erpExamples(), cadCam: cadCamExamples() }
    : examplesForService(variant);
  const linkToService = isHub;
  const showCad = groups.cadCam.length > 0;
  const headingClass =
    "mb-3 text-[22px] font-medium tracking-[-0.03em] sm:text-[26px]";

  if (groups.erp.length === 0 && groups.cadCam.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className={headingClass}>{t("catalog.examples.erpTitle")}</h3>
      <p className="mb-8 text-[16px] leading-[1.6] text-ink-soft">
        {t("catalog.examples.intro")}
      </p>
      <ExampleList examples={groups.erp} linkToService={linkToService} />
      {showCad ? (
        <>
          <h3 className={`${headingClass} mt-10`}>
            {t("catalog.examples.cadTitle")}
          </h3>
          <ExampleList examples={groups.cadCam} linkToService={linkToService} />
        </>
      ) : null}
      <p className="mt-8 text-[15px] leading-[1.55] text-ink-soft">
        {t("catalog.examples.also")}
      </p>
    </div>
  );
}

