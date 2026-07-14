This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Meeting scheduler popup (email notification)

The **“Schedule a Meeting Now”** button opens a popup where the user can select:
- date
- time
- email
- description

On submit, the app calls `POST /api/schedule-meeting` and sends an email notification to `francemazzi@gmail.com` (or a custom destination).

### Required environment variables

Create a `.env.local` file in the project root with:

```bash
# Destination email (defaults to francemazzi@gmail.com)
MEETING_NOTIFICATION_EMAIL=francemazzi@gmail.com

# Sender identity (defaults to SMTP_USER if using SMTP)
MEETING_FROM_EMAIL=francemazzi@gmail.com

# Sender display name (defaults to "Frasma")
MEETING_FROM_NAME=Frasma

# --- Option A (recommended): Gmail SMTP via App Password ---
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=francemazzi@gmail.com
SMTP_PASS=your_gmail_app_password

# --- Option B: Resend ---
# RESEND_API_KEY=your_resend_api_key
```

Notes:
- In production you should set these variables in your hosting provider (e.g. Vercel).
- If neither SMTP nor Resend is configured, the API returns an error and the popup shows it to the user.

## Diagnostic chat agent

The website chat is a stateless process-diagnostic assistant. It uses the bilingual, versioned knowledge base in `lib/knowledge/` to:

- identify operational bottlenecks;
- collect workflow, systems, volumes, baseline metrics, data, and constraints;
- map the need to Frasma capabilities;
- prepare an editable diagnostic summary;
- email the summary only after explicit user review and confirmation.

Conversation state remains in the browser and is sent to `POST /api/chat` on each turn. No database or server-side chat session is used. The reviewed summary is submitted to `POST /api/send-diagnostic-summary` and delivered through the same SMTP or Resend configuration used by meeting requests.

Do not add prices, guaranteed savings, customer secrets, credentials, or personal data about third parties to the knowledge base or diagnostic examples.

Required chat environment variable:

```bash
OPENAI_API_KEY=your_openai_api_key

# Optional; defaults to gpt-4o-mini
OPENAI_CHAT_MODEL=gpt-4o-mini
```

## AI discovery and public MCP

Public discovery surfaces for agents and humans:

| Resource | URL |
|----------|-----|
| Agents hub | https://www.frasma.org/for-agents |
| llms.txt | https://www.frasma.org/llms.txt |
| Home markdown | `GET /` with `Accept: text/markdown` |
| OpenAPI | https://www.frasma.org/openapi.json |
| API catalog | https://www.frasma.org/.well-known/api-catalog |
| Agent skills | https://www.frasma.org/.well-known/agent-skills/index.json |
| MCP (Streamable HTTP) | https://www.frasma.org/api/mcp |

### MCP tools (read-only + handoff)

- `get_frasma_profile`
- `search_frasma_knowledge`
- `get_diagnostic_framework`
- `prepare_diagnostic_summary` — validates a summary and returns handoff URLs; **never sends email**

Example Cursor / Claude Desktop remote config:

```json
{
  "mcpServers": {
    "frasma": {
      "url": "https://www.frasma.org/api/mcp"
    }
  }
}
```

For stdio-only clients:

```json
{
  "mcpServers": {
    "frasma": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://www.frasma.org/api/mcp"]
    }
  }
}
```

### Directory listing (after production deploy)

1. Confirm `/for-agents`, `/llms.txt`, and `/api/mcp` respond in production.
2. Smoke: `curl -H 'Accept: text/markdown' https://www.frasma.org/` and an MCP `initialize` + `tools/list` against `/api/mcp`.
3. Submit the server to relevant MCP directories with the short description from `/for-agents`.
4. Keep the agent-skills digest in sync when `SKILL.md` changes (`shasum -a 256`).

Quality checks:

```bash
npm run lint
npm test
npm run build
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
