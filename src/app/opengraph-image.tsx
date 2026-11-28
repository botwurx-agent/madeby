import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE } from '../data/site';

export const alt = `${SITE_NAME} | ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Default share image (link previews). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#000',
          color: '#f4f4f2',
        }}
      >
        <div style={{ display: 'flex', fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>
          MADEBY<span style={{ color: '#ff5b04' }}>:</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, fontWeight: 500, lineHeight: 1, letterSpacing: -4 }}>
          <div>Commercial production</div>
          <div style={{ display: 'flex' }}>
            for food &amp; beverage<span style={{ color: '#ff5b04' }}>.</span>
          </div>
        </div>
        <div style={{ display: 'flex', height: 2, width: 160, background: '#ff5b04' }} />
      </div>
    ),
    size,
  );
}
