'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Eyebrow, Rule } from '../components/Eyebrow';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { RGBStrips } from '../components/RGBStrips';
import { FILTERS, PROJECTS, type Filter, type Project } from '../data/projects';
import { revealClass, useReveal } from '../hooks/useReveal';

const TOTAL = String(PROJECTS.length).padStart(2, '0');

// ── Editorial scatter layout ──────────────────────────────────
// Each row shape takes 1–3 projects. Slot width + top offset vary so every
// video stays 16:9 but sizes and vertical positions differ.
const ROW_SHAPES = [
  [{ w: '54%', mt: 0 }, { w: '30%', mt: 130 }],
  [{ w: '33%', mt: 150 }, { w: '45%', mt: 0 }],
  [{ w: '24%', mt: 40 }, { w: '24%', mt: 180 }, { w: '40%', mt: 0 }],
  [{ w: '46%', mt: 30 }, { w: '27%', mt: 180 }],
];

interface Slot {
  project: Project;
  w: string;
  mt: number;
}

function buildRows(items: Project[]): Slot[][] {
  const rows: Slot[][] = [];
  let i = 0;
  for (let s = 0; i < items.length; s++) {
    const shape = ROW_SHAPES[s % ROW_SHAPES.length];
    const row: Slot[] = [];
    for (const slot of shape) {
      if (i >= items.length) break;
      row.push({ project: items[i++], ...slot });
    }
    rows.push(row);
  }
  return rows;
}

// ── Card ──────────────────────────────────────────────────────
function WorkCard({ slot: { project, w, mt }, visible, delay }: { slot: Slot; visible: boolean; delay: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`work-item ${revealClass(visible)}`}
      style={{ width: w, marginTop: mt, transitionDelay: visible ? `${delay}ms` : '0ms' }}
      data-cursor="view"
    >
      <div className="work-item-head">
        <h2 className="work-item-title">{project.title}</h2>
        <div className="work-item-sub">
          {project.client} · {project.category}
        </div>
      </div>

      <div className="work-item-media">
        {project.img ? (
          <Image
            src={project.img}
            alt={`${project.title} — ${project.client} ${project.category.toLowerCase()}`}
            className="work-item-img"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            placeholder="blur"
          />
        ) : (
          <div className="work-item-ph">
            <div className="work-item-ph-label">
              <span>PROJECT STILL — {project.id}</span>
              <span>{project.title}</span>
            </div>
          </div>
        )}
        <div className="work-item-overlay" />
        <div className="work-item-frame">
          {project.id} ▸ {project.year}
        </div>
        <div className="work-item-play">
          <div className="work-item-play-tri" />
        </div>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function Work() {
  const [filter, setFilter] = useState<Filter>('All');
  const [armed, setArmed] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroVis = useReveal(heroRef, 0.1);
  const gridVis = useReveal(gridRef, 0.1);

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  // Re-run the staggered reveal whenever the filter changes.
  const changeFilter = (f: Filter) => {
    if (f === filter) return;
    setArmed(false);
    setFilter(f);
  };
  useEffect(() => {
    if (armed) return;
    const id = window.setTimeout(() => setArmed(true), 50);
    return () => clearTimeout(id);
  }, [armed]);

  let cardIndex = 0;

  return (
    <div className="work-page">
      <Nav />

      <main>
        <div ref={heroRef} className="page-hero">
          <div>
            <Eyebrow className={revealClass(heroVis)} lineWidth={32} style={{ marginBottom: 24 }}>
              F-001
              <Rule />
              Selected Work
            </Eyebrow>
            <div className="page-hero-headline-row">
              <RGBStrips revealed={heroVis} parallax />
              <h1 className={`page-hero-title ${revealClass(heroVis, 'reveal-d1')}`}>
                THE
                <br />
                WORK<span className="accent">.</span>
              </h1>
            </div>
          </div>
          <div className={`page-hero-aside ${revealClass(heroVis, 'reveal-d2')}`}>
            <div className="page-hero-aside-copy">
              Food &amp; Beverage
              <br />
              Commercial · Brand Film · Campaign
            </div>
            <div className="page-hero-count">{TOTAL}</div>
            <div className="page-hero-count-label">Projects</div>
          </div>
        </div>

        <div className="filter-bar" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => changeFilter(f)}
            >
              {f}
              {f !== 'All' && <span className="filter-count">{PROJECTS.filter((p) => p.category === f).length}</span>}
            </button>
          ))}
          <div className="filter-summary">
            Showing {filtered.length} of {PROJECTS.length}
          </div>
        </div>

        <div ref={gridRef} className="work-canvas">
          {buildRows(filtered).map((row, ri) => (
            <div key={ri} className="work-row">
              {row.map((slot) => (
                <WorkCard key={slot.project.id} slot={slot} visible={gridVis && armed} delay={cardIndex++ * 60} />
              ))}
            </div>
          ))}
        </div>
      </main>

      <Footer className="work-footer" />
    </div>
  );
}
