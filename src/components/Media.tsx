'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { MediaSource } from '../data/media';

interface Props {
  source: MediaSource;
  /** Alt text, and the caption drawn on placeholder frames. */
  label: string;
  sizes: string;
  /** Play a video source (e.g. while hovered). Ignored for stills. */
  playing?: boolean;
  /** Show native controls (in the viewer). */
  controls?: boolean;
  priority?: boolean;
  className?: string;
}

/** Cheap stable hash so each placeholder gets its own light. */
const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Fills its (positioned) parent with a still, a looping clip, or a placeholder frame. */
export function Media({ source, label, sizes, playing = false, controls = false, priority, className = '' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (controls) {
      // Opened by a click, so sound is usually allowed; if the browser says no, start muted.
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
      return;
    }
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing, controls, source.video]);

  if (source.video) {
    return (
      <video
        ref={videoRef}
        className={`media ${className}`}
        src={source.video}
        poster={source.img?.src}
        muted={!controls}
        loop={!controls}
        playsInline
        controls={controls}
        preload={controls ? 'auto' : 'metadata'}
        style={source.focus ? { objectPosition: source.focus } : undefined}
        aria-label={label}
      />
    );
  }

  if (source.img) {
    return (
      <Image
        className={`media ${className}`}
        src={source.img}
        alt={label}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        style={source.focus ? { objectPosition: source.focus } : undefined}
      />
    );
  }

  const h = hash(label);
  return (
    <div
      className={`media media-ph ${className}`}
      role="img"
      aria-label={label}
      style={{ ['--ph-x' as string]: `${20 + (h % 60)}%`, ['--ph-y' as string]: `${15 + ((h >> 5) % 55)}%` }}
    >
      <span className="media-ph-label">{label}</span>
    </div>
  );
}
