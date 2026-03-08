import type { NextApiRequest, NextApiResponse } from "next";
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
  methodology: "Lean — market testing and validation to identify real user needs before building.",
  approach: "Dedicated partnership with end-to-end support, from strategy through development.",
  projects: [
    { name: "SeminAI", desc: "AI-powered agronomic tool for compiling the field notebook." },
    { name: "FormIT", desc: "Open source tool for managing microbiological analyses." },
    { name: "BilanciaMI", desc: "Open source tool for managing deadlines and invoices." },
    { name: "Tree", desc: "Open source tool for evaluating carbon absorption impact from plants." },
    { name: "Emilio", desc: "Expert agronomist agent with dataset from 'Manuale dell'agronomo' v2016." },
    { name: "Rudolf", desc: "Agent integrated with Info Camere for extracting balance sheets and generating reports." },
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
  }
);

const scheduleMeetingTool = tool(
  async (input) => {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/schedule-meeting`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: input.date,
        time: input.time,
        email: input.email,
        description: input.description || "",
        timezone: input.timezone || "Europe/Rome",
      }),
    });

    const json = await res.json().catch(() => null);

    if (res.ok && json?.ok) {
      return "Meeting scheduled successfully! Francesco will get back to you shortly.";
    }

    return `Could not schedule the meeting: ${json?.error || "Unknown error"}. Please ask the user to try again or provide different details.`;
  },
  {
    name: "schedule_meeting",
    description:
      "Schedule a meeting with Francesco. Use this tool when the user wants to book a call or meeting. You MUST collect all required fields (date, time, email) from the user before calling this tool. Guide the user through the process conversationally.",
    schema: z.object({
      date: z.string().describe("Meeting date in YYYY-MM-DD format"),
      time: z.string().describe("Meeting time in HH:mm format (24h)"),
      email: z.string().describe("User's email address"),
      description: z.string().optional().describe("Optional description or context for the meeting"),
      timezone: z.string().optional().describe("User's timezone (e.g. Europe/Rome). Defaults to Europe/Rome."),
    }),
  }
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

    const response = await miniModel.invoke([new HumanMessage(prompt)]);
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
      timeline: z.string().optional().describe("Timeline preference if provided"),
      notes: z.string().optional().describe("Any additional notes or context"),
    }),
  }
);

/* ------------------------------------------------------------------ */
/*  Agent setup                                                        */
/* ------------------------------------------------------------------ */

const SYSTEM_PROMPT = `You are Bobby, Francesco Saverio Mazzi's AI assistant on his portfolio website.
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

Do NOT provide hour estimates or pricing — that's Francesco's job. Focus on collecting complete project details.

Key rules:
- ALWAYS respond in the same language the user writes in (Italian or English)
- Keep answers short and conversational (2-4 sentences max)
- If the user seems interested, suggest creating a quote request or scheduling a call
- Use get_stack_info to retrieve Francesco's complete profile when needed
- For booking meetings, collect date, time, and email step by step before calling schedule_meeting
- Never invent information about Francesco that isn't in the knowledge base
- Be honest: if you don't know something, suggest the user ask Francesco directly`;

type ChatMessage = { role: "user" | "assistant"; content: string };

type ChatRequestBody = {
  messages: ChatMessage[];
  lang?: "it" | "en";
};

let agentInstance: ReturnType<typeof createReactAgent> | null = null;

function getAgent() {
  if (agentInstance) return agentInstance;

  const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0.5,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  agentInstance = createReactAgent({
    llm: model,
    tools: [getStackInfoTool, scheduleMeetingTool, draftQuoteEmailTool],
  });

  return agentInstance;
}

/* ------------------------------------------------------------------ */
/*  Handler                                                            */
/* ------------------------------------------------------------------ */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OpenAI API key not configured." });
  }

  const body = req.body as ChatRequestBody | null;
  if (!body?.messages?.length) {
    return res.status(400).json({ error: "Messages are required." });
  }

  try {
    const agent = getAgent();

    const langchainMessages = [
      new SystemMessage(SYSTEM_PROMPT),
      ...body.messages.map((m) =>
        m.role === "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content)
      ),
    ];

    const result = await agent.invoke({
      messages: langchainMessages,
    });

    const lastMessage = result.messages[result.messages.length - 1];
    const content =
      typeof lastMessage.content === "string"
        ? lastMessage.content
        : JSON.stringify(lastMessage.content);

    return res.status(200).json({ response: content });
  } catch (e) {
    console.error("[chat] Agent error:", e);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
}
