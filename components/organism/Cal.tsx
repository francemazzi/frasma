import Image from "next/image";
import { LucideIcon } from "lucide-react";
import React from "react";

type CalButtonType = "default" | "textual" | "icon";

type CalProps = {
  textButton: string | React.ReactNode;
  leftImage?: string;
  leftIcon?: LucideIcon;
  buttonType?: CalButtonType;
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

class MeetingFormValidator {
  private readonly _emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  public validate(state: CalState): string {
    if (!state.date) return "Please select a date.";
    if (!state.time) return "Please select a time.";
    if (!state.email) return "Please enter your email.";
    if (!this._emailRegex.test(state.email)) return "Please enter a valid email.";
    if (state.description.length > 2000) return "Description is too long.";
    return "";
  }
}

class CssClassBuilder {
  public buildButtonClasses(type: CalButtonType): string {
    if (type === "textual") {
      return "flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-700 hover:text-green-600 bg-green-50 rounded-md";
    }
    if (type === "icon") {
      return "flex items-center justify-center p-2 rounded-md bg-green-600 hover:bg-green-700 transition duration-300";
    }
    return "flex items-center gap-3 rounded-md bg-green-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-green-700 transition duration-300";
  }
}

class MeetingSchedulerModal extends React.PureComponent<
  {
    isOpen: boolean;
    title: string;
    state: CalState;
    onClose: () => void;
    onChange: (patch: Partial<CalState>) => void;
    onSubmit: () => Promise<void>;
  },
  {}
> {
  public render(): React.ReactNode {
    if (!this.props.isOpen) return null;

    const { state } = this.props;
    const isBusy = state.status === "submitting";

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        role="dialog"
        aria-modal="true"
        aria-label={this.props.title}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={this.props.onClose}
        />

        <div className="relative w-full max-w-xl rounded-xl bg-white shadow-2xl border border-green-100">
          <div className="flex items-start justify-between gap-4 p-6 border-b border-green-100">
            <div>
              <h3 className="text-xl font-semibold text-green-800">
                {this.props.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Select a date and time, then leave your contact details.
              </p>
            </div>
            <button
              type="button"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={this.props.onClose}
              aria-label="Close"
              disabled={isBusy}
            >
              Close
            </button>
          </div>

          <form
            className="p-6 space-y-4"
            lang="it"
            onSubmit={(e) => {
              e.preventDefault();
              void this.props.onSubmit();
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-medium text-gray-700">
                  Date
                </span>
                <input
                  type="date"
                  lang="it"
                  inputMode="none"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={state.date}
                  onChange={(e) =>
                    this.props.onChange({ date: e.currentTarget.value })
                  }
                  required
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-gray-700">
                  Time
                </span>
                <input
                  type="time"
                  lang="it"
                  inputMode="none"
                  step="900"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={state.time}
                  onChange={(e) =>
                    this.props.onChange({ time: e.currentTarget.value })
                  }
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-sm font-medium text-gray-700">
                Your email
              </span>
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
                value={state.email}
                onChange={(e) =>
                  this.props.onChange({ email: e.currentTarget.value })
                }
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-gray-700">
                Description
              </span>
              <textarea
                className="mt-1 w-full min-h-[110px] rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Tell me what you need and any helpful context..."
                value={state.description}
                onChange={(e) =>
                  this.props.onChange({ description: e.currentTarget.value })
                }
                maxLength={2000}
              />
              <div className="mt-1 text-xs text-gray-500">
                Timezone: <span className="font-medium">{state.timezone}</span>
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
              <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {state.errorMessage}
              </div>
            )}

            {state.status === "success" && (
              <div className="rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
                Request sent! I&apos;ll get back to you shortly.
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={this.props.onClose}
                disabled={isBusy}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-green-700 disabled:opacity-60"
                disabled={isBusy}
              >
                {isBusy ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class Cal extends React.PureComponent<CalProps, CalState> {
  private readonly _validator: MeetingFormValidator = new MeetingFormValidator();
  private readonly _css: CssClassBuilder = new CssClassBuilder();

  public constructor(props: CalProps) {
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

  public componentDidUpdate(_: CalProps, prevState: CalState): void {
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
    const validationError = this._validator.validate(this.state);
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
          (json && (json as any).error) ||
          "Something went wrong while sending your request.";
        this.setState({ status: "error", errorMessage: msg });
        return;
      }

      this.setState({ status: "success" });
    } catch {
      this.setState({
        status: "error",
        errorMessage: "Network error. Please try again.",
      });
    }
  }

  public render(): React.ReactNode {
    const { leftIcon: LeftIcon, leftImage, buttonType = "default" } = this.props;
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
          title="Schedule a meeting"
          state={this.state}
          onClose={() => this.closeModal()}
          onChange={(patch) => this.patchState(patch)}
          onSubmit={() => this.submit()}
        />
      </>
    );
  }
}

export default Cal;
