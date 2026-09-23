import { Injectable, ServiceUnavailableException } from '@nestjs/common';

interface GitHubRepo {
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

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
}

interface CacheValue {
  expiresAt: number;
  value: unknown;
}

@Injectable()
export class ProjectsService {
  private readonly username = 'leoo1992';
  private cache: CacheValue | null = null;

  async getPortfolio() {
    if (this.cache && this.cache.expiresAt > Date.now()) {
      return this.cache.value;
    }

    try {
      const [user, repositories] = await Promise.all([
        this.githubGet<GitHubUser>(`/users/${this.username}`),
        this.getAllRepositories(),
      ]);

      const publicRepositories = repositories
        .filter((repository) => repository.private === false)
        .map((repository) => ({
          id: repository.id,
          name: repository.name,
          fullName: repository.full_name,
          description: repository.description,
          url: repository.html_url,
          homepage: this.normalizeHomepage(repository.homepage),
          language: repository.language,
          topics: repository.topics ?? [],
          stars: repository.stargazers_count,
          forks: repository.forks_count,
          isFork: repository.fork,
          archived: repository.archived,
          updatedAt: repository.updated_at,
        }));

      const value = {
        profile: {
          login: user.login,
          name: user.name ?? user.login,
          avatarUrl: user.avatar_url,
          profileUrl: user.html_url,
          bio: user.bio,
          location: user.location,
          publicRepos: user.public_repos,
          followers: user.followers,
        },
        projects: publicRepositories,
        generatedAt: new Date().toISOString(),
      };

      this.cache = { expiresAt: Date.now() + 5 * 60 * 1000, value };
      return value;
    } catch (error) {
      console.error('GitHub API error', error);
      if (this.cache) return this.cache.value;
      throw new ServiceUnavailableException('GitHub data is temporarily unavailable');
    }
  }

  private async getAllRepositories(): Promise<GitHubRepo[]> {
    const repositories: GitHubRepo[] = [];

    for (let page = 1; page <= 10; page += 1) {
      const batch = await this.githubGet<GitHubRepo[]>(
        `/users/${this.username}/repos?per_page=100&page=${page}&sort=updated&direction=desc`,
      );
      repositories.push(...batch);
      if (batch.length < 100) break;
    }

    return repositories;
  }

  private async githubGet<T>(path: string): Promise<T> {
    const token = process.env.GITHUB_TOKEN?.trim();
    const response = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'leonardo-portfolio',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub ${response.status}: ${await response.text()}`);
    }

    return response.json() as Promise<T>;
  }

  private normalizeHomepage(value: string | null) {
    if (!value) return null;
    try {
      const url = new URL(value.startsWith('http') ? value : `https://${value}`);
      return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null;
    } catch {
      return null;
    }
  }
}
