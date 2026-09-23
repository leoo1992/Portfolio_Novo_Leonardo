import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { StoreProvider } from '@/store/provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Leonardo Santos Custódio | Desenvolvedor de Software',
  description: 'Portfólio de projetos e experiências em desenvolvimento de software.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Leonardo Santos Custódio | Desenvolvedor de Software',
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
    { media: '(prefers-color-scheme: light)', color: '#f7f8fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0d10' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
