'use client';

import Image from 'next/image';
import { Link } from 'react-router-dom';
import type { GitHubProfile } from '@/types/github';
import { useExperience } from './experience-provider';
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from './icons';
import { TiltSurface } from './tilt-surface';

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
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-content" data-reveal>
          <div className="hero-chapter" aria-hidden="true">
            <span className="hero-chapter-index">01</span>
            <span className="hero-chapter-label">PORTFOLIO / SOFTWARE</span>
          </div>
          <div className="signal-line" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="eyebrow">{t('heroEyebrow')}</p>
          <h1 id="hero-title">{t('heroTitle')}</h1>
          <p className="hero-copy">{t('heroCopy')}</p>

          <div className="hero-actions">
            <Link className="button button-primary" to="/projects">
              {t('projectsCta')} <ArrowUpRightIcon />
            </Link>
            <a
              className="button button-secondary"
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon /> GitHub
            </a>
            <a
              className="button button-secondary"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </div>

          <dl className="hero-metrics" aria-label="Portfolio metrics">
            <div>
              <dt>{t('repositories')}</dt>
              <dd>{projectCount}</dd>
            </div>
            <div>
              <dt>{t('technologies')}</dt>
              <dd>{languageCount}</dd>
            </div>
            <div>
              <dt>{t('stars')}</dt>
              <dd>{starsTotal}</dd>
            </div>
          </dl>
        </div>

        <TiltSurface className="profile-tilt">
          <aside className="profile-card" aria-label={t('githubProfile')} data-reveal>
            <div className="profile-terminal" aria-hidden="true">
              <span className="profile-terminal-dots">
                <i />
                <i />
                <i />
              </span>
              <span>github://{profile.login}</span>
            </div>
            <div className="profile-halo" aria-hidden="true" />
            <Image
              src={profile.avatarUrl}
              width={104}
              height={104}
              priority
              sizes="104px"
              alt={profile.name}
              className="avatar"
            />
            <div>
              <p className="profile-name">{profile.name}</p>
              <p className="profile-login">@{profile.login}</p>
            </div>

            {profile.location ? (
              <p className="profile-location">
                <span>{t('profileLocation')}</span>
                {profile.location}
              </p>
            ) : null}

            <dl className="profile-stats">
              <div>
                <dt>{t('publicRepositories')}</dt>
                <dd>{profile.publicRepos}</dd>
              </div>
              <div>
                <dt>{t('privateRepositories')}</dt>
                <dd>{profile.privateRepos}</dd>
              </div>
              <div>
                <dt>{t('followers')}</dt>
                <dd>{profile.followers}</dd>
              </div>
            </dl>
          </aside>
        </TiltSurface>
      </div>
    </section>
  );
}
