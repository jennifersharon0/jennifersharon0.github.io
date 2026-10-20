import { profile } from '../content/profile';
import { useLang } from '../i18n/useLang';
import { Icon } from './Icon';

/** Liens e-mail / LinkedIn / GitHub — GitHub n'apparaît que s'il est renseigné dans profile.ts. */
export function SocialLinks() {
  const { t } = useLang();
  return (
    <>
      <a className="icon-btn" href={`mailto:${profile.email}`} aria-label={`${t.contact.email} : ${profile.email}`} title={profile.email}>
        <Icon name="mail" />
      </a>
      <a
        className="icon-btn"
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t.contact.linkedin} ${t.a11y.newTab}`}
        title={t.contact.linkedin}
      >
        <Icon name="linkedin" />
      </a>
      {profile.github && (
        <a
          className="icon-btn"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.contact.github} ${t.a11y.newTab}`}
          title={t.contact.github}
        >
          <Icon name="github" />
        </a>
      )}
    </>
  );
}
