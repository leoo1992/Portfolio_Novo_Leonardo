# Leonardo Santos Custódio — Portfolio

Portfolio full-stack com Next.js, NestJS, Redux Toolkit e Tailwind CSS.

## Arquitetura

- `apps/web`: Next.js App Router + React + Redux Toolkit + Tailwind CSS
- `apps/api`: NestJS que consulta a API pública do GitHub, normaliza os dados e aplica cache
- Monorepo com npm workspaces

## Segurança e privacidade

O backend **descarta explicitamente repositórios privados**. Mesmo que `GITHUB_TOKEN` seja configurado, o endpoint público só retorna projetos com `private === false`.

## Requisitos

- Node.js 22+
- npm 10+

## Ambiente local

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
npm run dev
```

Frontend: `http://localhost:3000`
API: `http://localhost:4000/api`

## Variáveis de ambiente

### API (`apps/api`)

- `GITHUB_USERNAME=leoo1992`
- `GITHUB_TOKEN=` opcional, recomendado em produção para aumentar o limite da API
- `FRONTEND_ORIGIN=http://localhost:3000`

### Web (`apps/web`)

- `API_INTERNAL_URL=http://localhost:4000`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

## Deploy na Vercel

A estratégia recomendada é criar **dois projetos Vercel a partir do mesmo monorepo**:

1. Projeto `portfolio-api`
   - Root Directory: `apps/api`
   - Variáveis: `GITHUB_USERNAME`, `GITHUB_TOKEN` (opcional), `FRONTEND_ORIGIN`

2. Projeto `portfolio-web`
   - Root Directory: `apps/web`
   - Variáveis: `API_INTERNAL_URL=https://<url-da-api>` e `NEXT_PUBLIC_SITE_URL=https://<seu-dominio>`

O frontend usa rewrite server-side para `/api/backend/*`, evitando expor detalhes desnecessários da API ao browser.

## Qualidade

- TypeScript estrito
- separação de responsabilidades
- API com DTO normalizado
- cache HTTP e cache em memória
- tratamento de erro e loading states
- semântica HTML
- skip link
- foco visível
- suporte a `prefers-reduced-motion`
- touch targets adequados
- layout responsivo para mobile/desktop
- dark mode via `prefers-color-scheme`
