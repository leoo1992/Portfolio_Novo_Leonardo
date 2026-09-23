import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ProjectsBrowser } from '@/components/projects-browser';
import { getPortfolio } from '@/lib/portfolio-api';

export default async function HomePage() {
  const portfolio = await getPortfolio();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolio.profile.name,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    sameAs: [portfolio.profile.profileUrl],
    jobTitle: 'Desenvolvedor de Software',
  };

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero profile={portfolio.profile} />
        <ProjectsBrowser projects={portfolio.projects} />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
