'use client';

import { useMemo } from 'react';
import type { PortfolioProject } from '@/types/github';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetFilters,
  setIncludeArchived,
  setLanguage,
  setQuery,
  setSort,
  type ProjectSort,
} from '@/store/projects-slice';
import { ArrowUpRightIcon, SearchIcon, StarIcon } from './icons';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function ProjectsBrowser({ projects }: { projects: PortfolioProject[] }) {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((state) => state.projectsUi);

  const languages = useMemo(
    () => [...new Set(projects.map((project) => project.language).filter(Boolean) as string[])].sort(),
    [projects],
  );

  const filtered = useMemo(() => {
    const query = ui.query.trim().toLocaleLowerCase('pt-BR');
    return [...projects]
      .filter((project) => ui.includeArchived || !project.archived)
      .filter((project) => ui.language === 'all' || project.language === ui.language)
      .filter((project) => {
        if (!query) return true;
        const haystack = [project.name, project.description ?? '', project.language ?? '', ...project.topics]
          .join(' ')
          .toLocaleLowerCase('pt-BR');
        return haystack.includes(query);
      })
      .sort((a, b) => {
        if (ui.sort === 'stars') return b.stars - a.stars;
        if (ui.sort === 'name') return a.name.localeCompare(b.name, 'pt-BR');
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [projects, ui]);

  return (
    <section id="projetos" className="projects-section" aria-labelledby="projects-title">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GitHub</p>
            <h2 id="projects-title">Projetos públicos</h2>
          </div>
          <p aria-live="polite">{filtered.length} de {projects.length} projetos</p>
        </div>

        <div className="filters" role="search" aria-label="Filtrar projetos">
          <label className="search-field">
            <span className="sr-only">Buscar projeto</span>
            <SearchIcon />
            <input
              type="search"
              value={ui.query}
              onChange={(event) => dispatch(setQuery(event.target.value))}
              placeholder="Buscar por nome, tecnologia ou tema"
              autoComplete="off"
            />
          </label>

          <label>
            <span className="sr-only">Filtrar por linguagem</span>
            <select value={ui.language} onChange={(event) => dispatch(setLanguage(event.target.value))}>
              <option value="all">Todas as linguagens</option>
              {languages.map((language) => <option key={language}>{language}</option>)}
            </select>
          </label>

          <label>
            <span className="sr-only">Ordenar projetos</span>
            <select
              value={ui.sort}
              onChange={(event) => dispatch(setSort(event.target.value as ProjectSort))}
            >
              <option value="updated">Atualizados recentemente</option>
              <option value="stars">Mais estrelas</option>
              <option value="name">Nome A–Z</option>
            </select>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={ui.includeArchived}
              onChange={(event) => dispatch(setIncludeArchived(event.target.checked))}
            />
            Incluir arquivados
          </label>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state" role="status">
            <p>Nenhum projeto corresponde aos filtros atuais.</p>
            <button className="text-button" type="button" onClick={() => dispatch(resetFilters())}>
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {filtered.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-card-topline">
                  <span className="project-language">{project.language ?? 'Projeto'}</span>
                  <span className="project-meta">{formatDate(project.updatedAt)}</span>
                </div>
                <h3>{project.name}</h3>
                <p className="project-description">
                  {project.description ?? 'Projeto disponível para consulta no GitHub.'}
                </p>

                {project.topics.length > 0 && (
                  <ul className="topics" aria-label="Tecnologias e tópicos">
                    {project.topics.slice(0, 4).map((topic) => <li key={topic}>{topic}</li>)}
                  </ul>
                )}

                <div className="project-footer">
                  <span className="stars" aria-label={\`\${project.stars} estrelas\`}>
                    <StarIcon /> {project.stars}
                  </span>
                  <div className="project-links">
                    {project.homepage && (
                      <a href={project.homepage} target="_blank" rel="noreferrer">
                        Demo <ArrowUpRightIcon />
                      </a>
                    )}
                    <a href={project.url} target="_blank" rel="noreferrer">
                      Código <ArrowUpRightIcon />
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
