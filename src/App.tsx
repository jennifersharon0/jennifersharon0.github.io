// Styles globaux importés en premier : les styles des composants (chargés ensuite) peuvent ainsi les surcharger.
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';
import './styles/pages.css';

import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ScrollManager } from './components/ScrollManager';
import { useReveal } from './hooks/useReveal';
import { useLang } from './i18n/useLang';
import { storage } from './lib/storage';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ProjectPage } from './pages/ProjectPage';

/**
 * Langue mémorisée : un visiteur ayant choisi l'anglais et revenant sur l'accueil
 * français (sans ancre) est redirigé vers /en/. Les liens directs restent prioritaires
 * pour toutes les autres pages.
 */
function useRememberedLanguage() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === '/' && !hash && storage.get('lang') === 'en') navigate('/en/', { replace: true });
    // Uniquement à l'arrivée sur le site.
  }, []);
}

export function App() {
  const { t } = useLang();
  const { pathname } = useLocation();
  useReveal(pathname);
  useRememberedLanguage();

  return (
    <>
      <a className="skip-link" href="#main">
        {t.a11y.skipToContent}
      </a>
      <ScrollManager />
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/en" element={<Home />} />
          <Route path="/projets/:slug" element={<ProjectPage />} />
          <Route path="/en/projects/:slug" element={<ProjectPage />} />
          <Route path="/en/*" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
