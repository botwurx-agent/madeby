import type { Project } from '../../data/projects';
import { RGB_COLORS } from '../../data/site';
import { useModal } from '../../hooks/useScrollLock';

/** Clean full-screen player. Shows a placeholder until the project has a `video`. */
export function VideoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useModal(true, onClose);

  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label={`${project.title} — ${project.client}`} onClick={onClose}>
      <div className="video-modal-bar" onClick={(e) => e.stopPropagation()}>
        <div>
          <span className="video-modal-meta">
            {project.id} · {project.category} · {project.year}
          </span>
          <div className="video-modal-title">
            {project.title} <span>— {project.client}</span>
          </div>
        </div>
        <button type="button" className="ghost-btn" onClick={onClose} autoFocus>
          ✕ Close
        </button>
      </div>

      <div className="video-modal-stage">
        <div className="video-frame" onClick={(e) => e.stopPropagation()}>
          <div className="video-frame-rgb" aria-hidden="true">
            {RGB_COLORS.map((c) => (
              <div key={c} style={{ background: c, boxShadow: `0 0 10px ${c}55` }} />
            ))}
          </div>

          {project.video ? (
            <video src={project.video} poster={project.img} controls autoPlay playsInline />
          ) : (
            <div className="video-play">
              <div className="play-ring">
                <div className="play-tri" />
              </div>
              <div className="video-play-hint">VIDEO COMING SOON</div>
            </div>
          )}

          <div className="video-timecode">MB-{project.id} · 24FPS · 4K</div>
        </div>
      </div>
    </div>
  );
}
