"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { readAttribution } from "../../../lib/attribution";
import type { CampaignLanding } from "../../../lib/campaign";
import {
  CONTACT,
  PHONE_HREF,
  whatsappHref,
  type WhatsappTopic,
} from "../../../lib/contact";
import { useLang, useT } from "../../../lib/i18n/context";
import {
  FIELD_LABEL_CLASS,
  INPUT_CLASS,
  TEXTAREA_CLASS,
} from "../../atoms/formClasses";

type Props = {
  landingId: string;
  copy: CampaignLanding["form"];
  whatsappTopic?: WhatsappTopic;
};

type FormState = {
  name: string;
  clientEmail: string;
  company: string;
  systems: string;
  volume: string;
  process: string;
  honeypot: string;
};

type Status = "idle" | "submitting" | "error";

const INITIAL: FormState = {
  name: "",
  clientEmail: "",
  company: "",
  systems: "",
  volume: "",
  process: "",
  honeypot: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROCESS_MIN = 20;
const PROCESS_MAX = 2000;
/** Submits faster than this after mount are treated as bots and ignored. */
const MIN_FILL_MS = 1500;

/**
 * Inline, single-step lead form for campaign landings. Posts to the same
 * endpoint as the modal brief and carries the session attribution (UTM, landing).
 */
export default function LeadForm({
  landingId,
  copy,
  whatsappTopic = "generic",
}: Props) {
  const t = useT();
  const { lang } = useLang();
  const id = useId();
  const mountedAt = useRef(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const patch = (update: Partial<FormState>) =>
    setForm((current) => ({ ...current, ...update }));

  const validate = (): string | null => {
    if (!form.name.trim()) return t("assessment.validation.name");
    if (!EMAIL_PATTERN.test(form.clientEmail.trim())) {
      return t("assessment.validation.email");
    }
    if (form.process.trim().length < PROCESS_MIN) {
      return t("assessment.validation.process");
    }
    return null;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    if (Date.now() - mountedAt.current < MIN_FILL_MS) return;

    const validation = validate();
    if (validation) {
      setStatus("error");
      setError(validation);
      return;
    }

    setStatus("submitting");
    setError("");

    const attribution = readAttribution() ?? {};
    const landingPath =
      attribution.landingPath ??
      (typeof window !== "undefined" ? window.location.pathname : undefined);

    try {
      const response = await fetch("/api/request-process-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          clientEmail: form.clientEmail,
          company: form.company,
          systems: form.systems,
          volume: form.volume,
          process: form.process,
          honeypot: form.honeypot,
          lang,
          ...attribution,
          ...(landingPath ? { landingPath } : {}),
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;

      if (!response.ok || !result || result.ok !== true) {
        setStatus("error");
        setError(
          response.status === 429
            ? t("assessment.error.rate")
            : t("assessment.error.generic"),
        );
        return;
      }

      window.location.assign(
        `/discount?conv=contact&lp=${encodeURIComponent(landingId)}`,
      );
    } catch {
      setStatus("error");
      setError(t("assessment.error.network"));
    }
  };

  const submitting = status === "submitting";
  const counter = t("leadForm.counter").replace(
    "{n}",
    String(form.process.length),
  );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-hairline-strong bg-paper-2 p-5 sm:p-7"
      aria-describedby={`${id}-assurance`}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={FIELD_LABEL_CLASS}>
            {t("leadForm.name")}
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={(event) => patch({ name: event.currentTarget.value })}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={FIELD_LABEL_CLASS}>
            {t("leadForm.email")}
          </label>
          <input
            id={`${id}-email`}
            name="clientEmail"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={t("leadForm.emailPlaceholder")}
            value={form.clientEmail}
            onChange={(event) => patch({ clientEmail: event.currentTarget.value })}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor={`${id}-company`} className={FIELD_LABEL_CLASS}>
            {t("leadForm.company")}
          </label>
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(event) => patch({ company: event.currentTarget.value })}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor={`${id}-systems`} className={FIELD_LABEL_CLASS}>
            {t("leadForm.systems")}
          </label>
          <input
            id={`${id}-systems`}
            name="systems"
            type="text"
            placeholder={copy.systemsPlaceholder[lang]}
            value={form.systems}
            onChange={(event) => patch({ systems: event.currentTarget.value })}
            className={INPUT_CLASS}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-volume`} className={FIELD_LABEL_CLASS}>
            {t("leadForm.volume")}
          </label>
          <input
            id={`${id}-volume`}
            name="volume"
            type="text"
            inputMode="numeric"
            placeholder={copy.volumePlaceholder[lang]}
            value={form.volume}
            onChange={(event) => patch({ volume: event.currentTarget.value })}
            className={INPUT_CLASS}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-process`} className={FIELD_LABEL_CLASS}>
            {t("leadForm.process")}
          </label>
          <textarea
            id={`${id}-process`}
            name="process"
            required
            minLength={PROCESS_MIN}
            maxLength={PROCESS_MAX}
            placeholder={copy.processPlaceholder[lang]}
            value={form.process}
            onChange={(event) => patch({ process: event.currentTarget.value })}
            className={TEXTAREA_CLASS}
            aria-describedby={`${id}-hint`}
          />
          <p
            id={`${id}-hint`}
            className="mt-1.5 flex justify-between gap-3 text-[12.5px] text-ink-soft"
          >
            <span>{t("leadForm.minHint")}</span>
            <span className="shrink-0 tabular-nums">{counter}</span>
          </p>
        </div>
      </div>

      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(event) => patch({ honeypot: event.currentTarget.value })}
        />
      </div>

      {status === "error" && error ? (
        <p role="alert" className="mt-4 text-[14px] text-red-700">
          {error}
        </p>
      ) : null}

      <p id={`${id}-assurance`} className="mt-4 text-[12.5px] leading-[1.5] text-ink-soft">
        {t("assessment.privacy")}{" "}
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          {t("assessment.privacyLink")}
        </a>
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="btn-ink min-h-[48px] w-full sm:w-auto disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? t("leadForm.sending") : t("leadForm.submit")}
        </button>
        <p className="text-[13.5px] text-ink-soft">{t("leadForm.byFrancesco")}</p>
      </div>

      <p className="mt-5 border-t border-hairline pt-4 text-[14px] leading-[1.6] text-ink-soft">
        {t("campaign.whatsappAlt")}{" "}
        <a
          href={whatsappHref(lang, whatsappTopic)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-ink underline-offset-2 hover:text-accent hover:underline"
        >
          {t("contact.whatsappShort")}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>{" "}
        {t("contact.orCall")}{" "}
        <a href={PHONE_HREF} className="font-medium text-ink hover:text-accent">
          {CONTACT.phoneDisplay}
        </a>
      </p>
    </form>
  );
}
