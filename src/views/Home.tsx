'use client';

import { useCallback, useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { Hero } from './home/Hero';
import { Loader } from './home/Loader';
import { Marquee } from './home/Marquee';
import { Philosophy } from './home/Philosophy';
import { AboutTeaser, Contact, Services } from './home/Sections';
import { WorkStrip } from './home/WorkStrip';

// The countdown plays once per full page load, not on every client-side
// visit back to the home page.
let loaderPlayed = false;

export default function Home() {
  const [loaded, setLoaded] = useState(() => loaderPlayed);

  const finish = useCallback(() => {
    loaderPlayed = true;
    setLoaded(true);
  }, []);

  // Deep links (e.g. /#contact from another page) skip the countdown and jump
  // to the section once the pinned sections have sized themselves.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    finish();
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [finish]);

  return (
    <>
      {!loaded && <Loader onComplete={finish} />}
      <div className={`home-content${loaded ? ' loaded' : ''}`}>
        <Nav overlay visible={loaded} />
        <main>
          <Hero active={loaded} />
          <Marquee />
          <Philosophy />
          <WorkStrip />
          <AboutTeaser />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
