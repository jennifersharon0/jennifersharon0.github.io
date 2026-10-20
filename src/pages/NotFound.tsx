import { Link } from 'react-router';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { homePath } from '../i18n/routes';
import { useLang } from '../i18n/useLang';

export function NotFound() {
  const { lang, t } = useLang();
  useDocumentMeta(lang, `${t.notFound.title} | Jennifer Ouedraogo`, t.notFound.text);

  return (
    <section className="section not-found">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>{t.notFound.title}</h1>
        <p>{t.notFound.text}</p>
        <Link className="btn btn-primary" to={homePath(lang)}>
          {t.notFound.cta}
        </Link>
      </div>
    </section>
  );
}
