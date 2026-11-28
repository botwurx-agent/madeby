'use client';

import { useState } from 'react';
import type { WorkSample } from '../data/work';
import { useTimecode } from '../lib/hooks';
import { Media } from './Media';

interface Props {
  sample: WorkSample;
  index: number;
  onOpen: (el: HTMLElement) => void;
  sizes: string;
  /** Smaller caption (profile strips). */
  compact?: boolean;
}

/**
 * A grid frame. On hover it starts rolling: the clip plays, viewfinder corners
 * close in, and a REC timecode counts up.
 */
export function WorkTile({ sample, index, onOpen, sizes, compact = false }: Props) {
  const [hot, setHot] = useState(false);
  const tc = useTimecode<HTMLSpanElement>(hot);

  return (
    <button
      type="button"
      className={`tile${hot ? ' is-hot' : ''}${compact ? ' tile-compact' : ''}`}
      style={{ ['--i' as string]: index }}
      onClick={(e) => onOpen(e.currentTarget)}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={() => setHot(false)}
      data-cursor="Play"
      aria-label={`${sample.title}: ${sample.client}. Open viewer`}
    >
      <span className="tile-frame">
        <Media source={sample} label={sample.title} sizes={sizes} playing={hot} />
        <span className="tile-shade" />
        <span className="tile-corners" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="tile-rec" aria-hidden="true">
          <i className="rec-dot" />
          REC <span ref={tc}>00:00:00:00</span>
        </span>
      </span>
      <span className="tile-cap">
        <span className="tile-title">{sample.title}</span>
        <span className="tile-meta">{sample.client}</span>
      </span>
    </button>
  );
}
