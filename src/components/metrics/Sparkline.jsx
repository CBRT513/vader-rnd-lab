export default function Sparkline({ points=[3,5,2,7,6,9,8], label='Throughput' }) {
  const w=160, h=60, pad=6;
  const max=Math.max(...points,1), min=Math.min(...points,0);
  const xs = points.map((_,i)=> pad + (i*(w-2*pad))/(points.length-1));
  const ys = points.map(v=> h-pad - ((v-min)/(max-min||1))*(h-2*pad));
  const d = xs.map((x,i)=> `${i?'L':'M'}${x},${ys[i]}`).join(' ');
  const last = points[points.length-1];
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-[var(--muted)]">{label}</div>
        <div className="font-mono">{last}</div>
      </div>
      <svg width={w} height={h}>
        <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2"/>
      </svg>
    </div>
  );
}
