'use client';

import { useExperience } from './experience-provider';

const projects = [
  {
    id:'sentinela-sst', name:'Sentinela SST',
    problemPt:'Apoia inspeções visuais de SST e análises posturais com visão computacional, sem enviar frames de vídeo à API.',
    problemEn:'Supports visual OHS inspections and posture analysis with computer vision, without sending video frames to the API.',
    stack:'Next.js · React · TypeScript · TensorFlow.js · MoveNet · Python · FastAPI',
    demo:'https://sentinela-sst-zeta.vercel.app', code:'https://github.com/leoo1992/sentinela-sst',
  },
  {
    id:'sistema_ponto', name:'Sistema Ponto',
    problemPt:'Centraliza a experiência de registro e acompanhamento de ponto integrada a uma API REST Java/Spring.',
    problemEn:'Provides a time-recording and attendance interface integrated with a Java/Spring REST API.',
    stack:'React · TypeScript · Vite · Material UI · DaisyUI · Axios',
    demo:'https://sistema-ponto-two.vercel.app', code:'https://github.com/leoo1992/sistema_ponto',
  },
  {
    id:'hero-app-back', name:'Hero App',
    problemPt:'Organiza usuários, papéis, heróis, projetos e batalhas em uma API com autenticação e persistência relacional.',
    problemEn:'Manages users, roles, heroes, projects, and battles through an API with authentication and relational persistence.',
    stack:'Node.js · TypeScript · NestJS · PostgreSQL · TypeORM · JWT · Docker',
    demo:null, code:'https://github.com/leoo1992/hero-app-back', extra:'https://github.com/leoo1992/hero-app-front',
  },
  {
    id:'pulsebi', name:'PulseBI',
    problemPt:'Transforma dados sintéticos de negócio em indicadores executivos, análises de receita, clientes e exploração self-service.',
    problemEn:'Turns synthetic business data into executive KPIs, revenue and customer analysis, and self-service exploration.',
    stack:'Next.js · React · TypeScript · Tailwind CSS · SVG · Route Handlers',
    demo:'https://pulsebi-three.vercel.app', code:'https://github.com/leoo1992/pulsebi',
  },
  {
    id:'quake-vision', name:'Quake Vision',
    problemPt:'Apresenta eventos sísmicos reais do USGS em mapa interativo, com filtros por magnitude, profundidade e período.',
    problemEn:'Displays real USGS seismic events on an interactive map with magnitude, depth, and time filters.',
    stack:'Next.js · React · TypeScript · NestJS · Redux Toolkit · MapLibre · Recharts',
    demo:'https://quake-vision-web.vercel.app', code:'https://github.com/leoo1992/quake-vision',
  },
  {
    id:'Leo-AI-poc', name:'Leo AI POC',
    problemPt:'Demonstra um assistente conversacional com entrada por texto e voz e integração server-side com modelo generativo.',
    problemEn:'Demonstrates a conversational assistant with text and voice input and a server-side generative AI integration.',
    stack:'React · TypeScript · Vite · Tailwind CSS · DaisyUI · Google Gemini',
    demo:'https://chat-gpt-poc-beta.vercel.app', code:'https://github.com/leoo1992/Leo-AI-poc',
  },
];

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
          {projects.map((project,index)=>(
            <article className="featured-project-card" key={project.id}>
              <div className="featured-project-image" role="img" aria-label={en ? 'Demo screenshot not yet provided' : 'Screenshot da demonstração ainda não fornecido'}>
                <span>{en ? 'DEMO SCREENSHOT' : 'SCREENSHOT DA DEMO'}</span>
                <strong>{en ? 'Image placeholder' : 'Espaço reservado para imagem'}</strong>
              </div>
              <div className="featured-project-content">
                <p className="featured-project-index">{String(index+1).padStart(2,'0')} / 06</p>
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
