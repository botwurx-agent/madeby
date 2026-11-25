import { SplitText } from './SplitText';

interface Props {
  num: string;
  label: string;
  title: string;
  children?: React.ReactNode;
}

/** "(01) Label" eyebrow, a big split-letter title, and optional right-hand copy. */
export function SectionHead({ num, label, title, children }: Props) {
  return (
    <header className="section-head">
      <p className="eyebrow">
        <span className="eyebrow-num">({num})</span> {label}
      </p>
      <div className="section-head-row">
        <SplitText text={title} className="section-title" />
        {children && <div className="section-head-aside">{children}</div>}
      </div>
    </header>
  );
}
