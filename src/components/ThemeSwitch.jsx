import { useEffect, useState } from 'react';
import { getTheme, applyTheme, initTheme } from '../theme';

export default function ThemeSwitch() {
  const [t, setT] = useState(getTheme());
  useEffect(() => { initTheme(); }, []);
  function toggle() {
    const next = t === 'green' ? 'amber' : 'green';
    applyTheme(next);
    setT(next);
  }
  return (
    <button onClick={toggle} className="btn text-sm" title="Toggle theme">
      {t === 'green' ? '☢️ Neon Green' : '🧪 Amber'}
    </button>
  );
}
