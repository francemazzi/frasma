"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Tag = "div" | "section" | "article" | "ol" | "ul" | "li" | "p" | "h1" | "h2";

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -60px 0px",
};

/** Adds `is-visible` the first time the node enters the viewport. Elements are
 * only hidden while the `.js-motion` class is present, which `_document` adds
 * solely when IntersectionObserver exists, so nothing can stay invisible. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setInView(true);
        observer.disconnect();
      }
    }, OBSERVER_OPTIONS);

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function classNames(...values: (string | undefined | false)[]): string {
  return values.filter(Boolean).join(" ");
}

type RevealProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  /** Seconds of delay before the transition starts. */
  delay?: number;
};

export function Reveal({ children, as = "div", className, delay }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      className: classNames("reveal", inView && "is-visible", className),
      style: delay ? ({ transitionDelay: `${delay}s` } as CSSProperties) : undefined,
    },
    children,
  );
}

type RevealGroupProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  /** Seconds between each child's transition. */
  stagger?: number;
};

/** Reveals its RevealItem children in sequence when the group scrolls into view. */
export function RevealGroup({
  children,
  as = "div",
  className,
  stagger = 0.09,
}: RevealGroupProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      className,
      style: { "--reveal-stagger": `${stagger}s` } as CSSProperties,
      "data-reveal-group": inView ? "visible" : "hidden",
    },
    children,
  );
}

type RevealItemProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  /** Position in the group, used to compute the stagger delay. */
  index?: number;
};

export function RevealItem({
  children,
  as = "div",
  className,
  index = 0,
}: RevealItemProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      className: classNames("reveal", inView && "is-visible", className),
      style: { transitionDelay: `calc(var(--reveal-stagger, 0.09s) * ${index})` },
    },
    children,
  );
}

type RevealLineProps = {
  className?: string;
};

/** Draws a connecting rule when it scrolls into view. */
export function RevealLine({ className }: RevealLineProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={classNames("reveal-line", inView && "is-visible", className)}
    />
  );
}
