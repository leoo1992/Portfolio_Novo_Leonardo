'use client';

import { useDeferredValue, useMemo, type CSSProperties } from 'react';
import type { PortfolioProject } from '@/types/github';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetFilters, setLanguage, setQuery } from '@/store/projects-slice';
import { useExperience } from './experience-provider';
import { ArrowUpRightIcon, ForkIcon, SearchIcon, StarIcon } from './icons';

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function projectMark(name: string) {
  const clean = name.replace(/[^a-zA-Z0-9]/g, '');
  return (clean.slice(0, 2) || 'PR').toUpperCase();
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
    <section id="projetos" className="projects-section work-index" aria-labelledby="projects-title">
      <div className="shell">
        <div className="work-heading" data-reveal>
          <div>
            <p className="eyebrow">SELECTED / WORK</p>
            <h2 id="projects-title">{t('projectsTitle')}</h2>
          </div>
          <div className="work-heading-side">
            <p>Um índice vivo de produtos, experimentos e sistemas.</p>
            <span>{String(filtered.length).padStart(2, '0')} / {String(demoProjects.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="work-toolbar" data-reveal>
          <label className="work-search">
            <SearchIcon />
            <span className="sr-only">{t('searchLabel')}</span>
            <input
              type="search"
              value={ui.query}
              onChange={(event) => dispatch(setQuery(event.target.value))}
              placeholder={t('searchPlaceholder')}
              autoComplete="off"
            />
          </label>

          <label className="work-language">
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
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state work-empty" role="status">
            <p>{t('emptyTitle')}</p>
            <button className="text-button" type="button" onClick={() => dispatch(resetFilters())}>
              {t('clearFilters')}
            </button>
          </div>
        ) : (
          <div className="work-list">
            {filtered.map((project, index) => (
              <article
                className="work-item"
                data-reveal
                key={project.id}
                style={{ '--work-index': index } as CSSProperties}
              >
                <div className="work-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="work-main">
                  <div className="work-meta">
                    <span>{project.language ?? t('projectGeneric')}</span>
                    <span>{formatDate(project.updatedAt, localeTag)}</span>
                    {project.archived ? <span>{t('archived')}</span> : null}
                  </div>

                  <h3>{project.name}</h3>

                  <p className="work-description">
                    {project.description ?? t('projectFallback')}
                  </p>

                  {project.topics.length > 0 ? (
                    <ul className="work-topics" aria-label={t('topicsLabel')}>
                      {project.topics.slice(0, 4).map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div className="work-poster" aria-hidden="true">
                  <span className="work-poster-mark">{projectMark(project.name)}</span>
                  <span className="work-poster-language">
                    {project.language ?? 'CODE'}
                  </span>
                  <i className="work-poster-orbit" />
                  <i className="work-poster-cross work-poster-cross-a" />
                  <i className="work-poster-cross work-poster-cross-b" />
                </div>

                <div className="work-side">
                  <div className="work-stats">
                    <span><StarIcon /> {project.stars}</span>
                    <span><ForkIcon /> {project.forks}</span>
                  </div>

                  <div className="work-actions">
                    <a href={project.homepage!} target="_blank" rel="noreferrer">
                      <span>{t('demo')}</span>
                      <ArrowUpRightIcon />
                    </a>
                    <a href={project.url} target="_blank" rel="noreferrer">
                      <span>{t('code')}</span>
                      <ArrowUpRightIcon />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
