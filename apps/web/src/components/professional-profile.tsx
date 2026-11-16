'use client';

import { useState } from 'react';
import type { PortfolioProject } from '@/types/github';
import { profileData } from '@/lib/profile-data';
import { useExperience } from './experience-provider';

export function ProfessionalProfile({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState<string | null>(null);
  const { localeTag } = useExperience();
  const en = localeTag.toLowerCase().startsWith('en');
  const matching = active
    ? projects.filter((project) => {
        const haystack = [project.name, project.description, project.language, ...(project.topics ?? [])]
          .filter(Boolean).join(' ').toLowerCase();
        return profileData.skills.find((skill) => skill.name === active)?.keys.some((key) => haystack.includes(key)) ?? false;
      }).slice(0, 4)
    : [];
  const experiences = profileData.experiences.filter((item) => item.company || item.role || item.descriptionPt);
  const education = profileData.education.filter((item) => item.course || item.institution || item.details);

  return (
    <>
      <section id="sobre" className="professional-section shell" aria-labelledby="about-title">
        <div className="section-kicker" data-reveal>01 / {en ? 'PROFESSIONAL PROFILE' : 'PERFIL PROFISSIONAL'}</div>
        <div className="professional-grid">
          <div data-reveal><h2 id="about-title">{en ? 'Software, data, and product — from business rules to user interface.' : 'Software, dados e produto — da regra de negócio à interface.'}</h2></div>
          <div className="professional-copy" data-reveal>
            <p>{en ? profileData.summaryEn : profileData.summaryPt}</p>
            <div className="profile-facts">
              {profileData.location && <span><strong>{en ? 'Location' : 'Localização'}</strong>{profileData.location}</span>}
              <span><strong>{en ? 'Focus' : 'Foco'}</strong>Full Stack · Web · APIs</span>
            </div>
          </div>
        </div>
      </section>

      {experiences.length > 0 && (
        <section id="experiencia" className="professional-section experience-section" aria-labelledby="experience-title">
          <div className="shell">
            <div className="section-kicker" data-reveal>02 / {en ? 'EXPERIENCE' : 'EXPERIÊNCIA'}</div>
            <h2 id="experience-title" data-reveal>{en ? 'Professional experience' : 'Experiência profissional'}</h2>
            <div className="timeline">
              {experiences.map((item) => (
                <article className="timeline-item" data-reveal key={item.company + item.role}>
                  {item.period && <time>{item.period}</time>}
                  <div>
                    {item.company && <span>{item.company === 'LEGGO Construções' ? <a href="https://www.construtoraleggo.com.br/" target="_blank" rel="noreferrer">{item.company}</a> : item.company}</span>}
                    {item.role && <h3>{item.role}</h3>}
                    {(item.descriptionPt || item.descriptionEn) && <p>{en ? item.descriptionEn : item.descriptionPt}</p>}
                    {item.highlights?.length > 0 && <ul>{item.highlights.filter(Boolean).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="stack" className="professional-section shell stack-section" aria-labelledby="stack-title">
        <div className="section-kicker" data-reveal>03 / STACK EXPLORER</div>
        <div className="stack-heading" data-reveal><h2 id="stack-title">{en ? 'Technology connected to real work.' : 'Tecnologia conectada a entregas reais.'}</h2><p>{en ? 'Select a skill to relate it to public portfolio projects.' : 'Selecione uma competência para relacioná-la aos projetos públicos do portfólio.'}</p></div>
        <div className="skill-grid" data-reveal>
          {profileData.skills.map((skill) => <button key={skill.name} className={active === skill.name ? 'skill-chip active' : 'skill-chip'} onClick={() => setActive(active === skill.name ? null : skill.name)} aria-pressed={active === skill.name}>{skill.name}</button>)}
        </div>
        <div className="skill-results" aria-live="polite">
          {active && <><p><strong>{active}</strong> · {matching.length ? (en ? 'related projects' : 'projetos relacionados') : (en ? 'No public project mapped to this skill yet.' : 'Nenhum projeto público relacionado a esta competência.')}</p>{matching.length > 0 && <div className="skill-projects">{matching.map((project) => <a key={project.name} href={project.url} target="_blank" rel="noreferrer">{project.name}<span>↗</span></a>)}</div>}</>}
        </div>
      </section>

      {education.length > 0 && (
        <section className="professional-section shell education-section" aria-labelledby="education-title">
          <div className="section-kicker" data-reveal>04 / {en ? 'EDUCATION' : 'FORMAÇÃO'}</div>
          <h2 id="education-title" data-reveal>{en ? 'Education' : 'Formação acadêmica'}</h2>
          <div className="education-grid" data-reveal>
            {education.map((item) => <article key={item.course + item.institution}>
              {item.period && <span>{item.period}</span>}
              {item.course && <h3>{item.course}</h3>}
              {item.institution && <p>{item.institution}</p>}
              {item.details && <p>{item.details}</p>}
            </article>)}
          </div>
        </section>
      )}

      <section id="contato" className="professional-section shell education-section" aria-labelledby="contact-title">
        <div className="section-kicker" data-reveal>05 / {en ? 'CONTACT' : 'CONTATO'}</div>
        <h2 id="contact-title" data-reveal>{en ? 'Get in touch.' : 'Entre em contato.'}</h2>
        <div className="education-grid" data-reveal>
          <p><a href={profileData.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a></p>
          <p><a href={profileData.githubUrl} target="_blank" rel="noreferrer">GitHub</a></p>
          {profileData.email && <p><a href={`mailto:${profileData.email}`}>{en ? 'Email' : 'E-mail'}: {profileData.email}</a></p>}
          {profileData.resumeUrl && <p><a href={profileData.resumeUrl} target="_blank" rel="noreferrer">{en ? 'Resume (PDF)' : 'Currículo (PDF)'}</a></p>}
        </div>
      </section>
    </>
  );
}
