import type { Project } from '../types';

/** Source : Recapitulatif_Projets_Annee.docx §1. */
export const ademeVrp: Project = {
  slug: 'ademe-vrp',
  kind: 'academic',
  teamSize: 3,
  featured: false,
  stack: ['Python', 'ALNS', 'Simulated Annealing', 'Tabu Search', 'Ant Colony', 'vrplib', 'CVRPLIB', 'Git'],
  links: [],
  content: {
    fr: {
      title: 'Optimisation de tournées de livraison pour l’ADEME',
      shortTitle: 'Tournées ADEME',
      summary:
        "Modéliser un problème de tournées avec capacités, fenêtres horaires et trafic variable, puis le résoudre par une métaheuristique ALNS évaluée sur des instances de référence jusqu'à 1 000 clients.",
      category: 'Recherche opérationnelle',
      context: "Projet académique · CESI · réponse à un appel à manifestation d'intérêt de l'ADEME (structure fictive CesiCDP), équipe de 3",
      problem:
        "Dans le cadre d'un appel à manifestation d'intérêt de l'ADEME sur la mobilité multimodale intelligente, il fallait proposer une méthode de recherche opérationnelle pour calculer des tournées de livraison optimisées (problème de type VRP), en tenant compte du trafic routier et de contraintes réalistes, avec un solveur Python capable de traiter des instances de plusieurs milliers de villes.",
      objectives: [
        'Modéliser formellement le problème et ses contraintes.',
        'Justifier le choix d’une méthode de résolution adaptée aux grandes instances.',
        'Implémenter un solveur Python et le comparer à d’autres approches sur des instances de référence.',
      ],
      data: [
        'Instances de référence CVRPLIB chargées avec la bibliothèque vrplib : A-n32-k5, E-n51-k5, X-n101-k25, ORTEC-n242-k12, jusqu’à X-n1001-k43.',
        'Solutions optimales connues de ces instances, utilisées pour calculer l’écart (gap) des solutions obtenues.',
      ],
      approach: [
        {
          title: '1. Modélisation',
          points: [
            'Formulation d’un CVRPTW (VRP avec capacités et fenêtres horaires) intégrant le trafic dynamique : ensembles, variables de décision, fonction objectif et contraintes.',
            'Fenêtres horaires en version avancée (attente autorisée en cas d’arrivée en avance) et trafic modélisé par une matrice de temps de trajet variant selon la tranche horaire (matin / mi-journée / soir).',
            'Démonstration de la complexité du problème (NP-difficile), justifiant les métaheuristiques plutôt qu’une résolution exacte pour les grandes instances.',
          ],
        },
        {
          title: '2. Algorithme ALNS',
          points: [
            '3 opérateurs de destruction (random, worst, related) et 3 de réparation (fast, cheapest, regret-2).',
            'Sélection adaptative des opérateurs, pondérée par leurs performances.',
            'Critère d’acceptation par recuit simulé pour accepter de façon probabiliste des solutions dégradées.',
          ],
        },
        {
          title: '3. Implémentation et protocole expérimental',
          points: [
            'Solveur ALNS complet en Python, avec interface en ligne de commande et solveurs de comparaison : recuit simulé, recherche tabou, colonies de fourmis, LNS simple, hill-climbing.',
            'Script d’évaluation automatisée du gap par rapport à l’optimum connu.',
            '20 exécutions indépendantes par instance ; courbes de convergence, boxplots des écarts à l’optimum, cartes des tournées et diagrammes de Gantt de l’affectation des véhicules.',
          ],
        },
      ],
      results: [
        'Un solveur ALNS fonctionnel, comparé à cinq autres approches sur des instances de 32 à 1 000 clients.',
        'Un protocole d’évaluation reproductible (20 exécutions par instance, gap à l’optimum) et un ensemble de visualisations des résultats.',
        'Une bibliographie scientifique (Dantzig & Ramser 1959, Solomon 1987, Ropke & Pisinger 2006) et un travail d’équipe organisé en sprints sur un dépôt Git partagé.',
      ],
      keyFigures: [
        { value: '6', label: 'opérateurs ALNS (3 + 3)' },
        { value: '20', label: 'exécutions par instance' },
        { value: '1 000', label: 'clients sur la plus grande instance' },
      ],
      challenges: [
        {
          problem: 'Le problème est NP-difficile : une résolution exacte devient impraticable sur les grandes instances.',
          solution: 'Démonstration formelle de la complexité, puis choix d’une métaheuristique adaptative (ALNS) avec acceptation par recuit simulé.',
        },
        {
          problem: 'Juger la qualité d’une métaheuristique stochastique sur une seule exécution n’est pas fiable.',
          solution: 'Instances de référence à optimum connu, calcul automatisé du gap et 20 exécutions indépendantes par instance.',
        },
      ],
      skills:
        'Modélisation mathématique, analyse de complexité, conception et implémentation de métaheuristiques, protocole expérimental, visualisation de résultats, bibliographie scientifique et travail en équipe avec Git.',
    },
    en: {
      title: 'Delivery route optimisation for ADEME',
      shortTitle: 'ADEME routing',
      summary:
        'Modelling a vehicle routing problem with capacities, time windows and time-dependent traffic, then solving it with an ALNS metaheuristic benchmarked on reference instances of up to 1,000 customers.',
      category: 'Operations research',
      context: "Academic project · CESI · response to an ADEME call for expressions of interest (fictional company CesiCDP), team of 3",
      problem:
        "As part of a call for expressions of interest from ADEME (the French ecological transition agency) on smart multimodal mobility, we had to propose an operations research method to compute optimised delivery routes (a VRP-type problem), accounting for road traffic and realistic constraints, with a Python solver able to handle instances of several thousand cities.",
      objectives: [
        'Formally model the problem and its constraints.',
        'Justify a solution method suited to large instances.',
        'Implement a Python solver and benchmark it against other approaches on reference instances.',
      ],
      data: [
        'CVRPLIB reference instances loaded with the vrplib library: A-n32-k5, E-n51-k5, X-n101-k25, ORTEC-n242-k12, up to X-n1001-k43.',
        'The known optimal solutions of these instances, used to compute the gap of each solution found.',
      ],
      approach: [
        {
          title: '1. Modelling',
          points: [
            'Formulated a CVRPTW (capacitated VRP with time windows) with dynamic traffic: sets, decision variables, objective function and constraints.',
            'Advanced time windows (waiting allowed when arriving early) and traffic modelled as a travel-time matrix that varies by time of day (morning / midday / evening).',
            'Showed the problem is NP-hard, justifying metaheuristics over exact methods for large instances.',
          ],
        },
        {
          title: '2. The ALNS algorithm',
          points: [
            '3 destroy operators (random, worst, related) and 3 repair operators (fast, cheapest, regret-2).',
            'Adaptive operator selection weighted by past performance.',
            'Simulated-annealing acceptance to probabilistically accept worse solutions.',
          ],
        },
        {
          title: '3. Implementation and experimental protocol',
          points: [
            'A complete ALNS solver in Python with a command-line interface, plus comparison solvers: simulated annealing, tabu search, ant colony optimisation, plain LNS and hill climbing.',
            'An automated script computing the gap to the known optimum.',
            '20 independent runs per instance; convergence curves, gap boxplots, route maps and Gantt charts of vehicle assignments.',
          ],
        },
      ],
      results: [
        'A working ALNS solver benchmarked against five other approaches on instances from 32 to 1,000 customers.',
        'A reproducible evaluation protocol (20 runs per instance, gap to optimum) and a set of result visualisations.',
        'A scientific bibliography (Dantzig & Ramser 1959, Solomon 1987, Ropke & Pisinger 2006) and teamwork organised in sprints on a shared Git repository.',
      ],
      keyFigures: [
        { value: '6', label: 'ALNS operators (3 + 3)' },
        { value: '20', label: 'runs per instance' },
        { value: '1,000', label: 'customers in the largest instance' },
      ],
      challenges: [
        {
          problem: 'The problem is NP-hard: exact methods become impractical on large instances.',
          solution: 'A formal complexity argument, then an adaptive metaheuristic (ALNS) with simulated-annealing acceptance.',
        },
        {
          problem: 'Judging a stochastic metaheuristic on a single run is unreliable.',
          solution: 'Reference instances with known optima, automated gap computation and 20 independent runs per instance.',
        },
      ],
      skills:
        'Mathematical modelling, complexity analysis, metaheuristic design and implementation, experimental design, result visualisation, scientific literature review and teamwork with Git.',
    },
  },
};
