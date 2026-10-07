import { MARQUEE_ITEMS } from '../../data/site';

export function Marquee() {
  // Interleave separator dots, then double the run so the -50% loop is seamless.
  const items = MARQUEE_ITEMS.flatMap((item) => [item, '·']);
  return (
    <div className="marquee" aria-label={MARQUEE_ITEMS.join(', ')}>
      <div className="marquee-inner" aria-hidden="true">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`marquee-item${item === '·' ? ' dot' : ''}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
