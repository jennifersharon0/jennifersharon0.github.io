import { Link } from 'react-router';
import type { Project } from '../content/types';
import { projectPath } from '../i18n/routes';
import { useLang } from '../i18n/useLang';
import { Icon } from './Icon';
import './ProjectCard.css';

const MAX_TAGS = 5;

export function projectMeta(project: Project, t: ReturnType<typeof useLang>['t']): string[] {
  return [
    project.kind === 'personal' ? t.projects.personal : t.projects.academic,
    project.year,
    project.teamSize === 1 ? t.projects.solo : project.teamSize ? t.projects.teamOf(project.teamSize) : undefined,
  ].filter((v): v is string => Boolean(v));
}

/** Carte de projet : toute la carte est cliquable (lien étiré sur le titre). */
export function ProjectCard({ project, variant = 'featured' }: { project: Project; variant?: 'featured' | 'compact' }) {
  const { lang, t } = useLang();
  const c = project.content[lang];
  const extra = project.stack.length - MAX_TAGS;

  return (
    <article className={`project-card card project-card--${variant} reveal`}>
      <p className="project-card-category eyebrow">{c.category}</p>
      <h3 className="project-card-title">
        <Link to={projectPath(lang, project.slug)} className="stretched-link">
          {c.title}
        </Link>
      </h3>
      <p className="project-card-meta mono">{projectMeta(project, t).join(' · ')}</p>
      <p className="project-card-summary">{c.summary}</p>

      {variant === 'featured' && c.cardResult && (
        <p className="project-card-result">
          <span className="mono">{t.projects.keyResult}</span>
          {c.cardResult}
        </p>
      )}

      <ul className="project-card-tags" role="list">
        {project.stack.slice(0, MAX_TAGS).map((tech) => (
          <li key={tech} className="chip">
            {tech}
          </li>
        ))}
        {extra > 0 && <li className="chip chip-more">+{extra}</li>}
      </ul>

      <span className="project-card-cta arrow-link" aria-hidden="true">
        {t.projects.readCase}
        <Icon name="arrowRight" />
      </span>
    </article>
  );
}
