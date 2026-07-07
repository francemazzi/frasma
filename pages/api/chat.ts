import type { NextApiRequest, NextApiResponse } from "next";
import {
  InMemoryFixedWindowRateLimiter,
  getClientIp,
} from "../../lib/rate-limit";
import { ChatOpenAI } from "@langchain/openai";
// @ts-ignore -- moduleResolution "node" can't resolve subpath exports
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
} from "@langchain/core/messages";

const CHAT_INVOKE_TIMEOUT_MS = 12_000;
const DRAFT_QUOTE_MINI_TIMEOUT_MS = 9_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("TIMEOUT"));
    }, ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

/* ------------------------------------------------------------------ */
/*  Knowledge base                                                     */
/* ------------------------------------------------------------------ */

const FRANCESCO_KNOWLEDGE = {
  name: "Francesco Saverio Mazzi",
  role: "Software Developer",
  experience: "8+ years full-stack development",
  bio: "I help companies in Manufacturing, Agriculture, and Food build lightweight software solutions powered by AI and LLM agents.",
  languages: ["TypeScript", "Python", "Java", "Kotlin", "Swift", "Dart"],
  technologies: [
    "React",
    "Next.js",
    "Flutter",
    "FastAPI",
    "LangChain",
    "PostgreSQL",
    "MongoDB",
    "ChromaDB",
    "Docker",
    "AWS",
    "GCP",
    "Firebase",
  ],
  interests: ["Manufacturing", "Agriculture", "Food", "LLM Agents"],
  rates: {
    base: "40€/hr",
    outsideCoreAreas: "45€/hr",
    onSiteSurcharge: "+10€/hr",
  },
  methodology:
    "Lean — market testing and validation to identify real user needs before building.",
  approach:
    "Dedicated partnership with end-to-end support, from strategy through development.",
  projects: [
    {
      name: "SeminAI",
      desc: "AI-powered agronomic tool for compiling the field notebook.",
    },
    {
      name: "FormIT",
      desc: "Open source tool for managing microbiological analyses.",
    },
    {
      name: "BilanciaMI",
      desc: "Open source tool for managing deadlines and invoices.",
    },
    {
      name: "Tree",
      desc: "Open source tool for evaluating carbon absorption impact from plants.",
    },
    {
      name: "Emilio",
      desc: "Expert agronomist agent with dataset from 'Manuale dell'agronomo' v2016.",
    },
    {
      name: "Rudolf",
      desc: "Agent integrated with Info Camere for extracting balance sheets and generating reports.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Tools                                                              */
/* ------------------------------------------------------------------ */

const getStackInfoTool = tool(
  async () => {
    return JSON.stringify(FRANCESCO_KNOWLEDGE, null, 2);
  },
  {
    name: "get_stack_info",
    description:
      "Returns all information about Francesco's tech stack, skills, projects, rates, and methodology. Use this when the user asks about what Francesco can do, his technologies, projects, or pricing.",
    schema: z.object({}),
  },
);

/** Signals the UI to display the embedded Google Calendar for self-service booking. */
const showBookingCalendarTool = tool(
  async () => {
    return JSON.stringify({ shown: true });
  },
  {
    name: "show_booking_calendar",
    description:
      "Shows Francesco's Google Calendar so the user can pick a date and time themselves. Use this as soon as the user wants to book a call or meeting — no need to collect date, time, or email first.",
    schema: z.object({}),
  },
);

const draftQuoteEmailTool = tool(
  async (input) => {
    const miniModel = new ChatOpenAI({
      modelName: "gpt-4o-mini",
      temperature: 0.3,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `You are drafting a quote request email on behalf of a potential client for Francesco Saverio Mazzi, a software developer.
Francesco's stack: TypeScript, Python, React, Next.js, Flutter, FastAPI, LangChain, PostgreSQL, MongoDB, Docker, AWS, GCP, Firebase.
Francesco's areas: Manufacturing, Agriculture, Food, LLM Agents.

Client details:
- Name: ${input.clientName}
- Email: ${input.clientEmail}
- Company: ${input.clientCompany || "Not specified"}
- Project description: ${input.projectDescription}
- Budget indication: ${input.budget || "Not specified"}
- Timeline preference: ${input.timeline || "Not specified"}
- Additional notes: ${input.notes || "None"}

Write a clear, structured email in the same language as the project description. The email should include:
1. Client contact info summary
2. Project requirements (organized clearly)
3. Suggested tech stack from Francesco's toolkit
4. Budget/timeline preferences if provided
5. Next steps (Francesco will review and reply with a detailed quote)

Do NOT include hour estimates or pricing — Francesco will evaluate that himself.

Return your answer as JSON with exactly these two fields:
{
  "subject": "The email subject line",
  "body": "The full email body text"
}
Return ONLY valid JSON, nothing else.`;

    const response = await withTimeout(
      miniModel.invoke([new HumanMessage(prompt)]),
      DRAFT_QUOTE_MINI_TIMEOUT_MS,
    );
    const raw =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

    try {
      const parsed = JSON.parse(raw);
      return JSON.stringify({
        subject: parsed.subject,
        body: parsed.body,
        clientEmail: input.clientEmail,
        clientName: input.clientName,
      });
    } catch {
      return JSON.stringify({
        subject: `Quote Request from ${input.clientName}`,
        body: raw,
        clientEmail: input.clientEmail,
        clientName: input.clientName,
      });
    }
  },
  {
    name: "draft_quote_email",
    description:
      "Generate a draft quote request email with all the project details collected from the user. Use this AFTER the user has confirmed they want to send an email AND you have collected: client name, email, project description. Optional: company, budget, timeline, notes. The tool returns JSON with subject, body, clientEmail, clientName.",
    schema: z.object({
      clientName: z.string().describe("Client's full name"),
      clientEmail: z.string().describe("Client's email address"),
      clientCompany: z.string().optional().describe("Client's company name"),
      projectDescription: z.string().describe("Detailed project description"),
      budget: z.string().optional().describe("Budget indication if provided"),
      timeline: z
        .string()
        .optional()
        .describe("Timeline preference if provided"),
      notes: z.string().optional().describe("Any additional notes or context"),
    }),
  },
);

/* ------------------------------------------------------------------ */
/*  Agent setup                                                        */
/* ------------------------------------------------------------------ */

const SYSTEM_PROMPT = `You are Frasma, Francesco Saverio Mazzi's AI assistant on his portfolio website.
Your personality: friendly, professional, concise. You use a warm but business-like tone.

Your main goals (in order of priority):
1. Answer questions about Francesco's skills, tech stack, projects, rates, and methodology
2. Collect project details and generate a quote request email for Francesco
3. Guide users to schedule a meeting with Francesco

QUOTE REQUEST FLOW (this is your primary conversion goal):
When a user describes a project or asks for an estimate:
1. Collect these details conversationally (don't ask everything at once):
   - Name
   - Email
   - Company (optional)
   - Project description (be thorough — ask follow-up questions)
   - Budget indication (optional)
   - Timeline preference (optional)
   - Any additional notes
2. BEFORE generating the email, ASK the user if they want to send an email to Francesco (e.g. "Vuoi che prepari un'email da inviare a Francesco?" / "Would you like me to prepare an email to send to Francesco?")
3. ONLY after the user confirms, use draft_quote_email to generate the email
4. The tool returns JSON. You MUST include the JSON result in your response wrapped EXACTLY like this:
   <!--EMAIL_FORM-->{"subject":"...","body":"...","clientEmail":"...","clientName":"..."}<!--/EMAIL_FORM-->
   Add a brief intro before the marker (e.g. "Ecco la bozza:" / "Here's the draft:"). The website will render it as an editable email form with a Send button.
5. Do NOT attempt to send the email yourself. The user will review, edit, and send it directly from the form.
6. After including the EMAIL_FORM marker, do NOT add any text after it.

MEETING / CALL BOOKING FLOW:
When the user wants to book a call or meeting:
1. Call show_booking_calendar right away — do NOT ask for date, time, or email, since the user will pick a slot themselves on the calendar.
2. The tool returns JSON only. You MUST wrap it EXACTLY like this in your reply:
   <!--MEETING_CALENDAR-->
   Add a brief intro before the marker (e.g. "Ecco il calendario, scegli l'orario che preferisci:" / "Here's the calendar, pick the time that works for you:").
3. After the MEETING_CALENDAR marker, do NOT add any text after it.

Do NOT provide hour estimates or pricing — that's Francesco's job. Focus on collecting complete project details.

Key rules:
- You receive a CURRENT TIME CONTEXT system message on every request. Use it to resolve relative dates and times (e.g. "domani", "next Monday", "tra due giorni") when the user talks about timing, even though booking itself happens on the calendar.
- ALWAYS respond in the same language the user writes in (Italian or English)
- Keep answers short and conversational (2-4 sentences max)
- If the user seems interested, suggest creating a quote request or scheduling a call
- Use get_stack_info to retrieve Francesco's complete profile when needed
- Never invent information about Francesco that isn't in the knowledge base
- Be honest: if you don't know something, suggest the user ask Francesco directly
- Never use emojis or emoticons in your replies`;

type ChatMessage = { role: "user" | "assistant"; content: string };

type ChatRequestBody = {
  messages: ChatMessage[];
  lang?: "it" | "en";
  /** IANA timezone from the client (e.g. Europe/Rome) for interpreting "tomorrow" etc. */
  timezone?: string;
};

function getTodayYmdInTimeZone(timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const y = parts.find((p) => p.type === "year")?.value ?? "1970";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${d}`;
}

/** Civil calendar +1 day (for the user's "today" string in their TZ). */
function addCalendarDaysToYmd(ymd: string, days: number): string {
  const [y, mo, da] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, mo - 1, da));
  dt.setUTCDate(dt.getUTCDate() + days);
  const y2 = dt.getUTCFullYear();
  const m2 = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const d2 = String(dt.getUTCDate()).padStart(2, "0");
  return `${y2}-${m2}-${d2}`;
}

function weekdayForYmd(ymd: string, timeZone: string, locale: string): string {
  const [y, mo, da] = ymd.split("-").map(Number);
  const utcNoon = new Date(Date.UTC(y, mo - 1, da, 12, 0, 0));
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: "long",
  }).format(utcNoon);
}

function buildTemporalContextMessage(
  lang: ChatRequestBody["lang"],
  timeZone: string,
): string {
  const locale = lang === "en" ? "en-GB" : "it-IT";
  const now = new Date();
  const todayYmd = getTodayYmdInTimeZone(timeZone);
  const tomorrowYmd = addCalendarDaysToYmd(todayYmd, 1);
  const dayAfterYmd = addCalendarDaysToYmd(todayYmd, 2);

  const fullDateTime = new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  const isoInstant = now.toISOString();

  return [
    "CURRENT TIME CONTEXT (authoritative for relative phrases like tomorrow / domani / next week):",
    `- Reference timezone: ${timeZone}`,
    `- Now (ISO UTC): ${isoInstant}`,
    `- Now (local in reference timezone): ${fullDateTime}`,
    `- Today's calendar date: ${todayYmd} (${weekdayForYmd(todayYmd, timeZone, locale)})`,
    `- Tomorrow's calendar date: ${tomorrowYmd} (${weekdayForYmd(tomorrowYmd, timeZone, locale)})`,
    `- Day after tomorrow: ${dayAfterYmd} (${weekdayForYmd(dayAfterYmd, timeZone, locale)})`,
  ].join("\n");
}

const chatIpRateLimiter = new InMemoryFixedWindowRateLimiter(10, 60_000); // 10 per minute per IP

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

let agentInstance: ReturnType<typeof createReactAgent> | null = null;
const EMAIL_FORM_RE = /<!--EMAIL_FORM-->([\s\S]*?)<!--\/EMAIL_FORM-->/;
const MEETING_CALENDAR_RE = /<!--MEETING_CALENDAR-->/;

type EmailFormPayload = {
  subject: string;
  body: string;
  clientEmail: string;
  clientName: string;
};

function getMessageContent(message: unknown): string | null {
  if (!message || typeof message !== "object") return null;

  const content = (message as { content?: unknown }).content;
  if (typeof content === "string") return content;

  return content != null ? JSON.stringify(content) : null;
}

function getMessageName(message: unknown): string | null {
  if (!message || typeof message !== "object") return null;

  const directName = (message as { name?: unknown }).name;
  if (typeof directName === "string") return directName;

  const nestedName = (message as { lc_kwargs?: { name?: unknown } }).lc_kwargs
    ?.name;
  return typeof nestedName === "string" ? nestedName : null;
}

function buildEmailFormResponse(
  payload: EmailFormPayload,
  lang: ChatRequestBody["lang"],
): string {
  const intro = lang === "en" ? "Here's the draft:" : "Ecco la bozza:";
  return `${intro}\n\n<!--EMAIL_FORM-->${JSON.stringify(payload)}<!--/EMAIL_FORM-->`;
}

function buildMeetingCalendarResponse(lang: ChatRequestBody["lang"]): string {
  const intro =
    lang === "en"
      ? "Here's the calendar, pick the time that works for you:"
      : "Ecco il calendario, scegli l'orario che preferisci:";
  return `${intro}\n\n<!--MEETING_CALENDAR-->`;
}

function extractEmailFormFallback(
  messages: unknown[],
  lang: ChatRequestBody["lang"],
): string | null {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (getMessageName(message) !== "draft_quote_email") continue;

    const content = getMessageContent(message);
    if (!content) continue;

    try {
      const parsed = JSON.parse(content) as Partial<EmailFormPayload>;
      if (
        typeof parsed.subject === "string" &&
        typeof parsed.body === "string" &&
        typeof parsed.clientEmail === "string" &&
        typeof parsed.clientName === "string"
      ) {
        return buildEmailFormResponse(parsed as EmailFormPayload, lang);
      }
    } catch {
      // Ignore malformed tool output and keep the normal agent response.
    }
  }

  return null;
}

function extractMeetingCalendarFallback(
  messages: unknown[],
  lang: ChatRequestBody["lang"],
): string | null {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (getMessageName(message) !== "show_booking_calendar") continue;
    if (!getMessageContent(message)) continue;

    return buildMeetingCalendarResponse(lang);
  }

  return null;
}

function applyStructuredFormFallbacks(
  content: string,
  messages: unknown[],
  lang: ChatRequestBody["lang"],
): string {
  let out = content;
  if (!EMAIL_FORM_RE.test(out)) {
    const emailFb = extractEmailFormFallback(messages, lang);
    if (emailFb) out = emailFb;
  }
  if (!MEETING_CALENDAR_RE.test(out)) {
    const meetingFb = extractMeetingCalendarFallback(messages, lang);
    if (meetingFb) out = meetingFb;
  }
  return out;
}

function getAgent() {
  if (agentInstance) return agentInstance;

  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.5,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  agentInstance = createReactAgent({
    llm: model,
    tools: [getStackInfoTool, showBookingCalendarTool, draftQuoteEmailTool],
  });

  return agentInstance;
}

/* ------------------------------------------------------------------ */
/*  Handler                                                            */
/* ------------------------------------------------------------------ */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  // Rate limiting by IP
  const ipKey = getClientIp(req);
  if (!chatIpRateLimiter.allow(ipKey)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Try again later." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OpenAI API key not configured." });
  }

  const body = req.body as ChatRequestBody | null;
  if (!body?.messages?.length) {
    return res.status(400).json({ error: "Messages are required." });
  }

  if (body.messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: "Too many messages." });
  }

  const hasOversizedMessage = body.messages.some(
    (m) =>
      typeof m.content !== "string" || m.content.length > MAX_MESSAGE_LENGTH,
  );
  if (hasOversizedMessage) {
    return res.status(400).json({ error: "Message too long." });
  }

  try {
    const agent = getAgent();

    const timeZone =
      typeof body.timezone === "string" && body.timezone.trim().length > 0
        ? body.timezone.trim()
        : "Europe/Rome";

    const langchainMessages = [
      new SystemMessage(SYSTEM_PROMPT),
      new SystemMessage(buildTemporalContextMessage(body.lang, timeZone)),
      ...body.messages.map((m) =>
        m.role === "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
    ];

    const result = (await withTimeout(
      agent.invoke({
        messages: langchainMessages,
      }),
      CHAT_INVOKE_TIMEOUT_MS,
    )) as { messages: unknown[] };

    const lastMessage = result.messages[result.messages.length - 1];
    const content = getMessageContent(lastMessage) ?? "";
    const responseText = applyStructuredFormFallbacks(
      content,
      result.messages,
      body.lang,
    );

    return res.status(200).json({ response: responseText });
  } catch (e) {
    if (e instanceof Error && e.message === "TIMEOUT") {
      return res.status(200).json({ code: "TIMEOUT" });
    }
    console.error("[chat] Agent error:", e);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
}
