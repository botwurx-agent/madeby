import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Eyebrow, Rule } from '../components/Eyebrow';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { RGBStrips } from '../components/RGBStrips';
import { BTS_CELLS, CHAPTERS, TEAM, type TeamMember } from '../data/about';
import { RGB_COLORS } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import '../styles/about.css';

// ── Hero ──────────────────────────────────────────────────────
function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const vis = useReveal(ref, 0.01);

  return (
    <div ref={ref} className="about-hero">
      {/* Full-bleed BTS still or reel goes here */}
      <div className="about-hero-bg">
        <div className="about-hero-ph">HERO BTS · FULL BLEED</div>
      </div>

      <div className="about-hero-meta left">
        MB-002 · About &amp; Founders
        <br />
        Est. ©2020 · Los Angeles
      </div>
      <div className="about-hero-meta right">
        The People Behind The Frames
        <br />
        Available Worldwide
      </div>

      <div className="about-hero-row">
        <RGBStrips revealed={vis} parallax soft />
        <h1 className="about-hero-title">
          THE
          <br />
          STORY<span className="accent">.</span>
        </h1>
      </div>

      <div className="about-hero-bottom">
        <p className="about-hero-tagline">
          Two filmmakers. One obsession.
          <br />
          Everything in between.
        </p>
        <div className="scroll-cue" style={{ textTransform: 'none' }}>
          Scroll
          <div className="scroll-cue-line" />
        </div>
      </div>
    </div>
  );
}

// ── Origin — sticky scrollytelling ────────────────────────────
function Origin() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const prog = Math.max(0, Math.min(1, -rect.top / Math.max(total, 1)));
      setActive(Math.min(CHAPTERS.length - 1, Math.floor(prog * CHAPTERS.length)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="origin"
      className="origin"
      style={{ height: `${CHAPTERS.length * 100 + 60}vh` }}
    >
      <div className="origin-sticky">
        <div className="origin-media">
          {CHAPTERS.map((ch, i) => (
            <div key={ch.num} className={`origin-slide${active === i ? ' active' : ''}`}>
              <div className="ph borderless" style={{ height: '100%' }}>
                <div className="ph-label">
                  <span>BTS · {ch.year}</span>
                </div>
              </div>
              <div className="origin-ghost-num">{ch.num}</div>
            </div>
          ))}
          <div className="origin-progress" aria-hidden="true">
            {CHAPTERS.map((ch, i) => (
              <div key={ch.num} className={i === active ? 'active' : ''} />
            ))}
          </div>
          <div className="origin-label">F-002 · Origin</div>
        </div>

        <div className="origin-copy">
          {CHAPTERS.map((ch, i) => (
            <div
              key={ch.num}
              className={`origin-chapter${active === i ? ' active' : active > i ? ' past' : ''}`}
              aria-hidden={active !== i}
            >
              <Eyebrow lineWidth={28} style={{ letterSpacing: '0.4em' }}>
                {ch.num} · {ch.year}
                <Rule />
              </Eyebrow>
              <h2 className="origin-chapter-title">{ch.label}</h2>
              <p className="origin-chapter-body">{ch.body}</p>
              <div className="origin-thread" aria-hidden="true">
                {RGB_COLORS.map((c) => (
                  <div key={c} style={{ background: c }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BTS gallery — parallax strip ──────────────────────────────
const STRIP_H = 480;

function BTSGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headVis = useReveal(headRef, 0.05);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const offset = window.innerHeight / 2 - (rect.top + rect.height / 2);
      cellRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `translateY(${offset * BTS_CELLS[i].rate}px)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} id="bts" className="bts">
      <div ref={headRef} className="section-head bts-head">
        <RGBStrips revealed={headVis} soft />
        <div>
          <Eyebrow lineWidth={28} style={{ marginBottom: 16 }}>
            F-BTS
            <Rule />
            Behind The Lens
          </Eyebrow>
          <h2 className="section-head-title">
            ON
            <br />
            SET<span className="accent">.</span>
          </h2>
        </div>
      </div>

      <div className="bts-strip">
        {BTS_CELLS.map((cell, i) => {
          const code = String(i + 1).padStart(2, '0');
          return (
            <div
              key={code}
              ref={(node) => {
                cellRefs.current[i] = node;
              }}
              className="bts-cell"
              style={{ flex: cell.flex, height: `${(cell.height / STRIP_H) * 100}%` }}
            >
              <div className="ph borderless" style={{ height: '100%' }}>
                <div className="ph-label">
                  <span>BTS · {code}</span>
                </div>
              </div>
              <div className="bts-cell-code">MB · {code}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Team card — hover reveal + click to flip ──────────────────
function TeamCard({ member }: { member: TeamMember }) {
  const [flipped, setFlipped] = useState(false);
  const firstName = member.name.split(' ')[0];
  const toggle = () => setFlipped((f) => !f);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className="team-card"
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${member.name}, ${member.role}. ${flipped ? 'Hide' : 'Show'} bio`}
      onClick={toggle}
      onKeyDown={onKey}
      data-cursor-member={member.id}
      data-cursor-color={member.color}
      style={{ '--member-color': member.color } as CSSProperties}
    >
      <div className={`flip-inner${flipped ? ' flipped' : ''}`}>
        {/* Front */}
        <div className="flip-face flip-front">
          <div className="ph borderless" style={{ position: 'absolute', inset: 0 }} />
          <div className="team-monogram">{member.id}</div>
          <div className="team-bts-reveal">
            <div className="team-bts-badge">BTS</div>
            <div className="team-bts-label">ON SET · {firstName.toUpperCase()}</div>
            <div className="team-bts-cta">CLICK FOR FULL BIO →</div>
          </div>
          <div className="team-accent-bar" />
          <div className="team-info">
            <div className="team-role">{member.role}</div>
            <div className="team-name">{member.name}</div>
          </div>
          <div className="team-card-hint">TAP · BIO</div>
        </div>

        {/* Back */}
        <div
          className="flip-face flip-back"
          style={{ border: `1px solid color-mix(in srgb, ${member.color} 21%, transparent)` }}
        >
          <div className="team-accent-bar" />
          <div style={{ paddingLeft: 16 }}>
            <div className="team-role" style={{ marginBottom: 18 }}>
              {member.id} · {member.role}
            </div>
            <div className="team-back-name">{member.name}</div>
            <p className="team-bio">{member.bio}</p>
          </div>
          <div style={{ paddingLeft: 16 }}>
            <div className="team-back-rule" />
            <div className="team-credits">{member.credits}</div>
            <div className="team-back-close">← CLICK TO CLOSE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Team() {
  const ref = useRef<HTMLElement>(null);
  const vis = useReveal(ref, 0.08);

  return (
    <section ref={ref} id="team" className="team">
      <div className="section-head" style={{ marginBottom: 60 }}>
        <RGBStrips revealed={vis} soft />
        <div>
          <Eyebrow lineWidth={32} style={{ marginBottom: 18 }}>
            F-003
            <Rule />
            The Team
          </Eyebrow>
          <h2 className="section-head-title">
            THE PEOPLE
            <br />
            BEHIND IT<span className="accent">.</span>
          </h2>
        </div>
      </div>

      <div className="team-grid">
        {TEAM.map((m) => (
          <TeamCard key={m.id} member={m} />
        ))}
      </div>

      <div className="team-usage">
        <span>Hover · On-set preview</span>
        <i />
        <span>Click · Full bio</span>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function About() {
  useEffect(() => {
    document.title = 'MadeBy — About';
  }, []);

  return (
    <div className="about-page">
      <Nav />
      <main>
        <AboutHero />
        <Origin />
        <BTSGallery />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
