/** Formation et expérience — source : CV (Cv_PFE.pdf). */
import type { Localized } from './types';

export interface JourneyItem {
  period: string;
  title: string;
  org: string;
  place?: string;
  points?: string[];
}

export interface JourneyContent {
  education: JourneyItem[];
  experience: JourneyItem[];
}

export const journey: Localized<JourneyContent> = {
  fr: {
    education: [
      {
        period: '2025 – 2027',
        title: 'Cycle ingénieur — spécialisation Data Science & IA',
        org: 'CESI École d’Ingénieurs',
        place: 'Nanterre, France',
      },
      {
        period: '2024 – 2025',
        title: '1re année Génie Informatique',
        org: 'École Marocaine d’Ingénierie',
        place: 'Rabat, Maroc',
      },
      {
        period: '2022 – 2024',
        title: 'Classes préparatoires MPSI / MP',
        org: 'CPGE LaSalle',
        place: 'Ouagadougou, Burkina Faso',
      },
    ],
    experience: [
      {
        period: 'Juil. 2025 – sept. 2025',
        title: 'Stage Développement Web',
        org: 'FOULISA DESIGN SARL',
        place: 'Télétravail',
        points: [
          'Création d’une landing page avec compte à rebours pour le site Water and Mining.',
          'Implémentation d’une fonctionnalité d’activation d’annonces sur la plateforme Dilink.',
          'Tests fonctionnels et rédaction de rapports techniques.',
        ],
      },
    ],
  },
  en: {
    education: [
      {
        period: '2025 – 2027',
        title: 'Engineering degree — Data Science & AI major',
        org: 'CESI School of Engineering',
        place: 'Nanterre, France',
      },
      {
        period: '2024 – 2025',
        title: 'First year, Computer Engineering',
        org: 'École Marocaine d’Ingénierie',
        place: 'Rabat, Morocco',
      },
      {
        period: '2022 – 2024',
        title: 'Preparatory classes (MPSI / MP) — intensive maths & physics',
        org: 'CPGE LaSalle',
        place: 'Ouagadougou, Burkina Faso',
      },
    ],
    experience: [
      {
        period: 'Jul. 2025 – Sep. 2025',
        title: 'Web Development Intern',
        org: 'FOULISA DESIGN SARL',
        place: 'Remote',
        points: [
          'Built a landing page with a countdown timer for the Water and Mining website.',
          'Implemented an ad activation feature on the Dilink platform.',
          'Ran functional tests and wrote technical reports.',
        ],
      },
    ],
  },
};
