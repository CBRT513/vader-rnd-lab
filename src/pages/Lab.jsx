import { useState } from 'react';
import TerminalLog from '../components/experiments/TerminalLog.jsx';

export default function Lab() {
  const [count, setCount] = useState(0);
  return (
    <section className="grid gap-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-2">Lab</h2>
        <p className="text-[var(--muted)]">
          Playground for experiments. Live counter + streaming console below.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold mb-2">Counter</h3>
          <button className="btn" onClick={() => setCount(c => c + 1)}>☢️ Clicks: {count}</button>
        </div>
        <TerminalLog />
      </div>
    </section>
  );
}
