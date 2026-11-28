'use client';

import { useState } from 'react';
import { SectionHead } from '../components/SectionHead';
import { Viewer } from '../components/Viewer';
import { WorkTile } from '../components/WorkTile';
import { CATEGORIES, WORK } from '../data/work';
import { useOverlay } from '../lib/Overlay';

/** Only categories that have work in them get a filter. */
const FILTERS = ['All', ...CATEGORIES.filter((c) => WORK.some((w) => w.category === c))] as const;

/** "More >>" - every work sample, filterable. */
export default function WorkPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const list = filter === 'All' ? WORK : WORK.filter((w) => w.category === filter);
  const viewer = useOverlay<number>();

  return (
    <main className="section work-page">
      <SectionHead num={String(WORK.length)} label="Projects" title="Work samples">
        <div className="filters" role="group" aria-label="Filter by category">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter${filter === f ? ' is-active' : ''}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
              <sup>{f === 'All' ? WORK.length : WORK.filter((w) => w.category === f).length}</sup>
            </button>
          ))}
        </div>
      </SectionHead>

      <div key={filter} className="grid grid-3 wipe is-in">
        {list.map((w, i) => (
          <WorkTile
            key={w.id}
            sample={w}
            index={i}
            sizes="(max-width: 700px) 50vw, 33vw"
            onOpen={(el) => viewer.open(i, el)}
          />
        ))}
      </div>

      {viewer.item !== null && (
        <Viewer list={list} start={viewer.item} origin={viewer.origin} onClose={viewer.close} more={false} />
      )}
    </main>
  );
}
