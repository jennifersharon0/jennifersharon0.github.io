/**
 * Point d'entrée de pré-rendu (utilisé uniquement au build par scripts/prerender.mjs).
 * Produit le HTML statique de chaque route.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { projects } from './content/projects';
import { allRoutes } from './i18n/routes';
import { UI } from './i18n/ui';

export function render(url: string): string {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
  return renderToString(
    <StrictMode>
      <StaticRouter basename={basename} location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

/** Routes à générer, avec les métadonnées SEO propres à chacune. */
export function routes() {
  return allRoutes(projects.map((p) => p.slug)).map((route) => {
    const t = UI[route.lang];
    const project = route.slug ? projects.find((p) => p.slug === route.slug) : undefined;
    const content = project?.content[route.lang];
    return {
      ...route,
      title: content ? `${content.title} — ${t.meta.projectTitleSuffix}` : t.meta.homeTitle,
      description: content ? content.summary : t.meta.homeDescription,
      locale: t.meta.locale,
      siteName: t.meta.siteName,
    };
  });
}
