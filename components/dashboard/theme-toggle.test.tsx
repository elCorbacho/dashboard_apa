import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ThemeToggle } from '@/components/dashboard/theme-toggle';

const setThemeMock = vi.fn();

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'dark',
    setTheme: setThemeMock,
  }),
}));

describe('ThemeToggle interaction', () => {
  it('toggles to light theme from dark state', async () => {
    render(<ThemeToggle />);

    const button = await screen.findByRole('button', { name: 'Cambiar tema' });
    fireEvent.click(button);

    expect(setThemeMock).toHaveBeenCalledWith('light');
  });
});
