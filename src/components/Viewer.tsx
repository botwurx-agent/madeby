'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { WorkSample } from '../data/work';
import { Overlay } from '../lib/Overlay';
import { Media } from './Media';

interface Props {
  list: WorkSample[];
  start: number;
  origin: HTMLElement | null;
  onClose: () => void;
  /** Show the "More work" link to /work. */
  more?: boolean;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Large viewer for a work sample (1B): darkened page, exit button, prev/next, MORE >>. */
export function Viewer({ list, start, origin, onClose, more = true }: Props) {
  const [index, setIndex] = useState(start);
  const sample = list[index];
  const step = (d: number) => setIndex((i) => (i + d + list.length) % list.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % list.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + list.length) % list.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [list.length]);

  return (
    <Overlay label={`${sample.title}: ${sample.client}`} origin={origin} onClose={onClose} className="viewer">
      {() => (
        <>
          <div className="viewer-frame">
            <div key={sample.id} className="viewer-media">
              <Media
                source={{ ...sample, video: sample.full ?? sample.video }}
                label={sample.title}
                sizes="(max-width: 900px) 100vw, 1200px"
                controls
                priority
              />
            </div>
          </div>
          <div className="viewer-info ov-in">
            <div className="viewer-count">
              {pad(index + 1)} <span>/ {pad(list.length)}</span>
            </div>
            <div key={sample.id} className="viewer-text">
              <h3 className="viewer-title">{sample.title}</h3>
              <p className="viewer-meta">
                {sample.client} · {sample.category} · {sample.year}
              </p>
              <p className="viewer-desc">{sample.desc}</p>
              <ul className="viewer-tags">
                {sample.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="viewer-actions">
              <div className="viewer-arrows round-btns">
                <button type="button" onClick={() => step(-1)} aria-label="Previous">
                  ←
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next">
                  →
                </button>
              </div>
              {more && (
                <Link href="/work" className="more-link">
                  More <span aria-hidden="true">&gt;&gt;</span>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </Overlay>
  );
}
