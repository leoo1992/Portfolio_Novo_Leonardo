const FALLBACK_SITE_URL = 'https://portfolio-novo-leonardo-web.vercel.app';

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return FALLBACK_SITE_URL;

  try {
    const candidate =
      configured.startsWith('http://') || configured.startsWith('https://')
        ? configured
        : \`https://\${configured}\`;
    const url = new URL(candidate);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') return FALLBACK_SITE_URL;
    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}
