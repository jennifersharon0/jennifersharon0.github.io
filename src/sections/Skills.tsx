import { Fragment } from 'react';
import { Link } from 'react-router';
import { SectionHeading } from '../components/SectionHeading';
import { getProject } from '../content/projects';
import { skillGroups, skillNameEn } from '../content/skills';
import { projectPath } from '../i18n/routes';
import { useLang } from '../i18n/useLang';
import './Skills.css';

export function Skills({ index }: { index: number }) {
  const { lang, t } = useLang();

  return (
    <section id="skills" data-anchor className="section section-alt" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading index={index} id="skills-title" title={t.sections.skills} intro={t.skills.intro} />

        <ul className="skills-legend reveal" role="list">
          <li>
            <span className="legend-mark is-used" aria-hidden="true" />
            {t.skills.legendUsed}
          </li>
          <li>
            <span className="legend-mark is-listed" aria-hidden="true" />
            {t.skills.legendListed}
          </li>
        </ul>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article key={group.id} className="skill-group card reveal" aria-labelledby={`skills-${group.id}`}>
              <h3 id={`skills-${group.id}`}>{group.title[lang]}</h3>
              <ul role="list">
                {group.skills.map((skill) => {
                  const used = (skill.projects ?? []).map(getProject).filter((p) => p !== undefined);
                  const name = lang === 'en' ? (skillNameEn[skill.name] ?? skill.name) : skill.name;
                  return (
                    <li key={skill.name} className={used.length ? 'is-used' : 'is-listed'}>
                      <span className="skill-name">
                        <span className="legend-mark" aria-hidden="true" />
                        {name}
                        {used.length === 0 && <span className="visually-hidden"> ({t.skills.legendListed})</span>}
                      </span>
                      {skill.note && <span className="skill-note">{skill.note[lang]}</span>}
                      {used.length > 0 && (
                        <span className="skill-projects">
                          <span className="visually-hidden">{t.skills.usedIn}{lang === 'fr' ? ' : ' : ': '}</span>
                          {used.map((p, i) => (
                            <Fragment key={p.slug}>
                              {i > 0 && <span aria-hidden="true"> · </span>}
                              <Link to={projectPath(lang, p.slug)}>{p.content[lang].shortTitle}</Link>
                            </Fragment>
                          ))}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
