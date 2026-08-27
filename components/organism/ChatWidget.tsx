import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { X, Send, Loader2, Mail } from "lucide-react";
import { useT, useLang } from "../../lib/i18n/context";
import {
  extractProjectBriefForm,
  stripFormMarkers,
} from "../../lib/chat/markers";
import {
  clearStoredConversationId,
  readStoredConversationId,
  writeStoredConversationId,
} from "../../lib/chat/session";
import { buildTimeoutFallbackResponse } from "../../lib/chat/timeout-fallback";
import type { ProjectBriefFields } from "../../lib/processAssessment";

type Message = { role: "user" | "assistant"; content: string };

const EMAIL_ADDRESS_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type VisitorProfile = {
  name: string;
  email: string;
  company: string;
};

const DISCOUNT_PATH = "/discount?conv=contact";

function redirectToDiscount(): void {
  if (typeof window !== "undefined") {
    window.location.assign(DISCOUNT_PATH);
  }
}

function parseAssistantMessage(content: string): {
  text: string;
  projectBrief: Partial<ProjectBriefFields> | null;
} {
  return {
    text: stripFormMarkers(content),
    projectBrief: extractProjectBriefForm(content),
  };
}

function InlineProjectBriefForm({
  form,
  visitor,
  onSent,
  t,
  lang,
  conversationId,
}: {
  form: Partial<ProjectBriefFields>;
  visitor: VisitorProfile | null;
  onSent: () => void;
  t: (key: string) => string;
  lang: "it" | "en";
  conversationId: string | null;
}) {
  const [name, setName] = useState(form.name?.trim() || visitor?.name || "");
  const [clientEmail, setClientEmail] = useState(
    form.clientEmail?.trim() || visitor?.email || "",
  );
  const [company, setCompany] = useState(
    form.company?.trim() || visitor?.company || "",
  );
  const [role, setRole] = useState(form.role?.trim() || "");
  const [process, setProcess] = useState(form.process?.trim() || "");
  const [systems, setSystems] = useState(form.systems?.trim() || "");
  const [volume, setVolume] = useState(form.volume?.trim() || "");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setErrorMessage(t("assessment.validation.name"));
      return;
    }
    if (!EMAIL_ADDRESS_RE.test(clientEmail.trim())) {
      setErrorMessage(t("assessment.validation.email"));
      return;
    }
    if (process.trim().length < 20) {
      setErrorMessage(t("assessment.validation.process"));
      return;
    }

    setSending(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/request-process-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          clientEmail: clientEmail.trim(),
          company,
          role,
          process,
          systems,
          volume,
          honeypot,
          lang,
          ...(conversationId ? { conversationId } : {}),
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error?: string }
        | null;

      if (!response.ok || !result || result.ok !== true) {
        setErrorMessage(
          response.status === 429
            ? t("assessment.error.rate")
            : t("chat.brief.error"),
        );
        return;
      }

      setSent(true);
      onSent();
      redirectToDiscount();
    } catch {
      setErrorMessage(t("assessment.error.network"));
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="mt-2 flex items-center gap-2 text-xs font-medium text-sage-600">
        <Mail size={14} />
        {t("chat.brief.sent")}
      </div>
    );
  }

  return (
    <form
      className="relative mt-3 space-y-3 rounded-xl border border-hairline-strong bg-white/55 p-3"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-accent">
          <Mail size={14} />
          {t("chat.brief.title")}
        </div>
        <p className="mt-1 text-[10.5px] leading-relaxed text-ink-soft">
          {t("assessment.privacy")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label>
          <span className="mb-1 block text-[11px] font-semibold">
            {t("assessment.name")} *
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            autoComplete="name"
            className="w-full rounded-lg border border-hairline-strong bg-paper-2 px-2.5 py-2 text-[16px] focus:border-accent focus:outline-none"
          />
        </label>
        <label>
          <span className="mb-1 block text-[11px] font-semibold">
            {t("assessment.email")} *
          </span>
          <input
            type="email"
            value={clientEmail}
            onChange={(event) => setClientEmail(event.currentTarget.value)}
            autoComplete="email"
            className="w-full rounded-lg border border-hairline-strong bg-paper-2 px-2.5 py-2 text-[16px] focus:border-accent focus:outline-none"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label>
          <span className="mb-1 block text-[11px] font-semibold">
            {t("assessment.company")}
          </span>
          <input
            value={company}
            onChange={(event) => setCompany(event.currentTarget.value)}
            autoComplete="organization"
            className="w-full rounded-lg border border-hairline-strong bg-paper-2 px-2.5 py-2 text-[16px] focus:border-accent focus:outline-none"
          />
        </label>
        <label>
          <span className="mb-1 block text-[11px] font-semibold">
            {t("assessment.role")}
          </span>
          <input
            value={role}
            onChange={(event) => setRole(event.currentTarget.value)}
            autoComplete="organization-title"
            className="w-full rounded-lg border border-hairline-strong bg-paper-2 px-2.5 py-2 text-[16px] focus:border-accent focus:outline-none"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold">
          {t("assessment.process")} *
        </span>
        <textarea
          rows={4}
          value={process}
          onChange={(event) => setProcess(event.currentTarget.value)}
          className="w-full rounded-lg border border-hairline-strong bg-paper-2 px-2.5 py-2 text-[16px] leading-relaxed text-ink focus:border-accent focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold">
          {t("assessment.systems")}
        </span>
        <textarea
          rows={2}
          value={systems}
          onChange={(event) => setSystems(event.currentTarget.value)}
          className="w-full rounded-lg border border-hairline-strong bg-paper-2 px-2.5 py-2 text-[16px] leading-relaxed text-ink focus:border-accent focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold">
          {t("assessment.volume")}
        </span>
        <textarea
          rows={2}
          value={volume}
          onChange={(event) => setVolume(event.currentTarget.value)}
          className="w-full rounded-lg border border-hairline-strong bg-paper-2 px-2.5 py-2 text-[16px] leading-relaxed text-ink focus:border-accent focus:outline-none"
        />
      </label>

      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.currentTarget.value)}
        className="absolute h-0 w-0 opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {errorMessage ? <p className="text-xs text-red-600">{errorMessage}</p> : null}

      <button
        type="submit"
        disabled={sending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-3 py-2 text-xs font-semibold text-paper transition-colors hover:bg-accent disabled:opacity-50"
      >
        {sending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
        {sending ? t("assessment.sending") : t("chat.brief.send")}
      </button>
    </form>
  );
}

