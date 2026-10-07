import { SOCIAL_LINKS } from '../data/site';

export function Footer({ className = '' }: { className?: string }) {
  return (
    <footer className={`footer ${className}`.trim()}>
      <span className="footer-logo">MADEBY</span>
      <div className="footer-links">
        {SOCIAL_LINKS.map(({ label, href }) => (
          <a key={label} href={href} className="footer-link">
            {label}
          </a>
        ))}
      </div>
      <span className="footer-legal">©2026 MADEBY STUDIO — ALL RIGHTS RESERVED</span>
    </footer>
  );
}
