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

type MockPlaybackValue = {
  stageRef: RefObject<HTMLDivElement | null>;
  playing: boolean;
  reducedMotion: boolean;
  forceComplete: boolean;
  setCursor: (pos: CursorPos) => void;
  setClicking: (value: boolean) => void;
  setCursorVisible: (value: boolean) => void;
  setActiveHit: (id: string | null) => void;
};

const MockPlaybackContext = createContext<MockPlaybackValue | null>(null);
const MockHighlightContext = createContext<string | null>(null);

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

function measurableBox(el: HTMLElement): HTMLElement {
  if (el.offsetWidth > 0 && el.offsetHeight > 0) return el;
  const child = el.querySelector("td, th, span, div");
  return child instanceof HTMLElement ? child : el;
}

function scaledHitCenter(stage: HTMLElement, el: HTMLElement): CursorPos {
  const root = stage.getBoundingClientRect();
  const box = el.getBoundingClientRect();
  const scaleX = root.width / (stage.offsetWidth || 1) || 1;
  const scaleY = root.height / (stage.offsetHeight || 1) || 1;
  return {
    x: (box.left - root.left + box.width / 2) / scaleX,
    y: (box.top - root.top + box.height / 2) / scaleY,
  };
}

function hitCenter(stage: HTMLElement | null, id: string): CursorPos | null {
  if (!stage) return null;
  const found = stage.querySelector(`[data-mock-hit="${id}"]`);
  if (!(found instanceof HTMLElement)) return null;
  const el = measurableBox(found);

  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  let node: HTMLElement | null = el;

  while (node && node !== stage) {
    x += node.offsetLeft;
    y += node.offsetTop;
    const parent = node.offsetParent;
    if (!(parent instanceof HTMLElement)) {
      return scaledHitCenter(stage, el);
    }
    if (parent !== stage && !stage.contains(parent)) {
      return scaledHitCenter(stage, el);
    }
    node = parent;
  }

  return { x, y };
}

async function waitForStage(stageRef: RefObject<HTMLDivElement | null>, signal: AbortSignal) {
  for (let i = 0; i < 24; i += 1) {
    const stage = stageRef.current;
    if (stage && stage.offsetWidth > 1 && stage.offsetHeight > 1) return stage;
    await delay(50, signal);
  }
  return stageRef.current;
}

async function waitForHit(
  stage: HTMLElement | null,
  id: string,
  signal: AbortSignal,
): Promise<CursorPos | null> {
  for (let i = 0; i < 8; i += 1) {
    const pos = hitCenter(stage, id);
    if (pos) return pos;
    await delay(40, signal);
  }
  return hitCenter(stage, id);
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
  const [activeHit, setActiveHit] = useState<string | null>(null);

  const playing = Boolean(
    !reduce && active !== false && (active === true || inView),
  );
  const forceComplete = Boolean(reduce || active === false);

  useEffect(() => {
    if (active === true) setInView(true);
  }, [active]);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    let leaveTimer: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) {
          if (leaveTimer) window.clearTimeout(leaveTimer);
          leaveTimer = undefined;
          setInView(true);
          return;
        }
        leaveTimer = window.setTimeout(() => setInView(false), 280);
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (leaveTimer) window.clearTimeout(leaveTimer);
    };
  }, []);

  useEffect(() => {
    if (clicking) setRipple((n) => n + 1);
  }, [clicking]);

  const playback = useMemo<MockPlaybackValue>(
    () => ({
      stageRef,
      playing,
      reducedMotion: Boolean(reduce),
      forceComplete,
      setCursor,
      setClicking,
      setCursorVisible,
      setActiveHit,
    }),
    [playing, reduce, forceComplete],
  );

  return (
    <MockPlaybackContext.Provider value={playback}>
      <MockHighlightContext.Provider value={activeHit}>
        <div
          ref={stageRef}
          className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden"
        >
          {children}
          <MockPointer
            x={cursor.x}
            y={cursor.y}
            clicking={clicking}
            visible={cursorVisible && playing}
            ripple={ripple}
          />
        </div>
      </MockHighlightContext.Provider>
    </MockPlaybackContext.Provider>
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
      style={{ marginLeft: -2, marginTop: -2, willChange: "transform" }}
    >
      {ripple > 0 ? (
        <span
          key={ripple}
          className="mock-click-ripple absolute left-0 top-0 h-10 w-10 rounded-full border border-[#f4a8c8] sm:h-8 sm:w-8"
        />
      ) : null}
      <span className="absolute -left-2.5 -top-2.5 h-8 w-8 rounded-full bg-[#f4a8c8]/25 blur-md sm:-left-2 sm:-top-2 sm:h-6 sm:w-6" />
      <svg
        viewBox="0 0 18 22"
        fill="none"
        className="relative h-7 w-6 drop-shadow-[0_2px_6px_rgba(80,50,90,0.35)] sm:h-[22px] sm:w-[18px]"
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
  const ctx = useContext(MockPlaybackContext);
  const ctxRef = useRef(ctx);
  ctxRef.current = ctx;
  const initialRef = useRef(initial);
  const stepsRef = useRef(steps);
  const completeRef = useRef(complete);
  initialRef.current = initial;
  stepsRef.current = steps;
  completeRef.current = complete;

  const [state, setState] = useState<T>(ctx?.reducedMotion ? complete : initial);
  const [typingKey, setTypingKey] = useState<string | null>(null);

  const playing = ctx?.playing ?? false;
  const reducedMotion = ctx?.reducedMotion ?? false;
  const forceComplete = ctx?.forceComplete ?? false;

  const run = useCallback(async (signal: AbortSignal) => {
    const api = ctxRef.current;
    if (!api) return;
    while (!signal.aborted) {
      const start = initialRef.current;
      const script = stepsRef.current;
      setState(start);
      setTypingKey(null);
      api.setCursorVisible(true);
      api.setActiveHit(null);
      const stage = await waitForStage(api.stageRef, signal);
      if (stage) {
        api.setCursor({
          x: stage.offsetWidth * 0.74,
          y: stage.offsetHeight * 0.78,
        });
      }
      await delay(380, signal);

      for (const step of script) {
        if (signal.aborted) return;
        if (step.type === "wait") {
          await delay(step.ms, signal);
        } else if (step.type === "move") {
          const pos = await waitForHit(api.stageRef.current, step.to, signal);
          if (pos) {
            api.setActiveHit(step.to);
            api.setCursor(pos);
            await delay(step.duration ?? MOVE_MS, signal);
          }
        } else if (step.type === "click") {
          api.setClicking(true);
          await delay(150, signal);
          api.setClicking(false);
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
  }, []);

  useEffect(() => {
    const api = ctxRef.current;
    if (!api) return;
    if (reducedMotion || forceComplete) {
      setState(completeRef.current);
      setTypingKey(null);
      api.setCursorVisible(false);
      api.setClicking(false);
      api.setActiveHit(null);
      return;
    }
    if (!playing) {
      api.setCursorVisible(false);
      api.setClicking(false);
      api.setActiveHit(null);
      return;
    }

    const ac = new AbortController();
    run(ac.signal).catch((error) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
    });
    return () => ac.abort();
  }, [forceComplete, playing, reducedMotion, run]);

  return { state, typingKey };
}

export function useMockHitClass(id?: string, className = "") {
  const activeHit = useContext(MockHighlightContext);
  const focused = Boolean(id && activeHit === id);
  return [className, focused ? "mock-hit-active" : ""].filter(Boolean).join(" ");
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
    <Tag data-mock-hit={id} className={useMockHitClass(id, className)}>
      {children}
    </Tag>
  );
}
