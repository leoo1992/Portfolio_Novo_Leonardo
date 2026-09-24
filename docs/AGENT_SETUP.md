# Vercel Plugin para agentes

O portfólio disponibiliza o plugin oficial da Vercel como ferramenta para agentes de código.

Instalação:

```bash
npx plugins add vercel/vercel-plugin
```

Atalho no monorepo:

```bash
npm run agent:vercel
```

O comando é deliberadamente uma ferramenta de desenvolvimento. Ele não é executado em `postinstall` nem durante o build/deploy do site.
