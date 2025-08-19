export default function Gauge({ value=60, label='Builds', unit='%' }) {
  const clamped = Math.max(0, Math.min(100, value));
  const r = 44, c = 2*Math.PI*r, dash = (clamped/100)*c;
  return (
    <div className="card flex items-center gap-4">
      <svg width="110" height="70" viewBox="0 0 120 80">
        <g transform="translate(10,10)">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="10"/>
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--accent)" strokeWidth="10"
                  strokeDasharray={`${dash} ${c-dash}`} transform="rotate(-90 50 50)" />
          <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="16">{clamped}{unit}</text>
        </g>
      </svg>
      <div>
        <div className="text-sm text-[var(--muted)]">{label}</div>
        <div className="text-lg font-bold">{clamped}{unit}</div>
      </div>
    </div>
  );
}
