"use client";

import { useId, useState, type FormEvent } from "react";
import { FIELD_LABEL_CLASS, INPUT_CLASS } from "../../atoms/formClasses";
import { useLang, useT } from "../../../lib/i18n/context";
import { buildWhatsappIntentHref } from "../../../lib/whatsappIntent";

function contactLooksValid(value: string): boolean {
  const trimmed = value.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return true;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 && /^[+\d\s()./-]+$/.test(trimmed);
}

function readCookie(name: string): string {
  const prefix = `${name}=`;
  const part = document.cookie.split("; ").find((item) => item.startsWith(prefix));
  if (!part) return "";
  try {
    return decodeURIComponent(part.slice(prefix.length));
  } catch {
    return "";
  }
}

function measureLeadCreated(eventId: string) {
  const pixel = (window as Window & { oaiq?: (...args: unknown[]) => void }).oaiq;
  if (typeof pixel !== "function") return;
  pixel("measure", "lead_created", { type: "customer_action" }, { event_id: eventId });
}

const INTENTS = ["ddt", "quotes", "bom", "sheets", "other"] as const;
type IntentId = (typeof INTENTS)[number];

type Props = {
  id?: string;
};

type FieldErrors = {
  name?: string;
  company?: string;
  intent?: string;
  custom?: string;
  contact?: string;
};

export default function WhatsappIntentForm({ id }: Props) {
  const t = useT();
  const { lang } = useLang();
  const uid = useId();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [intent, setIntent] = useState<IntentId | "">("");
  const [custom, setCustom] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  const intentLabel = intent
    ? intent === "other"
      ? custom
      : t(`home.whatsapp.intent.${intent}`)
    : "";
  const whatsappHref = buildWhatsappIntentHref(lang, {
    name,
    company,
    intentLabel,
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = t("home.whatsapp.error.name");
    if (company.trim().length < 2) next.company = t("home.whatsapp.error.company");
    if (!intent) next.intent = t("home.whatsapp.error.intent");
    if (intent === "other" && custom.trim().length < 2) {
      next.custom = t("home.whatsapp.error.custom");
    }
    if (!contactLooksValid(contact)) next.contact = t("home.whatsapp.error.contact");
    setErrors(next);
    if (next.name || next.company || next.intent || next.custom || next.contact || !intent) return;

    const formData = new FormData(event.currentTarget);
    const website = formData.get("website");
    setStatus("submitting");
    const oppref = new URLSearchParams(window.location.search).get("oppref") || readCookie("__oppref");
    try {
      const response = await fetch("/api/landing-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          intent,
          custom,
          contact,
          sourceUrl: window.location.href,
          ...(oppref ? { oppref } : {}),
          website: typeof website === "string" ? website : "",
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; eventId?: string };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        return;
      }
      if (payload.eventId) measureLeadCreated(payload.eventId);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form id={id} onSubmit={onSubmit} noValidate className="max-w-3xl">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor={`${uid}-name`} className={FIELD_LABEL_CLASS}>
            {t("home.whatsapp.name")}
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className={INPUT_CLASS}
          />
          {errors.name ? (
            <p id={`${uid}-name-error`} className="mt-1 text-[13px] text-accent">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor={`${uid}-company`} className={FIELD_LABEL_CLASS}>
            {t("home.whatsapp.company")}
          </label>
          <input
            id={`${uid}-company`}
            name="company"
            autoComplete="organization"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? `${uid}-company-error` : undefined}
            className={INPUT_CLASS}
          />
          {errors.company ? (
            <p id={`${uid}-company-error`} className="mt-1 text-[13px] text-accent">
              {errors.company}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor={`${uid}-intent`} className={FIELD_LABEL_CLASS}>
            {t("home.whatsapp.intent")}
          </label>
          <select
            id={`${uid}-intent`}
            name="intent"
            value={intent}
            onChange={(event) => setIntent(event.target.value as IntentId | "")}
            aria-invalid={errors.intent ? true : undefined}
            aria-describedby={errors.intent ? `${uid}-intent-error` : undefined}
            className={INPUT_CLASS}
          >
            <option value="">{t("home.whatsapp.intent.placeholder")}</option>
            {INTENTS.map((item) => (
              <option key={item} value={item}>
                {t(`home.whatsapp.intent.${item}`)}
              </option>
            ))}
          </select>
          {errors.intent ? (
            <p id={`${uid}-intent-error`} className="mt-1 text-[13px] text-accent">
              {errors.intent}
            </p>
          ) : null}
        </div>
      </div>
      {intent === "other" ? (
        <div className="mt-4 max-w-md">
          <label htmlFor={`${uid}-custom`} className={FIELD_LABEL_CLASS}>
            {t("home.whatsapp.custom")}
          </label>
          <input
            id={`${uid}-custom`}
            name="custom"
            value={custom}
            onChange={(event) => setCustom(event.target.value)}
            aria-invalid={errors.custom ? true : undefined}
            aria-describedby={errors.custom ? `${uid}-custom-error` : undefined}
            className={INPUT_CLASS}
          />
          {errors.custom ? (
            <p id={`${uid}-custom-error`} className="mt-1 text-[13px] text-accent">
              {errors.custom}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="mt-4 max-w-md">
        <label htmlFor={`${uid}-contact`} className={FIELD_LABEL_CLASS}>
          {t("home.whatsapp.contact")}
        </label>
        <input
          id={`${uid}-contact`}
          name="contact"
          autoComplete="email"
          inputMode="email"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          aria-invalid={errors.contact ? true : undefined}
          aria-describedby={errors.contact ? `${uid}-contact-error` : undefined}
          className={INPUT_CLASS}
        />
        {errors.contact ? (
          <p id={`${uid}-contact-error`} className="mt-1 text-[13px] text-accent">
            {errors.contact}
          </p>
        ) : null}
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
        defaultValue=""
      />
      {status === "sent" ? (
        <div className="mt-4">
          <p className="text-[16px] font-medium text-ink">{t("home.whatsapp.success")}</p>
          <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.5] text-ink-soft">
            {t("home.whatsapp.successNote")}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-[14px] font-medium text-ink underline-offset-4 hover:underline"
          >
            {t("home.whatsapp.secondary")}
          </a>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <button type="submit" className="btn-ink" disabled={status === "submitting"}>
            {status === "submitting" ? t("home.whatsapp.sending") : t("home.whatsapp.submit")}
          </button>
          <p className="max-w-[42ch] text-[14px] leading-[1.5] text-ink-soft">
            {status === "error" ? t("home.whatsapp.error.send") : t("home.whatsapp.note")}
          </p>
        </div>
      )}
    </form>
  );
}
