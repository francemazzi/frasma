# MCP / skills directory listing checklist

Use after production deploy of AI discovery + `/api/mcp`.

## Pre-flight

- [ ] `https://www.frasma.org/for-agents` returns 200
- [ ] `https://www.frasma.org/llms.txt` returns 200
- [ ] `https://www.frasma.org/llms-it.txt` returns 200
- [ ] `curl -H 'Accept: text/markdown' https://www.frasma.org/` returns Frasma markdown
- [ ] `curl -H 'Accept: text/markdown' https://www.frasma.org/servizi/ddt-erp` returns the DDT service markdown
- [ ] MCP `initialize` + `tools/list` succeed against `https://www.frasma.org/api/mcp`
- [ ] Agent skill digest matches `SKILL.md` (`shasum -a 256 public/.well-known/agent-skills/contact-francesco/SKILL.md`)

## Official MCP Registry

Remote server metadata lives in [`server.json`](../server.json) (`io.github.francemazzi/frasma`).

```bash
brew install mcp-publisher
cd /path/to/frasma
mcp-publisher login github   # device code in the browser; JWT lasts ~1h
mcp-publisher publish
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.francemazzi/frasma"
```

PulseMCP and other aggregators ingest from this registry. Do not add a `packages` block: Frasma is Streamable HTTP only.

## Listing copy (short)

**Name:** Frasma  
**URL:** https://www.frasma.org/api/mcp  
**Description:** Read-only MCP for Frasma operational software and AI: profile, knowledge search, diagnostic framework, and diagnostic summary handoff (no email send). Hubs: https://www.frasma.org/for-agents and https://www.frasma.org/servizi

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
