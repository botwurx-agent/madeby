import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On every navigation: scroll to the `#hash` target if there is one,
 * otherwise jump to the top of the page.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    // Sections like the film strip size themselves in an effect, so wait a
    // couple of frames for layout to settle before measuring.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
