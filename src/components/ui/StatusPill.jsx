export default function StatusPill({ value }) {
  const map = {
    Stable: 'bg-green-500/20 text-green-300 border-green-500/40',
    Beta: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    Canary: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  };
  const cls = map[value] ?? 'bg-slate-500/20 text-slate-300 border-slate-500/40';
  return <span className={`px-2 py-0.5 rounded-lg text-xs border ${cls}`}>{value}</span>;
}
