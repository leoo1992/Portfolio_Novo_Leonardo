'use client';

import { useExperience } from './experience-provider';
import { GitHubIcon, LinkedInIcon } from './icons';

export function Footer() {
  const { t } = useExperience();

  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div>
          <p className="footer-name">Leonardo Santos Custódio</p>
          <p>{t('footerRole')}</p>
        </div>

        <div className="footer-center">
          <span className="footer-pulse" aria-hidden="true" />
          <span>{t('footerBuilt')}</span>
        </div>

        <nav className="footer-social" aria-label={t('footerSocial')}>
          <a
            className="icon-link"
            href="https://github.com/leoo1992"
            target="_blank"
            rel="noreferrer"
            aria-label={t('navGithub')}
          >
            <GitHubIcon />
          </a>
          <a
            className="icon-link"
            href="https://www.linkedin.com/in/leocustodio1992/"
            target="_blank"
            rel="noreferrer"
            aria-label={t('navLinkedin')}
          >
            <LinkedInIcon />
          </a>
        </nav>
      </div>
    </footer>
  );
}
