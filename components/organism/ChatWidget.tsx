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
const DISCOUNT_PATH = "/discount?conv=contact";

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
      {/* Floating launcher — editorial */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className="fixed z-50 inline-flex items-center gap-[10px] rounded-full bg-ink text-paper px-[18px] py-3 pl-[14px] font-sans text-sm font-medium transition-all hover:bg-accent hover:-translate-y-px bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] sm:bottom-6 sm:right-6"
          aria-label={t("chat.title")}
          style={{
            boxShadow:
              "0 12px 28px -8px rgba(27,25,22,0.5), 0 4px 10px -4px rgba(27,25,22,0.3)",
          }}
        >
          <Image
            src="/logo-frasma.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover"
          />
          {t("chat.title")}
        </button>
      )}

      {/* Chat window — editorial paper panel */}
      {isOpen && (
        <div
          className="fixed z-50 flex min-w-0 flex-col overflow-hidden rounded-3xl border border-hairline-strong bg-paper left-3 right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] max-h-[min(34rem,calc(100dvh-1.5rem-env(safe-area-inset-bottom,0px)-env(safe-area-inset-top,0px)))] sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px] sm:max-h-[540px]"
          style={{
            background: "linear-gradient(180deg, #F4EEDF 0%, #EDE5CF 100%)",
            boxShadow: "0 28px 60px -12px rgba(27,25,22,0.4)",
          }}
        >
          {/* Header */}
          <div className="px-5 py-[18px] border-b border-hairline bg-paper flex flex-col gap-[6px] relative">
            <div className="flex items-center gap-3 pr-9">
              <Image
                src="/logo-frasma.png"
                alt="Frasma"
                width={38}
                height={38}
                className="h-[38px] w-[38px] rounded-full object-cover"
              />
              <div className="font-serif text-[20px] font-medium leading-tight tracking-[-0.015em] text-ink">
                <em className="italic text-accent font-normal">{t("chat.title")}</em>
              </div>
            </div>
            <div className="font-mono text-[10.5px] text-ink-soft tracking-[0.06em] uppercase flex items-center gap-2">
              <span
                className="w-[7px] h-[7px] rounded-full bg-[#4f8a3f]"
                style={{
                  boxShadow: "0 0 0 3px rgba(79,138,63,0.18)",
                  animation: "pulse 2s infinite",
                }}
              />
              online · risponde in pochi minuti
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t("chat.close")}
              className="absolute right-3 top-3 w-8 h-8 rounded-full border border-hairline-strong text-ink flex items-center justify-center transition-colors hover:bg-ink hover:text-paper hover:border-ink"
            >
              <X size={14} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-[22px] py-[18px] flex flex-col gap-[18px]"
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

              if (msg.role === "user") {
                return (
                  <div key={i} className="self-end max-w-[86%] flex flex-col items-end">
                    <span className="font-mono text-[9.5px] tracking-[0.12em] uppercase mb-[6px] text-ink-faint text-right">
                      tu
                    </span>
                    <div className="bg-ink text-paper px-[14px] py-[10px] rounded-[16px_16px_4px_16px] text-[13.5px] leading-[1.5] whitespace-pre-wrap break-words">
                      {text}
                    </div>
                  </div>
                );
              }

              return (
                <div key={i} className="max-w-full">
                  <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase mb-[6px] text-accent flex items-center gap-1.5">
                    <Image
                      src="/logo-frasma.png"
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    frasma
                  </div>
                  <div className="font-serif text-[16px] leading-[1.5] text-ink whitespace-pre-wrap break-words">
                    {text}
                  </div>
                  {emailForm ? (
                    <InlineEmailForm form={emailForm} onSent={handleEmailSent} t={t} />
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
              );
            })}

            {loading && (
              <div className="max-w-full">
                <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase mb-[6px] text-accent flex items-center gap-1.5">
                  <Image
                    src="/logo-frasma.png"
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 rounded-full object-cover"
                  />
                  frasma
                </div>
                <div className="flex gap-[5px] py-[6px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-accent" style={{ animation: "bounce 1.2s infinite" }} />
                  <span className="w-[6px] h-[6px] rounded-full bg-accent" style={{ animation: "bounce 1.2s infinite", animationDelay: "0.15s" }} />
                  <span className="w-[6px] h-[6px] rounded-full bg-accent" style={{ animation: "bounce 1.2s infinite", animationDelay: "0.3s" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-hairline px-[18px] py-4 flex items-end gap-[10px] bg-paper">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("chat.placeholder")}
              disabled={loading}
              className="min-w-0 flex-1 bg-transparent border-none outline-none font-sans text-[14px] text-ink placeholder:text-ink-faint leading-[1.4] py-[6px]"
            />
            <button
              type="button"
              onClick={() => void sendMessage()}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center hover:bg-accent disabled:opacity-35 transition-colors"
              aria-label={t("chat.send")}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            </button>
          </div>

          <style jsx>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            @keyframes bounce {
              0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
              30% { transform: translateY(-6px); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
