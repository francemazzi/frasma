"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  className?: string;
  duration?: number;
};

export default function AnimatedCounter({
  value,
  className = "",
  duration = 900,
}: AnimatedCounterProps) {
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration, reducedMotion]);

  const renderedValue = reducedMotion ? value : displayValue;

  return (
    <span className={className}>
      {renderedValue.toLocaleString("it-IT")}
    </span>
  );
}
