'use client';

import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { type Locale, useExperience } from './experience-provider';
import { GitHubIcon, LinkedInIcon, MoonIcon, SunIcon } from './icons';

const LINKEDIN_URL = 'https://www.linkedin.com/in/leocustodio1992/';

const languageOptions: Array<{ locale: Locale; code: string; label: string }> = [
  { locale: 'pt', code: 'PT', label: 'Português' },
  { locale: 'en', code: 'EN', label: 'English' },
  { locale: 'es', code: 'ES', label: 'Español' },
];

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

function LanguageSelector() {
  const { locale, setLocale, t } = useExperience();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected =
    languageOptions.find((option) => option.locale === locale) ??
    languageOptions[0]!;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const chooseLanguage = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setOpen(false);
  };

  return (
    <div className="language-picker" ref={rootRef}>
      <button
        className="language-trigger"
        type="button"
        aria-label={t('languageLabel')}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="language-flag"><LanguageFlag locale={selected.locale} /></span>
        <span className="language-code">{selected.code}</span>
        <span className="language-chevron" aria-hidden="true">⌄</span>
      </button>

      {open ? (
        <div className="language-menu" role="listbox" aria-label={t('languageLabel')}>
          {languageOptions.map((option) => (
            <button
              key={option.locale}
              className="language-option"
              type="button"
              role="option"
              aria-selected={option.locale === locale}
              onClick={() => chooseLanguage(option.locale)}
            >
              <span className="language-flag"><LanguageFlag locale={option.locale} /></span>
              <span className="language-option-copy">
                <strong>{option.code}</strong>
                <small>{option.label}</small>
              </span>
              <span className="language-check" aria-hidden="true">
                {option.locale === locale ? '✓' : ''}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Header() {
  const { theme, setTheme, t } = useExperience();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" to="/" aria-label="Leonardo Santos — home">
          <span className="brand-mark" aria-hidden="true">LS</span>
          <span className="brand-copy">
            <strong>Leonardo Santos</strong>
            <small>Software Developer</small>
          </span>
        </Link>

        <div className="header-actions">
          <nav aria-label={t('navLabel')}>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
              to="/projects"
            >
              {t('navProjects')}
            </NavLink>
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
            <LanguageSelector />
            <button
              className="theme-switcher"
              type="button"
              data-theme={theme}
              onClick={() => setTheme(nextTheme)}
              aria-label={`${t('themeLabel')}: ${nextTheme === 'dark' ? t('themeDark') : t('themeLight')}`}
              title={nextTheme === 'dark' ? t('themeDark') : t('themeLight')}
            >
              <span className="theme-switcher-icon theme-switcher-sun" aria-hidden="true"><SunIcon /></span>
              <span className="theme-switcher-icon theme-switcher-moon" aria-hidden="true"><MoonIcon /></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
