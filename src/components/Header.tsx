import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { profile } from '../content/profile';
import { asset, homePath, SECTION_IDS } from '../i18n/routes';
import { useLang } from '../i18n/useLang';
import { Icon } from './Icon';
import { LangSwitch } from './LangSwitch';
import { ThemeToggle } from './ThemeToggle';
import './Header.css';

export function Header() {
  const { lang, t } = useLang();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ferme le menu mobile à chaque navigation
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container header-inner">
        <Link to={homePath(lang)} className="brand" aria-label={`${profile.firstName} ${profile.lastName} — ${t.a11y.home}`}>
          <span className="brand-mark" aria-hidden="true">
            JO
          </span>
          <span className="brand-text">
            <span className="brand-name">
              {profile.firstName} {profile.lastName}
            </span>
            <span className="brand-role mono">Big Data & AI</span>
          </span>
        </Link>

        <nav id="main-nav" className="main-nav" aria-label={t.a11y.mainNav}>
          <ul role="list">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <Link to={{ pathname: homePath(lang), hash: `#${id}` }}>{t.nav[id]}</Link>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary nav-cv-mobile" href={asset(profile.cvFile)} download>
            <Icon name="download" />
            {t.hero.downloadCv}
          </a>
        </nav>

        <div className="header-actions">
          <LangSwitch />
          <ThemeToggle />
          <a className="btn btn-ghost header-cv" href={asset(profile.cvFile)} download>
            <Icon name="download" />
            {t.nav.cv}
          </a>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
