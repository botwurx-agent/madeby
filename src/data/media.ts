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
