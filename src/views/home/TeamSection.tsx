'use client';

import { useRef } from 'react';
import { Media } from '../../components/Media';
import { SectionHead } from '../../components/SectionHead';
import { Viewer } from '../../components/Viewer';
import { WorkTile } from '../../components/WorkTile';
import { TEAM, type TeamMember } from '../../data/team';
import { WORK, type WorkSample } from '../../data/work';
import { useInView } from '../../lib/hooks';
import { Overlay, useOverlay } from '../../lib/Overlay';

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('');

function Portrait({ member, sizes }: { member: TeamMember; sizes: string }) {
  return (
    <span className="portrait">
      <Media source={member.portrait ?? {}} label={initials(member.name)} sizes={sizes} playing />
    </span>
  );
}

/** 1C (expanded) — profile with role, bio and a strip of their work. */
function Profile({ member, origin, onClose }: { member: TeamMember; origin: HTMLElement | null; onClose: () => void }) {
  const samples = member.work.map((id) => WORK.find((w) => w.id === id)).filter(Boolean) as WorkSample[];
  const viewer = useOverlay<number>();
  const stripRef = useRef<HTMLDivElement>(null);
  const scrollStrip = () => {
    const s = stripRef.current;
    if (!s) return;
    const atEnd = s.scrollLeft + s.clientWidth >= s.scrollWidth - 4;
    s.scrollTo({ left: atEnd ? 0 : s.scrollLeft + s.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <Overlay label={`${member.name} — profile`} origin={origin} onClose={onClose} className="profile">
      {() => (
        <>
          <div className="profile-head">
            <Portrait member={member} sizes="240px" />
            <div className="profile-id ov-in">
              <h3 className="profile-name">{member.name}</h3>
              <p className="profile-title">{member.title}</p>
              <ul className="profile-roles">
                {member.roles.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="profile-bio ov-in">{member.bio}</p>
          <div className="profile-work ov-in">
            <div className="profile-work-head">
              <span className="eyebrow">Samples</span>
              <button type="button" className="more-link" onClick={scrollStrip} aria-label="Scroll samples">
                <span aria-hidden="true">&gt;&gt;</span>
              </button>
            </div>
            <div ref={stripRef} className="strip">
              {samples.map((w, i) => (
                <WorkTile
                  key={w.id}
                  sample={w}
                  index={i}
                  compact
                  sizes="220px"
                  onOpen={(el) => viewer.open(i, el)}
                />
              ))}
            </div>
          </div>
          {viewer.item !== null && (
            <Viewer list={samples} start={viewer.item} origin={viewer.origin} onClose={viewer.close} />
          )}
        </>
      )}
    </Overlay>
  );
}

/** 1C — the crew, one row each. Click a row to open the profile. */
export function TeamSection() {
  const profile = useOverlay<TeamMember>();
  const [listRef, seen] = useInView<HTMLUListElement>(0.15);

  return (
    <section id="about" className="section team">
      <SectionHead num="02" label="About us" title="The crew">
        <p>A small, senior team that stays with your project from the first board to the final file.</p>
      </SectionHead>

      <ul ref={listRef} className={`members${seen ? ' is-in' : ''}`}>
        {TEAM.map((m, i) => (
          <li key={m.id} style={{ ['--i' as string]: i }}>
            <button
              type="button"
              className="member"
              onClick={(e) => profile.open(m, e.currentTarget)}
              data-cursor="Profile"
            >
              <Portrait member={m} sizes="(max-width: 700px) 40vw, 30vw" />
              <span className="member-body">
                <span className="member-name">{m.name}</span>
                <span className="member-role">
                  {m.title} · {m.roles[0]}
                </span>
                <span className="member-short">{m.short}</span>
                <span className="member-cta">
                  Profile <span aria-hidden="true">&gt;&gt;</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {profile.item && <Profile member={profile.item} origin={profile.origin} onClose={profile.close} />}
    </section>
  );
}
