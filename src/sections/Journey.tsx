import { SectionHeading } from '../components/SectionHeading';
import { journey, type JourneyItem } from '../content/journey';
import { useLang } from '../i18n/useLang';
import './Journey.css';

function Timeline({ title, items, id }: { title: string; items: JourneyItem[]; id: string }) {
  return (
    <div className="timeline-col">
      <h3 id={id} className="timeline-title reveal">
        {title}
      </h3>
      <ol className="timeline" role="list" aria-labelledby={id}>
        {items.map((item) => (
          <li key={`${item.org}-${item.period}`} className="timeline-item reveal">
            <p className="timeline-period mono">{item.period}</p>
            <h4 className="timeline-role">{item.title}</h4>
            <p className="timeline-org">
              {item.org}
              {item.place && <span> · {item.place}</span>}
            </p>
            {item.points && (
              <ul className="timeline-points">
                {item.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Journey({ index }: { index: number }) {
  const { lang, t } = useLang();
  const c = journey[lang];

  return (
    <section id="journey" data-anchor className="section section-alt" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeading index={index} id="journey-title" title={t.sections.journey} />
        <div className="journey-grid">
          <Timeline id="journey-education" title={t.journey.education} items={c.education} />
          <Timeline id="journey-experience" title={t.journey.experience} items={c.experience} />
        </div>
      </div>
    </section>
  );
}
