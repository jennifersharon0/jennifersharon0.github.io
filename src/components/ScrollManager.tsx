import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

/**
 * Gère le défilement lors des navigations côté client :
 *  - ancre (#projects…) → défile jusqu'à la section et y place le focus clavier ;
 *  - nouvelle page sans ancre → retour en haut ;
 *  - défilement instantané si le visiteur préfère réduire les animations.
 * Au premier chargement, le navigateur gère lui-même l'ancre de l'URL.
 */
export function ScrollManager() {
  const { pathname, hash, state, key } = useLocation();
  const first = useRef(true);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const pageChanged = prevPath.current !== pathname;
    prevPath.current = pathname;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const instant = pageChanged || reduceMotion || (state as { instant?: boolean } | null)?.instant;
    const behavior: ScrollBehavior = instant ? 'instant' : 'smooth';

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior, block: 'start' });
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        return;
      }
    }
    if (pageChanged) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, state, key]);

  return null;
}
