'use client';

import { useDeferredValue, useMemo } from 'react';
import type { PortfolioProject } from '@/types/github';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetFilters,
  setIncludeArchived,
  setLanguage,
  setOnlyWithDemo,
  setQuery,
  setSort,
  type ProjectSort,
} from '@/store/projects-slice';
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

  const languages = useMemo(
    () => [...new Set(projects.map((project) => project.language).filter(Boolean) as string[])].sort(),
    [projects],
  );

  const filtered = useMemo(() => {
    const query = deferredQuery.trim().toLocaleLowerCase(localeTag);

    return [...projects]
      .filter((project) => ui.includeArchived || !project.archived)
      .filter((project) => !ui.onlyWithDemo || Boolean(project.homepage))
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
      .sort((a, b) => {
        if (ui.sort === 'stars') return b.stars - a.stars;
        if (ui.sort === 'forks') return b.forks - a.forks;
        if (ui.sort === 'name') return a.name.localeCompare(b.name, localeTag);
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [deferredQuery, localeTag, projects, ui]);

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
            <span>/ {projects.length} {t('results')}</span>
          </p>
        </div>

        <div className="filters-panel">
          <div className="filters" role="search" aria-label={t('filtersLabel')}>
            <label className="search-field">
              <span className="sr-only">{t('searchLabel')}</span>
              <SearchIcon />
              <input
                type="search"
                value={ui.query}
                onChange={(event) => dispatch(setQuery(event.target.value))}
                placeholder={t('searchPlaceholder')}
                autoComplete="off"
              />
            </label>

            <label>
              <span className="sr-only">{t('languageFilter')}</span>
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
            </label>

            <label>
              <span className="sr-only">{t('sortLabel')}</span>
              <select
                aria-label={t('sortLabel')}
                value={ui.sort}
                onChange={(event) => dispatch(setSort(event.target.value as ProjectSort))}
              >
                <option value="updated">{t('sortUpdated')}</option>
                <option value="stars">{t('sortStars')}</option>
                <option value="forks">{t('sortForks')}</option>
                <option value="name">{t('sortName')}</option>
              </select>
            </label>
          </div>

          <div className="filter-toggles">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={ui.includeArchived}
                onChange={(event) => dispatch(setIncludeArchived(event.target.checked))}
              />
              {t('includeArchived')}
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={ui.onlyWithDemo}
                onChange={(event) => dispatch(setOnlyWithDemo(event.target.checked))}
              />
              {t('onlyDemo')}
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
                      {project.homepage ? (
                        <a href={project.homepage} target="_blank" rel="noreferrer">
                          {t('demo')} <ArrowUpRightIcon />
                        </a>
                      ) : null}
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
