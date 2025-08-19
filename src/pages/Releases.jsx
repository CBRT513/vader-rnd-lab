import { useMemo, useState } from 'react';
import StatusPill from '@/components/ui/StatusPill.jsx';
import Modal from '@/components/ui/Modal.jsx';
import { seedReleases } from '@/lib/releasesData.js';
import { loadReleases, saveReleases } from '@/lib/storage.js';

const STATUSES = ['Stable', 'Beta', 'Canary'];

export default function Releases() {
  const [q, setQ] = useState('');
  const [rows, setRows] = useState(() => loadReleases(seedReleases));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ version: '', date: new Date().toISOString().slice(0,10), status: 'Beta', notes: '' });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(r =>
      r.version.toLowerCase().includes(s) ||
      r.status.toLowerCase().includes(s) ||
      r.notes.toLowerCase().includes(s)
    );
  }, [q, rows]);

  function update(k, v){ setForm(f => ({ ...f, [k]: v })); }

  function addRelease(e){
    e?.preventDefault();
    if (!form.version) return;
    const next = [{ ...form }, ...rows];
    setRows(next);
    saveReleases(next);
    setOpen(false);
    setForm({ version: '', date: new Date().toISOString().slice(0,10), status: 'Beta', notes: '' });
  }

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
          <button className="btn" onClick={() => setOpen(true)}>New Release</button>
        </div>
      </div>

      <div className="overflow-x-auto card">
        <table className="min-w-full text-sm">
          <thead className="text-left text-[var(--muted)]">
            <tr className="[&>th]:py-2 [&>th]:pr-6">
              <th>Release</th><th>Date</th><th>Status</th><th>Notes</th>
            </tr>
          </thead>
          <tbody className="[&>tr>td]:py-3 [&>tr>td]:pr-6">
            {filtered.map((r, i) => (
              <tr key={`${r.version}-${i}`} className="border-t border-white/10">
                <td className="font-mono">{r.version}</td>
                <td>{r.date}</td>
                <td><StatusPill value={r.status} /></td>
                <td className="text-[var(--muted)]">{r.notes}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="py-10 text-center text-[var(--muted)]">No results</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="New Release" footer={
        <>
          <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
          <button className="btn" onClick={addRelease}>Save</button>
        </>
      }>
        <form onSubmit={addRelease} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs text-[var(--muted)]">Version</span>
            <input value={form.version} onChange={e=>update('version', e.target.value)}
                   className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]" placeholder="0.3.1"/>
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-[var(--muted)]">Date</span>
            <input type="date" value={form.date} onChange={e=>update('date', e.target.value)}
                   className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"/>
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-[var(--muted)]">Status</span>
            <select value={form.status} onChange={e=>update('status', e.target.value)}
                    className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]">
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-[var(--muted)]">Notes</span>
            <textarea rows={3} value={form.notes} onChange={e=>update('notes', e.target.value)}
                      className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]" placeholder="What changed?"/>
          </label>
        </form>
      </Modal>
    </section>
  );
}
