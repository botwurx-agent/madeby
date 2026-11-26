'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True once the element has entered the viewport (stays true). */
export function useInView<T extends Element>(threshold = 0.2): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, seen]);
  return [ref, seen];
}

const pad = (n: number) => String(n).padStart(2, '0');

/** HH:MM:SS:FF at 24fps. */
export const formatTimecode = (ms: number) => {
  const frames = Math.floor((ms / 1000) * 24);
  const f = frames % 24;
  const s = Math.floor(frames / 24);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`;
};

/**
 * Runs a 24fps timecode into the element's text while `running`, without
 * re-rendering React. Restarts from zero each time it starts.
 */
export function useTimecode<T extends HTMLElement>(running: boolean): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!running) {
      el.textContent = formatTimecode(0);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      el.textContent = formatTimecode(now - start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);
  return ref;
}

/**
 * Pins a section under the one that follows it, like the hero: once the whole
 * section has scrolled into view (its bottom edge reaches the bottom of the
 * screen) it holds, and --p runs 0 → 1 as the next section slides up over it.
 * Sets --stick (sticky top), --oy (scale origin) and --p on the element; the
 * `.pin` styles in global.css do the rest.
 */
export function usePinned<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const h = el.offsetHeight;
      el.style.setProperty('--stick', `${Math.min(0, vh - h)}px`);
      el.style.setProperty('--oy', `${Math.max(h / 2, h - vh / 2)}px`);
      const next = el.nextElementSibling as HTMLElement | null;
      const top = next ? next.getBoundingClientRect().top : vh;
      el.style.setProperty('--p', Math.min(1, Math.max(0, (vh - top) / vh)).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}
