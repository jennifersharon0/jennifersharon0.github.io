/**
 * Pré-rendu statique : génère un fichier HTML complet pour chaque route
 * (accueil FR/EN et chaque étude de cas FR/EN), avec ses propres balises SEO.
 *
 * Avantages sur GitHub Pages :
 *  - aucune erreur 404 lors d'un rafraîchissement ou d'un lien direct ;
 *  - contenu lisible par les moteurs de recherche et les aperçus de partage ;
 *  - affichage immédiat, avant même le chargement du JavaScript.
 *
 * Variables d'environnement (fournies par le workflow GitHub Actions) :
 *  - BASE_PATH : chemin de base (ex. "/portfolio/") ;
 *  - SITE_URL  : URL publique complète (ex. "https://utilisateur.github.io/portfolio").
 *    Sans SITE_URL, les URL absolues (canonical, og:url, sitemap) sont omises.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = resolve('dist');
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');
const siteUrl = (process.env.SITE_URL ?? '').replace(/\/$/, '');

if (!base.startsWith('/')) {
  throw new Error(`BASE_PATH invalide (« ${base} ») : il doit commencer par « / ». Sous Git Bash, préfixer la commande par MSYS_NO_PATHCONV=1.`);
}

const { render, routes } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
const template = await readFile(join(DIST, 'index.html'), 'utf8');

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** URL publique d'un chemin applicatif ("/en/" → "https://…/en/"). */
const absolute = (path) => (siteUrl ? `${siteUrl}${path}` : null);
const assetUrl = (file) => (siteUrl ? `${siteUrl}/${file}` : `${base}${file}`);

const all = routes();

function alternates(route) {
  if (!siteUrl) return '';
  const siblings = all.filter((r) => r.slug === route.slug);
  const links = siblings.map((r) => `<link rel="alternate" hreflang="${r.lang}" href="${absolute(r.path)}" />`);
  const fr = siblings.find((r) => r.lang === 'fr');
  if (fr) links.push(`<link rel="alternate" hreflang="x-default" href="${absolute(fr.path)}" />`);
  return links.join('\n    ');
}

function head(route) {
  const url = absolute(route.path);
  return [
    `<title>${escape(route.title)}</title>`,
    `<meta name="description" content="${escape(route.description)}" />`,
    url && `<link rel="canonical" href="${url}" />`,
    alternates(route),
    `<meta property="og:type" content="${route.slug ? 'article' : 'profile'}" />`,
    `<meta property="og:site_name" content="${escape(route.siteName)}" />`,
    `<meta property="og:locale" content="${route.locale}" />`,
    `<meta property="og:title" content="${escape(route.title)}" />`,
    `<meta property="og:description" content="${escape(route.description)}" />`,
    url && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${assetUrl('img/og-image.jpg')}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]
    .filter(Boolean)
    .join('\n    ');
}

function page(route, appHtml) {
  return template
    .replace('<html lang="fr">', `<html lang="${route.lang}">`)
    .replace('<!--app-head-->', head(route))
    .replace('<!--app-html-->', appHtml);
}

for (const route of all) {
  const appHtml = render(`${base}${route.path.replace(/^\//, '')}`);
  if (!appHtml.includes('<main')) throw new Error(`Rendu vide pour ${route.path} : vérifier BASE_PATH.`);
  const html = page(route, appHtml);
  const file = join(DIST, route.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`  ✓ ${route.path}`);
}

// 404 : page vide rendue côté navigateur (la langue est déduite de l'URL demandée).
const fallback = { ...all[0], title: 'Page introuvable · Page not found — Jennifer Ouedraogo' };
await writeFile(join(DIST, '404.html'), page(fallback, '').replace('<link rel="canonical"', '<link rel="ignore"'));
console.log('  ✓ 404.html');

// Plan du site et robots.txt (seulement si l'URL publique est connue)
if (siteUrl) {
  const urls = all.map((r) => `  <url><loc>${absolute(r.path)}</loc></url>`).join('\n');
  await writeFile(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  await writeFile(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log('  ✓ sitemap.xml, robots.txt');
}

// GitHub Pages : désactive le traitement Jekyll (dossiers commençant par « _ »)
await writeFile(join(DIST, '.nojekyll'), '');
await rm('dist-ssr', { recursive: true, force: true });
console.log(`Pré-rendu terminé : ${all.length} pages (base « ${base} »).`);
