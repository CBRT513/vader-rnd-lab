import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="card">
      <h2 className="text-2xl font-bold mb-2">404 — Temporal Rift</h2>
      <p className="text-[var(--muted)]">Nothing grew in this petri dish. <Link to="/" className="underline">Back to Home</Link>.</p>
    </section>
  );
}
