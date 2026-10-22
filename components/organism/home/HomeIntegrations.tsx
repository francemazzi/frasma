"use client";

import { useT } from "../../../lib/i18n/context";
import { Reveal } from "../../atoms/Reveal";
import Link from "next/link";

export default function HomeIntegrations() {
  const t = useT();

  return (
    <section id="integrazioni" className="ed-section border-t border-hairline">
      <div className="section-farm">
        <Reveal className="max-w-3xl">
          <h2 className="ed-title">{t("home.integrations.title")}</h2>
          <p className="ed-intro mt-6">{t("home.integrations.text")}</p>
        </Reveal>

        <div className="mt-8">
          <Link href="#contatti" className="btn-ink">
            {t("home.integrations.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
