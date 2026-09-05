export type RegisteredVisitorContext = {
  name: string;
  email: string;
  company: string;
  sector: string;
};

export function buildRegisteredVisitorContextMessage(
  visitor: RegisteredVisitorContext,
): string {
  const lines = [
    "REGISTERED VISITOR (collected before chat started — authoritative, do not ask again):",
    `- Name: ${visitor.name}`,
    `- Email: ${visitor.email}`,
    `- Company: ${visitor.company}`,
    `- Sector: ${visitor.sector}`,
    "Use these values when calling prepare_project_brief unless the user explicitly corrects them in chat.",
    "Do not ask for name, email, or company again. Role is optional — ask once only if still unknown.",
  ];
  return lines.join("\n");
}

export function mergeBriefWithVisitor<T extends {
  name?: string;
  clientEmail?: string;
  company?: string;
}>(
  brief: T,
  visitor: RegisteredVisitorContext | null,
): T {
  if (!visitor) return brief;

  return {
    ...brief,
    name: brief.name?.trim() || visitor.name,
    clientEmail: brief.clientEmail?.trim() || visitor.email,
    company: brief.company?.trim() || visitor.company,
  };
}
