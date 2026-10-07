import type { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Width of every <Rule /> inside, in px (default 36). */
  lineWidth?: number;
  className?: string;
  style?: CSSProperties;
}

/** Small accent-coloured section label, e.g. `F-002 —— About`. Use <Rule /> for the lines. */
export function Eyebrow({ children, lineWidth, className = '', style }: Props) {
  const lineStyle = lineWidth ? ({ '--line-w': `${lineWidth}px` } as CSSProperties) : undefined;
  return (
    <div className={`eyebrow ${className}`.trim()} style={{ ...lineStyle, ...style }}>
      {children}
    </div>
  );
}

export function Rule() {
  return <span className="eyebrow-line" />;
}
