type SparklineProps = {
  points: number[];
  className?: string;
  strokeClassName?: string;
};

export default function Sparkline({
  points,
  className = "",
  strokeClassName = "stroke-accent-leaf",
}: SparklineProps) {
  const width = 80;
  const height = 28;
  const padding = 2;

  const path = points
    .map((point, index) => {
      const x =
        padding +
        (index / Math.max(points.length - 1, 1)) * (width - padding * 2);
      const y = height - padding - point * (height - padding * 2);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`h-7 w-20 ${className}`}
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        className={`${strokeClassName} stroke-[1.75]`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
