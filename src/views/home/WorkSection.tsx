'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SectionHead } from '../../components/SectionHead';
import { Viewer } from '../../components/Viewer';
import { WorkTile } from '../../components/WorkTile';
import { FEATURED_WORK } from '../../data/work';
import { useInView } from '../../lib/hooks';
import { useOverlay } from '../../lib/Overlay';

/** 1B — 4×3 grid of looping samples. Click one to open the viewer. */
export function WorkSection() {
  const viewer = useOverlay<number>();
  const [gridRef, seen] = useInView<HTMLDivElement>(0.1);
  const sectionRef = useRef<HTMLElement>(null);

  // Like the hero: once the whole grid has scrolled into view, the section
  // holds and eases back into a framed card while the crew slides up over it.
  useEffect(() => {
    const el = sectionRef.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const h = el.offsetHeight;
      // Stick when the bottom edge reaches the bottom of the screen (negative top for tall sections).
      el.style.setProperty('--stick', `${Math.min(0, vh - h)}px`);
      // Scale around the middle of what is on screen while pinned.
      el.style.setProperty('--oy', `${Math.max(h / 2, h - vh / 2)}px`);
      const next = el.nextElementSibling as HTMLElement | null;
      const top = next ? next.getBoundingClientRect().top : vh;
      const p = Math.min(1, Math.max(0, (vh - top) / vh));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="section work">
      <SectionHead num="01" label="Work" title="Selected work">
        <p>Commercials, brand films and social for food &amp; beverage brands. Click any frame to watch.</p>
      </SectionHead>

      <div ref={gridRef} className={`grid grid-4 wipe${seen ? ' is-in' : ''}`}>
        {FEATURED_WORK.map((w, i) => (
          <WorkTile
            key={w.id}
            sample={w}
            index={i}
            sizes="(max-width: 700px) 50vw, 25vw"
            onOpen={(el) => viewer.open(i, el)}
          />
        ))}
      </div>

      <div className="section-foot">
        <Link href="/work" className="more-link">
          More <span aria-hidden="true">&gt;&gt;</span>
        </Link>
      </div>

      {viewer.item !== null && (
        <Viewer list={FEATURED_WORK} start={viewer.item} origin={viewer.origin} onClose={viewer.close} />
      )}
    </section>
  );
}
