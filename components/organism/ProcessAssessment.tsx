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

type Props = {
  textButton: string;
  showArrow?: boolean;
  compact?: boolean;
};

type FormState = {
  name: string;
  clientEmail: string;
  company: string;
  role: string;
  process: string;
  systems: string;
  volume: string;
  honeypot: string;
};

type DictatableField = "process" | "systems" | "volume";

type Step = 1 | 2 | 3 | 4;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const TOTAL_STEPS = 4;
const DISCOUNT_PATH = "/discount?conv=contact";

const INITIAL_FORM: FormState = {
  name: "",
  clientEmail: "",
  company: "",
  role: "",
  process: "",
  systems: "",
  volume: "",
  honeypot: "",
};

const FIELD_MAX: Record<DictatableField, number> = {
  process: 2000,
  systems: 500,
  volume: 500,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-hairline-strong bg-paper-2 px-3 py-2.5 text-[16px] text-ink outline-none transition-shadow focus:border-transparent focus:ring-2 focus:ring-accent/30";

const TEXTAREA_CLASS = `${INPUT_CLASS} min-h-[160px] resize-y pr-11`;

const isValidEmail = (value: string) => EMAIL_PATTERN.test(value.trim());

export default function ProcessAssessment({
  textButton,
  showArrow = false,
  compact = false,
}: Props) {
  const t = useT();
  const { lang } = useLang();
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stepInputRef = useRef<HTMLInputElement>(null);
  const stepTextareaRef = useRef<HTMLTextAreaElement>(null);
  const wasOpenRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

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
    if (!isOpen || status === "success") return;
    window.setTimeout(() => {
      stepInputRef.current?.focus();
      stepTextareaRef.current?.focus();
    }, 0);
  }, [isOpen, currentStep, status]);

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

  const validateStep = (step: Step): string | null => {
    if (step === 1 && !form.name.trim()) {
      return t("assessment.validation.name");
    }
    if (step === 1 && !isValidEmail(form.clientEmail)) {
      return t("assessment.validation.email");
    }
    if (step === 2 && form.process.trim().length < 20) {
      return t("assessment.validation.process");
    }
    return null;
  };

  const goNext = () => {
    const error = validateStep(currentStep);
    if (error) {
      setStatus("error");
      setErrorMessage(error);
      return;
    }
    setStatus("idle");
    setErrorMessage("");
    setCurrentStep((step) => (step < TOTAL_STEPS ? ((step + 1) as Step) : step));
  };

  const goBack = () => {
    setStatus("idle");
    setErrorMessage("");
    setCurrentStep((step) => (step > 1 ? ((step - 1) as Step) : step));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentStep < TOTAL_STEPS) {
      goNext();
      return;
    }

    const contactError = validateStep(1);
    if (contactError) {
      setStatus("error");
      setErrorMessage(contactError);
      setCurrentStep(1);
      return;
    }
    const processError = validateStep(2);
    if (processError) {
      setStatus("error");
      setErrorMessage(processError);
      setCurrentStep(2);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/request-process-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
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
      if (typeof window !== "undefined") {
        window.location.assign(DISCOUNT_PATH);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t("assessment.error.network"));
    }
  };

  const dictationEnabled = isOpen && status !== "submitting";
  const stepLabel = t("assessment.step")
    .replace("{n}", String(currentStep))
    .replace("{total}", String(TOTAL_STEPS));

  const stepTitle =
    status === "success"
      ? t("assessment.success.title")
      : currentStep === 1
        ? t("assessment.title")
        : currentStep === 2
          ? t("assessment.process")
          : currentStep === 3
            ? t("assessment.systems")
            : t("assessment.volume");

  const stepDescription =
    status === "success"
      ? t("assessment.success.description")
      : currentStep === 1
        ? t("assessment.subtitle")
        : null;

  const modal =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-end justify-center px-0 py-0 sm:items-center sm:px-4 sm:py-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            aria-describedby={
              stepDescription ? `${id}-description` : undefined
            }
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={close}
            />
            <div
              ref={dialogRef}
              className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-hairline-strong bg-paper sm:rounded-3xl"
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-hairline p-5 sm:p-6">
                <div className="min-w-0 flex-1">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                    {t("assessment.eyebrow")}
                  </p>
                  {status !== "success" ? (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-ink-soft">
                        {stepLabel}
                      </p>
                      <div
                        className="mt-2 flex gap-1.5"
                        role="progressbar"
                        aria-valuemin={1}
                        aria-valuemax={TOTAL_STEPS}
                        aria-valuenow={currentStep}
                        aria-label={stepLabel}
                      >
                        {Array.from({ length: TOTAL_STEPS }, (_, index) => {
                          const step = (index + 1) as Step;
                          const isCurrent = step === currentStep;
                          const isDone = step < currentStep;
                          return (
                            <span
                              key={step}
                              className={`h-1.5 flex-1 rounded-full ${
                                isCurrent || isDone
                                  ? "bg-accent"
                                  : "bg-hairline-strong"
                              }`}
                              aria-current={isCurrent ? "step" : undefined}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  <h2
                    id={`${id}-title`}
                    className="text-[26px] font-semibold tracking-[-0.04em] text-ink sm:text-[32px]"
                  >
                    {stepTitle}
                  </h2>
                  {stepDescription ? (
                    <p
                      id={`${id}-description`}
                      className="mt-2 max-w-[56ch] text-sm leading-[1.55] text-ink-soft"
                    >
                      {stepDescription}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={close}
                  disabled={status === "submitting"}
                  className="shrink-0 rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-2"
                  aria-label={t("assessment.close")}
                >
                  {t("assessment.close")}
                </button>
              </div>

              {status === "success" ? (
                <div className="overflow-y-auto p-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:p-8 sm:pb-8">
                  <CheckCircle2
                    size={38}
                    className="mb-5 text-accent"
                    aria-hidden="true"
                  />
                  <p className="max-w-[54ch] text-[15px] leading-[1.65] text-ink-2">
                    {t("assessment.success.next")}
                  </p>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={close}
                      className="btn-ink-ghost w-full sm:w-auto"
                    >
                      {t("assessment.success.close")}
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className="flex min-h-0 flex-1 flex-col"
                  lang={lang}
                  onSubmit={submit}
                >
                  <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
                    {currentStep === 1 ? (
                      <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <label className="block">
                            <span className="text-sm font-medium text-ink">
                              {t("assessment.name")} *
                            </span>
                            <input
                              ref={stepInputRef}
                              className={INPUT_CLASS}
                              value={form.name}
                              maxLength={120}
                              autoComplete="name"
                              required
                              onChange={(event) =>
                                patchForm({ name: event.currentTarget.value })
                              }
                            />
                          </label>
                          <label className="block">
                            <span className="text-sm font-medium text-ink">
                              {t("assessment.email")} *
                            </span>
                            <input
                              type="email"
                              required
                              className={INPUT_CLASS}
                              value={form.clientEmail}
                              maxLength={254}
                              autoComplete="email"
                              inputMode="email"
                              placeholder={t("assessment.emailPlaceholder")}
                              onChange={(event) =>
                                patchForm({
                                  clientEmail: event.currentTarget.value,
                                })
                              }
                            />
                          </label>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <label className="block">
                            <span className="text-sm font-medium text-ink">
                              {t("assessment.company")}
                            </span>
                            <input
                              className={INPUT_CLASS}
                              value={form.company}
                              maxLength={120}
                              autoComplete="organization"
                              onChange={(event) =>
                                patchForm({ company: event.currentTarget.value })
                              }
                            />
                          </label>
                          <label className="block">
                            <span className="text-sm font-medium text-ink">
                              {t("assessment.role")}
                            </span>
                            <input
                              className={INPUT_CLASS}
                              value={form.role}
                              maxLength={120}
                              autoComplete="organization-title"
                              onChange={(event) =>
                                patchForm({ role: event.currentTarget.value })
                              }
                            />
                          </label>
                        </div>
                      </>
                    ) : null}

                    {currentStep === 2 ? (
                      <label className="block">
                        <span className="sr-only">
                          {t("assessment.process")} *
                        </span>
                        <div className="relative">
                          <textarea
                            ref={stepTextareaRef}
                            required
                            minLength={20}
                            maxLength={2000}
                            className={TEXTAREA_CLASS}
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
                    ) : null}

                    {currentStep === 3 ? (
                      <label className="block">
                        <span className="sr-only">
                          {t("assessment.systems")}
                        </span>
                        <div className="relative">
                          <textarea
                            ref={stepTextareaRef}
                            maxLength={500}
                            className={TEXTAREA_CLASS}
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
                    ) : null}

                    {currentStep === 4 ? (
                      <>
                        <label className="block">
                          <span className="sr-only">
                            {t("assessment.volume")}
                          </span>
                          <div className="relative">
                            <textarea
                              ref={stepTextareaRef}
                              maxLength={500}
                              className={TEXTAREA_CLASS}
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
                        <p className="text-xs leading-[1.55] text-ink-soft">
                          {t("assessment.privacy")}
                        </p>
                      </>
                    ) : null}

                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="pointer-events-none absolute h-0 w-0 opacity-0"
                      value={form.honeypot}
                      onChange={(event) =>
                        patchForm({ honeypot: event.currentTarget.value })
                      }
                    />

                    {status === "error" && errorMessage ? (
                      <div
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                      >
                        {errorMessage}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 flex-col gap-3 border-t border-hairline bg-paper p-5 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:flex-row sm:items-center sm:justify-end sm:p-6">
                    {currentStep === 1 ? (
                      <button
                        type="button"
                        className="btn-ink-ghost w-full sm:w-auto"
                        onClick={close}
                        disabled={status === "submitting"}
                      >
                        {t("assessment.cancel")}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-ink-ghost w-full sm:w-auto"
                        onClick={goBack}
                        disabled={status === "submitting"}
                      >
                        {t("assessment.back")}
                      </button>
                    )}
                    {currentStep < TOTAL_STEPS ? (
                      <button
                        type="button"
                        className="btn-ink w-full sm:w-auto"
                        onClick={goNext}
                      >
                        {t("assessment.next")}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn-ink w-full disabled:opacity-60 sm:w-auto"
                        disabled={status === "submitting"}
                      >
                        {status === "submitting"
                          ? t("assessment.sending")
                          : t("assessment.send")}
                      </button>
                    )}
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
        className={`btn-ink ${compact ? "!min-h-11 !px-4 !py-2 text-[13px]" : ""}`}
        onClick={() => {
          setStatus("idle");
          setErrorMessage("");
          setCurrentStep(1);
          setIsOpen(true);
        }}
      >
        <span>{textButton}</span>
        {showArrow ? (
          <ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
        ) : null}
      </button>
      {modal}
    </>
  );
}
