'use client';

import { useState } from 'react';
import type { PortfolioProject } from '@/types/github';
import { useExperience } from './experience-provider';

const skills = [
  {name:'Oracle / PL/SQL', keys:['oracle','pl/sql','sql']},
  {name:'JavaScript / TypeScript', keys:['javascript','typescript']},
  {name:'React / Next.js', keys:['react','next']},
  {name:'Python / Automação', keys:['python']},
  {name:'APIs / Integrações', keys:['api','nest']},
  {name:'BI / Dados', keys:['bi','data','dashboard']},
];

export function ProfessionalProfile({projects}:{projects:PortfolioProject[]}) {
  const [active,setActive]=useState<string|null>(null);
  const { localeTag } = useExperience();
  const en = localeTag.toLowerCase().startsWith('en');
  const matching = active ? projects.filter(p => {
    const hay=[p.name,p.description,p.language,...(p.topics??[])].filter(Boolean).join(' ').toLowerCase();
    return skills.find(s=>s.name===active)?.keys.some(k=>hay.includes(k)) ?? false;
  }).slice(0,4) : [];

  return <>
    <section id="sobre" className="professional-section shell" aria-labelledby="about-title">
      <div className="section-kicker" data-reveal>01 / {en ? 'PROFESSIONAL PROFILE' : 'PERFIL PROFISSIONAL'}</div>
      <div className="professional-grid">
        <div data-reveal>
          <h2 id="about-title">{en ? 'Software, data, and product — from business rules to user interface.' : 'Software, dados e produto — da regra de negócio à interface.'}</h2>
        </div>
        <div className="professional-copy" data-reveal>
          <p>{en ? 'Software developer focused on web applications, interfaces, APIs, and business systems.' : 'Desenvolvedor de software com foco em aplicações web, interfaces, APIs e sistemas corporativos.'}</p>
          <p>{en ? 'I connect business requirements, application logic, integrations, and user experience.' : 'Conecto requisitos de negócio, lógica de aplicação, integrações e experiência do usuário.'}</p>
          <div className="profile-facts">
            <span><strong>{en ? 'Location' : 'Localização'}</strong><!-- PREENCHER --></span>
            <span><strong>{en ? 'Education' : 'Formação'}</strong><!-- PREENCHER --></span>
            <span><strong>{en ? 'Focus' : 'Foco'}</strong>Full Stack · Web · APIs</span>
          </div>
        </div>
      </div>
    </section>

    <section id="experiencia" className="professional-section experience-section" aria-labelledby="experience-title">
      <div className="shell">
        <div className="section-kicker" data-reveal>02 / {en ? 'EXPERIENCE' : 'EXPERIÊNCIA'}</div>
        <h2 id="experience-title" data-reveal>{en ? 'Professional experience' : 'Experiência profissional'}</h2>
        <div className="timeline">
          <article className="timeline-item" data-reveal>
            <time><!-- PREENCHER: período --></time>
            <div>
              <span><!-- PREENCHER: empresa --></span>
              <h3><!-- PREENCHER: cargo --></h3>
              <ul><li><!-- PREENCHER: destaque 1 --></li><li><!-- PREENCHER: destaque 2 --></li><li><!-- PREENCHER: destaque 3 --></li></ul>
            </div>
          </article>
          <article className="timeline-item" data-reveal>
            <time>{en ? 'Freelance / Current project' : 'Freelance / Projeto entregue'}</time>
            <div>
              <span><a href="https://www.construtoraleggo.com.br/" target="_blank" rel="noreferrer">LEGGO Construções</a></span>
              <h3>{en ? 'Website development' : 'Desenvolvimento de site institucional'}</h3>
              <p>{en ? 'Next.js corporate website, image optimization, and on-page SEO. Live in production for the client.' : 'Site institucional em Next.js, otimização de imagens e SEO on-page. Projeto em produção para cliente.'}</p>
              <ul><li>Next.js</li><li>{en ? 'Image optimization' : 'Otimização de imagens'}</li><li>SEO on-page</li></ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="stack" className="professional-section shell stack-section" aria-labelledby="stack-title">
      <div className="section-kicker" data-reveal>03 / STACK EXPLORER</div>
      <div className="stack-heading" data-reveal><h2 id="stack-title">{en ? 'Technology connected to real work.' : 'Tecnologia conectada a entregas reais.'}</h2><p>{en ? 'Select a skill to relate it to public portfolio projects.' : 'Selecione uma competência para relacioná-la aos projetos públicos do portfólio.'}</p></div>
      <div className="skill-grid" data-reveal>
        {skills.map(skill=><button key={skill.name} className={active===skill.name?'skill-chip active':'skill-chip'} onClick={()=>setActive(active===skill.name?null:skill.name)} aria-pressed={active===skill.name}>{skill.name}</button>)}
      </div>
      <div className="skill-results" aria-live="polite">
        {active && <><p><strong>{active}</strong> · {matching.length ? (en ? 'related projects' : 'projetos relacionados') : (en ? 'No public project mapped to this skill yet.' : 'Nenhum projeto público relacionado a esta competência.')}</p>{matching.length>0&&<div className="skill-projects">{matching.map(p=><a key={p.name} href={p.url} target="_blank" rel="noreferrer">{p.name}<span>↗</span></a>)}</div>}</>}
      </div>
    </section>

    <section className="professional-section shell education-section" aria-labelledby="education-title">
      <div className="section-kicker" data-reveal>04 / {en ? 'EDUCATION' : 'FORMAÇÃO'}</div>
      <h2 id="education-title" data-reveal>{en ? 'Education' : 'Formação acadêmica'}</h2>
      <div className="education-grid" data-reveal>
        <article><span><!-- PREENCHER: período --></span><h3><!-- PREENCHER: curso --></h3><p><!-- PREENCHER: instituição --></p><ul><li><!-- PREENCHER: destaque 1 --></li><li><!-- PREENCHER: destaque 2 --></li></ul></article>
        <article><span><!-- PREENCHER: período --></span><h3><!-- PREENCHER: curso --></h3><p><!-- PREENCHER: instituição --></p><ul><li><!-- PREENCHER: destaque 1 --></li><li><!-- PREENCHER: destaque 2 --></li></ul></article>
      </div>
    </section>

    <section id="contato" className="professional-section shell education-section" aria-labelledby="contact-title">
      <div className="section-kicker" data-reveal>05 / {en ? 'CONTACT' : 'CONTATO'}</div>
      <h2 id="contact-title" data-reveal>{en ? 'Get in touch.' : 'Entre em contato.'}</h2>
      <div className="education-grid" data-reveal>
        <p><a href="https://www.linkedin.com/in/leocustodio1992" target="_blank" rel="noreferrer">LinkedIn</a></p>
        <p><a href="https://github.com/leoo1992" target="_blank" rel="noreferrer">GitHub</a></p>
        <p>{en ? 'Email' : 'E-mail'}: <!-- PREENCHER: e-mail --></p>
        <p>{en ? 'Resume (PDF)' : 'Currículo (PDF)'}: <!-- PREENCHER: link do PDF --></p>
      </div>
    </section>

    <section className="terminal-section shell" aria-label={en ? 'Interactive terminal' : 'Terminal interativo'} data-reveal>
      <Terminal />
    </section>
  </>;
}

function Terminal(){
  const [cmd,setCmd]=useState('help');
  const output:Record<string,string>={
    help:'Comandos: whoami · skills · projects · contact',
    whoami:'Leonardo Santos Custódio — Full Stack Developer · Oracle/PLSQL · JavaScript/TypeScript · React/Next.js · BI',
    skills:'Oracle · PL/SQL · SQL · JavaScript · TypeScript · Python · React · Next.js · Git · APIs · BI · Integrações',
    projects:'Use a seção Projetos para explorar código, demos e tecnologias.',
    contact:'LinkedIn: /in/leocustodio1992 · GitHub: @leoo1992',
  };
  return <div className="terminal-card"><div className="terminal-bar"><i/><i/><i/><span>leonardo@portfolio:~</span></div><div className="terminal-output"><span>$ {cmd}</span><p>{output[cmd]??'Comando não encontrado. Digite help.'}</p></div><form onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);setCmd(String(f.get('command')||'help').trim().toLowerCase());e.currentTarget.reset();}}><label htmlFor="terminal-command">$</label><input id="terminal-command" name="command" autoComplete="off" placeholder="help" aria-label="Comando do terminal"/><button type="submit">Executar</button></form></div>
}
