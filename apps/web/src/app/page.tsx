import { PortfolioRouter } from '@/components/portfolio-router';
import { getPortfolio } from '@/lib/portfolio-api';
import { getSiteUrl } from '@/lib/site-url';

export const dynamic = 'force-static';

const LINKEDIN_URL = 'https://www.linkedin.com/in/leocustodio1992/';

export default async function HomePage() {
  const portfolio = await getPortfolio();
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
      <PortfolioRouter
        profile={portfolio.profile}
        projects={portfolio.projects}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
