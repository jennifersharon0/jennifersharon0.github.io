/**
 * Informations personnelles — source : CV (public/cv/CV_Jennifer_OUEDRAOGO_Data_Science.pdf).
 * Les champs vides (ex. github) ne sont pas affichés : il suffit de les renseigner
 * pour qu'ils apparaissent automatiquement dans l'accueil, le contact et le pied de page.
 */
import type { Localized } from './types';

export const profile = {
  firstName: 'Jennifer',
  lastName: 'OUEDRAOGO',
  email: 'ouedraogolaura5@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jennifer-laura-ouedraogo',
  linkedinLabel: 'linkedin.com/in/jennifer-laura-ouedraogo',
  /** URL complète (avec https://) — sinon le lien serait traité comme une page interne du site. */
  github: 'https://github.com/jennifersharon0',
  /** Fichier publié dans public/ ; pour changer de CV, déposer le PDF dans public/cv/ et mettre à jour ce chemin. */
  cvFile: 'cv/CV_Jennifer_OUEDRAOGO_Data_Science.pdf',
  location: 'France',
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
    domain: 'Data Science & Machine Learning',
    role: 'Élève ingénieure en Data Science & IA · CESI École d’Ingénieurs',
    headline: 'Des modèles qu’on peut vérifier, des résultats qu’on peut expliquer.',
    lead:
      "Passionnée par l'AI engineering et la computer vision, j'aime comparer plusieurs approches et optimiser mes modèles, que je valide en tenant compte de leur performance et de leur rapidité, mais aussi de leurs enjeux éthiques et environnementaux.",
    facts: [
      { value: '92,8 %', label: 'd’accuracy pour un CNN entraîné de zéro sur près de 40 000 images en 5 classes', slug: 'leyenda-computer-vision' },
      { value: '0,82', label: 'de ROC AUC pour prédire le diabète avec un réseau PyTorch', slug: 'diabetes-deep-learning' },
      { value: '190', label: 'notions de data science générées puis vérifiées automatiquement dans DataLearn', slug: 'datalearn' },
    ],
  },
  en: {
    domain: 'Data Science & Machine Learning',
    role: 'Data Science & AI engineering student · CESI School of Engineering',
    headline: 'Models you can verify, results you can explain.',
    lead:
      'Passionate about AI engineering and computer vision, I like comparing several approaches and optimising my models, which I validate on performance and speed, but also on their ethical and environmental impact.',
    facts: [
      { value: '92.8%', label: 'accuracy of a CNN trained from scratch on nearly 40,000 images in 5 classes', slug: 'leyenda-computer-vision' },
      { value: '0.82', label: 'ROC AUC for diabetes prediction with a PyTorch network', slug: 'diabetes-deep-learning' },
      { value: '190', label: 'data science topics generated and automatically checked in DataLearn', slug: 'datalearn' },
    ],
  },
};

export interface AboutContent {
  paragraphs: string[];
  focus: { title: string; text: string }[];
  languages: string;
  softSkills: string;
  engagement: string;
  interests: string;
}

export const about: Localized<AboutContent> = {
  fr: {
    paragraphs: [
      "Étudiante ingénieure en dernière année de data science et IA, je suis passionnée par l'AI engineering et la computer vision. J'aime comparer plusieurs approches et optimiser mes modèles, que je valide en tenant compte de leur performance et de leur rapidité, mais aussi de leurs enjeux éthiques et environnementaux. Mes projets couvrent le machine learning, le deep learning, la computer vision et l'IA générative (LLM, RAG, NLP), de l'analyse des données à la mise en production.",
      "Mon parcours a commencé par deux années de classes préparatoires MPSI/MP à Ouagadougou, qui m'ont donné le goût de la modélisation et du raisonnement rigoureux. J'ai poursuivi par une première année de génie informatique à l'École Marocaine d'Ingénierie, à Rabat, avant de rejoindre le cycle ingénieur du CESI à Nanterre, en spécialisation Data Science & IA.",
      "Ce qui m'intéresse, c'est de partir d'une question concrète, comme trier et légender des archives numérisées, comprendre pourquoi des employés quittent une entreprise ou repérer les patients à risque de diabète, pour construire une démarche mesurable, puis d'en expliquer les résultats à des personnes qui ne sont pas data scientists.",
      "En parallèle de mes cours, j'ai développé DataLearn de la conception à la mise en production. Ce projet m'a fait aborder ce que les projets scolaires traitent peu : l'architecture logicielle, la sécurité des données personnelles, l'évaluation d'un LLM, les tests automatisés et le déploiement.",
    ],
    focus: [
      { title: 'Machine learning explicable', text: 'Importance des variables, analyse des biais, recommandations métier.' },
      { title: 'Deep learning & computer vision', text: 'CNN, auto-encodeurs, UNet, attention, image captioning.' },
      { title: 'LLM appliqués', text: 'Assistant RAG, évaluation sur un jeu de test annoté, garde-fous.' },
      { title: 'Données en production', text: 'API, SQL, tests de non-régression, suivi d’expériences et CI/CD.' },
    ],
    languages: 'Français (courant) · Anglais (B1)',
    softSkills: 'Esprit d’équipe (projets à 4), résolution de problèmes, autonomie, rigueur, communication et pédagogie',
    engagement: 'Soutien scolaire : élèves de 5e en mathématiques et de 2nde en réseaux informatiques',
    interests: 'Travaux pratiques, jeux de réflexion, musique, voyage',
  },
  en: {
    paragraphs: [
      'Final-year engineering student in data science and AI, I am passionate about AI engineering and computer vision. I like comparing several approaches and optimising my models, which I validate on performance and speed, but also on their ethical and environmental impact. My projects span machine learning, deep learning, computer vision and generative AI (LLMs, RAG, NLP), from data analysis all the way to production.',
      'I started with two years of MPSI/MP preparatory classes in Ouagadougou, which gave me a taste for mathematical modelling and rigorous reasoning. I then completed a first year of computer engineering at the École Marocaine d’Ingénierie in Rabat, before joining the engineering programme at CESI in Nanterre, majoring in Data Science & AI.',
      'What I enjoy is starting from a concrete question, such as sorting and captioning digitised archives, understanding why employees leave a company or spotting patients at risk of diabetes, and turning it into a measurable approach, and then explaining the results to people who are not data scientists.',
      'Alongside my studies, I built DataLearn from design to production. It took me into areas that school projects rarely cover: software architecture, personal data security, LLM evaluation, automated testing and deployment.',
    ],
    focus: [
      { title: 'Explainable machine learning', text: 'Feature importance, bias analysis, business recommendations.' },
      { title: 'Deep learning & computer vision', text: 'CNNs, autoencoders, UNet, attention, image captioning.' },
      { title: 'Applied LLMs', text: 'RAG assistant, evaluation on an annotated test set, guardrails.' },
      { title: 'Data in production', text: 'APIs, SQL, regression testing, experiment tracking and CI/CD.' },
    ],
    languages: 'French (fluent) · English (B1)',
    softSkills: 'Team player (4-person projects), problem solving, autonomy, rigour, communication and teaching',
    engagement: 'Tutoring: maths for middle-school students (year 8) and computer networking for high-school students (year 11)',
    interests: 'Hands-on projects, strategy games, music, travel',
  },
};
