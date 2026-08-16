"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type DictationStatus =
  | "idle"
  | "recording"
  | "transcribing"
  | "unsupported"
  | "denied"
  | "error";

type UseVoiceDictationOptions = {
  lang: "it" | "en";
  onTranscript: (text: string) => void;
  enabled?: boolean;
};

const MAX_RECORDING_MS = 60_000;

function isDictationSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined"
  );
}

function pickMimeType(): string {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg",
  ];
  for (const type of candidates) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return "";
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Failed to read audio."));
        return;
      }
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read audio."));
    reader.readAsDataURL(blob);
  });
}

export function useVoiceDictation({
  lang,
  onTranscript,
  enabled = true,
}: UseVoiceDictationOptions) {
  const [status, setStatus] = useState<DictationStatus>(() =>
    isDictationSupported() ? "idle" : "unsupported",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const stopTimerRef = useRef<number | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  const langRef = useRef(lang);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  const clearStopTimer = useCallback(() => {
    if (stopTimerRef.current != null) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  }, []);

  const releaseStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const resetRecorder = useCallback(() => {
    clearStopTimer();
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    releaseStream();
  }, [clearStopTimer, releaseStream]);

  const transcribe = useCallback(async (blob: Blob, mimeType: string) => {
    setStatus("transcribing");
    setErrorMessage("");
    try {
      const audioBase64 = await blobToBase64(blob);
      const response = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audioBase64,
          mimeType: mimeType.split(";")[0] || mimeType,
          lang: langRef.current,
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { text: string }
        | { error: string }
        | null;

      if (!response.ok || !result || !("text" in result) || !result.text.trim()) {
        setStatus("error");
        setErrorMessage(
          result && "error" in result && result.error
            ? result.error
            : "transcription_failed",
        );
        return;
      }

      onTranscriptRef.current(result.text.trim());
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMessage("network");
    }
  }, []);

  const stop = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      resetRecorder();
      setStatus((current) =>
        current === "recording" ? "idle" : current,
      );
      return;
    }
    clearStopTimer();
    recorder.stop();
  }, [clearStopTimer, resetRecorder]);

  const start = useCallback(async () => {
    if (!enabled || !isDictationSupported()) {
      setStatus("unsupported");
      return;
    }
    if (status === "recording" || status === "transcribing") return;

    setErrorMessage("");
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = pickMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onerror = () => {
        resetRecorder();
        setStatus("error");
        setErrorMessage("recording_failed");
      };

      recorder.onstop = () => {
        const type = recorder.mimeType || mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type });
        resetRecorder();
        if (blob.size === 0) {
          setStatus("error");
          setErrorMessage("empty_audio");
          return;
        }
        void transcribe(blob, type);
      };

      recorder.start();
      setStatus("recording");
      stopTimerRef.current = window.setTimeout(() => {
        if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.stop();
        }
      }, MAX_RECORDING_MS);
    } catch (error) {
      resetRecorder();
      const name =
        error && typeof error === "object" && "name" in error
          ? String((error as { name: string }).name)
          : "";
      if (
        name === "NotAllowedError" ||
        name === "PermissionDeniedError" ||
        name === "SecurityError"
      ) {
        setStatus("denied");
        return;
      }
      setStatus("error");
      setErrorMessage("microphone_failed");
    }
  }, [enabled, resetRecorder, status, transcribe]);

  const toggle = useCallback(() => {
    if (status === "recording") {
      stop();
      return;
    }
    if (status === "transcribing") return;
    void start();
  }, [start, status, stop]);

  useEffect(() => {
    if (!enabled && (status === "recording" || mediaRecorderRef.current)) {
      stop();
    }
  }, [enabled, status, stop]);

  useEffect(() => {
    return () => {
      clearStopTimer();
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.onstop = null;
        mediaRecorderRef.current.stop();
      }
      releaseStream();
    };
  }, [clearStopTimer, releaseStream]);

  return {
    status,
    errorMessage,
    start,
    stop,
    toggle,
    isSupported: status !== "unsupported",
  };
}
