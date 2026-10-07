import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../data/site';

interface Props {
  /** Transparent at the top of the page, solid once scrolled (home hero). */
  overlay?: boolean;
  /** Fade/slide in when true (home waits for the loader). */
  visible?: boolean;
}

export function Nav({ overlay = false, visible = true }: Props) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  const solid = !overlay || scrolled;

  return (
    <nav className={`nav${solid ? ' solid' : ''}${visible ? '' : ' hidden'}`}>
      <Link to="/" className="nav-logo">
        MADEBY
      </Link>
      <ul className="nav-links">
        {NAV_LINKS.map(({ num, label, to }) => (
          <li key={num}>
            <Link to={to} className={`nav-link${pathname === to ? ' active' : ''}`}>
              <span className="nav-num">{num}</span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
