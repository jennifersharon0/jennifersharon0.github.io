import type { Lang } from '../i18n/routes';

/** Valeur traduite : une entrée par langue. */
export type Localized<T> = Record<Lang, T>;

export interface KeyFigure {
  value: string;
  label: string;
}

export interface ApproachStep {
  title: string;
  points: string[];
}

export interface Challenge {
  problem: string;
  solution: string;
}

/** Contenu rédactionnel d'un projet, dans une langue. */
export interface ProjectContent {
  title: string;
  /** Nom court (liens depuis les compétences). */
  shortTitle: string;
  /** Une phrase, affichée sur la carte et en tête de l'étude de cas. */
  summary: string;
  category: string;
  /** Cadre du projet : école, client fictif, équipe… */
  context: string;
  problem: string;
  objectives: string[];
  data?: string[];
  approach: ApproachStep[];
  results: string[];
  keyFigures?: KeyFigure[];
  /** Résultat mis en avant sur la carte du projet. */
  cardResult?: string;
  challenges?: Challenge[];
  learnings?: string[];
  limits?: string[];
  skills?: string;
  /** Précision importante sur le statut ou les sources du projet. */
  note?: string;
}

export interface ProjectLink {
  label: Localized<string>;
  url: string;
}

export interface Project {
  slug: string;
  year?: string;
  kind: 'personal' | 'academic';
  /** Nombre de personnes (1 = projet mené seule). Absent si non renseigné. */
  teamSize?: number;
  featured: boolean;
  stack: string[];
  /** Liens publics (dépôt, démo). À compléter lorsqu'ils seront disponibles. */
  links: ProjectLink[];
  /** Visualisation de résultats intégrée à l'étude de cas. */
  chart?: 'mnist-accuracy';
  content: Localized<ProjectContent>;
}
