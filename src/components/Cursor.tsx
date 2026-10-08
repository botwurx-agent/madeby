'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

type Mode = 'default' | 'hovering' | 'view' | 'member';

/**
 * Custom ring cursor. Its state comes from the element under the pointer:
 * - `[data-cursor-member]` (+ `data-cursor-color`) → large ring with initials
 * - `[data-cursor="view"]`                          → large accent ring
 * - `button`, `a`, `[data-hover]`                   → medium accent ring
 */
export function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('default');
  const [member, setMember] = useState<{ id: string; color: string } | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!el.current) return;
      el.current.style.left = `${e.clientX}px`;
      el.current.style.top = `${e.clientY}px`;
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const memberEl = target.closest<HTMLElement>('[data-cursor-member]');
      if (memberEl) {
        setMode('member');
        setMember({
          id: memberEl.dataset.cursorMember ?? '',
          color: memberEl.dataset.cursorColor ?? 'var(--text)',
        });
        return;
      }
      setMember(null);
      if (target.closest('[data-cursor="view"]')) setMode('view');
      else if (target.closest('button,a,[data-hover]')) setMode('hovering');
      else setMode('default');
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div
      ref={el}
      className={`mb-cursor${mode === 'default' ? '' : ` ${mode}`}`}
      style={member ? ({ '--member-color': member.color } as CSSProperties) : undefined}
      aria-hidden="true"
    >
      <div className="mb-cursor-ring">
        {member && <span className="mb-cursor-label">{member.id}</span>}
      </div>
    </div>
  );
}
