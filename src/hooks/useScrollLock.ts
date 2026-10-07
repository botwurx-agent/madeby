import { useEffect } from 'react';

/** Locks page scroll while `active`, and closes on Escape. */
export function useModal(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, onClose]);
}
