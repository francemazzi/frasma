import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Send, Loader2 } from "lucide-react";
import { useT, useLang } from "../../lib/i18n/context";

type Message = { role: "user" | "assistant"; content: string };

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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, lang }),
      });

      const json = await res.json().catch(() => null);

      if (res.ok && json?.response) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: json.response },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: t("chat.error") },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chat.error") },
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

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden w-14 h-14 border-2 border-sage-300 hover:border-sage-400"
          aria-label={t("chat.title")}
        >
          <Image
            src="/bobby_chat_cuffie.png"
            alt="Bobby"
            width={56}
            height={56}
            className="object-cover"
          />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[360px] max-h-[500px] rounded-2xl bg-farm-surface shadow-2xl border border-farm-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-sage-500 text-white">
            <Image
              src="/bobby_chat_cuffie.png"
              alt="Bobby"
              width={32}
              height={32}
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
            className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] bg-farm-bg"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-sage-500 text-white rounded-br-md"
                      : "bg-farm-surface text-farm-text border border-farm-border rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-farm-surface text-farm-secondary border border-farm-border rounded-2xl rounded-bl-md px-4 py-2.5 text-sm">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-farm-border bg-farm-surface">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("chat.placeholder")}
              disabled={loading}
              className="flex-1 rounded-full border border-farm-border bg-farm-bg px-4 py-2 text-sm text-farm-text placeholder:text-farm-secondary focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-shadow"
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