type RegisterFormValues = {
  name: string;
  email: string;
  company: string;
  sector: string;
};

type RegisterSuccessPayload = {
  conversationId: string;
  messages: Message[];
  returning: boolean;
  visitor: VisitorProfile;
};

function InlineRegisterForm({
  t,
  lang,
  pagePath,
  onSuccess,
}: {
  t: (key: string) => string;
  lang: "it" | "en";
  pagePath: string;
  onSuccess: (payload: RegisterSuccessPayload) => void;
}) {
  const [values, setValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    company: "",
    sector: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = (field: keyof RegisterFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    const name = values.name.trim();
    const email = values.email.trim();
    const company = values.company.trim();
    const sector = values.sector.trim();

    if (
      !name ||
      !email ||
      !company ||
      !sector ||
      !EMAIL_ADDRESS_RE.test(email)
    ) {
      setErrorMessage(t("chat.register.invalid"));
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const timezone =
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Europe/Rome"
          : "Europe/Rome";

      const res = await fetch("/api/chat/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          sector,
          honeypot,
          lang,
          timezone,
          pagePath,
        }),
      });

      const json = (await res.json().catch(() => null)) as
        | {
            conversationId?: string;
            messages?: Message[];
            returning?: boolean;
            visitor?: VisitorProfile;
            error?: string;
          }
        | null;

      if (!res.ok || !json?.conversationId) {
        setErrorMessage(t("chat.register.error"));
        return;
      }

      const restoredMessages = (json.messages ?? []).filter(
        (message) =>
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0,
      );

      onSuccess({
        conversationId: json.conversationId,
        messages: restoredMessages,
        returning: Boolean(json.returning && restoredMessages.length > 0),
        visitor: json.visitor ?? { name, email, company },
      });
    } catch {
      setErrorMessage(t("chat.register.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="relative mt-3 space-y-3 rounded-xl border border-hairline-strong bg-white/55 p-3"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label>
          <span className="mb-1 block text-[11px] font-semibold">
            {t("chat.register.name")}
          </span>
          <input
            value={values.name}
            onChange={(event) => updateField("name", event.currentTarget.value)}
            autoComplete="name"
            className="w-full rounded-lg border border-hairline-strong bg-paper-2 px-2.5 py-2 text-[16px] focus:border-accent focus:outline-none"
          />
        </label>
        <label>
          <span className="mb-1 block text-[11px] font-semibold">
            {t("chat.register.email")}
          </span>
          <input
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.currentTarget.value)}
            autoComplete="email"
            className="w-full rounded-lg border border-hairline-strong bg-paper-2 px-2.5 py-2 text-[16px] focus:border-accent focus:outline-none"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold">
          {t("chat.register.company")}
        </span>
        <input
          value={values.company}
          onChange={(event) => updateField("company", event.currentTarget.value)}
          autoComplete="organization"
          className="w-full rounded-lg border border-hairline-strong bg-paper-2 px-2.5 py-2 text-[16px] focus:border-accent focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold">
          {t("chat.register.sector")}
        </span>
        <input
          value={values.sector}
          onChange={(event) => updateField("sector", event.currentTarget.value)}
          className="w-full rounded-lg border border-hairline-strong bg-paper-2 px-2.5 py-2 text-[16px] focus:border-accent focus:outline-none"
        />
      </label>

      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.currentTarget.value)}
        className="absolute h-0 w-0 opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {errorMessage ? <p className="text-xs text-red-600">{errorMessage}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-3 py-2 text-xs font-semibold text-paper transition-colors hover:bg-accent disabled:opacity-50"
      >
        {submitting ? (
          <Loader2 size={13} className="animate-spin" />
        ) : (
          <Send size={13} />
        )}
        {submitting ? t("chat.register.submitting") : t("chat.register.submit")}
      </button>
    </form>
  );
}

