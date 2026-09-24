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

interface GitHubAuthenticatedUserResponse {
  login: string;
  owned_private_repos?: number;
  total_private_repos?: number;
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
const VERIFIED_PRIVATE_REPO_COUNT = 4;

const VERIFIED_DEMOS: Record<string, string> = {
  'leoo1992/POC-NEXT-DOG-SOCIAL-NETWORK': 'https://dogs-next-final-blue.vercel.app',
  'leoo1992/biblioteca': 'https://biblioteca-pi.vercel.app',
  'leoo1992/GuessNumber': 'https://guess-number-leoo1992.vercel.app',
  'leoo1992/MemoGame-React-Vite-TS': 'https://memo-game-react-vite-ts.vercel.app',
  'leoo1992/Projeto': 'https://projeto-vert-three.vercel.app',
  'leoo1992/SvelteTraining': 'https://svelte-training-five.vercel.app',
  'leoo1992/sistema_ponto': 'https://sistema-ponto-two.vercel.app',
  'leoo1992/inputSvelte': 'https://input-svelte.vercel.app',
  'leoo1992/GeradorQRCode': 'https://gerador-qr-code-lovat.vercel.app',
  'leoo1992/task-list': 'https://task-list-beta-sandy.vercel.app',
};

export async function getPortfolio(): Promise<PortfolioResponse> {
  return getPortfolioFromGitHub();
}

async function getPortfolioFromGitHub(): Promise<PortfolioResponse> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'leonardo-portfolio-web',
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) headers.Authorization = `Bearer ${token}`;

  const privateReposPromise = token
    ? getPrivateRepositoryCount(headers, token)
    : Promise.resolve(getPrivateRepositoryFallback());

  const [userResponse, repositoriesResponse, privateRepos] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      cache: 'force-cache',
      headers,
    }),
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc`,
      {
        cache: 'force-cache',
        headers,
      },
    ),
    privateReposPromise,
  ]);

  if (!userResponse.ok || !repositoriesResponse.ok) {
    throw new Error(
      `GitHub build fetch failed: profile=${userResponse.status}, repositories=${repositoriesResponse.status}`,
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
    privateRepos,
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
      homepage: VERIFIED_DEMOS[repository.full_name] ?? null,
      language: repository.language,
      topics: repository.topics ?? [],
      stars: repository.stargazers_count,
      forks: repository.forks_count,
      isFork: repository.fork,
      archived: repository.archived,
      updatedAt: repository.updated_at,
    }));

  projects.push({
    id: 2_026_092_401,
    name: 'BI Analytics Dashboard',
    fullName: 'leoo1992/Portfolio_Novo_Leonardo',
    description:
      'Dashboard comercial interativo com KPIs, filtros multidimensionais, análise temporal, desempenho regional e exportação CSV.',
    url: 'https://github.com/leoo1992/Portfolio_Novo_Leonardo/tree/master/apps/web/src/app/bi-dashboard',
    homepage: '/bi-dashboard/',
    language: 'TypeScript',
    topics: ['nextjs', 'react', 'typescript', 'business-intelligence', 'dashboard'],
    stars: 0,
    forks: 0,
    isFork: false,
    archived: false,
    updatedAt: '2026-09-24T14:00:00.000Z',
  });

  return {
    profile,
    projects,
    generatedAt: new Date().toISOString(),
  };
}


async function getPrivateRepositoryCount(headers: HeadersInit, token: string) {
  try {
    const response = await fetch('https://api.github.com/user', {
      cache: 'no-store',
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return getPrivateRepositoryFallback();

    const authenticatedUser = (await response.json()) as GitHubAuthenticatedUserResponse;
    if (authenticatedUser.login.toLocaleLowerCase() !== GITHUB_USERNAME.toLocaleLowerCase()) {
      return getPrivateRepositoryFallback();
    }

    return (
      authenticatedUser.owned_private_repos ??
      authenticatedUser.total_private_repos ??
      getPrivateRepositoryFallback()
    );
  } catch {
    return getPrivateRepositoryFallback();
  }
}

function getPrivateRepositoryFallback() {
  const configured = Number.parseInt(process.env.PRIVATE_REPO_COUNT ?? '', 10);
  return Number.isFinite(configured) && configured >= 0
    ? configured
    : VERIFIED_PRIVATE_REPO_COUNT;
}
