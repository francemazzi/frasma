# MCP / skills directory listing checklist

Use after production deploy of AI discovery + `/api/mcp`.

## Pre-flight

- [ ] `https://www.frasma.org/for-agents` returns 200
- [ ] `https://www.frasma.org/llms.txt` returns 200
- [ ] `curl -H 'Accept: text/markdown' https://www.frasma.org/` returns Frasma markdown
- [ ] MCP `initialize` + `tools/list` succeed against `https://www.frasma.org/api/mcp`
- [ ] Agent skill digest matches `SKILL.md` (`shasum -a 256 public/.well-known/agent-skills/contact-francesco/SKILL.md`)

## Listing copy (short)

**Name:** Frasma  
**URL:** https://www.frasma.org/api/mcp  
**Description:** Read-only MCP for Frasma operational software and AI: profile, knowledge search, diagnostic framework, and diagnostic summary handoff (no email send). Hub: https://www.frasma.org/for-agents

## Client snippets

Direct (Streamable HTTP):

```json
{ "mcpServers": { "frasma": { "url": "https://www.frasma.org/api/mcp" } } }
```

Via mcp-remote:

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

## After listing

- [ ] Verify skill index still reachable
- [ ] Spot-check a lead path: agent → diagnostic handoff → website confirmation
