import type { StaticImageData } from 'next/image';

/**
 * Anything that can fill a frame on the site. Prefer short muted MP4s over
 * GIFs: same look, a tenth of the file size. Leave both empty and a labelled
 * placeholder frame is drawn instead.
 */
export interface MediaSource {
  img?: StaticImageData;
  /** Short MP4 loop (URL or a path in /public, e.g. "/media/work/cherry-splash-loop.mp4"). Plays muted on hover. */
  video?: string;
  /** Full-length MP4 with sound, played in the viewer. Falls back to `video`. */
  full?: string;
}

/**
 * Public address of the Vercel Blob store (madeby-media) that holds the
 * full-length videos. Short hover loops stay in /public/media.
 */
export const BLOB_BASE = 'https://izxdjh2kcw6ij7co.public.blob.vercel-storage.com';

/** URL of a file in the Blob store, e.g. blob('work/mezcla.mp4'). */
export const blob = (pathname: string) => `${BLOB_BASE}/${pathname}`;
