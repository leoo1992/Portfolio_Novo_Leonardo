import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="shell error-state">
      <p className="eyebrow">404</p>
      <h1>Página não encontrada.</h1>
      <p>O endereço acessado não existe neste portfólio.</p>
      <Link className="button button-primary" href="/">Voltar ao início</Link>
    </main>
  );
}
