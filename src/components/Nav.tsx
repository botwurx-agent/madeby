'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LIVE_URL, NAV_LINKS } from '../data/site';
import { Logo } from './Logo';

/**
 * Fixed top bar. On the home page the link for the section in view is marked by
 * an orange rule that slides between links; elsewhere the current page is.
 */
export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [active, setActive] = useState<string | null>(isHome ? null : pathname.startsWith('/work') ? 'Work' : null);
  const [solid, setSolid] = useState(!isHome);
  const [hidden, setHidden] = useState(false);
  const linksRef = useRef<HTMLUListElement>(null);
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);

  // Section tracking on the home page.
  useEffect(() => {
    if (!isHome) return;
    const ids = NAV_LINKS.flatMap((l) => l.sections);
    const visible = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let best: string | null = null;
        let max = 0;
        for (const [id, r] of visible) if (r > max) [best, max] = [id, r];
        setActive(best ? (NAV_LINKS.find((l) => l.sections.includes(best!))?.label ?? null) : null);
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.01, 0.25, 0.5, 0.75, 1] },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [isHome]);

  // Solid after the hero; tuck away while scrolling down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(!isHome || y > window.innerHeight * 0.3);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > window.innerHeight);
        last = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useLayoutEffect(() => {
    const ul = linksRef.current;
    const a = ul?.querySelector<HTMLElement>(`[data-label="${active}"]`);
    setBar(a ? { x: a.offsetLeft, w: a.offsetWidth } : null);
  }, [active]);

  return (
    <nav className={`nav${solid ? ' is-solid' : ''}${hidden ? ' is-hidden' : ''}`} aria-label="Main">
      <Logo />
      <ul ref={linksRef} className="nav-links">
        {NAV_LINKS.map(({ label, to }) => (
          <li key={label}>
            <Link
              href={to}
              data-label={label}
              className={`nav-link${active === label ? ' is-active' : ''}`}
              aria-current={active === label ? 'true' : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
        <li>
          <a href={LIVE_URL} className="nav-link nav-live" target="_blank" rel="noreferrer">
            <span className="live-dot" aria-hidden="true" />
            Live
          </a>
        </li>
        <span
          className="nav-bar"
          aria-hidden="true"
          style={bar ? { transform: `translateX(${bar.x}px) scaleX(${bar.w})`, opacity: 1 } : { opacity: 0 }}
        />
      </ul>
    </nav>
  );
}
