'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import allAmericanBurgers from '../../assets/projects/all-american-burgers.webp';
import hydrascience from '../../assets/projects/hydrascience.webp';
import project01 from '../../assets/projects/project-01.webp';
import { HERO_VIDEO, SITE_TAGLINE } from '../../data/site';
import { useTimecode } from '../../lib/hooks';

/** Crossfaded while HERO_VIDEO is empty. */
const STILLS = [project01, allAmericanBurgers, hydrascience];

/**
 * 1A — brand video. Opens like a shutter from a thin orange line, then eases
 * back into a framed card as the work grid scrolls up over it.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const tc = useTimecode<HTMLSpanElement>(true);

  useEffect(() => {
    const el = ref.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const words = SITE_TAGLINE.split(' ');

  return (
    <section ref={ref} className="hero" aria-label="MadeBy brand film">
      <div className="hero-frame">
        {HERO_VIDEO ? (
          <video ref={videoRef} className="hero-media" src={HERO_VIDEO} autoPlay muted={muted} loop playsInline />
        ) : (
          <div className="hero-stills">
            {STILLS.map((img, i) => (
              <Image
                key={img.src}
                src={img}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                className="hero-still"
                style={{ animationDelay: `${i * 6 - 0.01}s` }}
              />
            ))}
          </div>
        )}
        <div className="hero-vignette" />
      </div>

      <span className="hero-shutter" aria-hidden="true" />

      <div className="hero-copy">
        <h1 className="hero-title">
          {words.map((w, i) => (
            <span key={i} className="hero-word">
              <span style={{ animationDelay: `${1.25 + i * 0.06}s` }}>{w}</span>
            </span>
          ))}
        </h1>
        <div className="hero-meta">
          <span className="hero-tc">
            <i className="rec-dot" /> <span ref={tc}>00:00:00:00</span>
          </span>
          {HERO_VIDEO && (
            <button type="button" className="hero-sound" onClick={() => setMuted((m) => !m)}>
              Sound {muted ? 'off' : 'on'}
            </button>
          )}
          <a href="#work" className="hero-scroll">
            Scroll <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
