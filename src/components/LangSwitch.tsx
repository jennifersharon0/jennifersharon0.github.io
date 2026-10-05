import type { MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { LANGS, translatePath, type Lang } from '../i18n/routes';
import { useLang } from '../i18n/useLang';
import { storage } from '../lib/storage';
import { currentAnchor } from '../lib/anchors';

const LABELS: Record<Lang, string> = { fr: 'Français', en: 'English' };

/**
 * Sélecteur FR / EN. Ce sont de vrais liens (fonctionnels sans JavaScript) ;
 * avec JavaScript, la section actuellement consultée est conservée.
 */
export function LangSwitch() {
  const { lang, t } = useLang();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function switchTo(e: MouseEvent, target: Lang) {
    e.preventDefault();
    storage.set('lang', target);
    if (target === lang) return;
    const anchor = currentAnchor();
    navigate({ pathname: translatePath(pathname, target), hash: anchor ? `#${anchor}` : '' }, { state: { instant: true } });
  }

  return (
    <div className="lang-switch" role="group" aria-label={t.a11y.switchLang}>
      {LANGS.map((l) => (
        <Link
          key={l}
          to={translatePath(pathname, l)}
          hrefLang={l}
          lang={l}
          aria-label={LABELS[l]}
          aria-current={l === lang ? 'true' : undefined}
          onClick={(e) => switchTo(e, l)}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
