type GrainVariant = "peach" | "teal" | "lavender" | "mist";

const MESH: Record<GrainVariant, string> = {
  peach: "grain-mesh-peach",
  teal: "grain-mesh-teal",
  lavender: "grain-mesh-lavender",
  mist: "grain-mesh-mist",
};

export default function GrainMesh({
  variant,
  className = "",
}: {
  variant: GrainVariant;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 ${MESH[variant]} ${className}`} aria-hidden="true">
      <div className="grain-overlay absolute inset-0" />
    </div>
  );
}

export type { GrainVariant };
