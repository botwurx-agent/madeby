import { useEffect, useState, type RefObject } from 'react';

/** Flips to true the first time the element enters the viewport. */
export function useReveal(ref: RefObject<Element | null>, threshold = 0.15): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

/** `reveal` class names, with `visible` appended once revealed. */
export const revealClass = (visible: boolean, extra = '') =>
  `reveal${extra ? ` ${extra}` : ''}${visible ? ' visible' : ''}`;
