'use client';

import type { MediaSource } from '../data/media';
import { Overlay } from '../lib/Overlay';
import { Media } from './Media';

interface Props {
  source: MediaSource;
  label: string;
  /** Small orange label before the caption, e.g. "Behind the scenes". */
  eyebrow: string;
  /** 9:16 frame instead of 16:9. */
  portrait?: boolean;
  origin: HTMLElement | null;
  onClose: () => void;
}

/** One still or clip, large, with a caption. Plays `full` (with sound) when there is one. */
export function MediaViewer({ source, label, eyebrow, portrait = false, origin, onClose }: Props) {
  return (
    <Overlay label={label} origin={origin} onClose={onClose} className={`bts-viewer${portrait ? ' is-portrait' : ''}`}>
      {() => (
        <>
          <div className="bts-viewer-frame">
            <div className="viewer-media">
              <Media
                source={{ ...source, video: source.full ?? source.video }}
                label={label}
                sizes="(max-width: 900px) 100vw, 960px"
                controls={Boolean(source.full ?? source.video)}
              />
            </div>
          </div>
          <p className="bts-viewer-cap ov-in">
            <span>{eyebrow}</span> {label}
          </p>
        </>
      )}
    </Overlay>
  );
}
