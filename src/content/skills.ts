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
      { name: 'Python', projects: ['leyenda-computer-vision', 'datalearn', 'diabetes-deep-learning', 'mnist-autoencoders', 'ademe-vrp'] },
      { name: 'SQL', projects: ['datalearn'] },
      { name: 'pandas · NumPy', projects: ['leyenda-computer-vision', 'mnist-autoencoders'] },
      { name: 'Jupyter', projects: ['leyenda-computer-vision'] },
      { name: 'TypeScript', projects: ['datalearn'] },
    ],
  },
  {
    id: 'ml',
    title: { fr: 'Data Science & Machine Learning', en: 'Data science & machine learning' },
    skills: [
      { name: 'scikit-learn', projects: ['leyenda-computer-vision', 'mnist-autoencoders', 'diabetes-deep-learning', 'datalearn'] },
      { name: 'Random Forest · SVM · régression logistique', projects: ['hr-attrition', 'mnist-autoencoders'] },
      { name: 'Régression' },
      { name: 'ACP · t-SNE', projects: ['mnist-autoencoders', 'hr-attrition'] },
      { name: 'Chi² · V de Cramer · VIF', projects: ['hr-attrition', 'diabetes-deep-learning'] },
      { name: 'Imputation KNN', projects: ['hr-attrition'] },
      { name: 'Optuna · Keras Tuner', projects: ['leyenda-computer-vision', 'diabetes-deep-learning'] },
    ],
  },
  {
    id: 'dl',
    title: { fr: 'Deep Learning & computer vision', en: 'Deep learning & computer vision' },
    skills: [
      { name: 'TensorFlow / Keras', projects: ['leyenda-computer-vision', 'mnist-autoencoders'] },
      { name: 'PyTorch', projects: ['diabetes-deep-learning'] },
      { name: 'CNN', projects: ['leyenda-computer-vision'] },
      { name: 'Auto-encodeurs · UNet', projects: ['leyenda-computer-vision', 'mnist-autoencoders'] },
      { name: 'RNN (GRU) · attention', projects: ['leyenda-computer-vision'] },
      { name: 'Transfer learning (EfficientNetB0)', projects: ['leyenda-computer-vision'] },
      { name: 'MLP', projects: ['diabetes-deep-learning'] },
      { name: 'OpenCV · Pillow · scikit-image', projects: ['leyenda-computer-vision'] },
    ],
  },
  {
    id: 'genai',
    title: { fr: 'IA générative & NLP', en: 'Generative AI & NLP' },
    skills: [
      { name: 'LLM (Llama 3.3 70B, API Groq)', projects: ['datalearn'] },
      { name: 'Prompt engineering', projects: ['datalearn'] },
      { name: 'TF-IDF · embeddings', projects: ['datalearn'] },
      { name: 'Image captioning · beam search', projects: ['leyenda-computer-vision'] },
      { name: 'Prétraitement de texte · tokenisation', projects: ['leyenda-computer-vision'] },
    ],
  },
  {
    id: 'evaluation',
    title: { fr: 'Évaluation & statistiques', en: 'Evaluation & statistics' },
    skills: [
      { name: 'Baselines · prévention des fuites de données', projects: ['leyenda-computer-vision', 'mnist-autoencoders', 'diabetes-deep-learning'] },
      { name: 'Precision · recall · F1 · ROC AUC', projects: ['leyenda-computer-vision', 'diabetes-deep-learning', 'hr-attrition'] },
      { name: 'PSNR · SSIM · BLEU', projects: ['leyenda-computer-vision'] },
      { name: 'Bootstrap · test de McNemar', projects: ['leyenda-computer-vision'] },
    ],
  },
  {
    id: 'responsible',
    title: { fr: 'IA responsable & explicabilité', en: 'Responsible & explainable AI' },
    skills: [
      { name: 'Feature importance (XAI)', projects: ['hr-attrition'] },
      { name: 'Analyse des biais (impact disparate, equalized odds)', projects: ['diabetes-deep-learning'] },
      { name: 'Mesure de l’empreinte carbone', projects: ['diabetes-deep-learning', 'leyenda-computer-vision'] },
      { name: 'Éthique de l’IA (7 exigences UE)', projects: ['hr-attrition'] },
    ],
  },
  {
    id: 'mlops',
    title: { fr: 'MLOps, tests & déploiement', en: 'MLOps, testing & deployment' },
    skills: [
      { name: 'Git / GitHub', projects: ['datalearn', 'ademe-vrp'] },
      { name: 'MLflow · DVC', projects: ['diabetes-deep-learning'] },
      { name: 'Docker · GitHub Actions (CI/CD)', projects: ['diabetes-deep-learning'] },
      { name: 'pytest', projects: ['datalearn'] },
      { name: 'tf.data · traitements reprenables', projects: ['leyenda-computer-vision'] },
      { name: 'Gradio', projects: ['leyenda-computer-vision'] },
      { name: 'Render · Vercel', projects: ['datalearn'] },
      { name: 'Agile (Scrum) · Jira' },
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
    ],
  },
  {
    id: 'viz',
    title: { fr: 'Visualisation & analyse', en: 'Visualisation & analytics' },
    skills: [
      { name: 'Matplotlib · Seaborn', projects: ['leyenda-computer-vision', 'mnist-autoencoders'] },
      { name: 'Graphiques SVG sur mesure', projects: ['datalearn'] },
      { name: 'KPI & tableaux de bord', projects: ['datalearn'] },
      { name: 'Power BI' },
      { name: 'Excel' },
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
      { name: 'Google Colab · Kaggle (GPU)', projects: ['leyenda-computer-vision', 'mnist-autoencoders'] },
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
  'Auto-encodeurs · UNet': 'Autoencoders · UNet',
  'Régression': 'Regression',
  'Prétraitement de texte · tokenisation': 'Text preprocessing · tokenisation',
  'Baselines · prévention des fuites de données': 'Baselines · data leakage prevention',
  'Bootstrap · test de McNemar': "Bootstrap · McNemar's test",
  'Mesure de l’empreinte carbone': 'Carbon footprint measurement',
  'tf.data · traitements reprenables': 'tf.data · resumable processing',
  'Analyse des biais (impact disparate, equalized odds)': 'Bias analysis (disparate impact, equalized odds)',
  'Éthique de l’IA (7 exigences UE)': 'AI ethics (7 EU requirements)',
  'Authentification JWT · RLS': 'JWT authentication · RLS',
  'Graphiques SVG sur mesure': 'Custom SVG charts',
  'KPI & tableaux de bord': 'KPIs & dashboards',
  'ALNS · recuit simulé · recherche tabou': 'ALNS · simulated annealing · tabu search',
  'Colonies de fourmis': 'Ant colony optimisation',
};
