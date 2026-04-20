'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavigationItem } from '@/lib/dashboard/contracts';
import { cn } from '@/lib/utils';

interface SidebarProps {
  id: string;
  navigation: NavigationItem[];
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ id, navigation, mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        id={id}
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[18rem] border-r border-border bg-background p-4 transition-transform md:static md:z-auto md:w-72 md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Navegación principal"
      >
        <div className="mb-6 space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            BI4H
          </p>
          <h2 className="text-lg font-bold">Dashboard APA</h2>
        </div>

        <nav>
          <ul className="grid gap-2">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'block rounded-md border px-3 py-2 text-sm font-medium leading-tight transition-colors focus-visible:border-primary focus-visible:outline-none',
                      active
                        ? 'border-primary/30 bg-primary/10 text-foreground'
                        : 'border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {!item.implemented ? (
                      <span className="ml-2 text-xs uppercase tracking-[0.12em] text-muted-foreground/80">
                        placeholder
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
