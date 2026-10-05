/**
 * Informations personnelles — source : CV (Cv_PFE.pdf).
 * Les champs vides (ex. github) ne sont pas affichés : il suffit de les renseigner
 * pour qu'ils apparaissent automatiquement dans l'accueil, le contact et le pied de page.
 */
import type { Localized } from './types';

export const profile = {
  firstName: 'Jennifer',
  lastName: 'OUEDRAOGO',
  email: 'sharonoued@outlook.com',
  linkedin: 'https://www.linkedin.com/in/jennifer-laura-ouedraogo',
  linkedinLabel: 'linkedin.com/in/jennifer-laura-ouedraogo',
  /** Non renseigné dans le CV — ex. 'https://github.com/votre-identifiant' */
  github: 'github.com/jennifersharon0',
  cvFile: 'cv/Jennifer_Ouedraogo_CV.pdf',
  location: 'Maurepas, France',
};

export interface HeroContent {
  domain: string;
  role: string;
  headline: string;
  lead: string;
  facts: { value: string; label: string; slug: string }[];
}

export const hero: Localized<HeroContent> = {
  fr: {
    domain: 'Big Data & Artificial Intelligence',
    role: 'Élève ingénieure en Data Science & IA · CESI École d’Ingénieurs',
    headline: 'Des modèles qu’on peut vérifier, des résultats qu’on peut expliquer.',
    lead:
      "Je conçois des démarches de data science rigoureuses — sans fuite de données, avec des protocoles de comparaison équitables et une attention aux biais — et je vais jusqu'au produit : j'ai conçu et mis en ligne seule DataLearn, une plateforme d'apprentissage de la data science avec assistant IA.",
    facts: [
      { value: '0,982', label: 'accuracy d’un SVM sur les codes latents d’un VAE (MNIST)', slug: 'mnist-autoencoders' },
      { value: '≈ 0,82', label: 'ROC AUC — prédiction du diabète en PyTorch', slug: 'diabetes-deep-learning' },
      { value: '190', label: 'notions générées et contrôlées automatiquement — DataLearn', slug: 'datalearn' },
    ],
  },
  en: {
    domain: 'Big Data & Artificial Intelligence',
    role: 'Data Science & AI engineering student · CESI School of Engineering',
    headline: 'Models you can verify, results you can explain.',
    lead:
      'I build rigorous data science workflows — leak-free, with fair comparison protocols and attention to bias — and I take them all the way to a product: I designed and shipped DataLearn on my own, a data science learning platform with an AI assistant.',
    facts: [
      { value: '0.982', label: 'SVM accuracy on VAE latent codes (MNIST)', slug: 'mnist-autoencoders' },
      { value: '≈ 0.82', label: 'ROC AUC — diabetes prediction in PyTorch', slug: 'diabetes-deep-learning' },
      { value: '190', label: 'topics generated and automatically checked — DataLearn', slug: 'datalearn' },
    ],
  },
};

export interface AboutContent {
  paragraphs: string[];
  focus: { title: string; text: string }[];
  languages: string;
  certification: string;
  interests: string;
}

export const about: Localized<AboutContent> = {
  fr: {
    paragraphs: [
      "Mon parcours a commencé par deux années de classes préparatoires MPSI/MP à Ouagadougou, qui m'ont donné le goût de la modélisation et du raisonnement rigoureux. J'ai poursuivi par une première année de génie informatique à l'École Marocaine d'Ingénierie, à Rabat, avant de rejoindre le cycle ingénieur du CESI à Nanterre, en spécialisation Data Science & IA.",
      "Ce qui m'intéresse, c'est de partir d'une question concrète — pourquoi des employés quittent une entreprise, quels patients risquent de développer un diabète, comment organiser des tournées de livraison — pour construire une démarche mesurable, puis d'en expliquer les résultats à des personnes qui ne sont pas data scientists.",
      "En parallèle de mes cours, j'ai développé DataLearn de la conception à la mise en production. Ce projet m'a fait aborder ce que les projets scolaires traitent peu : l'architecture logicielle, la sécurité des données personnelles, les tests automatisés et le déploiement.",
    ],
    focus: [
      { title: 'Machine learning explicable', text: 'Importance des variables, analyse des biais, recommandations métier.' },
      { title: 'Deep learning & représentations', text: 'Réseaux denses, auto-encodeurs, réduction de dimension.' },
      { title: 'LLM appliqués', text: 'Génération de contenu contrôlée, assistant ancré dans un contexte.' },
      { title: 'Données en production', text: 'API, SQL, tests, suivi d’expériences et CI/CD.' },
    ],
    languages: 'Français (courant) · Anglais (B1)',
    certification: 'Power BI PL-300 (en préparation)',
    interests: 'Travaux manuels, jeux de réflexion, musique, voyage',
  },
  en: {
    paragraphs: [
      'I started with two years of MPSI/MP preparatory classes in Ouagadougou, which gave me a taste for mathematical modelling and rigorous reasoning. I then completed a first year of computer engineering at the École Marocaine d’Ingénierie in Rabat, before joining the engineering programme at CESI in Nanterre, majoring in Data Science & AI.',
      'What I enjoy is starting from a concrete question — why employees leave a company, which patients are at risk of developing diabetes, how to plan delivery routes — turning it into a measurable approach, and then explaining the results to people who are not data scientists.',
      'Alongside my studies, I built DataLearn from design to production. It took me into areas that school projects rarely cover: software architecture, personal data security, automated testing and deployment.',
    ],
    focus: [
      { title: 'Explainable machine learning', text: 'Feature importance, bias analysis, business recommendations.' },
      { title: 'Deep learning & representations', text: 'Dense networks, autoencoders, dimensionality reduction.' },
      { title: 'Applied LLMs', text: 'Controlled content generation, context-grounded assistants.' },
      { title: 'Data in production', text: 'APIs, SQL, testing, experiment tracking and CI/CD.' },
    ],
    languages: 'French (fluent) · English (B1)',
    certification: 'Power BI PL-300 (in preparation)',
    interests: 'Crafts, strategy games, music, travel',
  },
};
