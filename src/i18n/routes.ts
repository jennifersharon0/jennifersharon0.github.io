/**
 * Routes du site. La langue fait partie de l'URL, ce qui rend chaque page
 * partageable directement dans la bonne langue :
 *
 *   FR (par défaut)   /                 /projets/:slug
 *   EN                /en/              /en/projects/:slug
 *
 * Les ancres de section (#about, #projects…) sont identiques dans les deux langues,
 * ce qui permet de conserver la section consultée lors d'un changement de langue.
 */
export type Lang = 'fr' | 'en';

export const LANGS: Lang[] = ['fr', 'en'];

export const SECTION_IDS = ['about', 'projects', 'skills', 'journey', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function homePath(lang: Lang): string {
  return lang === 'fr' ? '/' : '/en/';
}

export function projectPath(lang: Lang, slug: string): string {
  return lang === 'fr' ? `/projets/${slug}` : `/en/projects/${slug}`;
}

/** Déduit la langue d'un chemin (relatif à la base de l'application). */
export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';
}

/** Chemin équivalent dans l'autre langue (accueil ou page projet). */
export function translatePath(pathname: string, target: Lang): string {
  const match = pathname.match(/^\/(?:en\/projects|projets)\/([^/]+)\/?$/);
  if (match) return projectPath(target, match[1]);
  return homePath(target);
}

/** Toutes les routes à pré-générer en HTML statique. */
export function allRoutes(slugs: string[]): { path: string; lang: Lang; slug?: string }[] {
  return LANGS.flatMap((lang) => [
    { path: homePath(lang), lang },
    ...slugs.map((slug) => ({ path: projectPath(lang, slug), lang, slug })),
  ]);
}

/** Préfixe un chemin de ressource publique (image, CV) avec la base GitHub Pages. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
