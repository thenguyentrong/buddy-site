"use client";

import { useEffect, useRef } from "react";

type Mode = "rest" | "listen" | "happy";
type Frames = { fps: number } & Record<Mode, { b: string }[]>;

/** Tells Buddy what to do, from anywhere on the page. */
export function buddy(mode: Mode) {
  window.dispatchEvent(new CustomEvent<Mode>("buddy", { detail: mode }));
}

/**
 * Buddy as the app draws it: SVG frames exported from the app's own animation engine, at 12 fps like
 * the watch. The first frame comes with the page; the rest loads after it.
 */
export function BuddyFace({ first, className }: { first: string; className?: string }) {
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frames: Frames | null = null;
    let mode: Mode = "rest";
    let start = performance.now();
    let shown = "";
    let raf = 0;

    const show = (d: string) => {
      if (d !== shown && path.current) {
        path.current.setAttribute("d", d);
        shown = d;
      }
    };
    const draw = (now: number) => {
      if (!frames) return;
      const list = frames[mode];
      // A frame's timestamp can be a little older than the moment the mode changed.
      const n = Math.max(0, Math.floor(((now - start) / 1000) * frames.fps));
      if (mode === "happy") return show(list[Math.min(n, list.length - 1)].b);
      // There and back again, so the loop has no seam.
      const period = 2 * list.length - 2;
      const k = n % period;
      show(list[k < list.length ? k : period - k].b);
    };
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      draw(now);
    };
    const onMode = (e: Event) => {
      const next = (e as CustomEvent<Mode>).detail;
      if (next === mode || mode === "happy") return;
      mode = next;
      start = performance.now();
      if (still && frames) show(mode === "happy" ? frames.happy[frames.happy.length - 1].b : frames[mode][0].b);
    };

    window.addEventListener("buddy", onMode);
    // A loop started after cleanup would keep drawing over the live one, so the load is cancelled too.
    const load = new AbortController();
    fetch("/buddy-frames.json", { signal: load.signal })
      .then((r) => r.json())
      .then((f: Frames) => {
        if (load.signal.aborted) return;
        frames = f;
        start = performance.now();
        if (!still) raf = requestAnimationFrame(tick);
      })
      .catch(() => {});
    return () => {
      load.abort();
      cancelAnimationFrame(raf);
      window.removeEventListener("buddy", onMode);
    };
  }, []);

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Buddy, the character on the watch">
      <path ref={path} d={first} fill="var(--color-mint)" fillRule="evenodd" />
    </svg>
  );
}
