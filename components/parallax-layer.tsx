"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export function ParallaxLayer({
  children,
  speed = 0.15,
  className = "",
  style,
}: {
  children: ReactNode;
  /** Positive drifts down slower than the page (background feel), negative drifts up faster (foreground feel). */
  speed?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    function update() {
      frame = 0;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const offset = (rect.top + rect.height / 2 - viewportCenter) * speed;
      el.style.setProperty("--parallax-y", `${offset}px`);
    }
    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      style={{ transform: "translateY(var(--parallax-y, 0px))", willChange: "transform", ...style }}
      className={className}
    >
      {children}
    </div>
  );
}
