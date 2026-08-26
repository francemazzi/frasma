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
    <div className={`grid grid-cols-1 gap-4 lg:grid-cols-2 ${className}`} {...props}>
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
  return (
    <div
      className={`ed-card-hover group relative flex min-h-0 flex-col overflow-hidden rounded-3xl border border-hairline-strong bg-paper-2 p-6 sm:p-7 ${className}`}
      {...props}
    >
      <h3 className="text-[22px] font-medium leading-[1.15] tracking-[-0.035em] text-ink">
        {name}
      </h3>
      <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-ink-soft">
        {description}
      </p>

      {background ? (
        <div className="relative mt-5 min-h-[200px] flex-1 overflow-hidden rounded-2xl">
          {background}
        </div>
      ) : null}

      {href && cta ? (
        <div className="mt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent"
          >
            {cta}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
