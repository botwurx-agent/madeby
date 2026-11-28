import type { Metadata } from 'next';
import AboutPage from '../../views/AboutPage';

export const metadata: Metadata = {
  title: 'About us',
  description: 'The people behind MadeBy: how we met, how we work, and the crew you get on set.',
  alternates: { canonical: '/about' },
  openGraph: { url: '/about' },
};

export default function Page() {
  return <AboutPage />;
}
