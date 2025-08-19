import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/ui/Modal.jsx';
import { getTheme, applyTheme } from '@/theme.js';
import { emit } from '@/lib/events.js';

const COMMANDS = (nav, theme) => [
  { id:'go-home', label:'Go: Home',       run: () => nav('/') },
  { id:'go-lab',  label:'Go: Lab',        run: () => nav('/lab') },
  { id:'go-rel',  label:'Go: Releases',   run: () => nav('/releases') },
  { id:'go-set',  label:'Go: Settings',   run: () => nav('/settings') },
  { id:'new-rel', label:'Action: New Release…', run: () => emit('open-new-release') },
  { id:'theme',   label:`Action: Toggle Theme (${theme === 'green' ? '→ amber' : '→ green'})`, run: () => {
      const next = theme === 'green' ? 'amber' : 'green';
      applyTheme(next);
    }},
];

export default function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
        setQuery('');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTheme(getTheme()), 750);
    return () => clearInterval(id);
  }, []);

  const items = useMemo(() => {
    const list = COMMANDS((p) => { setOpen(false); navigate(p); }, theme);
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(i => i.label.toLowerCase().includes(q));
  }, [query, theme, navigate]);

  return (
    <Modal open={open} onClose={() => setOpen(false)} title="Command Palette (⌘K / Ctrl+K)">
      <input
        autoFocus
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        placeholder="Type a command…"
        className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />
      <div className="grid gap-2 max-h-72 overflow-auto">
        {items.map(i => (
          <button
            key={i.id}
            onClick={() => { setOpen(false); i.run(); }}
            className="text-left rounded-xl border border-white/10 bg-black/25 px-3 py-2 hover:border-[var(--accent)] transition"
          >
            {i.label}
          </button>
        ))}
        {items.length === 0 && <div className="text-[var(--muted)]">No matches</div>}
      </div>
    </Modal>
  );
}
