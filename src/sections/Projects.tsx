import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { projects } from '../content/projects';
import { useLang } from '../i18n/useLang';
import './Projects.css';

export function Projects({ index }: { index: number }) {
  const { t } = useLang();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" data-anchor className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading index={index} id="projects-title" title={t.sections.projects} intro={t.projects.intro} />

        <h3 className="projects-subtitle mono reveal">{t.projects.featured}</h3>
        <div className="projects-grid">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        {others.length > 0 && (
          <>
            <h3 className="projects-subtitle mono reveal">{t.projects.others}</h3>
            <div className="projects-grid">
              {others.map((p) => (
                <ProjectCard key={p.slug} project={p} variant="compact" />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
