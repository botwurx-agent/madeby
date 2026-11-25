import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Inter_Tight } from 'next/font/google';
import type { ReactNode } from 'react';
import { CursorLabel } from '../components/CursorLabel';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL, SOCIAL_LINKS } from '../data/site';
import '../styles/global.css';

const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'commercial production company',
    'food and beverage commercials',
    'food commercial production',
    'beverage commercial production',
    'tabletop production',
    'food videography',
    'Los Angeles production company',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: '/',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  sameAs: SOCIAL_LINKS.map((l) => l.href),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Nav />
        <div id="main">{children}</div>
        <Footer />
        <CursorLabel />
      </body>
    </html>
  );
}
