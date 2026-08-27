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
      className={`ed-card-hover group relative flex min-h-0 flex-col overflow-hidden rounded-3xl border border-hairline-strong bg-paper-2 p-4 sm:p-7 ${className}`}
      {...props}
    >
      <h3 className="text-[18px] font-medium leading-[1.15] tracking-[-0.035em] text-ink sm:text-[22px]">
        {name}
      </h3>
      <p className="mt-1.5 max-w-[46ch] text-[13px] leading-[1.5] text-ink-soft sm:mt-2 sm:text-[14px] sm:leading-[1.55]">
        {description}
      </p>

      {background ? (
        <div className="relative mt-3 min-h-0 flex-1 overflow-hidden rounded-2xl sm:mt-5 sm:min-h-[200px]">
          <div className="absolute left-0 top-0 h-[139%] w-[139%] origin-top-left scale-[0.72] sm:inset-0 sm:h-full sm:w-full sm:scale-100">
            {background}
          </div>
        </div>
      ) : null}

      {href && cta ? (
        <div className="mt-2 shrink-0 sm:mt-4">
          <Link
            href={href}
            className="inline-flex min-h-10 items-center gap-1.5 text-[15px] font-medium text-accent sm:min-h-[44px]"
          >
            {cta}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
