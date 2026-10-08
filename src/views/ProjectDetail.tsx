import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow, Rule } from '../components/Eyebrow';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { PROJECTS, titleCase, type Project } from '../data/projects';
import { SITE_NAME, SITE_URL } from '../data/site';

const TOTAL = String(PROJECTS.length).padStart(2, '0');

/** Full-page project view at /work/<slug>. Rendered on the server. */
export default function ProjectDetail({ project }: { project: Project }) {
  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': project.video ? 'VideoObject' : 'CreativeWork',
    name: `${titleCase(project.title)} — ${titleCase(project.client)}`,
    description: project.desc,
    dateCreated: project.year,
    genre: project.category,
    url: `${SITE_URL}/work/${project.slug}`,
    ...(project.img && { image: `${SITE_URL}${project.img.src}`, thumbnailUrl: `${SITE_URL}${project.img.src}` }),
    ...(project.video && { contentUrl: project.video, uploadDate: project.year }),
    creator: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    sourceOrganization: { '@type': 'Organization', name: SITE_NAME },
  };

  return (
    <div className="work-page project-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <main>
        <div className="detail-hero">
          {project.img ? (
            <Image
              src={project.img}
              alt={`${project.title} — ${project.client} ${project.category.toLowerCase()}`}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
            />
          ) : (
            <div className="ph borderless" style={{ height: '100%' }} />
          )}
          <Link href="/work" className="ghost-btn detail-close">
            ✕ Close
          </Link>
          <div className="detail-timecode">
            MB-{project.id} · {project.category} · {project.year}
          </div>
        </div>

        <article className="detail-body">
          <div className="detail-top">
            <div style={{ flex: 1 }}>
              <Eyebrow lineWidth={32}>
                {project.id} · {project.category}
                <Rule />
              </Eyebrow>
              <h1 className="detail-title">{project.title}</h1>
              <div className="detail-client">{project.client}</div>
            </div>

            <div className="detail-meta">
              <div className="detail-meta-block">
                <h2 className="detail-meta-label">Services</h2>
                <ul className="detail-services">
                  {project.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="detail-meta-block">
                <h2 className="detail-meta-label" style={{ marginBottom: 10 }}>
                  Year
                </h2>
                <div className="detail-year">{project.year}</div>
              </div>
            </div>
          </div>

          {project.video && (
            <div className="video-frame" style={{ marginBottom: 52 }}>
              <video src={project.video} poster={project.img?.src} controls playsInline preload="metadata" />
            </div>
          )}

          <div className="detail-desc">
            <p>{project.desc}</p>
          </div>

          <div className="detail-foot">
            <Link href="/work" className="detail-back">
              ← Back to Work
            </Link>
            <div className="detail-count">
              {project.id} / {TOTAL}
            </div>
            <Link href={`/work/${next.slug}`} className="detail-next">
              Next · <strong>{next.title}</strong> →
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
