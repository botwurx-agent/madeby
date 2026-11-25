'use client';

import { useEffect, useRef } from 'react';

/**
 * A small label that trails the pointer over anything with data-cursor="…"
 * (fine pointers only). The native cursor stays.
 */
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current!;
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element).closest?.('[data-cursor]');
      if (target) {
        el.textContent = target.getAttribute('data-cursor');
        el.classList.add('is-on');
      } else {
        el.classList.remove('is-on');
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => el.classList.remove('is-on');
    window.addEventListener('pointermove', onMove, { passive: true });
    // Hide on click: the thing under the pointer usually opens an overlay.
    window.addEventListener('pointerdown', onLeave);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onLeave);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-label" aria-hidden="true" />;
}
