import type { Metadata } from 'next';
import About from '../../views/About';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the team behind MadeBy — co-founders Steve Nazari and Fred Kim, and gaffer Greg Lozano — and the story of how the studio started.',
  alternates: { canonical: '/about' },
  openGraph: { url: '/about' },
};

export default function AboutPage() {
  return <About />;
}
