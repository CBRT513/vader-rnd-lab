import { useEffect, useRef, useState } from 'react';

function randomLine() {
  const verbs = ['compiling', 'mutating', 'fusing', 'splicing', 'energizing', 'ionizing'];
  const nouns = ['genome', 'plasma coil', 'tensor core', 'chromatic array', 'beaker-7', 'quantum jar'];
  const status = ['ok', 'warn', 'fail', 'info'];
  const v = verbs[Math.floor(Math.random()*verbs.length)];
  const n = nouns[Math.floor(Math.random()*nouns.length)];
  const s = status[Math.floor(Math.random()*status.length)];
  return { ts: new Date().toLocaleTimeString(), s, text: `${v} ${n}…` };
}

export default function TerminalLog() {
  const [lines, setLines] = useState([]);
  const endRef = useRef(null);

  function addLine() { setLines(x => [...x.slice(-199), randomLine()]); }

  useEffect(() => { const id = setInterval(addLine, 1200); return () => clearInterval(id); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines.length]);

  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold">Lab Console</h3>
        <div className="flex gap-2">
          <button className="btn" onClick={addLine}>Inject Event</button>
          <button className="btn" onClick={() => setLines([])}>Clear</button>
        </div>
      </div>
      <div className="h-56 overflow-auto rounded-xl border border-white/10 bg-black/40 p-3 text-sm leading-6">
        {lines.map((l, i) => (
          <div key={i} className="grid grid-cols-[90px_1fr] gap-3">
            <span className="text-[var(--muted)]">{l.ts}</span>
            <span className={l.s === 'fail' ? 'text-red-300' : l.s === 'warn' ? 'text-amber-300' : l.s === 'ok' ? 'text-[var(--accent)]' : 'text-slate-300'}>
              {l.text}
            </span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
