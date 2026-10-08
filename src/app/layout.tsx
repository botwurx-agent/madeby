import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, DM_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { Cursor } from '../components/Cursor';
import { GrainCanvas } from '../components/GrainCanvas';
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL, SOCIAL_LINKS } from '../data/site';
import '../styles/global.css';
import '../styles/home.css';
import '../styles/work.css';
import '../styles/about.css';

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' });
const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
});

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
    'brand films',
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
  themeColor: '#0c0a08',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  sameAs: SOCIAL_LINKS.map((l) => l.href).filter((href) => href.startsWith('http')),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <GrainCanvas opacity={0.03} />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
