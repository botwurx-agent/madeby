'use client';

import { useEffect, useRef } from 'react';
import { Media } from '../../components/Media';
import { BTS, type BtsShot } from '../../data/bts';
import { Overlay, useOverlay } from '../../lib/Overlay';

/** Full behind-the-scenes edit with sound. */
function BtsViewer({ shot, origin, onClose }: { shot: BtsShot; origin: HTMLElement | null; onClose: () => void }) {
  return (
    <Overlay label={shot.caption} origin={origin} onClose={onClose} className={`bts-viewer${shot.portrait ? ' is-portrait' : ''}`}>
      {() => (
        <>
          <div className="bts-viewer-frame">
            <div className="viewer-media">
              <Media source={{ ...shot, video: shot.full ?? shot.video }} label={shot.caption} sizes="600px" controls />
            </div>
          </div>
          <p className="bts-viewer-cap ov-in">
            <span>Behind the scenes</span> {shot.caption}
          </p>
        </>
      )}
    </Overlay>
  );
}

/**
 * Behind-the-scenes reel. The frame nearest the centre grows to full size;
 * drag, swipe, or use the arrows.
 */
export function BtsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewer = useOverlay<BtsShot>();

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
    // A drag that ends over a card shouldn't count as a click on it.
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
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
    const cards = Array.from(track.children) as HTMLElement[];
    const mid = track.scrollLeft + track.clientWidth / 2;
    const centres = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
    const current = centres.reduce((best, c, i) => (Math.abs(c - mid) < Math.abs(centres[best] - mid) ? i : best), 0);
    const next = Math.min(cards.length - 1, Math.max(0, current + d));
    track.scrollTo({ left: centres[next] - track.clientWidth / 2, behavior: 'smooth' });
  };

  return (
    <div className="bts">
      <div ref={trackRef} className="bts-track" data-cursor="Drag">
        {BTS.map((b, i) => {
          const frame = (
            <span className="bts-frame">
              <Media source={b} label={b.caption} sizes="(max-width: 700px) 80vw, 40vw" playing />
              {b.full && (
                <span className="bts-play" aria-hidden="true">
                  ▶
                </span>
              )}
            </span>
          );
          return (
            <figure key={i} className={`bts-card${b.portrait ? ' is-portrait' : ''}`}>
              {b.full ? (
                <button
                  type="button"
                  className="bts-open"
                  onClick={(e) => viewer.open(b, e.currentTarget)}
                  data-cursor="Watch"
                  aria-label={`Watch: ${b.caption}`}
                >
                  {frame}
                </button>
              ) : (
                frame
              )}
              <figcaption className="bts-cap">
                <span>BTS {String(i + 1).padStart(2, '0')}</span> {b.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div className="bts-arrows round-btns">
        <button type="button" onClick={() => step(-1)} aria-label="Previous behind-the-scenes shot">
          ←
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next behind-the-scenes shot">
          →
        </button>
      </div>
      {viewer.item && <BtsViewer shot={viewer.item} origin={viewer.origin} onClose={viewer.close} />}
    </div>
  );
}
