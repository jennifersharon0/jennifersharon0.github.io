import { useLocation } from 'react-router';
import { langFromPath, type Lang } from './routes';
import { UI, type UiStrings } from './ui';

/** Langue courante, déduite de l'URL, et textes d'interface associés. */
export function useLang(): { lang: Lang; t: UiStrings } {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  return { lang, t: UI[lang] };
}
