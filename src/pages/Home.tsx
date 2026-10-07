import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { Hero } from './home/Hero';
import { Loader } from './home/Loader';
import { Marquee } from './home/Marquee';
import { Philosophy } from './home/Philosophy';
import { AboutTeaser, Contact, Services } from './home/Sections';
import { WorkStrip } from './home/WorkStrip';
import '../styles/home.css';

// The countdown plays once per full page load, not on every client-side
// visit back to the home page.
let loaderPlayed = false;

export default function Home() {
  const { hash } = useLocation();
  // Deep links (e.g. /#contact) skip the countdown and go straight to the section.
  const [loaded, setLoaded] = useState(() => loaderPlayed || !!hash);
  useEffect(() => {
    document.title = 'MadeBy — We Make Things That Move People';
  }, []);
  const finish = useCallback(() => {
    loaderPlayed = true;
    setLoaded(true);
  }, []);

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
