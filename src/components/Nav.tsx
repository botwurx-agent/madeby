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

  // Section tracking on the home page: the active link belongs to the last
  // section whose top has scrolled past 40% of the screen. (Position-based, so
  // a section that is pinned underneath the next one stops counting.)
  useEffect(() => {
    if (!isHome) return;
    const ids = NAV_LINKS.flatMap((l) => l.sections);
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > 0) current = id;
      }
      // Above the first section (the hero) nothing is active.
      setActive(current ? (NAV_LINKS.find((l) => l.sections.includes(current!))?.label ?? null) : null);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
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
