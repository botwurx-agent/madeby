import { CONTACT_EMAIL, SOCIAL_LINKS } from '../data/site';
import { Logo } from './Logo';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link">
        {CONTACT_EMAIL}
      </a>
      <ul className="footer-social">
        {SOCIAL_LINKS.map((s) => (
          <li key={s.label}>
            <a href={s.href} className="footer-link" target="_blank" rel="noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="footer-copy">© {YEAR} MadeBy</p>
    </footer>
  );
}
