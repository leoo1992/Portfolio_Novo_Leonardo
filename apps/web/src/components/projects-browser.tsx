'use client';

import { useDeferredValue, useMemo } from 'react';
import type { PortfolioProject } from '@/types/github';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetFilters, setLanguage, setQuery } from '@/store/projects-slice';
import { useExperience } from './experience-provider';
import { ArrowUpRightIcon, ForkIcon, SearchIcon, StarIcon } from './icons';
import { TiltSurface } from './tilt-surface';

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function ProjectsBrowser({ projects }: { projects: PortfolioProject[] }) {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((state) => state.projectsUi);
  const deferredQuery = useDeferredValue(ui.query);
  const { localeTag, t } = useExperience();

  const demoProjects = useMemo(
    () => projects.filter((project) => Boolean(project.homepage)),
    [projects],
  );

  const languages = useMemo(
    () =>
      [...new Set(demoProjects.map((project) => project.language).filter(Boolean) as string[])].sort(),
    [demoProjects],
  );

  const filtered = useMemo(() => {
    const query = deferredQuery.trim().toLocaleLowerCase(localeTag);

    return [...demoProjects]
      .filter((project) => ui.language === 'all' || project.language === ui.language)
      .filter((project) => {
        if (!query) return true;

        const haystack = [
          project.name,
          project.description ?? '',
          project.language ?? '',
          ...project.topics,
        ]
          .join(' ')
          .toLocaleLowerCase(localeTag);

        return haystack.includes(query);
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  }, [deferredQuery, demoProjects, localeTag, ui.language]);

  return (
    <section id="projetos" className="projects-section" aria-labelledby="projects-title">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t('projectsEyebrow')}</p>
            <h2 id="projects-title">{t('projectsTitle')}</h2>
          </div>
          <p className="results-count" aria-live="polite">
            <strong>{filtered.length}</strong>
            <span>/ {demoProjects.length} {t('results')}</span>
          </p>
        </div>

        <div className="filters-panel filters-panel-compact">
          <div className="filters project-filters" role="search" aria-label={t('filtersLabel')}>
            <label className="filter-field search-field project-search">
              <span className="sr-only">{t('searchLabel')}</span>
              <span className="filter-leading-icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={ui.query}
                onChange={(event) => dispatch(setQuery(event.target.value))}
                placeholder={t('searchPlaceholder')}
                autoComplete="off"
              />
            </label>

            <label className="filter-field project-language-filter">
              <span className="sr-only">{t('languageFilter')}</span>
              <span className="filter-leading-icon filter-code-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
                </svg>
              </span>
              <select
                aria-label={t('languageFilter')}
                value={ui.language}
                onChange={(event) => dispatch(setLanguage(event.target.value))}
              >
                <option value="all">{t('allLanguages')}</option>
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
              <span className="filter-chevron" aria-hidden="true">⌄</span>
            </label>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state" role="status">
            <p>{t('emptyTitle')}</p>
            <button className="text-button" type="button" onClick={() => dispatch(resetFilters())}>
              {t('clearFilters')}
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {filtered.map((project) => (
              <TiltSurface className="project-tilt" key={project.id}>
                <article className="project-card">
                  <div className="project-card-topline">
                    <div className="project-badges">
                      <span className="project-language">
                        {project.language ?? t('projectGeneric')}
                      </span>
                      {project.archived ? (
                        <span className="archive-badge">{t('archived')}</span>
                      ) : null}
                    </div>
                    <span className="project-meta">
                      {formatDate(project.updatedAt, localeTag)}
                    </span>
                  </div>

                  <h3>{project.name}</h3>
                  <p className="project-description">
                    {project.description ?? t('projectFallback')}
                  </p>

                  {project.topics.length > 0 ? (
                    <ul className="topics" aria-label={t('topicsLabel')}>
                      {project.topics.slice(0, 5).map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="project-footer">
                    <div className="project-stats">
                      <span className="stars" aria-label={String(project.stars) + ' ' + t('stars')}>
                        <StarIcon /> {project.stars}
                      </span>
                      <span className="stars" aria-label={String(project.forks) + ' ' + t('forks')}>
                        <ForkIcon /> {project.forks}
                      </span>
                    </div>

                    <div className="project-links">
                      <a href={project.homepage!} target="_blank" rel="noreferrer">
                        {t('demo')} <ArrowUpRightIcon />
                      </a>
                      <a href={project.url} target="_blank" rel="noreferrer">
                        {t('code')} <ArrowUpRightIcon />
                      </a>
                    </div>
                  </div>
                </article>
              </TiltSurface>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
