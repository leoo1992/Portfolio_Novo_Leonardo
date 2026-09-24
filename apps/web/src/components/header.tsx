'use client';

import { useExperience } from './experience-provider';
import { GitHubIcon, LinkedInIcon, MoonIcon, SunIcon } from './icons';

const LINKEDIN_URL = 'https://www.linkedin.com/in/leocustodio1992/';

export function Header() {
  const { theme, setTheme, t } = useExperience();
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

          <div className="experience-controls" aria-label="Preferências da interface">
            <button
              className="theme-switcher"
              type="button"
              data-theme={theme}
              onClick={() => setTheme(nextTheme)}
              aria-label={`${t('themeLabel')}: ${nextTheme === 'dark' ? t('themeDark') : t('themeLight')}`}
              title={nextTheme === 'dark' ? t('themeDark') : t('themeLight')}
            >
              <span className="theme-switcher-icon theme-switcher-sun" aria-hidden="true">
                <SunIcon />
              </span>
              <span className="theme-switcher-icon theme-switcher-moon" aria-hidden="true">
                <MoonIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
