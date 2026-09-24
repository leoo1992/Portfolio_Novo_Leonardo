export interface PortfolioProject {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  isFork: boolean;
  archived: boolean;
  updatedAt: string;
}

export interface GitHubProfile {
  login: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
  bio: string | null;
  location: string | null;
  publicRepos: number;
  privateRepos: number;
  followers: number;
}

export interface PortfolioResponse {
  profile: GitHubProfile;
  projects: PortfolioProject[];
  generatedAt: string;
}
