"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import DictationButton from "../atoms/DictationButton";
import { useLang, useT } from "../../lib/i18n/context";
import Cal from "./Cal";

type Props = {
  textButton: string;
  showArrow?: boolean;
  compact?: boolean;
};

type FormState = {
  clientEmail: string;
  company: string;
  role: string;
  process: string;
  systems: string;
  volume: string;
  honeypot: string;
};

type DictatableField = "company" | "role" | "process" | "systems" | "volume";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const INITIAL_FORM: FormState = {
  clientEmail: "",
  company: "",
  role: "",
  process: "",
  systems: "",
  volume: "",
  honeypot: "",
};

const FIELD_MAX: Record<DictatableField, number> = {
  company: 120,
  role: 120,
  process: 2000,
  systems: 500,
  volume: 500,
};

const INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-hairline-strong bg-paper-2 px-3 py-2.5 pr-11 text-ink outline-none transition-shadow focus:border-transparent focus:ring-2 focus:ring-accent/30";

export default function ProcessAssessment({
  textButton,
  showArrow = false,
  compact = false,
}: Props) {
  const t = useT();
  const { lang } = useLang();
  const id = useId();
  const scheduleEvent = `frasma:schedule:${id}`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const wasOpenRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => firstInputRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "submitting") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), a[href]',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, status]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) triggerRef.current?.focus();
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  const patchForm = (patch: Partial<FormState>) => {
    setForm((current) => ({ ...current, ...patch }));
    setStatus("idle");
    setErrorMessage("");
  };

  const appendDictation = useCallback((field: DictatableField, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setForm((current) => {
      const existing = current[field].trim();
      const next = existing ? `${existing} ${trimmed}` : trimmed;
      return {
        ...current,
        [field]: next.slice(0, FIELD_MAX[field]),
      };
    });
    setStatus("idle");
    setErrorMessage("");
  }, []);

  const close = () => {
    if (status !== "submitting") setIsOpen(false);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.clientEmail.trim()) {
      setStatus("error");
      setErrorMessage(t("assessment.validation.email"));
      return;
    }
    if (form.process.trim().length < 20) {
      setStatus("error");
      setErrorMessage(t("assessment.validation.process"));
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/request-process-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;

      if (!response.ok || !result || result.ok !== true) {
        setStatus("error");
        setErrorMessage(
          response.status === 429
            ? t("assessment.error.rate")
            : t("assessment.error.generic"),
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(t("assessment.error.network"));
    }
  };

  const openSchedule = () => {
    setIsOpen(false);
    window.setTimeout(() => {
      window.dispatchEvent(new Event(scheduleEvent));
    }, 0);
  };

  const dictationEnabled = isOpen && status !== "submitting";

  const modal =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-description`}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={close}
            />
            <div
              ref={dialogRef}
              className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-hairline-strong bg-paper shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-hairline p-5 sm:p-6">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                    {t("assessment.eyebrow")}
                  </p>
                  <h2
                    id={`${id}-title`}
                    className="text-[26px] font-semibold tracking-[-0.04em] text-ink sm:text-[32px]"
                  >
                    {status === "success"
                      ? t("assessment.success.title")
                      : t("assessment.title")}
                  </h2>
                  <p
                    id={`${id}-description`}
                    className="mt-2 max-w-[56ch] text-sm leading-[1.55] text-ink-soft"
                  >
                    {status === "success"
                      ? t("assessment.success.description")
                      : t("assessment.subtitle")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  disabled={status === "submitting"}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-2"
                  aria-label={t("assessment.close")}
                >
                  {t("assessment.close")}
                </button>
              </div>

              {status === "success" ? (
                <div className="p-6 sm:p-8">
                  <CheckCircle2
                    size={38}
                    className="mb-5 text-accent"
                    aria-hidden="true"
                  />
                  <p className="max-w-[54ch] text-[15px] leading-[1.65] text-ink-2">
                    {t("assessment.success.next")}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn-ink"
                      onClick={openSchedule}
                    >
                      {t("assessment.success.schedule")}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className="btn-ink-ghost"
                    >
                      {t("assessment.success.close")}
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4 p-5 sm:p-6" lang={lang} onSubmit={submit}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-ink">
                        {t("assessment.company")}
                      </span>
                      <div className="relative">
                        <input
                          ref={firstInputRef}
                          className={INPUT_CLASS}
                          value={form.company}
                          maxLength={120}
                          autoComplete="organization"
                          onChange={(event) =>
                            patchForm({ company: event.currentTarget.value })
                          }
                        />
                        <DictationButton
                          enabled={dictationEnabled}
                          onTranscript={(text) =>
                            appendDictation("company", text)
                          }
                        />
                      </div>
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-ink">
                        {t("assessment.role")}
                      </span>
                      <div className="relative">
                        <input
                          className={INPUT_CLASS}
                          value={form.role}
                          maxLength={120}
                          autoComplete="organization-title"
                          onChange={(event) =>
                            patchForm({ role: event.currentTarget.value })
                          }
                        />
                        <DictationButton
                          enabled={dictationEnabled}
                          onTranscript={(text) => appendDictation("role", text)}
                        />
                      </div>
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-medium text-ink">
                      {t("assessment.email")} *
                    </span>
                    <input
                      type="email"
                      required
                      className="mt-1 w-full rounded-lg border border-hairline-strong bg-paper-2 px-3 py-2.5 text-ink outline-none transition-shadow focus:border-transparent focus:ring-2 focus:ring-accent/30"
                      value={form.clientEmail}
                      maxLength={254}
                      autoComplete="email"
                      placeholder={t("assessment.emailPlaceholder")}
                      onChange={(event) =>
                        patchForm({ clientEmail: event.currentTarget.value })
                      }
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-ink">
                      {t("assessment.process")} *
                    </span>
                    <div className="relative">
                      <textarea
                        required
                        minLength={20}
                        maxLength={2000}
                        className={`${INPUT_CLASS} min-h-[120px] resize-y`}
                        value={form.process}
                        placeholder={t("assessment.processPlaceholder")}
                        onChange={(event) =>
                          patchForm({ process: event.currentTarget.value })
                        }
                      />
                      <DictationButton
                        enabled={dictationEnabled}
                        onTranscript={(text) =>
                          appendDictation("process", text)
                        }
                      />
                    </div>
                  </label>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-ink">
                        {t("assessment.systems")}
                      </span>
                      <div className="relative">
                        <textarea
                          maxLength={500}
                          className={`${INPUT_CLASS} min-h-[84px] resize-y`}
                          value={form.systems}
                          placeholder={t("assessment.systemsPlaceholder")}
                          onChange={(event) =>
                            patchForm({ systems: event.currentTarget.value })
                          }
                        />
                        <DictationButton
                          enabled={dictationEnabled}
                          onTranscript={(text) =>
                            appendDictation("systems", text)
                          }
                        />
                      </div>
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-ink">
                        {t("assessment.volume")}
                      </span>
                      <div className="relative">
                        <textarea
                          maxLength={500}
                          className={`${INPUT_CLASS} min-h-[84px] resize-y`}
                          value={form.volume}
                          placeholder={t("assessment.volumePlaceholder")}
                          onChange={(event) =>
                            patchForm({ volume: event.currentTarget.value })
                          }
                        />
                        <DictationButton
                          enabled={dictationEnabled}
                          onTranscript={(text) =>
                            appendDictation("volume", text)
                          }
                        />
                      </div>
                    </label>
                  </div>

                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute h-0 w-0 opacity-0 pointer-events-none"
                    value={form.honeypot}
                    onChange={(event) =>
                      patchForm({ honeypot: event.currentTarget.value })
                    }
                  />

                  <p className="text-xs leading-[1.55] text-ink-soft">
                    {t("assessment.privacy")}
                  </p>

                  {status === "error" && errorMessage ? (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {errorMessage}
                    </div>
                  ) : null}

                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      className="btn-ink-ghost"
                      onClick={close}
                      disabled={status === "submitting"}
                    >
                      {t("assessment.cancel")}
                    </button>
                    <button
                      type="submit"
                      className="btn-ink disabled:opacity-60"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting"
                        ? t("assessment.sending")
                        : t("assessment.send")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`btn-ink ${compact ? "!px-4 !py-2 text-[13px]" : ""}`}
        onClick={() => {
          setStatus("idle");
          setErrorMessage("");
          setIsOpen(true);
        }}
      >
        <span>{textButton}</span>
        {showArrow ? (
          <ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
        ) : null}
      </button>
      {modal}
      <Cal
        textButton={t("assessment.success.schedule")}
        hideTrigger
        eventName={scheduleEvent}
      />
    </>
  );
}
