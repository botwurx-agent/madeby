import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE } from '../data/site';

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Default share image (link previews) for every page without its own. */
export default async function OpengraphImage() {
  const bebas = await readFile(
    join(process.cwd(), 'node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff'),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: 'radial-gradient(ellipse at 60% 40%, #1c1508 0%, #0c0a08 65%)',
          color: '#ece5cf',
          fontFamily: 'Bebas',
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, letterSpacing: 8 }}>MADEBY</div>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 28 }}>
          <div style={{ display: 'flex', gap: 9 }}>
            {['#ff2020', '#00e040', '#1866ff'].map((c) => (
              <div key={c} style={{ width: 7, background: c, borderRadius: 3 }} />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 132, lineHeight: 0.87 }}>
            <div>WE MAKE THINGS</div>
            <div>THAT MOVE</div>
            <div style={{ display: 'flex' }}>
              PEOPLE<span style={{ color: '#ffb700' }}>.</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#8a8070' }}>
          COMMERCIAL PRODUCTION · FOOD &amp; BEVERAGE
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Bebas', data: bebas, style: 'normal', weight: 400 }] },
  );
}
