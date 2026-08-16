"use client";

import { Loader2, Mic, Square } from "lucide-react";
import { useCallback, type MouseEvent } from "react";
import { useLang, useT } from "../../lib/i18n/context";
import { useVoiceDictation } from "../../hooks/useVoiceDictation";

type Props = {
  onTranscript: (text: string) => void;
  enabled?: boolean;
  className?: string;
};

export default function DictationButton({
  onTranscript,
  enabled = true,
  className = "",
}: Props) {
  const t = useT();
  const { lang } = useLang();
  const { status, toggle, isSupported } = useVoiceDictation({
    lang,
    onTranscript,
    enabled,
  });

  const label =
    status === "recording"
      ? t("assessment.dictateStop")
      : status === "transcribing"
        ? t("assessment.dictateListening")
        : status === "denied"
          ? t("assessment.dictateDenied")
          : status === "unsupported"
            ? t("assessment.dictateUnsupported")
            : status === "error"
              ? t("assessment.dictateError")
              : t("assessment.dictate");

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      toggle();
    },
    [toggle],
  );

  if (!isSupported && status === "unsupported") {
    return null;
  }

  const isBusy = status === "transcribing";
  const isRecording = status === "recording";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!enabled || isBusy || status === "unsupported"}
      aria-label={label}
      title={label}
      className={[
        "absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors",
        isRecording
          ? "border-accent bg-accent/10 text-accent animate-pulse"
          : status === "error" || status === "denied"
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-hairline-strong bg-paper text-ink-soft hover:bg-paper-2 hover:text-ink",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      ].join(" ")}
    >
      {isBusy ? (
        <Loader2 size={14} className="animate-spin" aria-hidden="true" />
      ) : isRecording ? (
        <Square size={12} fill="currentColor" aria-hidden="true" />
      ) : (
        <Mic size={14} aria-hidden="true" />
      )}
    </button>
  );
}
