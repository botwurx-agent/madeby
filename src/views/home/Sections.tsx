'use client';

import Image from 'next/image';
import { useRef } from 'react';
import onSetPhoto from '../../assets/about-on-set.webp';
import { Eyebrow, Rule } from '../../components/Eyebrow';
import { revealClass, useReveal } from '../../hooks/useReveal';
import { CONTACT_EMAIL, SERVICES, STATS } from '../../data/site';

export function AboutTeaser() {
  const ref = useRef<HTMLElement>(null);
  const vis = useReveal(ref, 0.1);
  return (
    <section ref={ref} id="about" className="home-section about-teaser">
      <div>
        <Eyebrow className={revealClass(vis)} style={{ marginBottom: 28 }}>
          F-002
          <Rule />
          About
        </Eyebrow>
        <h2
          className={`section-title ${revealClass(vis, 'reveal-d1')}`}
          style={{ fontSize: 'clamp(52px,6vw,96px)', marginBottom: 36 }}
        >
          WE LIVE
          <br />
          FOR THE
          <br />
          FRAME.
        </h2>
        <div className={`about-copy ${revealClass(vis, 'reveal-d2')}`}>
          <p>
            MadeBy is a commercial production company built for brands that want to be felt, not just seen. We
            specialize in Food &amp; Beverage — the steam, the pour, the first bite. Cinematic work that earns a
            second watch.
          </p>
          <p>
            From a single hero spot to a full campaign, we handle every frame from concept to delivery. Based
            everywhere. Available everywhere.
          </p>
        </div>
        <div className={`stats ${revealClass(vis, 'reveal-d3')}`}>
          {STATS.map(([n, label]) => (
            <div key={label}>
              <div className="stat-num">{n}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <figure className={`about-photo ${revealClass(vis, 'reveal-d2')}`}>
        <Image
          src={onSetPhoto}
          alt="The MadeBy crew on set in the studio, posing with Darth Vader"
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          placeholder="blur"
        />
        <figcaption className="about-photo-caption">MB · BTS · On set</figcaption>
      </figure>
    </section>
  );
}

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const vis = useReveal(ref, 0.08);
  return (
    <section ref={ref} id="services" className="home-section">
      <div className="services-head">
        <div>
          <Eyebrow className={revealClass(vis)} style={{ marginBottom: 20 }}>
            F-003
            <Rule />
            Services
          </Eyebrow>
          <h2
            className={`section-title ${revealClass(vis, 'reveal-d1')}`}
            style={{ fontSize: 'clamp(52px,6.5vw,100px)', lineHeight: 0.88 }}
          >
            WHAT
            <br />
            WE DO.
          </h2>
        </div>
        <div className={`services-note ${revealClass(vis, 'reveal-d2')}`}>
          Full-service production from
          <br />
          first brief to final delivery.
        </div>
      </div>

      <div className={`services-grid ${revealClass(vis, 'reveal-d2')}`}>
        {SERVICES.map(({ num, title, desc }) => (
          <div key={num} className="service-card" data-hover>
            <div className="service-num">{num}</div>
            <h3 className="service-title">{title}</h3>
            <p className="service-desc">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const vis = useReveal(ref, 0.1);
  return (
    <section ref={ref} id="contact" className="home-section contact">
      <Eyebrow className={revealClass(vis)} style={{ marginBottom: 32 }}>
        F-004
        <Rule />
        Contact
        <Rule />
      </Eyebrow>
      <h2 className={`contact-title ${revealClass(vis, 'reveal-d1')}`}>
        LET'S MAKE
        <br />
        SOMETHING<span className="accent">.</span>
      </h2>
      <div className={`contact-prompt ${revealClass(vis, 'reveal-d2')}`}>Tell us about your project</div>
      <a href={`mailto:${CONTACT_EMAIL}`} className={`contact-email ${revealClass(vis)}`}>
        {CONTACT_EMAIL}
      </a>
    </section>
  );
}
