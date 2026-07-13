"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = "", ...props }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-3 auto-rows-[minmax(14rem,auto)] gap-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background?: ReactNode;
  description: string;
  href?: string;
  cta?: string;
}

export function BentoCard({
  name,
  className = "",
  background,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) {
  const hasBg = Boolean(background);

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-xl border border-hairline-strong bg-paper ${
        hasBg ? "min-h-[220px]" : "bg-paper-2"
      } ${className}`}
      {...props}
    >
      {hasBg ? (
        <div className="h-[140px] overflow-hidden border-b border-hairline shrink-0">
          {background}
        </div>
      ) : null}

      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-serif text-[22px] leading-[1.15] tracking-[-0.012em] text-ink">
          {name}
        </h3>
        <p className="max-w-[42ch] text-[13.5px] leading-[1.55] text-ink-soft">
          {description}
        </p>
      </div>

      {href && cta ? (
        <div className="px-5 pb-5">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-accent"
          >
            {cta}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
