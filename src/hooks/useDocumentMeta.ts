import { useEffect } from 'react';
import type { Lang } from '../i18n/routes';

/**
 * Met à jour le titre, la description et la langue du document lors de la navigation
 * côté client. (Les pages pré-générées contiennent déjà ces balises pour les robots.)
 */
export function useDocumentMeta(lang: Lang, title: string, description: string) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = title;
    const set = (selector: string, value: string) => document.querySelector(selector)?.setAttribute('content', value);
    set('meta[name="description"]', description);
    set('meta[property="og:title"]', title);
    set('meta[property="og:description"]', description);
  }, [lang, title, description]);
}
