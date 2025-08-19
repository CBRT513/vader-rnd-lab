import Gauge from '@/components/metrics/Gauge.jsx';
import Sparkline from '@/components/metrics/Sparkline.jsx';

export default function Home() {
  return (
    <section className="grid gap-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-2">Home</h2>
        <p className="text-[var(--muted)]">
          Your control room. Green = good. Amber = investigate. Try the theme toggle in the header.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Gauge value={96} label="Build Success" unit="%" />
        <Gauge value={72} label="Test Coverage" unit="%" />
        <Gauge value={8}  label="Open PRs" unit="" />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Sparkline label="Deploys (30d)" points={[1,0,2,1,3,2,3,4,2,5,4,6]} />
        <Sparkline label="Errors (24h)" points={[9,7,6,5,6,4,3,4,2,3,3,2]} />
        <Sparkline label="Latency (ms)"  points={[230,210,190,220,180,200,175,190,170]} />
      </div>
    </section>
  );
}
