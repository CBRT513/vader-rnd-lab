import { NavLink } from 'react-router-dom';
import ThemeSwitch from '@/components/ThemeSwitch.jsx';

function Beaker() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 3h6v2l3.5 6.5a6 6 0 1 1-13 0L9 5V3z" stroke="var(--ink)" strokeOpacity=".8" strokeWidth="1.3"/>
      <path d="M6.5 12.5c3.5-1.2 7.5 1.2 11 0" stroke="var(--accent)" strokeWidth="1.6" />
      <circle cx="9" cy="15.5" r="1.1" fill="var(--accent)" />
      <circle cx="14.6" cy="14.6" r="1" fill="var(--accent-2)" />
    </svg>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen text-[var(--ink)]">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-3 flex items-center gap-3">
          <Beaker />
          <div className="text-lg font-extrabold tracking-wide">
            Vader <span className="text-[var(--accent)]">R&D</span> Lab
          </div>
          <nav className="ml-auto flex gap-2">
            <Tab to="/" end>Home</Tab>
            <Tab to="/lab">Lab</Tab>
            <Tab to="/releases">Releases</Tab>
            <Tab to="/settings">Settings</Tab>
          </nav>
          <div className="ml-3">
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 grid gap-6">
        {children}
      </main>

      <footer className="footer-scan border-t border-white/10 mt-10">
        <div className="mx-auto max-w-6xl px-5 py-6 text-sm text-[var(--muted)]">
          ⚡️ Experimental systems online. Handle with care.
        </div>
      </footer>
    </div>
  );
}

function Tab({ to, end, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `navlink ${isActive ? 'navlink-active' : ''}`
      }
    >
      {children}
    </NavLink>
  );
}
