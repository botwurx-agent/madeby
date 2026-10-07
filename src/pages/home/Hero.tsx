import { useEffect, useState } from 'react';
import { RGBStrips } from '../../components/RGBStrips';

const LINES = ['WE MAKE THINGS', 'THAT MOVE', 'PEOPLE'];

/** Background reel for the hero. Set to an MP4 URL to play it muted on loop. */
const HERO_VIDEO: string | undefined = undefined;

export function Hero({ active }: { active: boolean }) {
  const [revealed, setRevealed] = useState(0);
  const [stripsRevealed, setStripsRevealed] = useState(false);

  useEffect(() => {
    if (!active) return;
    const ids = LINES.map((_, i) => window.setTimeout(() => setRevealed(i + 1), 200 + i * 160));
    ids.push(window.setTimeout(() => setStripsRevealed(true), 680));
    return () => ids.forEach(clearTimeout);
  }, [active]);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        {HERO_VIDEO && <video src={HERO_VIDEO} autoPlay muted loop playsInline />}
      </div>

      <div className="hero-meta left meta-label">
        MB-001 · Commercial Production
        <br />
        Food &amp; Beverage Specialists
      </div>
      <div className="hero-meta right meta-label">
        Est. ©2020
        <br />
        Available Worldwide
      </div>

      <div className="hero-headline-row">
        <RGBStrips revealed={stripsRevealed} parallax />
        <h1 className="hero-headline">
          {LINES.map((line, i) => (
            <div key={line} className="hero-line">
              <div
                className={`hero-line-inner${revealed > i ? ' revealed' : ''}`}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                {line}
                {i === LINES.length - 1 && <span className="accent">.</span>}
              </div>
            </div>
          ))}
        </h1>
      </div>

      <div className="hero-bottom">
        <div className="hero-tagline">
          Award-winning commercial production
          <br />
          specializing in Food &amp; Beverage brands.
        </div>
        <div className="scroll-cue">
          Scroll
          <div className="scroll-cue-line" />
        </div>
      </div>
    </section>
  );
}
