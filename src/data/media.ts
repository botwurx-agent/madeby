import type { StaticImageData } from 'next/image';

/**
 * Anything that can fill a frame on the site. Prefer short muted MP4s over
 * GIFs: same look, a tenth of the file size. Leave both empty and a labelled
 * placeholder frame is drawn instead.
 */
export interface MediaSource {
  img?: StaticImageData;
  /** MP4 URL or a path in /public, e.g. "/work/cherry-splash.mp4". Loops muted. */
  video?: string;
}
