# Portfolio — Jennifer Ouedraogo · Data Science & Machine Learning

Portfolio professionnel bilingue (français / anglais) présentant mon profil, mes compétences et mes projets de Data Science, Machine Learning, Deep Learning et IA sous forme d'études de cas.

- **Français** (par défaut) : `/` · études de cas : `/projets/<projet>`
- **Anglais** : `/en/` · études de cas : `/en/projects/<projet>`

## Technologies

| Outil | Rôle |
| --- | --- |
| React 19 + TypeScript | Interface en composants, contenu typé (une traduction manquante bloque la compilation) |
| Vite | Développement local et build optimisé |
| React Router | Navigation entre l'accueil et les études de cas, langue portée par l'URL |
| Pré-rendu statique (`scripts/prerender.mjs`) | Une page HTML complète par route : pas de 404 au rafraîchissement sur GitHub Pages, contenu lisible par les moteurs de recherche et les aperçus de partage |
| Fontsource | Polices auto-hébergées (Fraunces, IBM Plex Sans, IBM Plex Mono), sans appel à un service tiers |
| GitHub Actions | Build et déploiement automatiques sur GitHub Pages |

Aucun backend, aucune clé d'API, aucun service payant.

## Prérequis

- [Node.js](https://nodejs.org/) 20 ou plus récent (testé avec Node 24)
- npm (installé avec Node.js)

## Installation et développement local

```bash
npm install        # installe les dépendances
npm run dev        # lance le site sur http://localhost:5173
```

## Build de production

```bash
npm run build      # vérifie les types, construit le site et pré-génère les pages dans dist/
npm run preview    # sert le contenu de dist/ localement
```

Pour simuler un dépôt de projet (ex. publication sous `/portfolio/`) :

```bash
# macOS / Linux
BASE_PATH=/portfolio/ npm run build

# Windows (Git Bash) — empêche la conversion automatique du chemin
MSYS_NO_PATHCONV=1 BASE_PATH=/portfolio/ npm run build

# Windows (PowerShell)
$env:BASE_PATH="/portfolio/"; npm run build
```

En production, `BASE_PATH` et `SITE_URL` sont fournis automatiquement par le workflow GitHub Actions.

## Publier sur GitHub Pages

1. **Créer un dépôt** sur GitHub :
   - nommé `<votre-identifiant>.github.io` → site publié sur `https://<votre-identifiant>.github.io/` ;
   - ou avec un autre nom (ex. `portfolio`) → site publié sur `https://<votre-identifiant>.github.io/portfolio/`.

   Le chemin de base est détecté automatiquement dans les deux cas.
2. **Envoyer le code** (depuis ce dossier) :
   ```bash
   git init -b main          # si ce n'est pas déjà fait
   git add .
   git commit -m "Portfolio initial"
   git remote add origin https://github.com/<votre-identifiant>/<nom-du-depot>.git
   git push -u origin main
   ```
3. **Activer GitHub Pages** : dans le dépôt, *Settings → Pages → Build and deployment → Source* : choisir **GitHub Actions**.
4. **Suivre le déploiement** dans l'onglet *Actions* (workflow « Déploiement GitHub Pages »). Une fois terminé, l'adresse du site s'affiche dans le résumé du workflow et dans *Settings → Pages*.

Chaque `git push` sur `main` redéploie ensuite le site automatiquement.

## Structure du projet

```
├── .github/workflows/deploy.yml   Build + déploiement GitHub Pages
├── index.html                     Gabarit HTML (thème appliqué avant affichage)
├── public/                        Fichiers copiés tels quels
│   ├── cv/CV_Jennifer_OUEDRAOGO_Data_Science.pdf
│   ├── img/                       Portrait optimisé (WebP/JPEG) et image de partage
│   └── favicon.svg
├── scripts/
│   ├── prerender.mjs              Pré-génération HTML + SEO, sitemap, robots.txt
│   └── optimize-images.mjs        Génère public/img et public/cv depuis les fichiers sources
└── src/
    ├── content/                   ← CONTENU DU SITE (à modifier ici)
    │   ├── profile.ts             Identité, coordonnées, accroche, « À propos »
    │   ├── journey.ts             Formation et expérience
    │   ├── skills.ts              Compétences et projets associés
    │   ├── charts.ts              Données du graphique MNIST
    │   └── projects/              Une étude de cas par fichier (FR + EN)
    ├── i18n/
    │   ├── ui.ts                  Textes d'interface FR/EN (navigation, boutons, SEO…)
    │   ├── routes.ts              Routes par langue et chemins des ressources
    │   └── useLang.ts             Langue courante (déduite de l'URL)
    ├── components/                Header, Footer, cartes de projets, graphique, icônes…
    ├── sections/                  Sections de l'accueil (Hero, À propos, Projets, Compétences, Parcours, Contact)
    ├── pages/                     Accueil, étude de cas, page introuvable
    ├── hooks/ · lib/              Animations, métadonnées, stockage local
    └── styles/                    Variables de design (clair/sombre) et styles globaux
```

## Modifier le contenu

- **Ajouter mon GitHub** : renseigner `github` dans `src/content/profile.ts` ; le lien apparaît automatiquement dans l'accueil, le contact et le pied de page.
- **Ajouter un lien de dépôt ou de démo à un projet** : compléter `links` dans le fichier du projet (`src/content/projects/…`), par exemple :
  ```ts
  links: [{ label: { fr: 'Code source', en: 'Source code' }, url: 'https://github.com/…' }],
  ```
- **Ajouter un projet** : copier un fichier de `src/content/projects/`, l'adapter, puis l'ajouter à la liste de `src/content/projects/index.ts`.
- **Changer la photo** : remplacer `public/img/photo portfolio.png`, puis lancer `npm run images` (génère le portrait optimisé et l'image de partage).
- **Changer le CV** : déposer le nouveau PDF dans `public/cv/` et mettre à jour `cvFile` dans `src/content/profile.ts`.
- **Changer les couleurs** : toutes les couleurs sont des variables CSS dans `src/styles/tokens.css` (palette bordeaux / or doux, thèmes clair et sombre).

## Accessibilité et qualité

- Navigation complète au clavier, lien d'évitement, focus visible.
- Contrastes conformes WCAG AA dans les deux thèmes ; palette du graphique vérifiée pour les personnes daltoniennes, avec tableau de données alternatif.
- Respect de la préférence « réduire les animations ».
- Thème clair/sombre (préférence système par défaut, choix mémorisé).
- Langue mémorisée ; le changement de langue conserve la section consultée.
