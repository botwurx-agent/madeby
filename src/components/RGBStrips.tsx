import { useEffect, useRef } from 'react';
import { RGB_STRIPS } from '../data/site';

interface Props {
  revealed: boolean;
  /** Drift the strips apart at different rates as the page scrolls. */
  parallax?: boolean;
  /** Softer glow used on the About page. */
  soft?: boolean;
}

/** Three vertical R/G/B bars that sit to the left of banner headlines. */
export function RGBStrips({ revealed, parallax = false, soft = false }: Props) {
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!parallax) return;
    const onScroll = () => {
      const y = window.scrollY;
      stripRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `translateY(${y * RGB_STRIPS[i].parallax}px)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [parallax]);

  return (
    <div className={`rgb-strips${revealed ? ' revealed' : ''}`} aria-hidden="true">
      {RGB_STRIPS.map(({ color, delay }, i) => (
        <div
          key={color}
          className="rgb-strip"
          ref={(node) => {
            stripRefs.current[i] = node;
          }}
        >
          <div
            className="rgb-strip-bar"
            style={{
              background: color,
              boxShadow: soft
                ? `0 0 20px ${color}50, 0 0 6px ${color}90`
                : `0 0 22px ${color}55, 0 0 7px ${color}99`,
              transition: `transform 1.4s var(--ease-out) ${delay}s, opacity 0.6s ease ${delay}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
