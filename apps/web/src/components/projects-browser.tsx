'use client';

import { profileData } from '@/lib/profile-data';
import { useExperience } from './experience-provider';

export function ProjectsBrowser() {
  const { localeTag } = useExperience();
  const en = localeTag.toLowerCase().startsWith('en');
  return (
    <section id="projetos" className="projects-section featured-projects-section" aria-labelledby="projects-title">
      <div className="shell">
        <div className="work-heading">
          <div><p className="eyebrow">SELECTED / WORK</p><h2 id="projects-title">{en ? 'Selected projects' : 'Projetos em destaque'}</h2></div>
          <div className="work-heading-side"><p>{en ? 'Six public projects and their technical context.' : 'Seis projetos públicos e seu contexto técnico.'}</p><span>06 / 06</span></div>
        </div>
        <div className="featured-project-grid">
          {profileData.projects.map((project, index) => (
            <article className="featured-project-card" key={project.id}>
              <div className="featured-project-image" role="img" aria-label={en ? 'Demo screenshot not yet provided' : 'Screenshot da demonstração ainda não fornecido'}>
                <span>{en ? 'DEMO SCREENSHOT' : 'SCREENSHOT DA DEMO'}</span>
                <strong>{en ? 'Image placeholder' : 'Espaço reservado para imagem'}</strong>
              </div>
              <div className="featured-project-content">
                <p className="featured-project-index">{String(index + 1).padStart(2, '0')} / 06</p>
                <h3>{project.name}</h3>
                <p>{en ? project.problemEn : project.problemPt}</p>
                <p className="featured-project-stack"><strong>Stack:</strong> {project.stack}</p>
                <div className="featured-project-links">
                  {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer">{en ? 'Live demo' : 'Demo'} ↗</a> : <span>{en ? 'Demo not published' : 'Demo não publicada'}</span>}
                  <a href={project.code} target="_blank" rel="noreferrer">{en ? 'Source code' : 'Código'} ↗</a>
                  {project.extra ? <a href={project.extra} target="_blank" rel="noreferrer">{en ? 'Front-end' : 'Front-end'} ↗</a> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
