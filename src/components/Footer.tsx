import { profile } from '../content/profile';
import { asset } from '../i18n/routes';
import { useLang } from '../i18n/useLang';
import { Icon } from './Icon';
import { SocialLinks } from './SocialLinks';
import './Footer.css';

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-id">
          <p className="footer-name">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="footer-meta mono">
            © {__BUILD_YEAR__} · Data Science & Machine Learning
          </p>
          <p className="footer-built">{t.footer.built}</p>
        </div>
        <div className="footer-actions">
          <SocialLinks />
          <a className="icon-btn" href={asset(profile.cvFile)} download aria-label={t.contact.cv} title={t.contact.cv}>
            <Icon name="download" />
          </a>
          <a className="icon-btn" href="#top" aria-label={t.footer.backToTop} title={t.footer.backToTop}>
            <Icon name="arrowUp" />
          </a>
        </div>
      </div>
    </footer>
  );
}
