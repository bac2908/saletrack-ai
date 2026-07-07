import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-surface-line bg-surface-card px-4 sm:px-10">
      <div className="relative hidden w-[400px] md:block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
        <input
          className="h-11 w-full rounded border border-surface-line bg-surface-card-high pl-12 pr-4 font-body text-lg text-text-strong outline-none transition placeholder:text-text-muted focus:border-accent-mint focus:ring-1 focus:ring-accent-mint"
          placeholder="Command Search..."
          type="search"
        />
      </div>
      <div className="flex min-w-0 flex-1 justify-center md:flex-none">
        <h1 className="truncate font-display text-3xl font-semibold text-text-strong">Command Sales</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="relative inline-flex h-11 w-11 items-center justify-center rounded border border-transparent text-text-muted transition hover:border-accent-mint hover:text-accent-mint"
          type="button"
          title="Notifications"
        >
          <Bell className="h-6 w-6" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-accent-mint" />
        </button>
        <div className="hidden h-10 w-10 items-center justify-center rounded border border-surface-line bg-surface-card-high font-mono text-xs text-text-strong sm:flex">
          GS
        </div>
      </div>
    </header>
  );
}
