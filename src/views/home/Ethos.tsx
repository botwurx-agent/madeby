'use client';

import { useEffect, useRef } from 'react';
import { ETHOS, ETHOS_ACCENT } from '../../data/site';
import { BtsCarousel } from './BtsCarousel';

const WORDS = ETHOS.split(' ');
const ACCENT_FROM = WORDS.length - ETHOS_ACCENT.split(' ').length;

/** 1D — the ethos, lit word by word as you scroll, over a behind-the-scenes carousel. */
export function Ethos() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current!;
    const words = Array.from(el.querySelectorAll<HTMLElement>('.ethos-word'));
    let lit = -1;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.8 - r.top) / (r.height + vh * 0.25);
      const n = Math.round(Math.min(1, Math.max(0, p)) * words.length);
      if (n === lit) return;
      lit = n;
      words.forEach((w, i) => w.classList.toggle('is-lit', i < n));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="ethos" className="section ethos">
      <p className="eyebrow">
        <span className="eyebrow-num">(03)</span> Made by us
      </p>
      <p ref={textRef} className="ethos-text">
        {WORDS.map((w, i) => (
          <span key={i} className={`ethos-word${i >= ACCENT_FROM ? ' is-accent' : ''}`}>
            {w}{' '}
          </span>
        ))}
      </p>
      <BtsCarousel />
    </section>
  );
}
