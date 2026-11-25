'use client';

import { Media } from '../../components/Media';
import { SectionHead } from '../../components/SectionHead';
import { SERVICES, type ServicePhase } from '../../data/services';
import { Overlay, useOverlay } from '../../lib/Overlay';

/** Cells of a 4×4 grid around a 2×2 centre, in the order CSS auto-placement fills them. */
const RING = Array.from({ length: 16 }, (_, k) => [Math.floor(k / 4), k % 4] as const).filter(
  ([r, c]) => !(r > 0 && r < 3 && c > 0 && c < 3),
);

/** 1E (expanded) — samples ring the phase description and ripple out from it. */
function PhaseViewer({ phase, origin, onClose }: { phase: ServicePhase; origin: HTMLElement | null; onClose: () => void }) {
  return (
    <Overlay label={phase.title} origin={origin} onClose={onClose} className="phase">
      {() => (
        <div className="phase-grid">
          <div className="phase-centre">
            <span className="eyebrow">
              <span className="eyebrow-num">({phase.num})</span> Services
            </span>
            <h3 className="phase-title">{phase.title}</h3>
            <p className="phase-long">{phase.long}</p>
          </div>
          {phase.items.slice(0, 12).map((item, i) => {
            const [r, c] = RING[i] ?? [3, 3];
            const dist = Math.hypot(r - 1.5, c - 1.5);
            return (
              <figure key={item.name} className="phase-tile" style={{ animationDelay: `${0.25 + dist * 0.11}s` }}>
                <span className="phase-frame">
                  <Media source={item} label={item.name} sizes="(max-width: 700px) 50vw, 20vw" playing />
                </span>
                <figcaption>{item.name}</figcaption>
              </figure>
            );
          })}
        </div>
      )}
    </Overlay>
  );
}

/** 1E — the three phases. Each row opens its sample viewer. */
export function Services() {
  const viewer = useOverlay<ServicePhase>();

  return (
    <section id="services" className="section services">
      <SectionHead num="04" label="Services" title="What we do">
        <p>One crew from the first storyboard to the last deliverable.</p>
      </SectionHead>

      <ul className="phases">
        {SERVICES.map((s) => (
          <li key={s.id}>
            <button type="button" className="phase-row" onClick={(e) => viewer.open(s, e.currentTarget)} data-cursor="Open">
              <span className="phase-num">{s.num}</span>
              <span className="phase-name">{s.title}</span>
              <span className="phase-desc">{s.desc}</span>
              <span className="phase-items">
                {s.items.slice(0, 5).map((it) => (
                  <span key={it.name}>{it.name}</span>
                ))}
              </span>
              <span className="phase-more">
                More <span aria-hidden="true">&gt;&gt;</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {viewer.item && <PhaseViewer phase={viewer.item} origin={viewer.origin} onClose={viewer.close} />}
    </section>
  );
}
