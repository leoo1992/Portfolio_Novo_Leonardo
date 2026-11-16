export const profileData = {
  name: 'Leonardo Santos Custódio',
  headline: 'Desenvolvedor de Software',
  location: '', // PREENCHER
  email: '', // PREENCHER
  resumeUrl: '', // PREENCHER
  linkedinUrl: 'https://www.linkedin.com/in/leocustodio1992/',
  githubUrl: 'https://github.com/leoo1992',
  summaryPt: 'Desenvolvedor de software com foco em aplicações web, interfaces, APIs e sistemas corporativos. Conecto requisitos de negócio, lógica de aplicação, integrações e experiência do usuário.',
  summaryEn: 'Software developer focused on web applications, interfaces, APIs, and business systems. I connect business requirements, application logic, integrations, and user experience.',
  experiences: [
    {
      period: '', // PREENCHER
      company: 'LEGGO Construções',
      role: 'Desenvolvimento de site institucional',
      descriptionPt: 'Site institucional em Next.js, otimização de imagens e SEO on-page. Projeto em produção para cliente.',
      descriptionEn: 'Corporate website built with Next.js, image optimization, and on-page SEO. Delivered and running in production.',
      highlights: ['Next.js', 'Otimização de imagens', 'SEO on-page'],
    },
  ],
  education: [
    {
      period: '', // PREENCHER
      course: 'Ciência da Computação',
      institution: 'UNESC',
      details: '', // PREENCHER
    },
    {
      period: '', // PREENCHER
      course: 'Técnico em Desenvolvimento de Sistemas',
      institution: 'SENAI',
      details: '', // PREENCHER
    },
  ],
  skills: [
    { name: 'Oracle / PL/SQL', keys: ['oracle', 'pl/sql', 'sql'] },
    { name: 'JavaScript / TypeScript', keys: ['javascript', 'typescript'] },
    { name: 'React / Next.js', keys: ['react', 'next'] },
    { name: 'Python / Automação', keys: ['python'] },
    { name: 'APIs / Integrações', keys: ['api', 'nest'] },
    { name: 'BI / Dados', keys: ['bi', 'data', 'dashboard'] },
  ],
  projects: [
    { id: 'sentinela-sst', name: 'Sentinela SST', problemPt: 'Apoia inspeções visuais de SST e análises posturais com visão computacional, sem enviar frames de vídeo à API.', problemEn: 'Supports visual OHS inspections and posture analysis with computer vision, without sending video frames to the API.', stack: 'Next.js · React · TypeScript · TensorFlow.js · MoveNet · Python · FastAPI', demo: 'https://sentinela-sst-zeta.vercel.app', code: 'https://github.com/leoo1992/sentinela-sst' },
    { id: 'sistema_ponto', name: 'Sistema Ponto', problemPt: 'Centraliza a experiência de registro e acompanhamento de ponto integrada a uma API REST Java/Spring.', problemEn: 'Provides a time-recording and attendance interface integrated with a Java/Spring REST API.', stack: 'React · TypeScript · Vite · Material UI · DaisyUI · Axios', demo: 'https://sistema-ponto-two.vercel.app', code: 'https://github.com/leoo1992/sistema_ponto' },
    { id: 'hero-app-back', name: 'Hero App', problemPt: 'Organiza usuários, papéis, heróis, projetos e batalhas em uma API com autenticação e persistência relacional.', problemEn: 'Manages users, roles, heroes, projects, and battles through an API with authentication and relational persistence.', stack: 'Node.js · TypeScript · NestJS · PostgreSQL · TypeORM · JWT · Docker', code: 'https://github.com/leoo1992/hero-app-back', extra: 'https://github.com/leoo1992/hero-app-front' },
    { id: 'pulsebi', name: 'PulseBI', problemPt: 'Transforma dados sintéticos de negócio em indicadores executivos, análises de receita, clientes e exploração self-service.', problemEn: 'Turns synthetic business data into executive KPIs, revenue and customer analysis, and self-service exploration.', stack: 'Next.js · React · TypeScript · Tailwind CSS · SVG · Route Handlers', demo: 'https://pulsebi-three.vercel.app', code: 'https://github.com/leoo1992/pulsebi' },
    { id: 'quake-vision', name: 'Quake Vision', problemPt: 'Apresenta eventos sísmicos reais do USGS em mapa interativo, com filtros por magnitude, profundidade e período.', problemEn: 'Displays real USGS seismic events on an interactive map with magnitude, depth, and time filters.', stack: 'Next.js · React · TypeScript · NestJS · Redux Toolkit · MapLibre · Recharts', demo: 'https://quake-vision-web.vercel.app', code: 'https://github.com/leoo1992/quake-vision' },
    { id: 'Leo-AI-poc', name: 'Leo AI POC', problemPt: 'Demonstra um assistente conversacional com entrada por texto e voz e integração server-side com modelo generativo.', problemEn: 'Demonstrates a conversational assistant with text and voice input and a server-side generative AI integration.', stack: 'React · TypeScript · Vite · Tailwind CSS · DaisyUI · Google Gemini', demo: 'https://chat-gpt-poc-beta.vercel.app', code: 'https://github.com/leoo1992/Leo-AI-poc' },
  ],
} as const;
