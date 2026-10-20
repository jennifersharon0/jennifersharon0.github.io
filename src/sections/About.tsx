import { SectionHeading } from '../components/SectionHeading';
import { about, profile } from '../content/profile';
import { useLang } from '../i18n/useLang';
import './About.css';

export function About({ index }: { index: number }) {
  const { lang, t } = useLang();
  const c = about[lang];

  return (
    <section id="about" data-anchor className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading index={index} id="about-title" title={t.sections.about} />

        <div className="about-grid">
          <div className="about-text">
            {c.paragraphs.map((p, i) => (
              <p key={i} className="reveal">
                {p}
              </p>
            ))}

            <h3 className="about-focus-title reveal">{t.about.focusTitle}</h3>
            <ul className="about-focus" role="list">
              {c.focus.map((f) => (
                <li key={f.title} className="reveal">
                  <span className="focus-title">{f.title}</span>
                  <span className="focus-text">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="about-facts card reveal" aria-labelledby="about-facts-title">
            <h3 id="about-facts-title" className="eyebrow">
              {t.about.factsTitle}
            </h3>
            <dl>
              <div>
                <dt>{t.about.location}</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>{t.about.languages}</dt>
                <dd>{c.languages}</dd>
              </div>
              <div>
                <dt>{t.about.softSkills}</dt>
                <dd>{c.softSkills}</dd>
              </div>
              <div>
                <dt>{t.about.engagement}</dt>
                <dd>{c.engagement}</dd>
              </div>
              <div>
                <dt>{t.about.interests}</dt>
                <dd>{c.interests}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
