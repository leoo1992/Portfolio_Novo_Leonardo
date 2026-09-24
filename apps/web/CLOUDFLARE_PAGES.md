# Cloudflare Pages

This frontend is configured as a Next.js static export for Cloudflare Pages.

## Dashboard settings

- Framework preset: `Next.js (Static HTML Export)`
- Production branch: `master`
- Root directory: `apps/web`
- Build command: `npx next build`
- Build output directory: `out`
- Node.js: 22 (Cloudflare default is compatible)

No runtime API is required by the exported site. Public GitHub portfolio data is fetched while the site is built.

Optional build variable:

- `GITHUB_TOKEN`: increases GitHub API limits during the build. Do not expose it as a public variable.

## Local development

From the repository root:

```bash
npm install
npm run dev -w @portfolio/web
```

Open http://localhost:3000.

## Local production export

```bash
npm run build -w @portfolio/web
```

The static site is generated in `apps/web/out`.
