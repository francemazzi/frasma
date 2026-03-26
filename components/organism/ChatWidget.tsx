import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Send, Loader2, Mail, Calendar } from "lucide-react";
import { validateMeetingFormFields } from "../../lib/meetingFormValidation";
import { useT, useLang } from "../../lib/i18n/context";

type Message = { role: "user" | "assistant"; content: string };

type EmailFormData = {
  subject: string;
  body: string;
  clientEmail: string;
  clientName: string;
};

type MeetingFormData = {
  date: string;
  time: string;
  email: string;
  description: string;
  timezone: string;
};

const EMAIL_FORM_RE = /<!--EMAIL_FORM-->([\s\S]*?)<!--\/EMAIL_FORM-->/;
const MEETING_FORM_RE = /<!--MEETING_FORM-->([\s\S]*?)<!--\/MEETING_FORM-->/;
const DISCOUNT_PATH = "/discount";

function redirectToDiscount(): void {
  if (typeof window !== "undefined") {
    window.location.assign(DISCOUNT_PATH);
  }
}

function parseAssistantMessage(content: string): {
  text: string;
  emailForm: EmailFormData | null;
  meetingForm: MeetingFormData | null;
} {
  let emailForm: EmailFormData | null = null;
  const emailMatch = content.match(EMAIL_FORM_RE);
  if (emailMatch) {
    try {
      emailForm = JSON.parse(emailMatch[1]) as EmailFormData;
    } catch {
      emailForm = null;
    }
  }

  let meetingForm: MeetingFormData | null = null;
  const meetingMatch = content.match(MEETING_FORM_RE);
  if (meetingMatch) {
    try {
      meetingForm = JSON.parse(meetingMatch[1]) as MeetingFormData;
    } catch {
      meetingForm = null;
    }
  }

  const text = content
    .replace(EMAIL_FORM_RE, "")
    .replace(MEETING_FORM_RE, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { text, emailForm, meetingForm };
}

/* ------------------------------------------------------------------ */
/*  Inline email form                                                  */
/* ------------------------------------------------------------------ */

function InlineEmailForm({
  form,
  onSent,
  t,
}: {
  form: EmailFormData;
  onSent: () => void;
  t: (key: string) => string;
}) {
  const [subject, setSubject] = useState(form.subject);
  const [body, setBody] = useState(form.body);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSend = async () => {
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientEmail: form.clientEmail,
          subject,
          body,
        }),
      });
      if (res.ok) {
        setSent(true);
        onSent();
        redirectToDiscount();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="flex items-center gap-2 text-sage-600 text-xs font-medium py-1">
        <Mail size={14} />
        {t("chat.email.sent")}
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-xl border border-sage-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 text-sage-600 font-semibold text-xs">
        <Mail size={14} />
        {t("chat.email.title")}
      </div>

      <div>
        <label className="block text-[11px] text-farm-secondary mb-0.5">
          {t("chat.email.subject")}
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={sending}
          className="w-full rounded-lg border border-farm-border bg-farm-bg px-2.5 py-1.5 text-xs text-farm-text focus:outline-none focus:ring-1 focus:ring-sage-300"
        />
      </div>

      <div>
        <label className="block text-[11px] text-farm-secondary mb-0.5">
          {t("chat.email.body")}
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={sending}
          rows={6}
          className="w-full rounded-lg border border-farm-border bg-farm-bg px-2.5 py-1.5 text-xs text-farm-text leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-sage-300"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500">{t("chat.email.error")}</p>
      )}

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={handleSend}
          disabled={sending || !subject.trim() || !body.trim()}
          className="flex items-center gap-1.5 rounded-full bg-sage-500 text-white text-xs font-medium px-3 py-1.5 hover:bg-sage-400 disabled:opacity-40 transition-colors"
        >
          {sending ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              {t("chat.email.sending")}
            </>
          ) : (
            <>
              <Send size={12} />
              {t("chat.email.send")}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline meeting form (same API body as Cal modal)                   */
/* ------------------------------------------------------------------ */

function InlineMeetingForm({
  form,
  onSent,
  t,
  lang,
}: {
  form: MeetingFormData;
  onSent: () => void;
  t: (key: string) => string;
  lang: string;
}) {
  const [date, setDate] = useState(form.date);
  const [time, setTime] = useState(form.time);
  const [email, setEmail] = useState(form.email);
  const [description, setDescription] = useState(form.description);
  const [timezone] = useState(() => {
    const tz = form.timezone?.trim();
    if (tz) return tz;
    if (typeof window !== "undefined") {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Rome";
    }
    return "Europe/Rome";
  });
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateMeetingFormFields(
      { date, time, email, description },
      t
    );
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setSending(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/schedule-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          time,
          email,
          description,
          timezone,
          honeypot,
        }),
      });

      const json = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !json || json.ok !== true) {
        const msg =
          json && "error" in json && json.error
            ? json.error
            : t("cal.errorFallback");
        setErrorMessage(msg);
        return;
      }

      setSent(true);
      onSent();
      redirectToDiscount();
    } catch {
      setErrorMessage(t("cal.networkError"));
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="flex items-center gap-2 text-sage-600 text-xs font-medium py-1">
        <Calendar size={14} />
        {t("cal.success")}
      </div>
    );
  }

  return (
    <form
      className="relative mt-2 rounded-xl border border-sage-200 bg-white p-3 space-y-2"
      lang={lang}
      onSubmit={(e) => void handleSubmit(e)}
    >
      <div className="flex items-center gap-2 text-sage-600 font-semibold text-xs">
        <Calendar size={14} />
        {t("chat.meeting.title")}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[11px] text-farm-secondary mb-0.5">
            {t("cal.date")}
          </label>
          <input
            type="date"
            lang={lang}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={sending}
            className="w-full rounded-lg border border-farm-border bg-farm-bg px-2 py-1.5 text-xs text-farm-text focus:outline-none focus:ring-1 focus:ring-sage-300"
          />
        </div>
        <div>
          <label className="block text-[11px] text-farm-secondary mb-0.5">
            {t("cal.time")}
          </label>
          <input
            type="time"
            lang={lang}
            step={900}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={sending}
            className="w-full rounded-lg border border-farm-border bg-farm-bg px-2 py-1.5 text-xs text-farm-text focus:outline-none focus:ring-1 focus:ring-sage-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] text-farm-secondary mb-0.5">
          {t("cal.email")}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={sending}
          placeholder={t("cal.emailPlaceholder")}
          className="w-full rounded-lg border border-farm-border bg-farm-bg px-2.5 py-1.5 text-xs text-farm-text focus:outline-none focus:ring-1 focus:ring-sage-300"
        />
      </div>

      <div>
        <label className="block text-[11px] text-farm-secondary mb-0.5">
          {t("cal.description")}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={sending}
          rows={4}
          maxLength={2000}
          placeholder={t("cal.descPlaceholder")}
          className="w-full rounded-lg border border-farm-border bg-farm-bg px-2.5 py-1.5 text-xs text-farm-text leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-sage-300"
        />
        <p className="mt-0.5 text-[10px] text-farm-secondary">
          {t("cal.timezone")}: <span className="font-medium">{timezone}</span>
        </p>
      </div>

      <input
        type="text"
        name="website"
        className="absolute opacity-0 pointer-events-none h-0 w-0"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden="true"
      />

      {errorMessage ? (
        <p className="text-xs text-red-500">{errorMessage}</p>
      ) : null}

      <div className="flex gap-2 justify-end">
        <button
          type="submit"
          disabled={sending}
          className="flex items-center gap-1.5 rounded-full bg-sage-500 text-white text-xs font-medium px-3 py-1.5 hover:bg-sage-400 disabled:opacity-40 transition-colors"
        >
          {sending ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              {t("cal.sending")}
            </>
          ) : (
            <>
              <Send size={12} />
              {t("cal.send")}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat widget                                                        */
/* ------------------------------------------------------------------ */

const CHAT_FETCH_TIMEOUT_MS = 12_000;

export default function ChatWidget() {
  const t = useT();
  const { lang } = useLang();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Add welcome message on first open
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: t("chat.welcome") }]);
    }
  }, [messages.length, t]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const timezone =
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Europe/Rome"
          : "Europe/Rome";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          lang,
          timezone,
        }),
        signal: AbortSignal.timeout(CHAT_FETCH_TIMEOUT_MS),
      });

      const json = (await res.json().catch(() => null)) as
        | { response?: string; code?: string }
        | null;

      if (json?.code === "TIMEOUT") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: t("chat.timeout") ?? "Timeout.",
          },
        ]);
        return;
      }

      if (res.ok && json?.response != null && json.response !== "") {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: json.response as string },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: t("chat.error") ?? "Error.",
          },
        ]);
      }
    } catch (e) {
      const isAbort =
        e instanceof DOMException && e.name === "AbortError";
      const fallback = (isAbort ? t("chat.timeout") : t("chat.error")) ?? "Error.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: fallback,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, lang, t]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const handleEmailSent = useCallback(() => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: t("chat.email.sent") },
    ]);
  }, [t]);

  const handleMeetingSent = useCallback(() => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: t("cal.success") },
    ]);
  }, [t]);

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className="fixed z-50 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden w-14 h-14 border-2 border-sage-300 hover:border-sage-400 bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] sm:bottom-6 sm:right-6"
          aria-label={t("chat.title")}
        >
          <Image
            src="/bobby_chat_cuffie_chat.png"
            alt="Bobby"
            width={56}
            height={56}
            sizes="56px"
            quality={70}
            className="object-cover"
          />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed z-50 flex min-w-0 flex-col overflow-hidden rounded-2xl border border-farm-border bg-farm-surface shadow-2xl left-3 right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] max-h-[min(31.25rem,calc(100dvh-1.5rem-env(safe-area-inset-bottom,0px)-env(safe-area-inset-top,0px)))] sm:left-auto sm:right-6 sm:bottom-6 sm:w-[360px] sm:max-h-[500px]">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-sage-500 text-white">
            <Image
              src="/bobby_chat_cuffie_chat.png"
              alt="Bobby"
              width={32}
              height={32}
              sizes="32px"
              quality={70}
              className="rounded-full object-cover"
            />
            <span className="font-semibold text-sm flex-1">
              {t("chat.title")}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              aria-label={t("chat.close")}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-farm-bg p-3 space-y-3 sm:p-4"
          >
            {messages.map((msg, i) => {
              const { text, emailForm, meetingForm } =
                msg.role === "assistant"
                  ? parseAssistantMessage(msg.content)
                  : {
                      text: msg.content,
                      emailForm: null,
                      meetingForm: null,
                    };

              return (
                <div
                  key={i}
                  className={`flex min-w-0 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[min(100%,18rem)] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      msg.role === "user"
                        ? "bg-sage-500 text-white rounded-br-md"
                        : "bg-farm-surface text-farm-text border border-farm-border rounded-bl-md"
                    }`}
                  >
                    {text ? <span>{text}</span> : null}
                    {emailForm ? (
                      <InlineEmailForm
                        form={emailForm}
                        onSent={handleEmailSent}
                        t={t}
                      />
                    ) : null}
                    {meetingForm ? (
                      <InlineMeetingForm
                        form={meetingForm}
                        onSent={handleMeetingSent}
                        t={t}
                        lang={lang}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-farm-surface text-farm-secondary border border-farm-border rounded-2xl rounded-bl-md px-4 py-2.5 text-sm">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex min-w-0 items-center gap-2 border-t border-farm-border bg-farm-surface p-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("chat.placeholder")}
              disabled={loading}
              className="min-w-0 flex-1 rounded-full border border-farm-border bg-farm-bg px-3 py-2 text-sm text-farm-text placeholder:text-farm-secondary transition-shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sage-300 sm:px-4"
            />
            <button
              type="button"
              onClick={() => void sendMessage()}
              disabled={loading || !input.trim()}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-sage-500 text-white hover:bg-sage-400 disabled:opacity-40 transition-colors"
              aria-label={t("chat.send")}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
