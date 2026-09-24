'use client';

import { useMemo, useSyncExternalStore } from 'react';
import {
  Navigate,
  Route,
  Router,
  Routes,
  createPath,
} from 'react-router-dom';
import type { Navigator, To } from 'react-router';
import type { GitHubProfile, PortfolioProject } from '@/types/github';
import { Footer } from './footer';
import { Header } from './header';
import { Hero } from './hero';
import { ProjectsBrowser } from './projects-browser';

interface PortfolioRouterProps {
  profile: GitHubProfile;
  projects: PortfolioProject[];
  projectCount: number;
  languageCount: number;
  starsTotal: number;
}

function subscribeHash(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function readHashRoute() {
  const route = window.location.hash.replace(/^#/, '');
  return route.startsWith('/') ? route : '/';
}

function toRoutePath(to: To) {
  return typeof to === 'string' ? to : createPath(to);
}

export function PortfolioRouter({
  profile,
  projects,
  projectCount,
  languageCount,
  starsTotal,
}: PortfolioRouterProps) {
  const location = useSyncExternalStore(subscribeHash, readHashRoute, () => '/');

  const navigator = useMemo<Navigator>(
    () => ({
      createHref(to) {
        return `#${toRoutePath(to)}`;
      },
      go(delta) {
        window.history.go(delta);
      },
      push(to, state) {
        const path = toRoutePath(to);
        window.history.pushState(state ?? null, '', `#${path}`);
        window.dispatchEvent(new Event('hashchange'));
      },
      replace(to, state) {
        const path = toRoutePath(to);
        window.history.replaceState(state ?? null, '', `#${path}`);
        window.dispatchEvent(new Event('hashchange'));
      },
    }),
    [],
  );

  const homeView = (
    <main id="conteudo">
      <Hero
        profile={profile}
        projectCount={projectCount}
        languageCount={languageCount}
        starsTotal={starsTotal}
      />
      <ProjectsBrowser projects={projects} />
    </main>
  );

  const projectsView = (
    <main id="conteudo" className="router-projects-view">
      <ProjectsBrowser projects={projects} />
    </main>
  );

  return (
    <Router location={location} navigator={navigator}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <Header />
      <Routes>
        <Route path="/" element={homeView} />
        <Route path="/projects" element={projectsView} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}