const CHAT_FETCH_TIMEOUT_MS = 120_000;

export default function ChatWidget() {
  const t = useT();
  const { lang } = useLang();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [historyRestored, setHistoryRestored] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [needsRegistration, setNeedsRegistration] = useState(false);
  const [visitor, setVisitor] = useState<VisitorProfile | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreAttemptedRef = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, needsRegistration]);

  useEffect(() => {
    if (!isOpen || needsRegistration || !inputRef.current) return;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (!isCoarsePointer) {
      inputRef.current.focus();
    }
  }, [isOpen, needsRegistration]);

  const showWelcome = useCallback(() => {
    setMessages([{ role: "assistant", content: t("chat.welcome") }]);
    setHistoryRestored(false);
    setNeedsRegistration(false);
  }, [t]);

  const showRegistrationGate = useCallback(() => {
    setMessages([{ role: "assistant", content: t("chat.register.intro") }]);
    setHistoryRestored(false);
    setNeedsRegistration(true);
    setConversationId(null);
    setVisitor(null);
  }, [t]);

  const restoreConversation = useCallback(async () => {
    const storedConversationId = readStoredConversationId();
    if (!storedConversationId) {
      showRegistrationGate();
      return;
    }

    setRestoring(true);
    try {
      const res = await fetch(`/api/conversations/${storedConversationId}`);
      if (!res.ok) {
        clearStoredConversationId();
        setConversationId(null);
        showRegistrationGate();
        return;
      }

      const json = (await res.json().catch(() => null)) as
        | {
            conversationId?: string;
            messages?: Message[];
          }
        | null;

      const restoredMessages = json?.messages?.filter(
        (message) =>
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0,
      );

      if (!restoredMessages?.length) {
        setConversationId(json?.conversationId ?? storedConversationId);
        writeStoredConversationId(json?.conversationId ?? storedConversationId);
        showWelcome();
        return;
      }

      setConversationId(json?.conversationId ?? storedConversationId);
      writeStoredConversationId(json?.conversationId ?? storedConversationId);
      setMessages(restoredMessages);
      setHistoryRestored(true);
      setNeedsRegistration(false);
    } catch {
      showRegistrationGate();
    } finally {
      setRestoring(false);
    }
  }, [showRegistrationGate, showWelcome]);

  const handleRegisterSuccess = useCallback(
    (payload: RegisterSuccessPayload) => {
      setConversationId(payload.conversationId);
      writeStoredConversationId(payload.conversationId);
      setNeedsRegistration(false);
      setVisitor(payload.visitor);

      if (payload.returning && payload.messages.length > 0) {
        setMessages(payload.messages);
        setHistoryRestored(true);
        return;
      }

      showWelcome();
    },
    [showWelcome],
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (messages.length === 0 && !restoreAttemptedRef.current) {
      restoreAttemptedRef.current = true;
      void restoreConversation();
    }
  }, [messages.length, restoreConversation]);

  useEffect(() => {
    const shouldAutoOpen =
      router.pathname === "/404" || router.query.chat === "open";

    if (shouldAutoOpen) {
      handleOpen();
    }
  }, [router.pathname, router.query.chat, handleOpen]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading || needsRegistration || !conversationId) return;

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
          pagePath: router.asPath,
          conversationId,
        }),
        signal: AbortSignal.timeout(CHAT_FETCH_TIMEOUT_MS),
      });

      const json = (await res.json().catch(() => null)) as
        | { response?: string; code?: string; conversationId?: string }
        | null;

      if (json?.conversationId) {
        setConversationId(json.conversationId);
        writeStoredConversationId(json.conversationId);
      }

      if (json?.code === "TIMEOUT") {
        const timeoutContent =
          json.response?.trim() ||
          buildTimeoutFallbackResponse({
            messages: nextMessages,
            lang,
            timezone,
            pagePath: router.asPath,
            visitor: visitor ?? undefined,
          });
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: timeoutContent,
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
      const timezone =
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Europe/Rome"
          : "Europe/Rome";
      const fallback = isAbort
        ? buildTimeoutFallbackResponse({
            messages: nextMessages,
            lang,
            timezone,
            pagePath: router.asPath,
            visitor: visitor ?? undefined,
          })
        : (t("chat.error") ?? "Error.");
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
  }, [
    input,
    loading,
    messages,
    lang,
    router.asPath,
    t,
    conversationId,
    needsRegistration,
    visitor,
  ]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const handleBriefSent = useCallback(() => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: t("chat.brief.sent") },
    ]);
  }, [t]);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className="fixed z-50 inline-flex min-h-11 min-w-11 items-center justify-center gap-[10px] rounded-full bg-ink px-3 py-3 font-sans text-sm font-medium text-paper transition-colors hover:bg-accent bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] sm:bottom-6 sm:right-6 sm:min-w-0 sm:justify-start sm:px-[18px] sm:pl-[14px]"
          aria-label={t("chat.title")}
        >
          <Image
            src="/logo-frasma.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover"
          />
          <span className="hidden sm:inline">{t("chat.title")}</span>
        </button>
      )}

      {isOpen && (
        <div
          className="fixed z-50 flex min-w-0 flex-col overflow-hidden rounded-3xl border border-hairline-strong bg-paper left-3 right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] max-h-[min(34rem,calc(100dvh-1.5rem-env(safe-area-inset-bottom,0px)-env(safe-area-inset-top,0px)))] sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px] sm:max-h-[540px]"
        >
          <div className="relative flex shrink-0 flex-col gap-[6px] border-b border-hairline bg-paper px-5 py-[18px]">
            <div className="flex items-center gap-3 pr-9">
              <Image
                src="/logo-frasma.png"
                alt="Frasma"
                width={38}
                height={38}
                className="h-[38px] w-[38px] rounded-full object-cover"
              />
              <div className="font-sans text-[18px] font-medium leading-tight tracking-[-0.03em] text-ink">
                {t("chat.title")}
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
              {t("chat.status")}
            </div>
            <p className="text-[10.5px] leading-relaxed text-ink-soft">
              {t("chat.persistence.notice")}
            </p>
            {historyRestored ? (
              <p className="text-[10px] leading-relaxed text-ink-faint">
                {t("chat.persistence.restored")}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t("chat.close")}
              className="absolute right-3 top-3 w-8 h-8 rounded-full border border-hairline-strong text-ink flex items-center justify-center transition-colors hover:bg-ink hover:text-paper hover:border-ink"
            >
              <X size={14} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-[22px] py-[18px] flex flex-col gap-[18px]"
          >
            {messages.map((msg, i) => {
              const { text, projectBrief } =
                msg.role === "assistant"
                  ? parseAssistantMessage(msg.content)
                  : { text: msg.content, projectBrief: null };

              if (msg.role === "user") {
                return (
                  <div key={i} className="self-end max-w-[86%] flex flex-col items-end">
                    <span className="font-mono text-[9.5px] tracking-[0.12em] uppercase mb-[6px] text-ink-faint text-right">
                      {t("chat.you")}
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
                  <div className="font-sans text-[15px] leading-[1.5] text-ink whitespace-pre-wrap break-words">
                    {text}
                  </div>
                  {projectBrief ? (
                    <InlineProjectBriefForm
                      form={projectBrief}
                      visitor={visitor}
                      onSent={handleBriefSent}
                      t={t}
                      lang={lang}
                      conversationId={conversationId}
                    />
                  ) : null}
                </div>
              );
            })}

            {restoring && (
              <div className="max-w-full text-[12px] text-ink-soft">
                {t("chat.persistence.loading")}
              </div>
            )}

            {needsRegistration && !restoring ? (
              <InlineRegisterForm
                t={t}
                lang={lang}
                pagePath={router.asPath}
                onSuccess={handleRegisterSuccess}
              />
            ) : null}

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

          <div className="flex shrink-0 items-end gap-[10px] border-t border-hairline bg-paper px-[18px] py-4">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                needsRegistration
                  ? t("chat.register.placeholder")
                  : t("chat.placeholder")
              }
              disabled={loading || needsRegistration || !conversationId}
              className="min-w-0 flex-1 bg-transparent border-none outline-none font-sans text-[16px] text-ink placeholder:text-ink-faint leading-[1.4] py-[6px]"
            />
            <button
              type="button"
              onClick={() => void sendMessage()}
              disabled={
                loading ||
                needsRegistration ||
                !conversationId ||
                !input.trim()
              }
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
