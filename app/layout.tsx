import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/providers/theme-provider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Dashboard BI4H — Next.js',
  description:
    'Migración del dashboard de anatomía patológica a Next.js App Router.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
