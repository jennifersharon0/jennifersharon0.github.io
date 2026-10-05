/**
 * Renvoie l'identifiant de la dernière section (marquée data-anchor) dont le haut
 * a dépassé le bas de l'en-tête : c'est la section en cours de lecture.
 */
export function currentAnchor(): string | null {
  const threshold = 120;
  let current: string | null = null;
  for (const el of document.querySelectorAll<HTMLElement>('[data-anchor]')) {
    if (el.getBoundingClientRect().top <= threshold) current = el.id;
  }
  return current;
}
