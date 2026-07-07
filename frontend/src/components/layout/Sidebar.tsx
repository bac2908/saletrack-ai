import { NavLink } from 'react-router-dom';
import { CircleHelp, Settings } from 'lucide-react';
import { MENU_ITEMS } from '../../constants/menu';

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-80 shrink-0 flex-col border-r border-surface-line bg-surface-low lg:flex">
      <div className="border-b border-surface-line px-8 py-8">
        <div className="flex items-center gap-5">
          <img
            src="/global-sales-logo.svg"
            alt="Global Sales"
            className="h-12 w-12 rounded-full border border-surface-line bg-surface-card object-cover"
          />
          <div>
            <span className="block font-display text-3xl font-semibold leading-none text-text-strong">
              Global Sales
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              Enterprise Division
            </span>
          </div>
        </div>
      </div>
      <nav className="space-y-1 py-4">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-5 border-r-2 px-8 py-5 font-mono text-sm uppercase tracking-[0.14em] transition ${
                  isActive
                    ? 'border-accent-mint bg-surface-card-high text-accent-mint'
                    : 'border-transparent text-text-muted hover:bg-surface-card hover:text-text-strong'
                }`
              }
            >
              <Icon className="h-6 w-6" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="mt-auto space-y-1 border-t border-surface-line py-6">
        <button className="flex w-full items-center gap-5 px-8 py-4 font-mono text-sm uppercase tracking-[0.14em] text-text-muted transition hover:bg-surface-card hover:text-text-strong">
          <Settings className="h-6 w-6" />
          Settings
        </button>
        <button className="flex w-full items-center gap-5 px-8 py-4 font-mono text-sm uppercase tracking-[0.14em] text-text-muted transition hover:bg-surface-card hover:text-text-strong">
          <CircleHelp className="h-6 w-6" />
          Support
        </button>
      </div>
    </aside>
  );
}
