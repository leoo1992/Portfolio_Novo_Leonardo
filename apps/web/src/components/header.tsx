import { GitHubIcon } from './icons';

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="Leonardo — início">
          <span className="brand-mark" aria-hidden="true">LS</span>
          <span>Leonardo Santos</span>
        </a>
        <nav aria-label="Navegação principal">
          <a className="nav-link" href="#projetos">Projetos</a>
          <a
            className="icon-link"
            href="https://github.com/leoo1992"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir GitHub de Leonardo em uma nova aba"
          >
            <GitHubIcon />
          </a>
        </nav>
      </div>
    </header>
  );
}
