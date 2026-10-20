import { useState } from 'react';
import { Icon } from '../components/Icon';
import { SectionHeading } from '../components/SectionHeading';
import { profile } from '../content/profile';
import { asset } from '../i18n/routes';
import { useLang } from '../i18n/useLang';
import './Contact.css';

type CopyState = 'idle' | 'copied' | 'failed';

/**
 * Contact sans formulaire : aucun service d'envoi n'est configuré, le lien e-mail
 * ouvre directement la messagerie du visiteur.
 */
export function Contact({ index }: { index: number }) {
  const { t } = useLang();
  const [copy, setCopy] = useState<CopyState>('idle');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopy('copied');
    } catch {
      setCopy('failed');
    }
    window.setTimeout(() => setCopy('idle'), 2500);
  }

  return (
    <section id="contact" data-anchor className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading index={index} id="contact-title" title={t.sections.contact} intro={t.contact.lead} />

        <div className="contact-grid">
          <div className="contact-main card reveal">
            <p className="eyebrow">{t.contact.email}</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="contact-main-actions">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                <Icon name="mail" />
                {t.contact.write}
              </a>
              <button type="button" className="btn btn-ghost" onClick={copyEmail}>
                <Icon name={copy === 'copied' ? 'check' : 'copy'} />
                {t.contact.copy}
              </button>
            </div>
            <p className="contact-status" role="status" aria-live="polite">
              {copy === 'copied' ? t.contact.copied : copy === 'failed' ? t.contact.copyFailed : ''}
            </p>
          </div>

          <ul className="contact-links reveal" role="list">
            <li>
              <a className="contact-link card" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" />
                <span>
                  <span className="contact-link-label">{t.contact.linkedin}</span>
                  <span className="contact-link-value">{profile.linkedinLabel}</span>
                </span>
                <Icon name="external" className="contact-link-end" />
                <span className="visually-hidden">{t.a11y.newTab}</span>
              </a>
            </li>
            {profile.github && (
              <li>
                <a className="contact-link card" href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Icon name="github" />
                  <span>
                    <span className="contact-link-label">{t.contact.github}</span>
                    <span className="contact-link-value">{profile.github.replace(/^https?:\/\//, '')}</span>
                  </span>
                  <Icon name="external" className="contact-link-end" />
                  <span className="visually-hidden">{t.a11y.newTab}</span>
                </a>
              </li>
            )}
            <li>
              <a className="contact-link card" href={asset(profile.cvFile)} download>
                <Icon name="download" />
                <span>
                  <span className="contact-link-label">{t.contact.cv}</span>
                  <span className="contact-link-value">{profile.cvFile.split('/').pop()}</span>
                </span>
              </a>
            </li>
            <li>
              <div className="contact-link card is-static">
                <Icon name="pin" />
                <span>
                  <span className="contact-link-label">{t.contact.location}</span>
                  <span className="contact-link-value">{profile.location}</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
