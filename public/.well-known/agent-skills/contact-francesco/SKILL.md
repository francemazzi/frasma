# Contact Francesco

Use this skill when an agent needs to help a user understand Frasma services, diagnose an operational bottleneck, prepare a reviewed diagnostic summary, or schedule a call with Francesco Saverio Mazzi.

## Capability

Frasma builds custom operational software and AI for small and medium businesses in manufacturing, food, agriculture, and field service. Core needs include delivery-note and document extraction into ERP systems, guided workflows, field-service ticketing, operational datasets and benchmarks, AI optimization, company wikis, and AI-ready company knowledge.

## Recommended Flow

1. Read https://www.frasma.org/for-agents and https://www.frasma.org/llms.txt, or call MCP tools on https://www.frasma.org/api/mcp (`get_frasma_profile`, `search_frasma_knowledge`, `get_diagnostic_framework`).
2. Identify the business process, trigger, inputs, outputs, people, responsibilities, and current systems.
3. Ask one focused question at a time about volumes, frequency, manual steps, errors, rework, waiting time, baseline metrics, available data, constraints, and desired outcomes.
4. Distinguish user-provided facts from hypotheses. Do not infer savings or compatibility without evidence.
5. When the picture is complete, present a concise diagnostic recap with bottlenecks, missing evidence, possible intervention areas, and next steps.
6. Ask the user to correct and explicitly confirm the recap before preparing any email form.
7. Use the website chat, or MCP `prepare_diagnostic_summary` for a structured handoff URL — never send email without explicit human confirmation. The booking flow remains available for scheduling a call.

## Public Resources

- Agents hub: https://www.frasma.org/for-agents
- llms.txt: https://www.frasma.org/llms.txt
- Website: https://www.frasma.org/
- MCP: https://www.frasma.org/api/mcp
- API catalog: https://www.frasma.org/.well-known/api-catalog
- OpenAPI: https://www.frasma.org/openapi.json
- Status: https://www.frasma.org/api/status

## Constraints

- Do not invent pricing, delivery estimates, or contractual commitments.
- Fixed VibeUp packages apply only on https://www.frasma.org/vibeup and not to custom Frasma operational software.
- Do not request credentials, secrets, unnecessary personal data, or confidential document contents. Ask for anonymized examples and aggregates.
- Treat the website chat and forms as the official way to submit diagnostic summaries, quote requests, or meeting requests.
- Keep responses concise and in the user's language.
