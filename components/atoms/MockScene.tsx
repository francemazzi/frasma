"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

export type MockStep<T extends Record<string, unknown>> =
  | { type: "move"; to: string; duration?: number }
  | { type: "click" }
  | { type: "wait"; ms: number }
  | { type: "set"; patch: Partial<T> }
  | { type: "type"; key: keyof T & string; text: string; msPerChar?: number };

type CursorPos = { x: number; y: number };

type MockSceneValue = {
  stageRef: RefObject<HTMLDivElement | null>;
  playing: boolean;
  reducedMotion: boolean;
  forceComplete: boolean;
  setCursor: (pos: CursorPos) => void;
  setClicking: (value: boolean) => void;
  setCursorVisible: (value: boolean) => void;
};

const MockSceneContext = createContext<MockSceneValue | null>(null);

const MOVE_MS = 560;
const LOOP_PAUSE_MS = 1600;

function delay(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const id = window.setTimeout(resolve, ms);
    const onAbort = () => {
      window.clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

function hitCenter(stage: HTMLElement | null, id: string): CursorPos | null {
  if (!stage) return null;
  const el = stage.querySelector(`[data-mock-hit="${id}"]`);
  if (!el) return null;
  const root = stage.getBoundingClientRect();
  const box = el.getBoundingClientRect();
  return {
    x: box.left - root.left + box.width / 2,
    y: box.top - root.top + box.height / 2,
  };
}

export function MockScene({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(true);
  const [cursor, setCursor] = useState<CursorPos>({ x: 120, y: 140 });
  const [clicking, setClicking] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [ripple, setRipple] = useState(0);

  const playing = Boolean(inView && active !== false && !reduce);
  const forceComplete = Boolean(reduce || active === false);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setInView(entries.some((entry) => entry.isIntersecting));
      },
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (clicking) setRipple((n) => n + 1);
  }, [clicking]);

  const value = useMemo<MockSceneValue>(
    () => ({
      stageRef,
      playing,
      reducedMotion: Boolean(reduce),
      forceComplete,
      setCursor,
      setClicking,
      setCursorVisible,
    }),
    [playing, reduce, forceComplete],
  );

  return (
    <MockSceneContext.Provider value={value}>
      <div ref={stageRef} className="relative flex h-full min-h-0 flex-1 flex-col">
        {children}
        <MockPointer
          x={cursor.x}
          y={cursor.y}
          clicking={clicking}
          visible={cursorVisible && playing}
          ripple={ripple}
        />
      </div>
    </MockSceneContext.Provider>
  );
}

function MockPointer({
  x,
  y,
  clicking,
  visible,
  ripple,
}: {
  x: number;
  y: number;
  clicking: boolean;
  visible: boolean;
  ripple: number;
}) {
  const move: Transition = {
    duration: MOVE_MS / 1000,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-30"
      initial={false}
      animate={{
        x,
        y,
        scale: clicking ? 0.86 : 1,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        x: move,
        y: move,
        scale: { duration: 0.12 },
        opacity: { duration: 0.18 },
      }}
      style={{ marginLeft: -2, marginTop: -2 }}
    >
      {ripple > 0 ? (
        <span
          key={ripple}
          className="mock-click-ripple absolute left-0 top-0 h-8 w-8 rounded-full border border-[#f4a8c8]"
        />
      ) : null}
      <span className="absolute -left-2 -top-2 h-6 w-6 rounded-full bg-[#f4a8c8]/25 blur-md" />
      <svg
        width="18"
        height="22"
        viewBox="0 0 18 22"
        fill="none"
        className="relative drop-shadow-[0_2px_6px_rgba(80,50,90,0.35)]"
      >
        <path
          d="M1.2 1.2 1.4 16.4 5.7 12.6 8.8 20.2 11.6 19.1 8.4 11.4 14.6 11.2 1.2 1.2Z"
          fill="#FFFFFF"
          stroke="#1A1A1A"
          strokeLinejoin="round"
          strokeWidth="1.15"
        />
      </svg>
    </motion.div>
  );
}

export function useMockPlayback<T extends Record<string, unknown>>(
  initial: T,
  complete: T,
  steps: MockStep<T>[],
) {
  const ctx = useContext(MockSceneContext);
  const [state, setState] = useState<T>(ctx?.reducedMotion ? complete : initial);
  const [typingKey, setTypingKey] = useState<string | null>(null);

  const playing = ctx?.playing ?? false;
  const reducedMotion = ctx?.reducedMotion ?? false;
  const forceComplete = ctx?.forceComplete ?? false;

  const run = useCallback(
    async (signal: AbortSignal) => {
      if (!ctx) return;
      while (!signal.aborted) {
        setState(initial);
        setTypingKey(null);
        ctx.setCursorVisible(true);
        const stage = ctx.stageRef.current;
        if (stage) {
          const box = stage.getBoundingClientRect();
          ctx.setCursor({ x: box.width * 0.74, y: box.height * 0.78 });
        }
        await delay(380, signal);

        for (const step of steps) {
          if (signal.aborted) return;
          if (step.type === "wait") {
            await delay(step.ms, signal);
          } else if (step.type === "move") {
            const pos = hitCenter(ctx.stageRef.current, step.to);
            if (pos) {
              ctx.setCursor(pos);
              await delay(step.duration ?? MOVE_MS, signal);
            }
          } else if (step.type === "click") {
            ctx.setClicking(true);
            await delay(150, signal);
            ctx.setClicking(false);
            await delay(90, signal);
          } else if (step.type === "set") {
            setState((current) => ({ ...current, ...step.patch }));
            await delay(140, signal);
          } else if (step.type === "type") {
            setTypingKey(step.key);
            const pace = step.msPerChar ?? 40;
            for (let i = 1; i <= step.text.length; i += 1) {
              const next = step.text.slice(0, i);
              setState((current) => ({ ...current, [step.key]: next }));
              await delay(pace, signal);
            }
            setTypingKey(null);
            await delay(140, signal);
          }
        }

        await delay(LOOP_PAUSE_MS, signal);
      }
    },
    [ctx, initial, steps],
  );

  useEffect(() => {
    if (!ctx) return;
    if (reducedMotion || forceComplete) {
      setState(complete);
      setTypingKey(null);
      ctx.setCursorVisible(false);
      ctx.setClicking(false);
      return;
    }
    if (!playing) {
      ctx.setCursorVisible(false);
      ctx.setClicking(false);
      return;
    }

    const ac = new AbortController();
    run(ac.signal).catch((error) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
    });
    return () => ac.abort();
  }, [complete, ctx, forceComplete, playing, reducedMotion, run]);

  return { state, typingKey };
}

export function MockHit({
  id,
  as: Tag = "span",
  className,
  children,
}: {
  id: string;
  as?: "span" | "div" | "tr" | "button";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag data-mock-hit={id} className={className}>
      {children}
    </Tag>
  );
}
