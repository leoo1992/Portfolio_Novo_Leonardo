import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ProjectsBrowser } from '@/components/projects-browser';
import { getPortfolio } from '@/lib/portfolio-api';
import { getSiteUrl } from '@/lib/site-url';

export const dynamic = 'force-static';

const LINKEDIN_URL = 'https://www.linkedin.com/in/leocustodio1992/';

export default async function HomePage() {
  const portfolio = await getPortfolio();
  const projectCount = portfolio.projects.length;
  const languageCount = new Set(
    portfolio.projects.map((project) => project.language).filter(Boolean),
  ).size;
  const starsTotal = portfolio.projects.reduce((total, project) => total + project.stars, 0);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolio.profile.name,
    url: getSiteUrl(),
    sameAs: [portfolio.profile.profileUrl, LINKEDIN_URL],
    jobTitle: 'Software Developer',
  };

  return (
    <>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <Header />
      <main id="conteudo">
        <Hero
          profile={portfolio.profile}
          projectCount={projectCount}
          languageCount={languageCount}
          starsTotal={starsTotal}
        />
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
