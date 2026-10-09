'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Nav } from '../components/Nav';
import { RGBStrips } from '../components/RGBStrips';
import { FILTERS, PROJECTS, type Filter, type Project } from '../data/projects';

const TOTAL = String(PROJECTS.length).padStart(2, '0');

// ── Layout ────────────────────────────────────────────────────
// Projects sit in a jittered grid of cells that tiles forever in both
// directions. Every video stays 16:9; widths vary for the editorial scatter.
const CELL_W = 540;
const CELL_H = 440;
const WIDTHS = [460, 300, 380, 280, 420, 340, 300, 400];
const HEAD_H = 64; // title block above each video

interface Placed {
  project: Project;
  index: number;
  w: number; // card width (video width)
  h: number; // card height including the title block
  cx: number; // centre in world space
  cy: number;
}

interface Layout {
  items: Placed[];
  tileW: number;
  tileH: number;
}

/** Small deterministic random so the scatter is stable between renders. */
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

function buildLayout(projects: Project[]): Layout {
  const n = Math.max(projects.length, 1);
  const cols = Math.max(2, Math.ceil(Math.sqrt(n * 1.6)));
  const rows = Math.max(2, Math.ceil(n / cols));
  const items = projects.map((project, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const w = WIDTHS[i % WIDTHS.length];
    const h = (w * 9) / 16 + HEAD_H;
    const slackX = Math.max(0, CELL_W - w - 50);
    const slackY = Math.max(0, CELL_H - h - 40);
    return {
      project,
      index: i,
      w,
      h,
      // Offset odd rows so the grid reads as a scatter rather than columns
      cx: col * CELL_W + CELL_W / 2 + (rand(i + 1) - 0.5) * slackX + (row % 2 ? CELL_W * 0.25 : 0),
      cy: row * CELL_H + CELL_H / 2 + (rand(i + 11) - 0.5) * slackY,
    };
  });
  return { items, tileW: cols * CELL_W, tileH: rows * CELL_H };
}

/** Wrap a distance into [-span/2, span/2). */
const wrap = (d: number, span: number) => ((((d + span / 2) % span) + span) % span) - span / 2;

