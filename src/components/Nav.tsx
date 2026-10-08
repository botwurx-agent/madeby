'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../data/site';

interface Props {
  /** Transparent at the top of the page, solid once scrolled (home hero). */
  overlay?: boolean;
  /** Fade/slide in when true (home waits for the loader). */
  visible?: boolean;
}

export function Nav({ overlay = false, visible = true }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  const solid = !overlay || scrolled;
  const isActive = (to: string) => !to.includes('#') && (pathname === to || pathname.startsWith(`${to}/`));

  return (
    <nav className={`nav${solid ? ' solid' : ''}${visible ? '' : ' hidden'}`} aria-label="Main">
      <Link href="/" className="nav-logo" aria-label="MadeBy home">
        MADEBY
      </Link>
      <ul className="nav-links">
        {NAV_LINKS.map(({ num, label, to }) => (
          <li key={num}>
            <Link href={to} className={`nav-link${isActive(to) ? ' active' : ''}`}>
              <span className="nav-num">{num}</span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
