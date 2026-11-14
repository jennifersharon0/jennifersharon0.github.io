import type { ProjectFigure as Figure } from '../content/types';
import { asset } from '../i18n/routes';
import { useLang } from '../i18n/useLang';
import { Icon } from './Icon';

/** Largeurs générées par scripts/optimize-images.mjs. */
const WIDTHS = [800, 1600];

export function ProjectFigure({ slug, figure }: { slug: string; figure: Figure }) {
  const { lang, t } = useLang();
  const src = (w: number, ext: string) => asset(`img/projets/${slug}/${figure.name}-${w}.${ext}`);
  const srcSet = (ext: string) => WIDTHS.map((w) => `${src(w, ext)} ${w}w`).join(', ');
  const sizes = '(max-width: 860px) calc(100vw - 32px), 760px';
  const full = src(1600, 'jpg');

  return (
    <figure className="case-shot">
      <a href={full} target="_blank" rel="noopener" className="case-shot-link">
        <picture>
          <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
          <img
            src={src(800, 'jpg')}
            srcSet={srcSet('jpg')}
            sizes={sizes}
            width={figure.width}
            height={figure.height}
            alt={figure.alt[lang]}
            loading="lazy"
            decoding="async"
          />
        </picture>
        <span className="case-shot-zoom mono">
          <Icon name="external" />
          {t.project.enlarge}
          <span className="visually-hidden">{t.a11y.newTab}</span>
        </span>
      </a>
      <figcaption>{figure.caption[lang]}</figcaption>
    </figure>
  );
}
