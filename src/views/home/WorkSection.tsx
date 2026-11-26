'use client';

import Link from 'next/link';
import { SectionHead } from '../../components/SectionHead';
import { Viewer } from '../../components/Viewer';
import { WorkTile } from '../../components/WorkTile';
import { FEATURED_WORK } from '../../data/work';
import { useInView, usePinned } from '../../lib/hooks';
import { useOverlay } from '../../lib/Overlay';

/** 1B — 4×3 grid of looping samples. Click one to open the viewer. */
export function WorkSection() {
  const viewer = useOverlay<number>();
  const [gridRef, seen] = useInView<HTMLDivElement>(0.1);
  // Holds and eases back while the crew slides over it (see usePinned).
  const sectionRef = usePinned<HTMLElement>();

  return (
    <section ref={sectionRef} id="work" className="section work pin">
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
