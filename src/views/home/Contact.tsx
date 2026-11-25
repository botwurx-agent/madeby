'use client';

import { useState, type FormEvent } from 'react';
import { SplitText } from '../../components/SplitText';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../../data/site';

/**
 * Last call to action. With no form backend yet, sending opens the visitor's
 * mail app with the message filled in, addressed to CONTACT_EMAIL.
 */
export function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');
    const subject = `New project — ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-intro">
        <p className="eyebrow">
          <span className="eyebrow-num">(05)</span> Contact
        </p>
        <SplitText text="Let’s make something." as="h2" className="contact-title" />
        <p className="contact-lede">
          Tell us about the product, the timeline and the screens it needs to live on. We reply within one working day.
        </p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="contact-email">
          {CONTACT_EMAIL}
        </a>
        <ul className="contact-social">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <form className="form" onSubmit={submit}>
        <label className="field">
          <input name="name" required placeholder=" " autoComplete="name" />
          <span>Name</span>
        </label>
        <label className="field">
          <input name="email" type="email" required placeholder=" " autoComplete="email" />
          <span>Email</span>
        </label>
        <label className="field field-tall">
          <textarea name="message" required placeholder=" " rows={5} />
          <span>Project details</span>
        </label>
        <button type="submit" className="send">
          <span className="send-label">Send it</span>
          <span className="send-arrow" aria-hidden="true">
            →
          </span>
        </button>
        <p className="form-note" aria-live="polite">
          {sent ? 'Your email app should open with the message ready to send.' : ''}
        </p>
      </form>
    </section>
  );
}
