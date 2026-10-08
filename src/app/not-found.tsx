import Link from 'next/link';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="home-section contact" style={{ minHeight: '80vh', justifyContent: 'center', borderTop: 'none' }}>
        <div className="eyebrow" style={{ marginBottom: 32 }}>
          <span className="eyebrow-line" />
          MB-404 · Frame not found
          <span className="eyebrow-line" />
        </div>
        <h1 className="contact-title">
          LOST THE
          <br />
          SHOT<span className="accent">.</span>
        </h1>
        <Link href="/" className="contact-email">
          Back to the start
        </Link>
      </main>
      <Footer />
    </>
  );
}
