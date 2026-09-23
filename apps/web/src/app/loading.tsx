export default function Loading() {
  return (
    <main className="shell loading-state" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando portfólio</span>
      <div className="loading-line loading-line-lg" />
      <div className="loading-line" />
      <div className="loading-grid">
        {Array.from({ length: 6 }, (_, index) => <div className="loading-card" key={index} />)}
      </div>
    </main>
  );
}
