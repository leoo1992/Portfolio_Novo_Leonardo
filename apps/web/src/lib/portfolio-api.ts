import type { PortfolioResponse } from '@/types/github';

export async function getPortfolio(): Promise<PortfolioResponse> {
  const baseUrl = process.env.API_INTERNAL_URL ?? 'http://localhost:4000';
  const response = await fetch(`${baseUrl}/api/projects`, {
    next: { revalidate: 300 },
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Portfolio API returned ${response.status}`);
  }

  return response.json() as Promise<PortfolioResponse>;
}
