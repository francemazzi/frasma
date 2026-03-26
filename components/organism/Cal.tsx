import Image from "next/image";
import { LucideIcon } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";
import { validateMeetingFormFields } from "../../lib/meetingFormValidation";
import { useT, useLang } from "../../lib/i18n/context";

type CalButtonType = "default" | "textual" | "icon";

type CalPublicProps = {
  textButton: string | React.ReactNode;
  leftImage?: string;
  leftIcon?: LucideIcon;
  buttonType?: CalButtonType;
};

type CalInternalProps = CalPublicProps & {
  t: (key: string) => string;
  lang: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type CalState = {
  isOpen: boolean;
  date: string;
  time: string;
  email: string;
  description: string;
  timezone: string;
  status: SubmitStatus;
  errorMessage: string;
  honeypot: string;
};
const DISCOUNT_PATH = "/discount";

class CssClassBuilder {
  public buildButtonClasses(type: CalButtonType): string {
    if (type === "textual") {
      return "flex items-center gap-2 px-3 py-2 text-sm font-medium text-sage-600 hover:text-sage-500 bg-sage-50 rounded-full transition duration-200";
    }
    if (type === "icon") {
      return "flex items-center justify-center p-2 rounded-full bg-sage-500 hover:bg-sage-400 text-white transition duration-200";
    }
    return "flex items-center gap-3 rounded-full bg-sage-500 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-sage-400 transition duration-200";
  }
}

class MeetingSchedulerModal extends React.PureComponent<
  {
    isOpen: boolean;
    state: CalState;
    t: (key: string) => string;
    lang: string;
    onClose: () => void;
    onChange: (patch: Partial<CalState>) => void;
    onSubmit: () => Promise<void>;
  },
  {}
> {
  public render(): React.ReactNode {
    if (!this.props.isOpen) return null;
    if (typeof document === "undefined") return null;

    const { state, t, lang } = this.props;
    const isBusy = state.status === "submitting";

    const modal = (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4"
        role="dialog"
        aria-modal="true"
        aria-label={t("cal.title")}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={this.props.onClose}
        />

        <div className="relative w-full max-w-xl max-h-[90dvh] overflow-y-auto rounded-2xl bg-farm-surface shadow-2xl border border-farm-border mx-2 sm:mx-0">
          <div className="flex items-start justify-between gap-4 p-4 sm:p-6 border-b border-farm-border">
            <div>
              <h3 className="text-xl font-semibold text-farm-text">
                {t("cal.title")}
              </h3>
              <p className="mt-1 text-sm text-farm-secondary">
                {t("cal.subtitle")}
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-farm-secondary hover:bg-farm-panel transition-colors"
              onClick={this.props.onClose}
              aria-label={t("cal.close")}
              disabled={isBusy}
            >
              {t("cal.close")}
            </button>
          </div>

          <form
            className="p-4 sm:p-6 space-y-4"
            lang={lang}
            onSubmit={(e) => {
              e.preventDefault();
              void this.props.onSubmit();
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-medium text-farm-text">
                  {t("cal.date")}
                </span>
                <input
                  type="date"
                  lang={lang}
                  inputMode="none"
                  className="mt-1 w-full rounded-lg border border-farm-border px-3 py-2 bg-farm-surface focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-shadow"
                  value={state.date}
                  onChange={(e) =>
                    this.props.onChange({ date: e.currentTarget.value })
                  }
                  required
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-farm-text">
                  {t("cal.time")}
                </span>
                <input
                  type="time"
                  lang={lang}
                  inputMode="none"
                  step="900"
                  className="mt-1 w-full rounded-lg border border-farm-border px-3 py-2 bg-farm-surface focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-shadow"
                  value={state.time}
                  onChange={(e) =>
                    this.props.onChange({ time: e.currentTarget.value })
                  }
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-sm font-medium text-farm-text">
                {t("cal.email")}
              </span>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border border-farm-border px-3 py-2 bg-farm-surface focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-shadow"
                placeholder={t("cal.emailPlaceholder")}
                value={state.email}
                onChange={(e) =>
                  this.props.onChange({ email: e.currentTarget.value })
                }
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-farm-text">
                {t("cal.description")}
              </span>
              <textarea
                className="mt-1 w-full min-h-[110px] rounded-lg border border-farm-border px-3 py-2 bg-farm-surface focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-shadow"
                placeholder={t("cal.descPlaceholder")}
                value={state.description}
                onChange={(e) =>
                  this.props.onChange({ description: e.currentTarget.value })
                }
                maxLength={2000}
              />
              <div className="mt-1 text-xs text-farm-secondary">
                {t("cal.timezone")}: <span className="font-medium">{state.timezone}</span>
              </div>
            </label>

            {/* Honeypot field - hidden from users but visible to bots */}
            <input
              type="text"
              name="website"
              className="absolute opacity-0 pointer-events-none h-0 w-0"
              tabIndex={-1}
              autoComplete="off"
              value={state.honeypot}
              onChange={(e) =>
                this.props.onChange({ honeypot: e.currentTarget.value })
              }
              aria-hidden="true"
            />

            {state.status === "error" && state.errorMessage && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {state.errorMessage}
              </div>
            )}

            {state.status === "success" && (
              <div className="rounded-lg bg-sage-50 border border-sage-200 px-4 py-3 text-sm text-sage-600">
                {t("cal.success")}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-medium text-farm-secondary hover:bg-farm-panel transition-colors"
                onClick={this.props.onClose}
                disabled={isBusy}
              >
                {t("cal.cancel")}
              </button>
              <button
                type="submit"
                className="rounded-full bg-sage-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sage-400 disabled:opacity-60 transition-colors"
                disabled={isBusy}
              >
                {isBusy ? t("cal.sending") : t("cal.send")}
              </button>
            </div>
          </form>
        </div>
      </div>
    );

    return createPortal(modal, document.body);
  }
}

class CalInner extends React.PureComponent<CalInternalProps, CalState> {
  private readonly _css: CssClassBuilder = new CssClassBuilder();

  public constructor(props: CalInternalProps) {
    super(props);
    this.state = {
      isOpen: false,
      date: "",
      time: "",
      email: "",
      description: "",
      timezone: "Unknown",
      status: "idle",
      errorMessage: "",
      honeypot: "",
    };
  }

  public componentDidUpdate(_: CalInternalProps, prevState: CalState): void {
    if (!prevState.isOpen && this.state.isOpen) {
      window.addEventListener("keydown", this.onKeyDown);
    }
    if (prevState.isOpen && !this.state.isOpen) {
      window.removeEventListener("keydown", this.onKeyDown);
    }
  }

  public componentWillUnmount(): void {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      this.closeModal();
    }
  };

  private openModal(): void {
    const timezone =
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown"
        : "Unknown";

    this.setState({
      isOpen: true,
      timezone,
      status: "idle",
      errorMessage: "",
    });
  }

  private closeModal(): void {
    if (this.state.status === "submitting") return;
    this.setState({ isOpen: false });
  }

  private patchState(patch: Partial<CalState>): void {
    this.setState((prevState) => ({
      ...prevState,
      ...patch,
      status: "idle",
      errorMessage: "",
    }));
  }

  private async submit(): Promise<void> {
    const { t } = this.props;
    const validationError = validateMeetingFormFields(
      {
        date: this.state.date,
        time: this.state.time,
        email: this.state.email,
        description: this.state.description,
      },
      t
    );
    if (validationError) {
      this.setState({ status: "error", errorMessage: validationError });
      return;
    }

    this.setState({ status: "submitting", errorMessage: "" });

    try {
      const res = await fetch("/api/schedule-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: this.state.date,
          time: this.state.time,
          email: this.state.email,
          description: this.state.description,
          timezone: this.state.timezone,
          honeypot: this.state.honeypot,
        }),
      });

      const json = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !json || (json as any).ok !== true) {
        const msg =
          (json && (json as any).error) || t("cal.errorFallback");
        this.setState({ status: "error", errorMessage: msg });
        return;
      }

      this.setState({ status: "success" });
      if (typeof window !== "undefined") {
        window.location.assign(DISCOUNT_PATH);
      }
    } catch {
      this.setState({
        status: "error",
        errorMessage: t("cal.networkError"),
      });
    }
  }

  public render(): React.ReactNode {
    const { leftIcon: LeftIcon, leftImage, buttonType = "default", t, lang } = this.props;
    const buttonClasses = this._css.buildButtonClasses(buttonType);

    return (
      <>
        <button
          type="button"
          className={buttonClasses}
          onClick={() => this.openModal()}
        >
          {leftImage && (
            <Image
              src={leftImage}
              alt={leftImage.split("/").pop() || "Francesco"}
              width={buttonType === "textual" ? 24 : 40}
              height={buttonType === "textual" ? 24 : 40}
              className="object-cover rounded-md"
            />
          )}
          {LeftIcon && (
            <LeftIcon
              size={buttonType === "textual" ? 20 : 24}
              className="flex-shrink-0"
            />
          )}
          <span>{this.props.textButton}</span>
        </button>

        <MeetingSchedulerModal
          isOpen={this.state.isOpen}
          state={this.state}
          t={t}
          lang={lang}
          onClose={() => this.closeModal()}
          onChange={(patch) => this.patchState(patch)}
          onSubmit={() => this.submit()}
        />
      </>
    );
  }
}

export default function Cal(props: CalPublicProps) {
  const t = useT();
  const { lang } = useLang();
  return <CalInner {...props} t={t} lang={lang} />;
}
