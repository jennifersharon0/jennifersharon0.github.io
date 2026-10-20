/**
 * Données des visualisations — valeurs reprises telles quelles de
 * Recapitulatif_Projets_Annee.docx (§5, « Classification sur les représentations apprises »).
 */
import type { Localized } from './types';

export interface AccuracyPoint {
  label: Localized<string>;
  dims: number;
  accuracy: number;
  learned: boolean;
}

export const mnistAccuracy = {
  title: {
    fr: 'Accuracy d’un SVM selon la représentation des images',
    en: 'SVM accuracy by image representation',
  } satisfies Localized<string>,
  caption: {
    fr: 'MNIST, même découpage entraînement / test pour toutes les représentations. Axe resserré entre 0,95 et 0,99 pour rendre les écarts lisibles.',
    en: 'MNIST, same train/test split for every representation. Axis narrowed to 0.95 to 0.99 so the gaps are readable.',
  } satisfies Localized<string>,
  domain: [0.95, 0.99] as const,
  ticks: [0.95, 0.96, 0.97, 0.98, 0.99],
  points: [
    { label: { fr: 'Codes latents du VAE', en: 'VAE latent codes' }, dims: 32, accuracy: 0.982, learned: true },
    { label: { fr: 'Codes latents de l’AE', en: 'AE latent codes' }, dims: 32, accuracy: 0.979, learned: true },
    { label: { fr: 'ACP, 32 composantes', en: 'PCA, 32 components' }, dims: 32, accuracy: 0.967, learned: false },
    { label: { fr: 'Pixels bruts', en: 'Raw pixels' }, dims: 784, accuracy: 0.962, learned: false },
  ] satisfies AccuracyPoint[],
};
