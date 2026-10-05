/**
 * Compétences — sources : CV et Recapitulatif_Projets_Annee.docx.
 *
 * `projects` liste les projets (slugs) où l'outil est explicitement mentionné.
 * Un outil sans projet est affiché comme « indiqué dans le CV » : il n'est pas
 * illustré par un projet détaillé sur ce site.
 */
import type { Localized } from './types';

export interface Skill {
  name: string;
  projects?: string[];
  /** Précision courte (ex. statut d'une certification). */
  note?: Localized<string>;
}

export interface SkillGroup {
  id: string;
  title: Localized<string>;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    title: { fr: 'Programmation & manipulation de données', en: 'Programming & data wrangling' },
    skills: [
      { name: 'Python', projects: ['datalearn', 'mnist-autoencoders', 'diabetes-deep-learning', 'ademe-vrp'] },
      { name: 'SQL', projects: ['datalearn'] },
      { name: 'pandas', projects: ['mnist-autoencoders'] },
      { name: 'NumPy', projects: ['mnist-autoencoders'] },
      { name: 'TypeScript', projects: ['datalearn'] },
      { name: 'JavaScript' },
      { name: 'HTML / CSS' },
    ],
  },
  {
    id: 'ml',
    title: { fr: 'Data Science & Machine Learning', en: 'Data science & machine learning' },
    skills: [
      { name: 'scikit-learn', projects: ['mnist-autoencoders', 'diabetes-deep-learning', 'datalearn'] },
      { name: 'Random Forest · SVM · régression logistique', projects: ['hr-attrition', 'mnist-autoencoders'] },
      { name: 'ACP · t-SNE', projects: ['mnist-autoencoders', 'hr-attrition'] },
      { name: 'Chi² · V de Cramer · VIF', projects: ['hr-attrition', 'diabetes-deep-learning'] },
      { name: 'Imputation KNN', projects: ['hr-attrition'] },
      { name: 'Optuna · recherche aléatoire', projects: ['diabetes-deep-learning', 'mnist-autoencoders'] },
      { name: 'SciPy', projects: ['mnist-autoencoders'] },
    ],
  },
  {
    id: 'dl',
    title: { fr: 'Deep Learning & IA', en: 'Deep learning & AI' },
    skills: [
      { name: 'PyTorch', projects: ['diabetes-deep-learning'] },
      { name: 'TensorFlow / Keras 3', projects: ['mnist-autoencoders'] },
      { name: 'Auto-encodeurs (AE, VAE)', projects: ['mnist-autoencoders'] },
      { name: 'MLP', projects: ['diabetes-deep-learning'] },
      { name: 'LLM (Llama 3.3 70B, API Groq)', projects: ['datalearn'] },
      { name: 'Prompt engineering', projects: ['datalearn'] },
      { name: 'TF-IDF · embeddings', projects: ['datalearn'] },
    ],
  },
  {
    id: 'responsible',
    title: { fr: 'IA responsable & explicabilité', en: 'Responsible & explainable AI' },
    skills: [
      { name: 'Feature importance (XAI)', projects: ['hr-attrition'] },
      { name: 'Analyse des biais (impact disparate, equalized odds)', projects: ['diabetes-deep-learning'] },
      { name: 'CodeCarbon', projects: ['diabetes-deep-learning'] },
      { name: 'Éthique de l’IA (7 exigences UE)', projects: ['hr-attrition'] },
    ],
  },
  {
    id: 'mlops',
    title: { fr: 'MLOps, tests & déploiement', en: 'MLOps, testing & deployment' },
    skills: [
      { name: 'Git / GitHub', projects: ['datalearn', 'ademe-vrp'] },
      { name: 'MLflow', projects: ['diabetes-deep-learning'] },
      { name: 'DVC', projects: ['diabetes-deep-learning'] },
      { name: 'Docker', projects: ['diabetes-deep-learning'] },
      { name: 'GitHub Actions', projects: ['diabetes-deep-learning'] },
      { name: 'pytest', projects: ['datalearn'] },
      { name: 'Render · Vercel', projects: ['datalearn'] },
    ],
  },
  {
    id: 'backend',
    title: { fr: 'Bases de données & développement', en: 'Databases & software development' },
    skills: [
      { name: 'PostgreSQL / Supabase', projects: ['datalearn'] },
      { name: 'FastAPI · Pydantic', projects: ['datalearn', 'diabetes-deep-learning'] },
      { name: 'React', projects: ['datalearn'] },
      { name: 'Authentification JWT · RLS', projects: ['datalearn'] },
      { name: 'MongoDB' },
      { name: 'NestJS' },
      { name: 'Prisma ORM' },
      { name: 'RabbitMQ' },
      { name: 'Socket.io' },
    ],
  },
  {
    id: 'viz',
    title: { fr: 'Visualisation & analyse', en: 'Visualisation & analytics' },
    skills: [
      { name: 'Matplotlib · Seaborn', projects: ['mnist-autoencoders'] },
      { name: 'Graphiques SVG sur mesure', projects: ['datalearn'] },
      {
        name: 'Power BI',
        note: { fr: 'certification PL-300 en préparation', en: 'PL-300 certification in preparation' },
      },
      { name: 'Excel' },
      { name: 'KPI & tableaux de bord', projects: ['datalearn'] },
    ],
  },
  {
    id: 'or',
    title: { fr: 'Recherche opérationnelle', en: 'Operations research' },
    skills: [
      { name: 'ALNS · recuit simulé · recherche tabou', projects: ['ademe-vrp'] },
      { name: 'Colonies de fourmis', projects: ['ademe-vrp'] },
      { name: 'vrplib / CVRPLIB', projects: ['ademe-vrp'] },
    ],
  },
  {
    id: 'tools',
    title: { fr: 'Environnements & outils', en: 'Environments & tools' },
    skills: [
      { name: 'Google Colab · Kaggle (GPU)', projects: ['mnist-autoencoders'] },
      { name: 'VS Code' },
      { name: 'LaTeX' },
    ],
  },
];

/**
 * Traductions anglaises des noms de compétences qui contiennent du français.
 * Les noms d'outils (Python, Docker…) restent identiques dans les deux langues.
 */
export const skillNameEn: Record<string, string> = {
  'Random Forest · SVM · régression logistique': 'Random forest · SVM · logistic regression',
  'ACP · t-SNE': 'PCA · t-SNE',
  'Chi² · V de Cramer · VIF': "Chi² · Cramér's V · VIF",
  'Imputation KNN': 'KNN imputation',
  'Optuna · recherche aléatoire': 'Optuna · random search',
  'Auto-encodeurs (AE, VAE)': 'Autoencoders (AE, VAE)',
  'Analyse des biais (impact disparate, equalized odds)': 'Bias analysis (disparate impact, equalized odds)',
  'Éthique de l’IA (7 exigences UE)': 'AI ethics (7 EU requirements)',
  'Authentification JWT · RLS': 'JWT authentication · RLS',
  'Graphiques SVG sur mesure': 'Custom SVG charts',
  'KPI & tableaux de bord': 'KPIs & dashboards',
  'ALNS · recuit simulé · recherche tabou': 'ALNS · simulated annealing · tabu search',
  'Colonies de fourmis': 'Ant colony optimisation',
};
