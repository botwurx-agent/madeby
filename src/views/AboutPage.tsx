'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Media } from '../components/Media';
import { SplitText } from '../components/SplitText';
import { ABOUT_INTRO, ABOUT_TITLE, CHAPTERS, CLIENTS, POLAROIDS, STATS, type Chapter } from '../data/story';
import { TEAM, type TeamMember } from '../data/team';
import { prefersReducedMotion, useInView } from '../lib/hooks';

/* ------------------------------------------------------------------ */
/* The table: photos you can pick up and move around.                  */
/* ------------------------------------------------------------------ */

function PhotoTable() {
  const [pos, setPos] = useState(() => POLAROIDS.map((p) => ({ x: 0, y: 0, r: p.r, z: 1 })));
  const [held, setHeld] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const top = useRef(POLAROIDS.length);
  const drag = useRef<{ i: number; sx: number; sy: number; ox: number; oy: number } | null>(null);
  const [tableRefIn, seen] = useInView<HTMLDivElement>(0.25);

  const down = (i: number) => (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { i, sx: e.clientX, sy: e.clientY, ox: pos[i].x, oy: pos[i].y };
    top.current += 1;
    const z = top.current;
    setHeld(i);
    setTouched(true);
    setPos((p) => p.map((q, k) => (k === i ? { ...q, z, r: q.r * 0.3 } : q)));
  };

  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const x = d.ox + e.clientX - d.sx;
    const y = d.oy + e.clientY - d.sy;
    setPos((p) => p.map((q, k) => (k === d.i ? { ...q, x, y } : q)));
  };

  const up = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    setHeld(null);
    // Drop it with a fresh little tilt, like it landed on the table.
    const r = Math.round((Math.random() * 2 - 1) * 8);
    setPos((p) => p.map((q, k) => (k === d.i ? { ...q, r } : q)));
  };

  return (
    <div
      ref={tableRefIn}
      className={`photo-table${seen ? ' is-in' : ''}`}
    >
      {POLAROIDS.map((p, i) => (
        <div
          key={p.caption}
          className={`polaroid${held === i ? ' is-held' : ''}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            zIndex: pos[i].z,
            ['--i' as string]: i,
            ['--tx' as string]: `${pos[i].x}px`,
            ['--ty' as string]: `${pos[i].y}px`,
            ['--r' as string]: `${pos[i].r}deg`,
          }}
          onPointerDown={down(i)}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        >
          <div className="polaroid-inner">
            <div className="polaroid-photo">
              <Image
                src={p.img!}
                alt={p.caption}
                fill
                sizes="(max-width: 700px) 40vw, 18vw"
                draggable={false}
                style={p.focus ? { objectPosition: p.focus } : undefined}
              />
            </div>
            <span className="polaroid-caption">{p.caption}</span>
          </div>
        </div>
      ))}
      <p className={`table-hint${touched ? ' is-gone' : ''}`} aria-hidden="true">
        Pick up a photo <span>&#8599;</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The story: a slate that claps on each new take.                     */
/* ------------------------------------------------------------------ */

function Slate({ chapter, total }: { chapter: Chapter; total: number }) {
  return (
    <div className="slate" aria-hidden="true">
      {/* Keyed on the take so the clapper snaps shut every time it changes. */}
      <div key={chapter.take} className="slate-clapper" />
      <div className="slate-board">
        <div className="slate-row">
          <span>Prod.</span>
          <strong>MadeBy</strong>
        </div>
        <div className="slate-row slate-split">
          <div>
            <span>Scene</span>
            <strong>Our story</strong>
          </div>
          <div>
            <span>Take</span>
            <strong key={chapter.take} className="slate-take">
              {chapter.take}
            </strong>
          </div>
        </div>
        <div className="slate-row">
          <span>Title</span>
          <strong key={chapter.title} className="slate-title">
            {chapter.title}
          </strong>
        </div>
        <div className="slate-progress">
          {Array.from({ length: total }, (_, i) => (
            <i key={i} className={Number(chapter.take) - 1 >= i ? 'is-on' : ''} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Counter({ value, run }: { value: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    const dur = prefersReducedMotion() ? 0 : 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = dur ? Math.min(1, (now - start) / dur) : 1;
      setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{String(n).padStart(2, '0')}</>;
}

function ChapterBlock({ chapter, index, onActive }: { chapter: Chapter; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const last = index === CHAPTERS.length - 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const active = new IntersectionObserver(([e]) => e.isIntersecting && onActive(index), {
      rootMargin: '-45% 0px -45% 0px',
    });
    const seen = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    active.observe(el);
    seen.observe(el);
    return () => {
      active.disconnect();
      seen.disconnect();
    };
  }, [index, onActive]);

  return (
    <article ref={ref} className={`chapter${inView ? ' is-in' : ''}`}>
      <div className="chapter-text">
        <p className="chapter-take">
          Take {chapter.take}
        </p>
        <h2 className="chapter-title">{chapter.title}</h2>
        <p className="chapter-body">{chapter.body}</p>
        {last && (
          <dl className="stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  <Counter value={s.value} run={inView} />
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <figure className={`chapter-media${chapter.portrait ? ' is-portrait' : ''}`}>
        <div className="chapter-frame">
          <Media source={chapter.media} label={chapter.caption} sizes="(max-width: 900px) 80vw, 30vw" playing={inView} />
          <span className="chapter-rec" aria-hidden="true">
            REC
          </span>
        </div>
        {(chapter.media.img || chapter.media.video) && <figcaption>{chapter.caption}</figcaption>}
      </figure>
    </article>
  );
}

function Story() {
  const [active, setActive] = useState(0);
  return (
    <section className="story">
      <div className="story-slate">
        <Slate chapter={CHAPTERS[active]} total={CHAPTERS.length} />
      </div>
      <div className="story-chapters">
        {CHAPTERS.map((c, i) => (
          <ChapterBlock key={c.take} chapter={c} index={i} onActive={setActive} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The crew as cards: tilt toward the pointer, flip on click.          */
/* ------------------------------------------------------------------ */

function CrewCard({ member, index }: { member: TeamMember; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const tilt = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const b = el.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    el.style.setProperty('--ry', `${px * 14}deg`);
    el.style.setProperty('--rx', `${-py * 14}deg`);
    el.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
  };
  const reset = () => {
    ref.current?.style.setProperty('--ry', '0deg');
    ref.current?.style.setProperty('--rx', '0deg');
  };

  return (
    <li style={{ ['--i' as string]: index }}>
      <button
        ref={ref}
        type="button"
        className={`crew-card${flipped ? ' is-flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        onPointerMove={tilt}
        onPointerLeave={reset}
        aria-pressed={flipped}
        aria-label={`${member.name}, ${member.title}. ${flipped ? 'Show photo' : 'Show details'}`}
      >
        <span className="crew-card-inner">
          <span className="crew-card-face crew-card-front">
            <span className="crew-card-photo">
              <Media source={member.portrait ?? {}} label={member.name} sizes="(max-width: 700px) 80vw, 28vw" />
            </span>
            <span className="crew-card-no">0{index + 1}</span>
            <span className="crew-card-name">{member.name}</span>
            <span className="crew-card-title">{member.title}</span>
            <span className="crew-card-glare" aria-hidden="true" />
          </span>
          <span className="crew-card-face crew-card-back">
            <span className="crew-card-no">0{index + 1}</span>
            <span className="crew-card-name">{member.name}</span>
            <span className="crew-card-roles">
              {[member.title, ...member.roles].map((r) => (
                <span key={r}>{r}</span>
              ))}
            </span>
            <span className="crew-card-short">{member.short}</span>
            <span className="crew-card-flip">Tap to flip back</span>
          </span>
        </span>
      </button>
    </li>
  );
}

/* ------------------------------------------------------------------ */

export default function AboutPage() {
  const [crewRef, crewSeen] = useInView<HTMLUListElement>(0.2);

  return (
    <main className="about-page">
      <header className="about-hero section">
        <p className="eyebrow">
          <span className="eyebrow-num">(02)</span> About us
        </p>
        <SplitText text={ABOUT_TITLE} className="section-title about-title" />
        <p className="about-intro">{ABOUT_INTRO}</p>
      </header>

      <PhotoTable />

      <Story />

      <section className="crew-deck section">
        <header className="crew-deck-head">
          <p className="eyebrow">
            <span className="eyebrow-num">(03)</span> The crew
          </p>
          <p className="crew-deck-hint">Hover to tilt. Click a card to flip it.</p>
        </header>
        <ul ref={crewRef} className={`crew-cards${crewSeen ? ' is-in' : ''}`}>
          {TEAM.map((m, i) => (
            <CrewCard key={m.id} member={m} index={i} />
          ))}
        </ul>
      </section>

      <section className="clients" aria-label="Brands we have shot for">
        <p className="eyebrow clients-label">
          <span className="eyebrow-num">(04)</span> Shot for
        </p>
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <span key={k} className="marquee-set" aria-hidden={k === 1}>
                {CLIENTS.map((c) => (
                  <span key={c} className="marquee-item">
                    {c}
                    <i aria-hidden="true">✳</i>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta section">
        <p className="eyebrow">
          <span className="eyebrow-num">(05)</span> That&apos;s a wrap
        </p>
        <h2 className="about-cta-title">
          Now you know us.
          <br />
          <span>Let&apos;s make something.</span>
        </h2>
        <div className="about-cta-links">
          <Link href="/#contact" className="about-cta-btn">
            Start a project <span aria-hidden="true">&gt;&gt;</span>
          </Link>
          <Link href="/work" className="more-link">
            See the work <span aria-hidden="true">&gt;&gt;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
