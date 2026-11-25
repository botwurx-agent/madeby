'use client';

import { useEffect, useRef } from 'react';
import { Media } from '../../components/Media';
import { BTS } from '../../data/bts';

/**
 * Behind-the-scenes reel. The frame nearest the centre grows to full size;
 * drag, swipe, or use the arrows.
 */
export function BtsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current!;
    const cards = Array.from(track.children) as HTMLElement[];
    let raf = 0;

    const update = () => {
      raf = 0;
      const mid = track.scrollLeft + track.clientWidth / 2;
      for (const c of cards) {
        const centre = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.min(1, Math.abs(centre - mid) / (c.offsetWidth * 1.1));
        c.style.setProperty('--near', (1 - d).toFixed(3));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // Start on the middle frame.
    const start = cards[Math.floor(cards.length / 2)];
    track.scrollLeft = start.offsetLeft + start.offsetWidth / 2 - track.clientWidth / 2;
    update();

    // Mouse drag (touch scrolls natively).
    let dragX: number | null = null;
    let startLeft = 0;
    let moved = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      dragX = e.clientX;
      startLeft = track.scrollLeft;
      moved = false;
      track.classList.add('is-dragging');
    };
    const move = (e: PointerEvent) => {
      if (dragX === null) return;
      const dx = e.clientX - dragX;
      if (Math.abs(dx) > 3) moved = true;
      track.scrollLeft = startLeft - dx;
    };
    const up = () => {
      if (dragX === null) return;
      dragX = null;
      track.classList.remove('is-dragging');
      const mid = track.scrollLeft + track.clientWidth / 2;
      const nearest = cards.reduce((a, b) =>
        Math.abs(b.offsetLeft + b.offsetWidth / 2 - mid) < Math.abs(a.offsetLeft + a.offsetWidth / 2 - mid) ? b : a,
      );
      track.scrollTo({ left: nearest.offsetLeft + nearest.offsetWidth / 2 - track.clientWidth / 2, behavior: 'smooth' });
    };
    const click = (e: MouseEvent) => {
      if (moved) e.preventDefault();
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    track.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    track.addEventListener('click', click, true);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      track.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      track.removeEventListener('click', click, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  const step = (d: number) => {
    const track = trackRef.current!;
    const card = track.children[0] as HTMLElement;
    track.scrollBy({ left: d * (card.offsetWidth + 16), behavior: 'smooth' });
  };

  return (
    <div className="bts">
      <div ref={trackRef} className="bts-track" data-cursor="Drag">
        {BTS.map((b, i) => (
          <figure key={i} className="bts-card">
            <span className="bts-frame">
              <Media source={b} label={b.caption} sizes="(max-width: 700px) 80vw, 40vw" playing />
            </span>
            <figcaption className="bts-cap">
              <span>BTS {String(i + 1).padStart(2, '0')}</span> {b.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="bts-arrows round-btns">
        <button type="button" onClick={() => step(-1)} aria-label="Previous behind-the-scenes shot">
          ←
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next behind-the-scenes shot">
          →
        </button>
      </div>
    </div>
  );
}
