"use client";

import { useId, useState, type FormEvent } from "react";
import { FIELD_LABEL_CLASS, INPUT_CLASS } from "../../atoms/formClasses";
import { useLang, useT } from "../../../lib/i18n/context";
import { buildWhatsappIntentHref } from "../../../lib/whatsappIntent";

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
};

export default function WhatsappIntentForm({ id }: Props) {
  const t = useT();
  const { lang } = useLang();
  const uid = useId();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [intent, setIntent] = useState<IntentId | "">("");
  const [custom, setCustom] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = t("home.whatsapp.error.name");
    if (company.trim().length < 2) next.company = t("home.whatsapp.error.company");
    if (!intent) next.intent = t("home.whatsapp.error.intent");
    if (intent === "other" && custom.trim().length < 2) {
      next.custom = t("home.whatsapp.error.custom");
    }
    setErrors(next);
    if (next.name || next.company || next.intent || next.custom || !intent) return;

    const href = buildWhatsappIntentHref(lang, {
      name,
      company,
      intentLabel: intent === "other" ? custom : t(`home.whatsapp.intent.${intent}`),
    });
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    if (!opened) window.location.assign(href);
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
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button type="submit" className="btn-ink">
          {t("home.whatsapp.submit")}
        </button>
        <p className="max-w-[42ch] text-[14px] leading-[1.5] text-ink-soft">
          {t("home.whatsapp.note")}
        </p>
      </div>
    </form>
  );
}
