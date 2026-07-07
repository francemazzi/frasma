import Image from "next/image";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";
import GoogleCalendarEmbed from "../molecols/GoogleCalendarEmbed";
import { useT, useLang } from "../../lib/i18n/context";

type CalButtonType = "default" | "textual" | "icon" | "ink";

type CalPublicProps = {
  textButton: string | React.ReactNode;
  leftImage?: string;
  leftIcon?: LucideIcon;
  buttonType?: CalButtonType;
  showArrow?: boolean;
};

type CalInternalProps = CalPublicProps & {
  t: (key: string) => string;
  lang: string;
};

type CalState = {
  isOpen: boolean;
};

class CssClassBuilder {
  public buildButtonClasses(type: CalButtonType): string {
    if (type === "textual") {
      return "flex items-center gap-2 px-3 py-2 text-sm font-medium text-sage-600 hover:text-sage-500 bg-sage-50 rounded-full transition duration-200";
    }
    if (type === "icon") {
      return "flex items-center justify-center p-2 rounded-full bg-sage-500 hover:bg-sage-400 text-white transition duration-200";
    }
    if (type === "ink") {
      return "btn-ink";
    }
    return "flex items-center gap-2 sm:gap-3 rounded-full bg-sage-500 px-5 py-2.5 text-base sm:px-8 sm:py-3 sm:text-lg font-semibold text-white shadow-sm hover:bg-sage-400 transition duration-200";
  }
}

class GoogleCalendarModal extends React.PureComponent<{
  isOpen: boolean;
  t: (key: string) => string;
  onClose: () => void;
}> {
  public render(): React.ReactNode {
    if (!this.props.isOpen) return null;
    if (typeof document === "undefined") return null;

    const { t } = this.props;

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

        <div className="relative w-full min-w-0 max-w-4xl max-h-[90dvh] overflow-y-auto overflow-x-hidden rounded-2xl bg-farm-surface shadow-2xl border border-farm-border">
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
            >
              {t("cal.close")}
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <GoogleCalendarEmbed height={600} />
          </div>
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
    this.setState({ isOpen: true });
  }

  private closeModal(): void {
    this.setState({ isOpen: false });
  }

  public render(): React.ReactNode {
    const {
      leftIcon: LeftIcon,
      leftImage,
      buttonType = "default",
      showArrow = false,
      t,
    } = this.props;
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
          {showArrow && (
            <ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
          )}
        </button>

        <GoogleCalendarModal
          isOpen={this.state.isOpen}
          t={t}
          onClose={() => this.closeModal()}
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
