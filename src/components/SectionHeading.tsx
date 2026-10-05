import type { ReactNode } from 'react';

/** Titre de section numéroté (« 01 — À propos »). */
export function SectionHeading({ index, title, intro, id }: { index: number; title: string; intro?: ReactNode; id: string }) {
  return (
    <header className="section-heading reveal">
      <p className="section-index mono" aria-hidden="true">
        {String(index).padStart(2, '0')}
        <span className="section-rule" />
      </p>
      <h2 id={id}>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}
