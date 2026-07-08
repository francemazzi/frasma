"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type PanState = {
  x: number;
  y: number;
};

type UsePanMapOptions = {
  homeX?: number;
  homeY?: number;
};

export function usePanMap({ homeX = 0, homeY = 0 }: UsePanMapOptions = {}) {
  const reducedMotion = useReducedMotion();
  const [pan, setPan] = useState<PanState>({ x: homeX, y: homeY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const goHome = () => {
    setPan({ x: homeX, y: homeY });
  };

  const handlePointerDown = (clientX: number, clientY: number) => {
    dragStart.current = {
      x: clientX,
      y: clientY,
      panX: pan.x,
      panY: pan.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!dragStart.current) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    setPan({
      x: dragStart.current.panX + dx,
      y: dragStart.current.panY + dy,
    });
  };

  const handlePointerUp = () => {
    dragStart.current = null;
    setIsDragging(false);
  };

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!dragStart.current) return;
      handlePointerMove(event.clientX, event.clientY);
    };

    const onMouseUp = () => handlePointerUp();

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, pan.x, pan.y]);

  const onWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    const deltaX = event.shiftKey ? event.deltaY : event.deltaX;
    const deltaY = event.shiftKey ? 0 : event.deltaY;
    setPan((current) => ({
      x: current.x - deltaX,
      y: current.y - deltaY,
    }));
  };

  const mapHandlers = {
    onMouseDown: (event: React.MouseEvent) => {
      if (event.button !== 0) return;
      handlePointerDown(event.clientX, event.clientY);
    },
    onTouchStart: (event: React.TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      handlePointerDown(touch.clientX, touch.clientY);
    },
    onTouchMove: (event: React.TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      event.preventDefault();
      handlePointerMove(touch.clientX, touch.clientY);
    },
    onTouchEnd: () => handlePointerUp(),
    onWheel,
  };

  const transformStyle = {
    transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`,
    transition: isDragging || reducedMotion ? "none" : "transform 0.35s ease-out",
  };

  return {
    pan,
    isDragging,
    containerRef,
    goHome,
    mapHandlers,
    transformStyle,
  };
}
