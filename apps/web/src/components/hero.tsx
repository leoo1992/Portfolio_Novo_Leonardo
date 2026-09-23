import Image from 'next/image';
import type { GitHubProfile } from '@/types/github';
import { ArrowUpRightIcon, GitHubIcon } from './icons';

export function Hero({ profile }: { profile: GitHubProfile }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div>
          <p className="eyebrow">Desenvolvedor de software</p>
          <h1 id="hero-title">Produtos digitais com engenharia, clareza e atenção ao detalhe.</h1>
          <p className="hero-copy">
            Desenvolvimento full-stack com foco em interfaces robustas, APIs bem estruturadas,
            performance, acessibilidade e experiência de uso.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projetos">Ver projetos</a>
            <a
              className="button button-secondary"
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon /> GitHub <ArrowUpRightIcon />
            </a>
          </div>
        </div>

        <aside className="profile-card" aria-label="Perfil do GitHub">
          <Image
            src={profile.avatarUrl}
            width={88}
            height={88}
            priority
            alt={`Foto de perfil de ${profile.name}`}
            className="avatar"
          />
          <div>
            <p className="profile-name">{profile.name}</p>
            <p className="profile-login">@{profile.login}</p>
          </div>
          <dl className="profile-stats">
            <div><dt>Repositórios</dt><dd>{profile.publicRepos}</dd></div>
            <div><dt>Seguidores</dt><dd>{profile.followers}</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
