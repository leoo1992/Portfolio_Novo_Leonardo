'use client';

import { type Locale, useExperience } from './experience-provider';
import { GitHubIcon, LinkedInIcon, MoonIcon, SunIcon } from './icons';

const LINKEDIN_URL = 'https://www.linkedin.com/in/leocustodio1992/';

function LanguageFlag({ locale }: { locale: Locale }) {
  if (locale === 'pt') {
    return (
      <svg viewBox="0 0 28 20" aria-hidden="true" focusable="false">
        <rect width="28" height="20" rx="2" fill="#169B3A" />
        <path d="M14 3 24 10 14 17 4 10Z" fill="#FFDF00" />
        <circle cx="14" cy="10" r="4.2" fill="#002776" />
        <path d="M10.5 9.2c2.5-.8 5.1-.4 7.2 1" fill="none" stroke="#fff" strokeWidth=".8" />
      </svg>
    );
  }

  if (locale === 'en') {
    return (
      <svg viewBox="0 0 28 20" aria-hidden="true" focusable="false">
        <rect width="28" height="20" rx="2" fill="#fff" />
        <path d="M0 0h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 4h28v2H0z" fill="#B22234" />
        <path d="M0 0h12v10H0z" fill="#3C3B6E" />
        <g fill="#fff">
          <circle cx="2.2" cy="2" r=".55" /><circle cx="5.8" cy="2" r=".55" /><circle cx="9.4" cy="2" r=".55" />
          <circle cx="4" cy="4.7" r=".55" /><circle cx="7.6" cy="4.7" r=".55" /><circle cx="2.2" cy="7.4" r=".55" />
          <circle cx="5.8" cy="7.4" r=".55" /><circle cx="9.4" cy="7.4" r=".55" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 28 20" aria-hidden="true" focusable="false">
      <rect width="28" height="20" rx="2" fill="#AA151B" />
      <path d="M0 5h28v10H0z" fill="#F1BF00" />
      <rect x="7" y="8" width="2.2" height="4.2" rx=".5" fill="#AA151B" opacity=".85" />
    </svg>
  );
}

export function Header() {
  const { locale, setLocale, theme, setTheme, t } = useExperience();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

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
            <label className="language-control" data-locale={locale}>
              <span className="language-flag">
                <LanguageFlag locale={locale} />
              </span>
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

            <button
              className="theme-toggle"
              type="button"
              data-theme={theme}
              onClick={() => setTheme(nextTheme)}
              aria-label={`${t('themeLabel')}: ${nextTheme === 'dark' ? t('themeDark') : t('themeLight')}`}
              role="switch"
              aria-checked={theme === 'dark'}
            >
              <span className="theme-toggle-icon theme-toggle-sun" aria-hidden="true">
                <SunIcon />
              </span>
              <span className="theme-toggle-icon theme-toggle-moon" aria-hidden="true">
                <MoonIcon />
              </span>
              <span className="theme-toggle-thumb" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
