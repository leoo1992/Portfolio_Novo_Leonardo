'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="shell error-state">
      <p className="eyebrow">Falha temporária</p>
      <h1>Não foi possível carregar os projetos.</h1>
      <p>Tente novamente. Se o problema persistir, o limite da API do GitHub pode ter sido atingido.</p>
      <button className="button button-primary" type="button" onClick={reset}>Tentar novamente</button>
    </main>
  );
}
