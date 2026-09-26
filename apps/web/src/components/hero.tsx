'use client';

import Image from 'next/image';
import { Link } from 'react-router-dom';
import type { GitHubProfile } from '@/types/github';
import { useExperience } from './experience-provider';
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from './icons';
import { DeveloperScene } from './developer-scene';

const LINKEDIN_URL = 'https://www.linkedin.com/in/leocustodio1992/';

interface HeroProps {
  profile: GitHubProfile;
  projectCount: number;
  languageCount: number;
  starsTotal: number;
}

export function Hero({
  profile,
  projectCount,
  languageCount,
  starsTotal,
}: HeroProps) {
  const { t } = useExperience();

  return (
    <section id="top" className="hero creative-hero" aria-labelledby="hero-title">
      <div className="hero-noise" aria-hidden="true" />
      <DeveloperScene />

      <div className="shell creative-hero-shell">
        <div className="hero-meta-row" data-reveal>
          <span>PORTFOLIO / 2026</span>
          <span className="hero-status">
            <i aria-hidden="true" />
            SOFTWARE · PRODUCT · INTERFACE
          </span>
          <span>{profile.location ?? 'BRASIL'}</span>
        </div>

        <div className="hero-identity" data-reveal>
          <p className="eyebrow">{t('heroEyebrow')}</p>
          <div className="hero-identity-row">
            <h1 id="hero-title">Leonardo Santos</h1>
            <p className="hero-identity-note" aria-label={t('heroTitle')}>
              FULL-STACK / PRODUCT / INTERFACE
            </p>
          </div>
        </div>

        <div className="hero-lower-grid">
          <div className="hero-manifesto" data-reveal>
            <p className="hero-copy">{t('heroCopy')}</p>

            <div className="hero-actions">
              <Link className="button button-primary magnetic-action" to="/projects">
                <span>{t('projectsCta')}</span>
                <ArrowUpRightIcon />
              </Link>

              <div className="hero-social-actions">
                <a
                  className="text-link"
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon /> GitHub
                </a>
                <a
                  className="text-link"
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon /> LinkedIn
                </a>
              </div>
            </div>

            <dl className="hero-metrics hero-metrics-rail" aria-label="Portfolio metrics">
              <div>
                <dt>{t('repositories')}</dt>
                <dd>{String(projectCount).padStart(2, '0')}</dd>
              </div>
              <div>
                <dt>{t('technologies')}</dt>
                <dd>{String(languageCount).padStart(2, '0')}</dd>
              </div>
              <div>
                <dt>{t('stars')}</dt>
                <dd>{String(starsTotal).padStart(2, '0')}</dd>
              </div>
            </dl>
          </div>

          <div className="identity-orbit" data-reveal>
            <div className="orbit-stage">
              <div className="orbit-ring orbit-ring-one" aria-hidden="true" />
              <div className="orbit-ring orbit-ring-two" aria-hidden="true" />
              <div className="orbit-ring orbit-ring-three" aria-hidden="true" />

              <span className="orbit-label orbit-label-one">NEXT.JS</span>
              <span className="orbit-label orbit-label-two">REACT</span>
              <span className="orbit-label orbit-label-three">ORACLE</span>
              <span className="orbit-label orbit-label-four">PL/SQL</span>

              <div className="portrait-frame">
                <Image
                  src="/IMG-20260923-WA0020.jpg"
                  width={280}
                  height={280}
                  priority
                  sizes="(max-width: 780px) 220px, 280px"
                  alt={profile.name}
                  className="creative-avatar"
                />
                <span className="portrait-index" aria-hidden="true">LS/01</span>
              </div>
            </div>

            <div className="identity-caption">
              <span>{profile.name}</span>
              <span>@{profile.login}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kinetic-marquee" aria-hidden="true">
        <div className="kinetic-marquee-track">
          <span>DESIGN SYSTEMS</span><i>✦</i>
          <span>SOFTWARE ENGINEERING</span><i>✦</i>
          <span>INTERACTION</span><i>✦</i>
          <span>FULL-STACK</span><i>✦</i>
          <span>DESIGN SYSTEMS</span><i>✦</i>
          <span>SOFTWARE ENGINEERING</span><i>✦</i>
          <span>INTERACTION</span><i>✦</i>
          <span>FULL-STACK</span><i>✦</i>
        </div>
      </div>
    </section>
  );
}
