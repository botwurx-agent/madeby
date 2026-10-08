'use client';

import { useEffect, useRef } from 'react';
import { Eyebrow, Rule } from '../../components/Eyebrow';
import { revealClass, useReveal } from '../../hooks/useReveal';
import { createLightPath } from './lightPath';

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textVisible = useReveal(textRef, 0.12);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const scene = createLightPath(canvas);
    if (!scene) return;

    // Scroll progress through the (taller-than-viewport) section, 0 → 1.
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      scene.setProgress(Math.max(0, Math.min(1, -rect.top / Math.max(total, 1))));
    };
    onScroll();

    // Only animate while the section is on screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) scene.start();
      else scene.stop();
    });
    io.observe(section);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', scene.resize);
    return () => {
      io.disconnect();
      scene.stop();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', scene.resize);
    };
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="philosophy">
      <div className="philosophy-sticky">
        <canvas ref={canvasRef} className="philosophy-canvas" aria-hidden="true" />

        <div ref={textRef} className="philosophy-text">
          <Eyebrow className={revealClass(textVisible)} style={{ marginBottom: 28 }}>
            <Rule />
            F-001 · Philosophy
            <Rule />
          </Eyebrow>

          <h2 className={`philosophy-title ${revealClass(textVisible, 'reveal-d1')}`}>
            CRAFT IS
            <br />
            EVERY<span className="accent">THING.</span>
          </h2>

          <div className={`philosophy-body ${revealClass(textVisible, 'reveal-d2')}`}>
            <p>
              Every frame is a decision. The angle, the light, the timing of a pour — these aren't accidents.
              They're the result of an obsession with getting it right.
            </p>
            <p>No templates. No shortcuts. Just the work.</p>
          </div>

          <blockquote className={`philosophy-quote ${revealClass(textVisible, 'reveal-d3')}`}>
            "Made with intention. Finished with obsession."
          </blockquote>
        </div>

        <div className="philosophy-caption">
          Scroll to follow the light
          <br />
          MB-001 · The Craft
        </div>
      </div>
    </section>
  );
}