// ── Card ──────────────────────────────────────────────────────
function CanvasCard({ item, copy }: { item: Placed; copy: number }) {
  const { project, w } = item;
  return (
    <Link
      href={`/work/${project.slug}`}
      className="canvas-card"
      data-index={item.index}
      data-copy={copy}
      data-cursor="view"
      draggable={false}
      tabIndex={copy === 0 ? 0 : -1}
      aria-hidden={copy === 0 ? undefined : true}
      style={{ width: w } as CSSProperties}
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
            alt={copy === 0 ? `${project.title} — ${project.client} ${project.category.toLowerCase()}` : ''}
            className="work-item-img"
            fill
            sizes="460px"
            placeholder="blur"
            draggable={false}
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
  const [copies, setCopies] = useState({ x: 1, y: 1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );
  const layout = useMemo(() => buildLayout(filtered), [filtered]);

  // Camera + input state lives in a ref so the animation loop never re-renders React
  const cam = useRef({
    x: 0, y: 0, // camera (world point at viewport centre)
    tx: 0, ty: 0, // target
    vx: 0, vy: 0, // fling velocity
    scale: 1,
    dragging: false,
    moved: 0,
    lastInput: 0,
    snapped: true,
    active: -1,
  });
  const layoutRef = useRef(layout);
  // Declared first so the effects below always read the current layout
  useEffect(() => {
    layoutRef.current = layout;
  }, [layout]);

  // Lock page scroll: on this page, scrolling pans the canvas instead
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  // How many repeats of the tile are needed to cover the screen
  useEffect(() => {
    const measure = () => {
      const s = Math.min(1, Math.max(0.6, window.innerWidth / 1280));
      cam.current.scale = s;
      const { tileW, tileH } = layoutRef.current;
      setCopies({
        x: Math.max(1, Math.ceil((window.innerWidth / s + CELL_W * 2) / tileW)),
        y: Math.max(1, Math.ceil((window.innerHeight / s + CELL_H * 2) / tileH)),
      });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [layout]);

  // Start each layout with the first project in centre frame
  useEffect(() => {
    const first = layout.items[0];
    if (!first) return;
    const c = cam.current;
    c.x = c.tx = first.cx;
    c.y = c.ty = first.cy;
    c.vx = c.vy = 0;
    c.snapped = true;
    c.active = -1;
  }, [layout]);

  // Animation loop: ease the camera, place every card, find the centred one
  useEffect(() => {
    const plane = planeRef.current;
    const viewport = viewportRef.current;
    if (!plane || !viewport) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let activeEl: HTMLElement | null = null;

    const nearest = () => {
      const c = cam.current;
      const { items, tileW, tileH } = layoutRef.current;
      let best: { item: Placed; dx: number; dy: number; d: number } | null = null;
      for (const item of items) {
        const dx = wrap(item.cx - c.tx, tileW);
        const dy = wrap(item.cy - c.ty, tileH);
        const d = Math.hypot(dx, dy * 1.2);
        if (!best || d < best.d) best = { item, dx, dy, d };
      }
      return best;
    };

    const tick = (now: number) => {
      const c = cam.current;
      const { items, tileW, tileH } = layoutRef.current;

      if (!c.dragging) {
        c.tx += c.vx;
        c.ty += c.vy;
        c.vx *= 0.9;
        c.vy *= 0.9;
        if (Math.abs(c.vx) < 0.05) c.vx = 0;
        if (Math.abs(c.vy) < 0.05) c.vy = 0;
        // Once input settles, glide the nearest video into centre frame
        if (!c.snapped && !c.vx && !c.vy && now - c.lastInput > 180) {
          const n = nearest();
          if (n) {
            c.tx += n.dx;
            c.ty += n.dy;
          }
          c.snapped = true;
        }
      }
      const ease = reduce ? 1 : c.dragging ? 0.35 : 0.1;
      c.x += (c.tx - c.x) * ease;
      c.y += (c.ty - c.y) * ease;

      const s = c.scale;
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      const focusR = Math.min(vw, vh) * 1.05;
      let bestDist = Infinity;
      let bestIndex = -1;
      let bestEl: HTMLElement | null = null;

      for (const el of plane.children as HTMLCollectionOf<HTMLElement>) {
        const index = Number(el.dataset.index);
        const copy = Number(el.dataset.copy);
        const item = items[index];
        if (!item) continue;
        const cx = copies.x;
        const cy = copies.y;
        const ix = copy % cx;
        const iy = Math.floor(copy / cx);
        const totalW = tileW * cx;
        const totalH = tileH * cy;
        const dx = wrap(item.cx + ix * tileW - c.x, totalW);
        const dy = wrap(item.cy + iy * tileH - c.y, totalH);
        const sx = vw / 2 + dx * s;
        const sy = vh / 2 + dy * s;
        const dist = Math.hypot(sx - vw / 2, (sy - vh / 2) * 1.2);
        const f = Math.max(0, 1 - dist / focusR);
        const k = s * (0.86 + 0.2 * f * f);
        el.style.transform = `translate3d(${sx - (item.w * k) / 2}px, ${sy - (item.h * k) / 2}px, 0) scale(${k})`;
        el.style.opacity = String(0.42 + 0.58 * Math.min(1, f * 1.5));
        el.style.zIndex = String(Math.round(f * 100));
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = index;
          bestEl = el;
        }
      }

      // Only the copy actually in centre frame is active
      if (bestEl !== activeEl) {
        activeEl?.classList.remove('is-active');
        bestEl?.classList.add('is-active');
        activeEl = bestEl;
      }
      if (bestIndex !== c.active) {
        c.active = bestIndex;
        setActiveIndex(bestIndex);
      }
      plane.classList.add('ready');
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [copies, layout]);

  // Input: wheel / trackpad, drag (mouse + touch), arrow keys
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const c = cam.current;
    const input = () => {
      c.lastInput = performance.now();
      c.snapped = false;
      setTouched(true);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      c.tx += (e.deltaX * unit) / c.scale;
      c.ty += (e.deltaY * unit) / c.scale;
      c.vx = c.vy = 0;
      input();
    };

    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    const onDown = (e: PointerEvent) => {
      if ((e.target as Element).closest('.canvas-ui')) return;
      if (e.button !== 0) return;
      c.dragging = true;
      c.moved = 0;
      c.vx = c.vy = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = performance.now();
      input();
    };
    const onMove = (e: PointerEvent) => {
      if (!c.dragging) return;
      const dx = (e.clientX - lastX) / c.scale;
      const dy = (e.clientY - lastY) / c.scale;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      c.tx -= dx;
      c.ty -= dy;
      c.moved += Math.abs(dx) + Math.abs(dy);
      // Only a real drag (not a click) disables the cards' pointer events
      if (c.moved > 6) viewport.classList.add('dragging');
      // Velocity in px per frame (~16ms) for the fling
      c.vx = (-dx / dt) * 16;
      c.vy = (-dy / dt) * 16;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      input();
    };
    const onUp = () => {
      if (!c.dragging) return;
      c.dragging = false;
      if (performance.now() - lastT > 80) c.vx = c.vy = 0; // held still before release
      viewport.classList.remove('dragging');
      input();
    };
    const onKey = (e: KeyboardEvent) => {
      const step = { ArrowLeft: [-CELL_W, 0], ArrowRight: [CELL_W, 0], ArrowUp: [0, -CELL_H], ArrowDown: [0, CELL_H] }[
        e.key
      ];
      if (!step) return;
      e.preventDefault();
      c.tx += step[0];
      c.ty += step[1];
      input();
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('keydown', onKey);
    return () => {
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // A click after a drag is not a click. A click on an off-centre video
  // brings it into centre frame; a click on the centred one opens it.
  const onClickCapture = (e: MouseEvent) => {
    const c = cam.current;
    const card = (e.target as Element).closest<HTMLElement>('.canvas-card');
    if (!card) return;
    if (c.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (!card.classList.contains('is-active')) {
      e.preventDefault();
      centreOn(card);
    }
  };

  const centreOn = (card: HTMLElement) => {
    const c = cam.current;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const r = card.getBoundingClientRect();
    const v = viewport.getBoundingClientRect();
    const midY = (r.top + r.bottom) / 2;
    c.tx = c.x + ((r.left + r.right) / 2 - (v.left + v.width / 2)) / c.scale;
    c.ty = c.y + (midY - (v.top + v.height / 2)) / c.scale;
    c.vx = c.vy = 0;
    c.snapped = true;
    c.lastInput = performance.now();
    setTouched(true);
  };

  const active = layout.items[activeIndex]?.project;
  const copyCount = copies.x * copies.y;

  return (
    <div className="work-page canvas-page">
      <Nav />

      <main
        ref={viewportRef}
        className="canvas-viewport"
        onClickCapture={onClickCapture}
        onFocusCapture={(e) => {
          const card = (e.target as Element).closest<HTMLElement>('.canvas-card');
          if (card && (e.target as HTMLElement).matches(':focus-visible')) centreOn(card);
        }}
        aria-label="Selected work. Scroll, drag or use the arrow keys to explore."
      >
        <div ref={planeRef} className="canvas-plane" key={filter}>
          {Array.from({ length: copyCount }, (_, copy) =>
            layout.items.map((item) => <CanvasCard key={`${copy}-${item.project.id}`} item={item} copy={copy} />),
          )}
        </div>

        {/* Viewfinder marking centre frame */}
        <div className="viewfinder" aria-hidden="true">
          <i className="tl" />
          <i className="tr" />
          <i className="bl" />
          <i className="br" />
          <span className="viewfinder-rec">● REC</span>
        </div>

        <div className="canvas-ui canvas-title">
          <div className="eyebrow" style={{ '--line-w': '32px' } as CSSProperties}>
            F-001
            <span className="eyebrow-line" />
            Selected Work
          </div>
          <div className="page-hero-headline-row">
            <RGBStrips revealed />
            <h1 className="canvas-title-text">
              THE
              <br />
              WORK<span className="accent">.</span>
            </h1>
          </div>
        </div>

        <div className="canvas-ui canvas-now" aria-live="polite">
          {active && (
            <>
              <div className="canvas-now-meta">
                {active.id} / {TOTAL} · {active.category} · {active.year}
              </div>
              <div className="canvas-now-title">{active.title}</div>
              <div className="canvas-now-client">{active.client}</div>
              <Link href={`/work/${active.slug}`} className="canvas-now-open">
                View project →
              </Link>
            </>
          )}
        </div>

        <div className="canvas-ui canvas-filters" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              {f !== 'All' && <span className="filter-count">{PROJECTS.filter((p) => p.category === f).length}</span>}
            </button>
          ))}
        </div>

        <div className={`canvas-hint${touched ? ' gone' : ''}`} aria-hidden="true">
          Scroll or drag in any direction
        </div>
      </main>
    </div>
  );
}
