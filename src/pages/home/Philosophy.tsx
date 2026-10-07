import { useEffect, useRef } from 'react';
import { Eyebrow, Rule } from '../../components/Eyebrow';
import { revealClass, useReveal } from '../../hooks/useReveal';
import { drawSphere, easeInOutCubic, makeScatter } from './sphere';

/** Fraction of the section's scroll at which the sphere is fully assembled. */
const ASSEMBLED_AT = 0.3;

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const textVisible = useReveal(textRef, 0.12);

  // Render loop — runs only while the section is on screen.
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !section || !ctx) return;

    const scatter = makeScatter();
    let dpr = window.devicePixelRatio || 1;
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    let start: number | null = null;
    const draw = (ts: number) => {
      start ??= ts;
      const assembly = easeInOutCubic(Math.min(1, progressRef.current / ASSEMBLED_AT));
      drawSphere(ctx, canvas.width, canvas.height, dpr, (ts - start) * 0.001, assembly, scatter);
      frame = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) frame = requestAnimationFrame(draw);
    });
    io.observe(section);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Scroll progress through the (taller-than-viewport) section, 0 → 1.
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      progressRef.current = Math.max(0, Math.min(1, -rect.top / Math.max(total, 1)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="philosophy">
      <div className="philosophy-sticky">
        <canvas ref={canvasRef} className="philosophy-canvas" aria-hidden="true" />
        <div className="philosophy-vignette" />

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
          Scroll to assemble
          <br />
          MB-001 · The Craft
        </div>
      </div>
    </section>
  );
}
