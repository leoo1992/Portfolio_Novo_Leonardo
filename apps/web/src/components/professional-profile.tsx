'use client';

import { useState } from 'react';
import type { PortfolioProject } from '@/types/github';

const skills = [
  {name:'Oracle / PL/SQL', keys:['oracle','pl/sql','sql']},
  {name:'JavaScript / TypeScript', keys:['javascript','typescript']},
  {name:'React / Next.js', keys:['react','next']},
  {name:'Python / Automação', keys:['python']},
  {name:'APIs / Integrações', keys:['api','nest']},
  {name:'BI / Dados', keys:['bi','data','dashboard']},
];

const experience = [
  ['2025 — atual','UpQuery','Desenvolvedor Full Stack','Oracle, PL/SQL, SQL, JavaScript, Python, BI, APIs e integrações em soluções corporativas de produção.'],
  ['2024 — atual','Consultoria','Desenvolvedor Full Stack','Arquitetura e entrega de aplicação web responsiva com Next.js, React, Tailwind CSS, NestJS e APIs.'],
  ['2024 — 2025','Agrosys Tecnologia','Desenvolvedor Full Stack','Manutenção evolutiva de ERP e funcionalidades com Progress 4GL, SQL, JavaScript, HTML/CSS e Linux.'],
  ['2023 — 2024','Useall Software','Desenvolvedor Front-End','SaaS para cooperativas de energia elétrica com JavaScript, Sencha ExtJS, Azure DevOps, CI/CD e Scrum.'],
];

export function ProfessionalProfile({projects}:{projects:PortfolioProject[]}) {
  const [active,setActive]=useState<string|null>(null);
  const matching = active ? projects.filter(p => {
    const hay=[p.name,p.description,p.language,...(p.topics??[])].filter(Boolean).join(' ').toLowerCase();
    return skills.find(s=>s.name===active)?.keys.some(k=>hay.includes(k)) ?? false;
  }).slice(0,4) : [];

  return <>
    <section id="sobre" className="professional-section shell" aria-labelledby="about-title">
      <div className="section-kicker" data-reveal>01 / PERFIL PROFISSIONAL</div>
      <div className="professional-grid">
        <div data-reveal>
          <h2 id="about-title">Software, dados e produto — da regra de negócio à interface.</h2>
        </div>
        <div className="professional-copy" data-reveal>
          <p>Desenvolvedor Full Stack com experiência em sistemas corporativos, Business Intelligence e aplicações web. Atuo entre banco de dados, lógica de negócio, integrações, automações e experiência do usuário.</p>
          <p>Minha trajetória combina Oracle/PL/SQL e processamento de dados com JavaScript/TypeScript, React, Next.js, Python, APIs e engenharia de software.</p>
          <div className="profile-facts">
            <span><strong>Base</strong>Criciúma · SC · Brasil</span>
            <span><strong>Formação</strong>Ciência da Computação · UNESC</span>
            <span><strong>Foco</strong>Full Stack · BI · Integrações</span>
          </div>
        </div>
      </div>
    </section>

    <section id="experiencia" className="professional-section experience-section" aria-labelledby="experience-title">
      <div className="shell">
        <div className="section-kicker" data-reveal>02 / EXPERIÊNCIA</div>
        <h2 id="experience-title" data-reveal>Experiência em produto e produção.</h2>
        <div className="timeline">
          {experience.map(([period,company,role,copy])=><article className="timeline-item" key={company} data-reveal>
            <time>{period}</time><div><span>{company}</span><h3>{role}</h3><p>{copy}</p></div>
          </article>)}
        </div>
      </div>
    </section>

    <section id="stack" className="professional-section shell stack-section" aria-labelledby="stack-title">
      <div className="section-kicker" data-reveal>03 / STACK EXPLORER</div>
      <div className="stack-heading" data-reveal><h2 id="stack-title">Tecnologia conectada a entregas reais.</h2><p>Selecione uma competência para relacioná-la aos projetos públicos do portfólio.</p></div>
      <div className="skill-grid" data-reveal>
        {skills.map(skill=><button key={skill.name} className={active===skill.name?'skill-chip active':'skill-chip'} onClick={()=>setActive(active===skill.name?null:skill.name)} aria-pressed={active===skill.name}>{skill.name}</button>)}
      </div>
      <div className="skill-results" aria-live="polite">
        {active && <><p><strong>{active}</strong> · {matching.length ? 'projetos relacionados' : 'competência demonstrada principalmente na experiência profissional'}</p>{matching.length>0&&<div className="skill-projects">{matching.map(p=><a key={p.name} href={p.url} target="_blank" rel="noreferrer">{p.name}<span>↗</span></a>)}</div>}</>}
      </div>
    </section>

    <section className="professional-section shell education-section" aria-labelledby="education-title">
      <div className="section-kicker" data-reveal>04 / FORMAÇÃO</div>
      <h2 id="education-title" data-reveal>Formação contínua.</h2>
      <div className="education-grid" data-reveal>
        <article><span>2024 — 2028</span><h3>Ciência da Computação</h3><p>Universidade do Extremo Sul Catarinense — UNESC</p></article>
        <article><span>2021 — 2023</span><h3>Desenvolvimento de Sistemas</h3><p>SENAI/SC</p></article>
      </div>
    </section>

    <section className="terminal-section shell" aria-label="Terminal interativo" data-reveal>
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
