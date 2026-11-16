# Leonardo Santos Custódio — Portfolio

[Versão em português](README.md)

Full-stack portfolio built with Next.js, NestJS, React, Redux Toolkit, and Tailwind CSS.

## Architecture

- `apps/web`: Next.js App Router, React, React Router, Redux Toolkit, and Tailwind CSS.
- `apps/api`: NestJS API that reads public GitHub repository data, normalizes responses, and applies caching.
- npm workspaces monorepo.
- Client-side hash routing preserves compatibility with the static export configuration.

## Privacy and security

The API explicitly excludes private repositories from public portfolio responses. A configured GitHub token does not override this restriction.

## Local development

Requirements: Node.js 22+ and npm 10+.

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:4000/api

## Environment variables

### API (`apps/api`)

- `GITHUB_USERNAME=leoo1992`
- `GITHUB_TOKEN=` (optional; increases the GitHub API rate limit)
- `FRONTEND_ORIGIN=http://localhost:3000`

### Web (`apps/web`)

- `API_INTERNAL_URL=http://localhost:4000`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

Use local environment files only; never commit real credentials.

## Deployment

The repository is designed for separate Vercel projects using the same monorepo:

1. API project — root directory `apps/api`; configure `GITHUB_USERNAME`, optional `GITHUB_TOKEN`, and `FRONTEND_ORIGIN`.
2. Web project — root directory `apps/web`; configure `API_INTERNAL_URL` and `NEXT_PUBLIC_SITE_URL`.

## Quality

The codebase includes strict TypeScript configuration, normalized API DTOs, HTTP and in-memory caching, loading/error states, semantic HTML, skip navigation, visible focus, reduced-motion support, and responsive layouts.

Run the available checks from the repository root:

```bash
npm run lint
npm run typecheck
npm run build
```
