import { useMemo, useState } from 'react';
import StatusPill from '@/components/ui/StatusPill.jsx';
import { releases as seed } from '@/lib/releasesData.js';

export default function Releases() {
  const [q, setQ] = useState('');
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return seed;
    return seed.filter(r =>
      r.version.toLowerCase().includes(s) ||
      r.status.toLowerCase().includes(s) ||
      r.notes.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Releases</h2>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search…"
            className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <button className="btn">New Release</button>
        </div>
      </div>

      <div className="overflow-x-auto card">
        <table className="min-w-full text-sm">
          <thead className="text-left text-[var(--muted)]">
            <tr className="[&>th]:py-2 [&>th]:pr-6">
              <th>Release</th>
              <th>Date</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody className="[&>tr>td]:py-3 [&>tr>td]:pr-6">
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="font-mono">{r.version}</td>
                <td>{r.date}</td>
                <td><StatusPill value={r.status} /></td>
                <td className="text-[var(--muted)]">{r.notes}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={4} className="py-10 text-center text-[var(--muted)]">No results</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
