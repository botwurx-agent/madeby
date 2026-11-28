'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { prefersReducedMotion } from './hooks';

const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
const OPEN_MS = 760;
const CLOSE_MS = 560;

/** Open overlays, innermost last. Only the top one answers Escape. */
const stack: number[] = [];
let nextId = 1;

function lockScroll() {
  if (stack.length !== 1) return;
  const gap = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${gap}px`;
  document.documentElement.style.setProperty('--scrollbar-gap', `${gap}px`);
}

function unlockScroll() {
  if (stack.length !== 0) return;
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.documentElement.style.setProperty('--scrollbar-gap', '0px');
}

/** clip-path inset() that crops `panel` down to `origin`'s box. */
function insetFrom(origin: DOMRect, panel: DOMRect, radius: number) {
  const t = Math.max(0, origin.top - panel.top);
  const r = Math.max(0, panel.right - origin.right);
  const b = Math.max(0, panel.bottom - origin.bottom);
  const l = Math.max(0, origin.left - panel.left);
  return `inset(${t}px ${r}px ${b}px ${l}px round ${radius}px)`;
}

/** A thin centred band - where a panel shrinks to when its trigger is off-screen. */
function centreBand(panel: DOMRect) {
  const v = panel.height / 2 - 1;
  return `inset(${v}px 0px ${v}px 0px round 0px)`;
}

const onScreen = (r: DOMRect) => r.bottom > 0 && r.top < window.innerHeight && r.width > 0;

interface Props {
  /** Accessible name for the dialog. */
  label: string;
  /** The element that opened it: the panel opens out of (and closes back into) its box. */
  origin: HTMLElement | null;
  onClose: () => void;
  /** Extra class on the panel, which sizes and lays it out. */
  className?: string;
  children: (close: () => void) => ReactNode;
}

/**
 * Darkened modal whose panel opens like a shutter out of the element that was
 * clicked, and folds back into it on close.
 */
export function Overlay({ label, origin, onClose, className = '', children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [id] = useState(() => nextId++);
  const [phase, setPhase] = useState<'open' | 'closing'>('open');
  const closing = useRef(false);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setPhase('closing');
    const panel = panelRef.current;
    const finish = () => onClose();
    if (!panel || prefersReducedMotion()) {
      setTimeout(finish, prefersReducedMotion() ? 200 : 0);
      return;
    }
    const p = panel.getBoundingClientRect();
    const o = origin?.getBoundingClientRect();
    const to = o && onScreen(o) ? insetFrom(o, p, 2) : centreBand(p);
    const anim = panel.animate([{ clipPath: 'inset(0px 0px 0px 0px round 14px)' }, { clipPath: to }], {
      duration: CLOSE_MS,
      easing: EASE,
      fill: 'forwards',
    });
    anim.onfinish = finish;
  }, [origin, onClose]);

  // Open: crop the laid-out panel down to the trigger, then let it go.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion()) return;
    const p = panel.getBoundingClientRect();
    const o = origin?.getBoundingClientRect();
    const from = o && onScreen(o) ? insetFrom(o, p, 2) : centreBand(p);
    panel.animate([{ clipPath: from }, { clipPath: 'inset(0px 0px 0px 0px round 14px)' }], {
      duration: OPEN_MS,
      easing: EASE,
      fill: 'backwards',
    });
  }, [origin]);

  useEffect(() => {
    stack.push(id);
    lockScroll();
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (stack[stack.length - 1] !== id) return;
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const all = [closeRef.current!, ...Array.from(focusables)];
        const first = all[0];
        const last = all[all.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      stack.splice(stack.indexOf(id), 1);
      unlockScroll();
      previous?.focus({ preventScroll: true });
    };
  }, [id, close]);

  return createPortal(
    <div className={`overlay is-${phase}`} role="dialog" aria-modal="true" aria-label={label}>
      <div className="overlay-backdrop" onClick={close} />
      <button ref={closeRef} type="button" className="overlay-close" onClick={close} aria-label="Close">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <div ref={panelRef} className={`overlay-panel ${className}`}>
        {children(close)}
      </div>
    </div>,
    document.body,
  );
}

/** State for "which item is open, and which element opened it". */
export function useOverlay<T>() {
  const [state, setState] = useState<{ item: T; origin: HTMLElement | null } | null>(null);
  const open = useCallback((item: T, origin: HTMLElement | null) => setState({ item, origin }), []);
  const close = useCallback(() => setState(null), []);
  return { item: state?.item ?? null, origin: state?.origin ?? null, open, close };
}
