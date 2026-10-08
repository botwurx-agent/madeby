'use client';

import { useEffect, useState } from 'react';

type Phase = 'count' | 'cue' | 'brand' | 'out';

const CORNERS = [
  ['top', 'left'],
  ['top', 'right'],
  ['bottom', 'left'],
  ['bottom', 'right'],
] as const;

/** Film-leader countdown (5-4-3-2-1 → cue dot → MADEBY) shown before the home page. */
export function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(5);
  const [phase, setPhase] = useState<Phase>('count');

  useEffect(() => {
    const timeline: [number, () => void][] = [
      [280, () => setCount(4)],
      [560, () => setCount(3)],
      [840, () => setCount(2)],
      [1120, () => setCount(1)],
      [1400, () => setPhase('cue')],
      [1820, () => setPhase('brand')],
      [2600, () => setPhase('out')],
      [3200, onComplete],
    ];
    const ids = timeline.map(([delay, fn]) => window.setTimeout(fn, delay));
    return () => ids.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`loader${phase === 'out' ? ' out' : ''}`} aria-hidden="true">
      <div className="loader-frame-line" style={{ top: '16%' }} />
      <div className="loader-frame-line" style={{ bottom: '16%' }} />

      {CORNERS.map(([v, h]) => (
        <div
          key={v + h}
          className="loader-corner"
          style={{
            [v]: 'calc(16% - 1px)',
            [h]: 32,
            [`border${v === 'top' ? 'Top' : 'Bottom'}Width`]: 1,
            [`border${h === 'left' ? 'Left' : 'Right'}Width`]: 1,
          }}
        />
      ))}

      <div className="loader-timecode" style={{ top: 'calc(16% - 22px)', left: 40 }}>
        MB-{String(count).padStart(4, '0')} · 24FPS · 4K · ARRI ALEXA
      </div>

      {phase === 'count' && <div className="loader-count">{count}</div>}
      {phase === 'cue' && <div className="loader-cue" />}
      {phase === 'brand' && (
        <div className="loader-brand">
          <div className="loader-brand-name">MADEBY</div>
          <div className="loader-brand-sub">Commercial Production · Food &amp; Beverage</div>
        </div>
      )}

      <div className="loader-timecode" style={{ bottom: 'calc(16% - 22px)', right: 40 }}>
        ©2026 · MADEBY STUDIO
      </div>
    </div>
  );
}
