/**
 * Liste ordonnée des projets. L'ordre ici est l'ordre d'affichage.
 * Pour ajouter un projet : créer un fichier sur le modèle des autres, puis l'ajouter à cette liste.
 */
import type { Project } from '../types';
import { leyendaComputerVision } from './leyenda-computer-vision';
import { datalearn } from './datalearn';
import { mnistAutoencoders } from './mnist-autoencoders';
import { diabetesDeepLearning } from './diabetes-deep-learning';
import { hrAttrition } from './hr-attrition';
import { ademeVrp } from './ademe-vrp';
import { greenresoInfrastructure } from './greenreso-infrastructure';

export const projects: Project[] = [
  leyendaComputerVision,
  datalearn,
  diabetesDeepLearning,
  hrAttrition,
  mnistAutoencoders,
  ademeVrp,
  greenresoInfrastructure,
];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
