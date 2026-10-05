import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { SocialLinks } from '../components/SocialLinks';
import { hero, profile } from '../content/profile';
import { asset, homePath, projectPath } from '../i18n/routes';
import { useLang } from '../i18n/useLang';
import './Hero.css';

export function Hero() {
  const { lang, t } = useLang();
  const c = hero[lang];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="availability reveal">
            <span className="availability-dot" aria-hidden="true" />
            {t.hero.availability}
          </p>

          <h1 id="hero-title" className="hero-name reveal">
            {profile.firstName} <span>{profile.lastName}</span>
          </h1>

          <p className="hero-domain mono reveal">
            <span aria-hidden="true">›_ </span>
            {c.domain}
          </p>
          <p className="hero-role reveal">{c.role}</p>

          <p className="hero-headline reveal">{c.headline}</p>
          <p className="hero-lead reveal">{c.lead}</p>

          <div className="hero-actions reveal">
            <Link className="btn btn-primary" to={{ pathname: homePath(lang), hash: '#projects' }}>
              {t.hero.seeProjects}
              <Icon name="arrowRight" />
            </Link>
            <a className="btn btn-ghost" href={asset(profile.cvFile)} download>
              <Icon name="download" />
              {t.hero.downloadCv}
            </a>
            <div className="hero-social">
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="hero-visual reveal">
          <div className="dot-field" aria-hidden="true" />
          <picture>
            <source type="image/webp" srcSet={`${asset('img/portrait-480.webp')} 480w, ${asset('img/portrait-800.webp')} 800w`} sizes="(max-width: 860px) 70vw, 400px" />
            <img
              className="portrait"
              src={asset('img/portrait-800.jpg')}
              srcSet={`${asset('img/portrait-480.jpg')} 480w, ${asset('img/portrait-800.jpg')} 800w`}
              sizes="(max-width: 860px) 70vw, 400px"
              width={800}
              height={1000}
              alt={t.a11y.portraitAlt}
              fetchPriority="high"
            />
          </picture>
        </div>
      </div>

      <div className="container">
        <ul className="hero-facts reveal" role="list" aria-label={t.hero.factsLabel}>
          {c.facts.map((fact) => (
            <li key={fact.slug}>
              <Link to={projectPath(lang, fact.slug)} className="fact">
                <span className="fact-value mono">{fact.value}</span>
                <span className="fact-label">{fact.label}</span>
                <Icon name="arrowRight" className="fact-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
