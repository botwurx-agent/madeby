import { useCallback, useEffect, useRef, useState } from 'react';
import { FEATURED_PROJECTS, type Project } from '../../data/projects';
import { VideoModal } from './VideoModal';

const PROJECTS = FEATURED_PROJECTS;
const TOTAL = String(PROJECTS.length).padStart(2, '0');

// Enough perforations for the widest (desktop) strip; rows clip any excess.
const NUM_HOLES = Math.ceil((PROJECTS.length * 480 + (PROJECTS.length - 1) * 20 + 160) / 32) + 3;
const LABEL_EVERY = 8;

/** Perforation row with amber frame codes between hole groups, like 35mm stock. */
function SprocketRow({ top }: { top: boolean }) {
  const items = [];
  for (let i = 0; i < NUM_HOLES; i++) {
    if (i > 0 && i % LABEL_EVERY === 0) {
      const frame = i / LABEL_EVERY;
      items.push(
        <span key={`l${i}`} className="sprocket-label">
          {top ? `MB-${String(frame).padStart(3, '0')}` : frame}
        </span>,
      );
    }
    items.push(<div key={`h${i}`} className="sprocket-hole" />);
  }
  return (
    <div className="sprocket-row" aria-hidden="true">
      {items}
    </div>
  );
}

function FilmCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <button type="button" className="film-card" onClick={() => onOpen(project)} aria-label={`Play ${project.title} — ${project.client}`}>
      {project.img ? (
        <img src={project.img} alt="" className="film-card-img" loading="lazy" />
      ) : (
        <div className="film-ph">
          <span className="film-ph-num">PROJECT STILL — {project.id}</span>
          <span className="film-ph-title">{project.title}</span>
        </div>
      )}
      <div className="film-card-overlay" />
      <div className="film-card-info">
        <div className="film-card-meta">
          {project.id} · {project.category} · {project.year}
        </div>
        <div className="film-card-title">{project.title}</div>
        <div className="film-card-client">{project.client}</div>
      </div>
      <div className="film-card-frame">
        {project.id} ▸ {project.year}
      </div>
    </button>
  );
}

/** Horizontal film strip that scrolls sideways while the section is pinned. */
export function WorkStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    let dims = { scrollAmt: 0, sectionH: 0 };

    const compute = () => {
      const section = sectionRef.current;
      const mover = moverRef.current;
      const cards = cardsRef.current;
      if (!section || !mover || !cards) return;
      const card = cards.firstElementChild as HTMLElement | null;
      const style = getComputedStyle(cards);
      const stripW =
        PROJECTS.length * (card?.offsetWidth ?? 0) +
        (PROJECTS.length - 1) * parseFloat(style.columnGap || '0') +
        parseFloat(style.paddingLeft) +
        parseFloat(style.paddingRight);
      mover.style.width = `${stripW}px`;
      const scrollAmt = Math.max(0, stripW - window.innerWidth);
      const sectionH = scrollAmt + window.innerHeight * 1.6;
      section.style.height = `${sectionH}px`;
      dims = { scrollAmt, sectionH };
    };

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section || !moverRef.current) return;
      const rect = section.getBoundingClientRect();
      const prog = Math.max(0, Math.min(1, -rect.top / Math.max(dims.sectionH - window.innerHeight, 1)));
      moverRef.current.style.transform = `translate(${-prog * dims.scrollAmt}px, -50%)`;
      if (barRef.current) barRef.current.style.width = `${prog * 100}%`;
      if (counterRef.current) {
        const n = Math.min(Math.floor(prog * PROJECTS.length) + 1, PROJECTS.length);
        counterRef.current.textContent = `${String(n).padStart(2, '0')} / ${TOTAL}`;
      }
    };

    const onResize = () => {
      compute();
      onScroll();
    };

    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} id="work" className="work-strip">
        <div className="work-sticky">
          <div className="work-strip-header">
            <span className="label">The Work</span>
            <span ref={counterRef}>01 / {TOTAL}</span>
          </div>
          <div className="work-strip-code">F-001</div>

          <div ref={moverRef} className="film-strip-mover">
            <SprocketRow top />
            <div ref={cardsRef} className="cards-row">
              {PROJECTS.map((p) => (
                <FilmCard key={p.id} project={p} onOpen={setActive} />
              ))}
            </div>
            <SprocketRow top={false} />
          </div>

          <div className="work-progress">
            <div className="work-progress-track">
              <div ref={barRef} className="work-progress-bar" />
            </div>
            <div className="work-progress-labels">
              <span>DRAG / SCROLL TO EXPLORE</span>
              <span>F&amp;B · COMMERCIALS · BRAND FILMS</span>
            </div>
          </div>
        </div>
      </section>

      {active && <VideoModal project={active} onClose={close} />}
    </>
  );
}
