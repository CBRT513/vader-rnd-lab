import { useEffect, useMemo, useState } from 'react';
import Drawer from '@/components/ui/Drawer.jsx';
import { useToast } from '@/components/toast/ToastProvider.jsx';

const KEY = 'vader_prompts';

function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
function save(v){ try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} }

export default function PromptDrawer({ open, onClose }) {
  const toast = useToast();
  const [text, setText] = useState('');
  const [items, setItems] = useState(() => load());
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(i =>
      i.title.toLowerCase().includes(s) ||
      i.body.toLowerCase().includes(s)
    );
  }, [q, items]);

  function add() {
    const body = text.trim();
    if (!body) return;
    const title = body.split('\n')[0].slice(0, 80);
    const next = [{ id:crypto.randomUUID?.() || String(Date.now()), title, body, ts: Date.now() }, ...items];
    setItems(next); save(next); setText('');
    toast.success('Saved note');
  }
  function del(id) {
    const next = items.filter(x => x.id !== id);
    setItems(next); save(next);
    toast.info('Deleted note');
  }
  async function copy(body) {
    try { await navigator.clipboard.writeText(body); toast.success('Copied to clipboard'); }
    catch { toast.error('Copy failed'); }
  }

  useEffect(() => { if (open) setQ(''); }, [open]);

  return (
    <Drawer open={open} onClose={onClose} title="AI Notes">
      <div className="grid gap-3">
        <textarea
          rows={6}
          value={text}
          onChange={e=>setText(e.target.value)}
          placeholder="Paste a prompt, idea, or spec…"
          className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <div className="flex gap-2">
          <button className="btn" onClick={add}>Save</button>
          <input
            value={q}
            onChange={e=>setQ(e.target.value)}
            placeholder="Search notes…"
            className="ml-auto rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>
        <div className="grid gap-2">
          {filtered.map(n => (
            <div key={n.id} className="rounded-xl border border-white/10 bg-black/25 p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="font-bold">{n.title}</div>
                <div className="ml-auto text-xs text-[var(--muted)]">{new Date(n.ts).toLocaleString()}</div>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-[var(--muted)]">{n.body}</pre>
              <div className="mt-2 flex gap-2">
                <button className="btn" onClick={()=>copy(n.body)}>Copy</button>
                <button className="btn" onClick={()=>del(n.id)}>Delete</button>
              </div>
            </div>
          ))}
          {filtered.length===0 && <div className="text-[var(--muted)]">No notes</div>}
        </div>
      </div>
    </Drawer>
  );
}
