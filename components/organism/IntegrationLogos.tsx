"use client";

import { useT } from "../../lib/i18n/context";
import {
  INTEGRATION_LOGOS,
  type IntegrationLogo,
} from "../../lib/integrations/logos";
import { Reveal } from "../atoms/Reveal";

function LogoMark({
  logo,
  decorative,
}: {
  logo: IntegrationLogo;
  decorative?: boolean;
}) {
  if (logo.src) {
    return (
      // SVGs stay local and keep their own viewBox; next/image is a poor fit.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo.src}
        alt={decorative ? "" : logo.alt}
        className="integration-logo-img"
      />
    );
  }

  return (
    <span className="integration-logo-wordmark" aria-hidden={decorative}>
      {logo.name}
    </span>
  );
}

function LogoRow({
  decorative,
}: {
  decorative?: boolean;
}) {
  return (
    <ul className="integration-marquee-group" aria-hidden={decorative}>
      {INTEGRATION_LOGOS.map((logo) => (
        <li key={`${decorative ? "clone" : "live"}-${logo.id}`}>
          <LogoMark logo={logo} decorative={decorative} />
        </li>
      ))}
    </ul>
  );
}

export default function IntegrationLogos() {
  const t = useT();

  return (
    <section className="pb-16 sm:pb-24" aria-labelledby="integrations-title">
      <div className="section-farm">
        <Reveal className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <div className="ed-kicker">{t("integrations.eyebrow")}</div>
          <h2
            id="integrations-title"
            className="font-sans font-medium leading-[1.08] tracking-[-0.045em] text-ink [font-size:clamp(28px,3.6vw,42px)]"
          >
            {t("integrations.title")}
          </h2>
          <p className="ed-intro mx-auto mt-5">{t("integrations.caption")}</p>
        </Reveal>
      </div>

      <div
        className="integration-marquee"
        role="region"
        aria-label={t("integrations.railLabel")}
      >
        <div className="integration-marquee-track">
          <LogoRow />
          <LogoRow decorative />
        </div>
      </div>
    </section>
  );
}
