'use client';

import type { ElementType } from 'react';
import { useInView } from '../lib/hooks';

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  /** Seconds before the first letter moves. */
  delay?: number;
}

/** Heading whose letters rise out of a mask, one after another, when scrolled into view. */
export function SplitText({ text, as: Tag = 'h2', className = '', delay = 0 }: Props) {
  const [ref, seen] = useInView<HTMLElement>(0.4);
  let i = 0;
  return (
    <Tag ref={ref} className={`split ${seen ? 'is-in' : ''} ${className}`} aria-label={text}>
      {text.split(' ').map((word, w) => (
        <span key={w} className="split-word" aria-hidden="true">
          {[...word].map((ch, c) => (
            <span key={c} className="split-char" style={{ transitionDelay: `${delay + i++ * 0.028}s` }}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
