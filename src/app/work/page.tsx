import type { Metadata } from 'next';
import Work from '../../views/Work';

export const metadata: Metadata = {
  title: 'The Work',
  description:
    'Selected commercials, brand films and campaigns for food and beverage brands including Del Taco and Hint Water.',
  alternates: { canonical: '/work' },
  openGraph: { url: '/work' },
};

export default function WorkPage() {
  return <Work />;
}
