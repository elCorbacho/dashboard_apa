'use client';

import { Menu } from 'lucide-react';

import { ThemeToggle } from '@/components/dashboard/theme-toggle';

interface HeaderProps {
  title: string;
  description: string;
  onOpenSidebar: () => void;
  mobileOpen: boolean;
  sidebarId: string;
}

export function Header({
  title,
  description,
  onOpenSidebar,
  mobileOpen,
  sidebarId,
}: HeaderProps) {
  return (
    <header className="mb-6 border-b border-border pb-4 md:mb-8">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Dashboard APA
          </p>
          <h1 className="text-2xl font-bold leading-tight md:text-[2.38rem] md:leading-[1.5]">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:border-primary focus-visible:outline-none md:hidden"
            aria-label="Abrir navegación"
            aria-controls={sidebarId}
            aria-expanded={mobileOpen}
          >
            <Menu className="h-4 w-4" />
          </button>
          <ThemeToggle />
        </div>
      </div>
      <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>
    </header>
  );
}
