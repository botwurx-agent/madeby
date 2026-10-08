'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { FEATURED_PROJECTS, PROJECTS as ALL_PROJECTS, type Project } from '../../data/projects';
import { VideoModal } from './VideoModal';

// Top strip: the featured reel, entering from its start. Bottom strip: every
// project, entering from its far end (it moves the other way), so the two
// strips never line the same project up.
const TOP_ROW = FEATURED_PROJECTS;
const BOTTOM_ROW = ALL_PROJECTS;
const TOTAL = String(ALL_PROJECTS.length).padStart(2, '0');

// Enough perforations for the widest strip; rows clip any excess.
const NUM_HOLES = 140;
const LABEL_EVERY = 8;

/** Perforation row with amber frame codes between hole groups, like 35mm stock. */
function SprocketRow({ labelled, firstFrame }: { labelled: boolean; firstFrame: number }) {
  const items = [];
  for (let i = 0; i < NUM_HOLES; i++) {
    if (i > 0 && i % LABEL_EVERY === 0) {
      const frame = firstFrame + i / LABEL_EVERY;
      items.push(
        <span key={`l${i}`} className="sprocket-label">
          {labelled ? `MB-${String(frame).padStart(3, '0')}` : frame}
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
        <Image
          src={project.img}
          alt={`${project.title} — ${project.client} ${project.category.toLowerCase()}`}
          className="film-card-img"
          fill
          sizes="(max-width: 900px) 320px, 400px"
          placeholder="blur"
        />
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

interface FilmRowProps {
  projects: Project[];
  firstFrame: number;
  label: string;
  moverRef: RefObject<HTMLDivElement | null>;
  cardsRef: RefObject<HTMLDivElement | null>;
  onOpen: (p: Project) => void;
}

/** One strip of film: sprockets, a row of frames, sprockets. */
function FilmRow({ projects, firstFrame, label, moverRef, cardsRef, onOpen }: FilmRowProps) {
  return (
    <div ref={moverRef} className="film-strip-mover" role="group" aria-label={label}>
      <SprocketRow labelled firstFrame={firstFrame} />
      <div ref={cardsRef} className="cards-row">
        {projects.map((p) => (
          <FilmCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </div>
      <SprocketRow labelled={false} firstFrame={firstFrame} />
    </div>
  );
}

/** Width of a strip from its card count, card width, gaps and side padding. */
function stripWidth(cards: HTMLDivElement, count: number) {
  const card = cards.firstElementChild as HTMLElement | null;
  const style = getComputedStyle(cards);
  return (
    count * (card?.offsetWidth ?? 0) +
    (count - 1) * parseFloat(style.columnGap || '0') +
    parseFloat(style.paddingLeft) +
    parseFloat(style.paddingRight)
  );
}

/**
 * Two film strips pinned on screen while the section scrolls: the top strip
 * slides left and the bottom strip slides right.
 */
export function WorkStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const topCardsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const bottomCardsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    let dims = { topTravel: 0, bottomTravel: 0, sectionH: 0 };

    const compute = () => {
      const section = sectionRef.current;
      const top = topRef.current;
      const bottom = bottomRef.current;
      const topCards = topCardsRef.current;
      const bottomCards = bottomCardsRef.current;
      if (!section || !top || !bottom || !topCards || !bottomCards) return;
      const topW = stripWidth(topCards, TOP_ROW.length);
      const bottomW = stripWidth(bottomCards, BOTTOM_ROW.length);
      top.style.width = `${topW}px`;
      bottom.style.width = `${bottomW}px`;
      const topTravel = Math.max(0, topW - window.innerWidth);
      const bottomTravel = Math.max(0, bottomW - window.innerWidth);
      const sectionH = Math.max(topTravel, bottomTravel) + window.innerHeight * 1.6;
      section.style.height = `${sectionH}px`;
      dims = { topTravel, bottomTravel, sectionH };
    };

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section || !topRef.current || !bottomRef.current) return;
      const rect = section.getBoundingClientRect();
      const prog = Math.max(0, Math.min(1, -rect.top / Math.max(dims.sectionH - window.innerHeight, 1)));
      topRef.current.style.transform = `translateX(${-prog * dims.topTravel}px)`;
      bottomRef.current.style.transform = `translateX(${-(1 - prog) * dims.bottomTravel}px)`;
      if (barRef.current) barRef.current.style.width = `${prog * 100}%`;
      if (counterRef.current) {
        const n = Math.min(Math.floor(prog * ALL_PROJECTS.length) + 1, ALL_PROJECTS.length);
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

          <div className="film-strip-stack">
            <FilmRow
              projects={TOP_ROW}
              firstFrame={0}
              label="Featured projects"
              moverRef={topRef}
              cardsRef={topCardsRef}
              onOpen={setActive}
            />
            <FilmRow
              projects={BOTTOM_ROW}
              firstFrame={20}
              label="More projects"
              moverRef={bottomRef}
              cardsRef={bottomCardsRef}
              onOpen={setActive}
            />
          </div>

          <div className="work-progress">
            <div className="work-progress-track">
              <div ref={barRef} className="work-progress-bar" />
            </div>
            <div className="work-progress-labels">
              <span>SCROLL TO EXPLORE</span>
              <span>F&amp;B · COMMERCIALS · BRAND FILMS</span>
            </div>
          </div>
        </div>
      </section>

      {active && <VideoModal project={active} onClose={close} />}
    </>
  );
}
