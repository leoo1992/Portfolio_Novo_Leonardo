import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { ExperienceProvider } from '@/components/experience-provider';
import { SkipLink } from '@/components/skip-link';
import { getSiteUrl } from '@/lib/site-url';
import { StoreProvider } from '@/store/provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

const siteUrl = getSiteUrl();

const experienceBootstrap = String.raw\`
(function () {
  try {
    var savedTheme = localStorage.getItem('portfolio-theme') || 'system';
    var resolvedTheme =
      savedTheme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : savedTheme;
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;

    var savedLocale = localStorage.getItem('portfolio-locale');
    if (savedLocale === 'en') document.documentElement.lang = 'en-US';
    else if (savedLocale === 'es') document.documentElement.lang = 'es-ES';
    else document.documentElement.lang = 'pt-BR';
  } catch (_) {}
})();
\`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Leonardo Santos Custódio | Software Developer',
  description:
    'Portfólio de Leonardo Santos Custódio: engenharia de software, interfaces, APIs e projetos full-stack.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Leonardo Santos Custódio | Software Developer',
    description: 'Projetos full-stack, interfaces, APIs e engenharia de software.',
    url: siteUrl,
    siteName: 'Leonardo Santos Custódio',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f7ff' },
    { media: '(prefers-color-scheme: dark)', color: '#050711' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={\`\${inter.variable} \${manrope.variable}\`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: experienceBootstrap }} />
      </head>
      <body>
        <StoreProvider>
          <ExperienceProvider>
            <SkipLink />
            {children}
          </ExperienceProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
