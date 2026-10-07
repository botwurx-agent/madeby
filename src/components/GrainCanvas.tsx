import { useEffect, useRef } from 'react';

const SIZE = 300;
const FRAME_MS = 42; // ~24fps

/** Animated film-grain noise laid over the whole page. */
export function GrainCanvas({ opacity = 0.03 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    canvas.width = SIZE;
    canvas.height = SIZE;

    let timer: number;
    const draw = () => {
      const img = ctx.createImageData(SIZE, SIZE);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 80 + 50) | 0; // soft mid-grey, not full range
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      timer = window.setTimeout(draw, FRAME_MS);
    };
    draw();
    return () => clearTimeout(timer);
  }, []);

  return <canvas ref={canvasRef} className="grain" style={{ opacity }} aria-hidden="true" />;
}
