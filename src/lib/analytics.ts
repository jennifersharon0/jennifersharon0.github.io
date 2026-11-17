/**
 * Statistiques de visite avec GoatCounter (sans cookies) :
 * tableau de bord sur https://jennifer-portfolio.goatcounter.com.
 *
 * Chaque page vue est comptée, y compris les changements de page côté navigateur,
 * ainsi que les téléchargements du CV. Rien n'est compté en développement ni en local.
 * Pour ne pas compter ses propres visites : ouvrir une fois le site avec
 * l'adresse se terminant par #toggle-goatcounter (à refaire dans chaque navigateur).
 */
const ENDPOINT = 'https://jennifer-portfolio.goatcounter.com/count';
const SCRIPT = 'https://gc.zgo.at/count.js';

interface GoatCounter {
  no_onload?: boolean;
  count?: (vars: { path: string; title?: string; event?: boolean }) => void;
}

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

type Hit = { path: string; title?: string; event?: boolean };
const pending: Hit[] = [];
let loading = false;

function send(hit: Hit) {
  const count = window.goatcounter?.count;
  if (count) {
    count(hit);
    return;
  }
  pending.push(hit);
  if (loading) return;
  loading = true;
  // Comptage piloté par le site (no_onload) : le script ne compte rien seul au chargement.
  window.goatcounter = { no_onload: true };
  const script = document.createElement('script');
  script.async = true;
  script.src = SCRIPT;
  script.dataset.goatcounter = ENDPOINT;
  script.onload = () => pending.splice(0).forEach((h) => window.goatcounter?.count?.(h));
  document.head.appendChild(script);
}

export function countPageView(path: string) {
  if (!import.meta.env.PROD) return;
  send({ path, title: document.title });
}

/** Compte les clics sur les liens de téléchargement du CV (un événement par langue). */
export function trackCvDownloads() {
  if (!import.meta.env.PROD) return () => {};
  const onClick = (e: MouseEvent) => {
    const link = (e.target as Element | null)?.closest?.('a[href$=".pdf"]');
    if (!link) return;
    const en = link.getAttribute('href')!.endsWith('_EN.pdf');
    send({ path: en ? 'cv-en' : 'cv-fr', title: en ? 'Téléchargement du CV anglais' : 'Téléchargement du CV français', event: true });
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
