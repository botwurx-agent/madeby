import Link from 'next/link';

/** MADEBY: - the colon is the only orange on the page at rest. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`logo ${className}`} aria-label="MadeBy home">
      MADEBY<span className="logo-colon">:</span>
    </Link>
  );
}
