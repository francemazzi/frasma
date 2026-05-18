"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ComponentType, ReactNode, SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number | string }>;

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = "", ...props }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-3 auto-rows-[20rem] lg:auto-rows-[22rem] gap-4 ${className}`}
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
  Icon?: IconType;
  description: string;
  href?: string;
  cta?: string;
}

export function BentoCard({
  name,
  className = "",
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) {
  const hasBg = Boolean(background);

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-hairline-strong transition-colors ${
        hasBg ? "bg-[#FBF6E5]" : "bg-paper-2"
      } ${className}`}
      {...props}
    >
      {hasBg ? (
        <>
          <div className="pointer-events-none absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-[1.015]">
            {background}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[58%] bg-gradient-to-t from-paper via-paper/85 to-transparent" />
        </>
      ) : null}

      <div
        className={`relative z-10 flex flex-col gap-2 p-5 transition-transform duration-300 ease-out ${
          hasBg ? "mt-auto lg:group-hover:-translate-y-4" : "lg:group-hover:-translate-y-6"
        }`}
      >
        {Icon ? (
          <Icon
            strokeWidth={1.4}
            className="h-9 w-9 origin-left text-accent transition-transform duration-300 ease-out group-hover:scale-90"
          />
        ) : null}
        <h3 className="font-serif text-[22px] leading-[1.15] tracking-[-0.012em] text-ink">
          {name}
        </h3>
        <p className="max-w-[42ch] text-[13.5px] leading-[1.55] text-ink-soft">
          {description}
        </p>
      </div>

      {href && cta ? (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex translate-y-6 items-center px-5 pb-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href={href}
            className="pointer-events-auto inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-accent"
          >
            {cta}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-[2] transition-colors duration-300 group-hover:bg-ink/[0.015]" />
    </div>
  );
}
