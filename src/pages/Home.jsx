export default function Home() {
  return (
    <section className="grid gap-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-2">Home</h2>
        <p className="text-[var(--muted)]">
          Welcome to your nearly-magic dev lab. Use the nav to explore.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">🧪 <b>R&D</b> — Prototype ideas fast.</div>
        <div className="card">🤖 <b>Agents</b> — Let bots do the repetitive work.</div>
        <div className="card">⚡️ <b>Promote</b> — ChatOps to staging/prod.</div>
      </div>
    </section>
  );
}
