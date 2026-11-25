import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="section notfound">
      <p className="eyebrow">
        <span className="eyebrow-num">(404)</span> Frame not found
      </p>
      <h1 className="section-title">
        Lost the shot<span className="accent">.</span>
      </h1>
      <Link href="/" className="more-link">
        Back to the start <span aria-hidden="true">&gt;&gt;</span>
      </Link>
    </main>
  );
}
