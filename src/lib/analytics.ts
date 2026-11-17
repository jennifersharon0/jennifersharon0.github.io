/**
 * Statistiques de visite avec GoatCounter (sans cookies) :
 * tableau de bord sur https://jennifer-portfolio.goatcounter.com.
 *
 * Chaque page vue est comptée, y compris les changements de page côté navigateur,
 * ainsi que les téléchargements du CV. Rien n'est compté en développement ni en local.
 * Pour ne pas compter ses propres visites : ouvrir une fois le site avec
 * l'adresse se terminant par #toggle-goatcounter (à refaire dans chaque navigateur).
 */
import { storage } from './storage';

const ENDPOINT ='https://jennifer-portfolio.goatcounter.com/count';
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
  // Même adresse avec ou sans « / » final (arrivée directe ou navigation interne) : une seule ligne dans les statistiques.
  send({ path: path.length > 1 ? path.replace(/\/+$/, '') : path, title: document.title });
}

/**
 * Lien #toggle-goatcounter : active ou désactive le comptage dans ce navigateur.
 * Géré ici plutôt que par count.js, qui ne le détecte qu'au chargement complet de la page
 * (pas quand le site est déjà ouvert et que seule l'ancre change). L'ancre est retirée
 * avant le chargement de count.js pour qu'il ne bascule pas une seconde fois.
 */
export function handleOptOutLink() {
  if (!import.meta.env.PROD) return () => {};
  const check = () => {
    if (location.hash !== '#toggle-goatcounter') return;
    history.replaceState(history.state, '', location.pathname + location.search);
    const disabled = storage.get('skipgc') === 't';
    if (disabled) storage.remove('skipgc');
    else storage.set('skipgc', 't');
    alert(
      disabled
        ? 'Statistiques : vos visites sont de nouveau comptées dans ce navigateur.'
        : 'Statistiques : vos visites ne sont plus comptées dans ce navigateur. Rouvrez ce même lien pour les compter de nouveau.',
    );
  };
  check();
  window.addEventListener('hashchange', check);
  return () => window.removeEventListener('hashchange', check);
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
