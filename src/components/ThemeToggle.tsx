import { useLang } from '../i18n/useLang';
import { storage } from '../lib/storage';
import { Icon } from './Icon';

/**
 * Bascule clair / sombre. Les deux icônes sont rendues et le CSS affiche la bonne
 * selon le thème actif : le rendu est identique côté serveur et navigateur.
 */
export function ThemeToggle() {
  const { t } = useLang();

  function toggle() {
    const root = document.documentElement;
    const current =
      root.dataset.theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    storage.set('theme', next);
  }

  return (
    <button type="button" className="icon-btn theme-toggle" onClick={toggle} aria-label={t.a11y.toggleTheme} title={t.a11y.toggleTheme}>
      <Icon name="moon" className="icon-moon" />
      <Icon name="sun" className="icon-sun" />
    </button>
  );
}
