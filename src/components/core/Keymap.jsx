import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTheme, applyTheme } from '@/theme.js';
import { emit } from '@/lib/events.js';

export default function Keymap() {
  const nav = useNavigate();
  const buf = useRef('');

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const k = e.key.toLowerCase();
      if (k.length !== 1) return; // ignore modifiers etc.
      buf.current = (buf.current + k).slice(-3); // track last 3 chars

      const s = buf.current;
      if (s.endsWith('gr')) { nav('/releases'); buf.current=''; }
      else if (s.endsWith('gl')) { nav('/lab'); buf.current=''; }
      else if (s.endsWith('gh')) { nav('/'); buf.current=''; }
      else if (s.endsWith('gs')) { nav('/settings'); buf.current=''; }
      else if (s.endsWith('nr')) { emit('open-new-release'); buf.current=''; }
      else if (s.endsWith('tt')) { const next = getTheme()==='green'?'amber':'green'; applyTheme(next); buf.current=''; }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nav]);

  return null;
}
