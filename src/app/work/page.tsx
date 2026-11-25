import type { Metadata } from 'next';
import WorkPage from '../../views/WorkPage';

export const metadata: Metadata = {
  title: 'Work samples',
  description: 'Commercials, brand films, campaigns and social content for food and beverage brands.',
  alternates: { canonical: '/work' },
  openGraph: { url: '/work' },
};

export default function Page() {
  return <WorkPage />;
}
