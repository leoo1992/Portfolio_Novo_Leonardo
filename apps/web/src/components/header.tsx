'use client';

import {
  type Locale,
  type ThemePreference,
  useExperience,
} from './experience-provider';
import { GitHubIcon, LinkedInIcon } from './icons';

const LINKEDIN_URL = 'https://www.linkedin.com/in/leocustodio1992/';

export function Header() {
  const { locale, setLocale, theme, setTheme, t } = useExperience();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="Leonardo Santos — home">
          <span className="brand-mark" aria-hidden="true">LS</span>
          <span className="brand-copy">
            <strong>Leonardo Santos</strong>
            <small>Software Developer</small>
          </span>
        </a>

        <div className="header-actions">
          <nav aria-label={t('navLabel')}>
            <a className="nav-link" href="#projetos">{t('navProjects')}</a>
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
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={t('navLinkedin')}
            >
              <LinkedInIcon />
            </a>
          </nav>

          <div className="experience-controls" aria-label="Interface preferences">
            <label className="compact-control">
              <span className="sr-only">{t('languageLabel')}</span>
              <select
                aria-label={t('languageLabel')}
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
              >
                <option value="pt">PT</option>
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </label>

            <label className="compact-control theme-control">
              <span className="sr-only">{t('themeLabel')}</span>
              <select
                aria-label={t('themeLabel')}
                value={theme}
                onChange={(event) => setTheme(event.target.value as ThemePreference)}
              >
                <option value="system">{t('themeSystem')}</option>
                <option value="light">{t('themeLight')}</option>
                <option value="dark">{t('themeDark')}</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}
