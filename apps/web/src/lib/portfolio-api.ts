import type { GitHubProfile, PortfolioProject, PortfolioResponse } from '@/types/github';

interface GitHubUserResponse {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
}

interface GitHubRepositoryResponse {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  archived: boolean;
  topics?: string[];
  updated_at: string;
}

const GITHUB_USERNAME = 'leoo1992';

export async function getPortfolio(): Promise<PortfolioResponse> {
  const apiUrl = process.env.API_INTERNAL_URL?.trim();

  if (apiUrl) {
    try {
      const response = await fetch(`${apiUrl.replace(/\/$/, '')}/api/projects`, {
        next: { revalidate: 300 },
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        return response.json() as Promise<PortfolioResponse>;
      }

      console.error(`Portfolio API returned ${response.status}. Using GitHub fallback.`);
    } catch (error) {
      console.error('Portfolio API unavailable. Using GitHub fallback.', error);
    }
  }

  return getPortfolioFromGitHub();
}

async function getPortfolioFromGitHub(): Promise<PortfolioResponse> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'leonardo-portfolio-web',
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const [userResponse, repositoriesResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 300 },
      headers,
    }),
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc`,
      {
        next: { revalidate: 300 },
        headers,
      },
    ),
  ]);

  if (!userResponse.ok || !repositoriesResponse.ok) {
    throw new Error(
      `GitHub fallback failed: profile=${userResponse.status}, repositories=${repositoriesResponse.status}`,
    );
  }

  const user = (await userResponse.json()) as GitHubUserResponse;
  const repositories = (await repositoriesResponse.json()) as GitHubRepositoryResponse[];

  const profile: GitHubProfile = {
    login: user.login,
    name: user.name ?? user.login,
    avatarUrl: user.avatar_url,
    profileUrl: user.html_url,
    bio: user.bio,
    location: user.location,
    publicRepos: user.public_repos,
    followers: user.followers,
  };

  const projects: PortfolioProject[] = repositories
    .filter((repository) => repository.private === false)
    .map((repository) => ({
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      url: repository.html_url,
      homepage: normalizeHomepage(repository.homepage),
      language: repository.language,
      topics: repository.topics ?? [],
      stars: repository.stargazers_count,
      forks: repository.forks_count,
      isFork: repository.fork,
      archived: repository.archived,
      updatedAt: repository.updated_at,
    }));

  return {
    profile,
    projects,
    generatedAt: new Date().toISOString(),
  };
}

function normalizeHomepage(value: string | null) {
  if (!value) return null;

  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}
