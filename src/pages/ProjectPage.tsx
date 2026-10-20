import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { AccuracyDotPlot } from '../components/charts/AccuracyDotPlot';
import { Icon } from '../components/Icon';
import { projectMeta } from '../components/ProjectCard';
import { getProject, projects } from '../content/projects';
import type { ProjectContent } from '../content/types';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { homePath, projectPath } from '../i18n/routes';
import { useLang } from '../i18n/useLang';
import { NotFound } from './NotFound';
import './ProjectPage.css';

type SectionKey = 'problem' | 'contribution' | 'objectives' | 'data' | 'approach' | 'results' | 'challenges' | 'learnings' | 'limits' | 'skillsUsed';

/** Sections affichées, dans l'ordre, uniquement si le contenu existe. */
function availableSections(c: ProjectContent): SectionKey[] {
  const keys: [SectionKey, unknown][] = [
    ['problem', c.problem],
    ['contribution', c.contribution?.length],
    ['objectives', c.objectives?.length],
    ['data', c.data?.length],
    ['approach', c.approach?.length],
    ['results', c.results?.length],
    ['challenges', c.challenges?.length],
    ['learnings', c.learnings?.length],
    ['limits', c.limits?.length],
    ['skillsUsed', c.skills],
  ];
  return keys.filter(([, v]) => Boolean(v)).map(([k]) => k);
}

export function ProjectPage() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const project = getProject(slug);
  const c = project?.content[lang];

  useDocumentMeta(lang, c ? `${c.title} — ${t.meta.projectTitleSuffix}` : t.notFound.title, c?.summary ?? t.notFound.text);

  if (!project || !c) return <NotFound />;

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const sections = availableSections(c);

  return (
    <article className="case">
      <header className="case-hero">
        <div className="container">
          <Link className="case-back arrow-link" to={{ pathname: homePath(lang), hash: '#projects' }}>
            <Icon name="arrowLeft" />
            {t.project.back}
          </Link>
          <p className="eyebrow reveal">{c.category}</p>
          <h1 className="reveal">{c.title}</h1>
          <p className="case-summary reveal">{c.summary}</p>
          <p className="case-context mono reveal">{c.context}</p>
        </div>
      </header>

      <div className="container case-layout">
        <aside className="case-side">
          <nav className="case-toc" aria-label={t.project.overview}>
            <p className="eyebrow">{t.project.overview}</p>
            <ol role="list">
              {sections.map((key) => (
                <li key={key}>
                  <a href={`#${key}`}>{t.project[key]}</a>
                </li>
              ))}
            </ol>
          </nav>

          <dl className="case-meta">
            <div>
              <dt>{t.project.type}</dt>
              <dd>{projectMeta(project, t).join(' · ')}</dd>
            </div>
            <div>
              <dt>{t.project.stack}</dt>
              <dd>
                <ul className="case-stack" role="list">
                  {project.stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>{t.project.links}</dt>
              <dd>
                {project.links.length > 0 ? (
                  <ul role="list" className="case-links">
                    {project.links.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="arrow-link">
                          {l.label[lang]}
                          <Icon name="external" />
                          <span className="visually-hidden">{t.a11y.newTab}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="case-muted">{t.project.noLinks}</span>
                )}
              </dd>
            </div>
          </dl>
        </aside>

        <div className="case-body">
          {c.keyFigures && (
            <section aria-label={t.project.keyFigures}>
              <ul className="case-figures reveal" role="list">
                {c.keyFigures.map((f) => (
                  <li key={f.label}>
                    <span className="case-figure-value mono">{f.value}</span>
                    <span className="case-figure-label">{f.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {c.note && (
            <p className="case-note reveal">
              <strong>{t.project.note} — </strong>
              {c.note}
            </p>
          )}

          {sections.includes('problem') && (
            <CaseSection id="problem" title={t.project.problem}>
              <p className="case-lead">{c.problem}</p>
            </CaseSection>
          )}

          {sections.includes('contribution') && c.contribution && (
            <CaseSection id="contribution" title={t.project.contribution}>
              <BulletList items={c.contribution} className="case-contribution" />
            </CaseSection>
          )}

          {sections.includes('objectives') && (
            <CaseSection id="objectives" title={t.project.objectives}>
              <BulletList items={c.objectives} />
            </CaseSection>
          )}

          {sections.includes('data') && c.data && (
            <CaseSection id="data" title={t.project.data}>
              <BulletList items={c.data} />
            </CaseSection>
          )}

          {sections.includes('approach') && (
            <CaseSection id="approach" title={t.project.approach}>
              <ol className="case-steps" role="list">
                {c.approach.map((step) => (
                  <li key={step.title} className="case-step">
                    <h3>{step.title}</h3>
                    <BulletList items={step.points} />
                  </li>
                ))}
              </ol>
            </CaseSection>
          )}

          {sections.includes('results') && (
            <CaseSection id="results" title={t.project.results}>
              <BulletList items={c.results} className="case-results" />
              {project.chart === 'mnist-accuracy' && <AccuracyDotPlot />}
            </CaseSection>
          )}

          {sections.includes('challenges') && c.challenges && (
            <CaseSection id="challenges" title={t.project.challenges}>
              <ul className="case-challenges" role="list">
                {c.challenges.map((ch) => (
                  <li key={ch.problem} className="card">
                    <p>
                      <span className="case-tag mono">{t.project.challenge}</span>
                      {ch.problem}
                    </p>
                    <p>
                      <span className="case-tag mono is-solution">{t.project.solution}</span>
                      {ch.solution}
                    </p>
                  </li>
                ))}
              </ul>
            </CaseSection>
          )}

          {sections.includes('learnings') && c.learnings && (
            <CaseSection id="learnings" title={t.project.learnings}>
              <BulletList items={c.learnings} />
            </CaseSection>
          )}

          {sections.includes('limits') && c.limits && (
            <CaseSection id="limits" title={t.project.limits}>
              <BulletList items={c.limits} />
            </CaseSection>
          )}

          {sections.includes('skillsUsed') && (
            <CaseSection id="skillsUsed" title={t.project.skillsUsed}>
              <p className="case-skills">{c.skills}</p>
            </CaseSection>
          )}
        </div>
      </div>

      <nav className="container case-pager" aria-label={`${t.project.prev} / ${t.project.next}`}>
        <Link to={projectPath(lang, prev.slug)} className="case-pager-link">
          <span className="mono">
            <Icon name="arrowLeft" /> {t.project.prev}
          </span>
          <span className="case-pager-title">{prev.content[lang].title}</span>
        </Link>
        <Link to={projectPath(lang, next.slug)} className="case-pager-link is-next">
          <span className="mono">
            {t.project.next} <Icon name="arrowRight" />
          </span>
          <span className="case-pager-title">{next.content[lang].title}</span>
        </Link>
      </nav>
    </article>
  );
}

function CaseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} data-anchor className="case-section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="reveal">
        {title}
      </h2>
      <div className="reveal">{children}</div>
    </section>
  );
}

function BulletList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`case-list ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
