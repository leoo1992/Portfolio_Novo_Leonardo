# Cloudflare Pages

This frontend is configured as a Next.js static export for Cloudflare Pages.

## Dashboard settings

- Framework preset: `Next.js (Static HTML Export)`
- Production branch: `master`
- Root directory: `apps/web`
- Build command: `npx next build`
- Build output directory: `out`
- Node.js: 22 (Cloudflare default is compatible)

No runtime API is required by the exported site. GitHub portfolio data is fetched while the site is built.

Build variables:

- `GITHUB_TOKEN` (secret, recommended): used server-side during the build to read the authenticated account's private repository count and to increase GitHub API limits. It is never sent to the browser.
- `PRIVATE_REPO_COUNT` (optional fallback): non-secret numeric fallback used only when the authenticated GitHub request is unavailable. The code currently falls back to the last verified count of 4.

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
