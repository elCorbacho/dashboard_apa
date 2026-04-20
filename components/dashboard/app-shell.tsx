'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { navigationData } from '@/lib/dashboard/mock-data';

interface AppShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function AppShell({
  children,
  title = 'Dashboard BI4H',
  description = 'Base Next.js App Router para migración estática del Overview.',
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarId = 'dashboard-primary-sidebar';

  const openSidebar = () => setMobileOpen((current) => !current);
  const closeSidebar = () => setMobileOpen(false);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <Sidebar
          id={sidebarId}
          navigation={navigationData}
          mobileOpen={mobileOpen}
          onClose={closeSidebar}
        />

        <main className="flex-1 px-4 py-4 md:px-8 md:py-8">
          <Header
            title={title}
            description={description}
            onOpenSidebar={openSidebar}
            mobileOpen={mobileOpen}
            sidebarId={sidebarId}
          />
          {children}
        </main>
      </div>
    </div>
  );
}
