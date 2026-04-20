import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AreasPage from '@/app/(dashboard)/areas/page';
import TecnicasPage from '@/app/(dashboard)/tecnicas/page';
import WidgetsPage from '@/app/(dashboard)/widgets/page';

describe('Placeholder routes', () => {
  it('renders widgets placeholder messaging', () => {
    render(<WidgetsPage />);

    expect(screen.getByText('Widgets')).toBeTruthy();
    expect(screen.getByText(/v1 placeholder · no implementado/i)).toBeTruthy();
  });

  it('renders areas placeholder messaging', () => {
    render(<AreasPage />);

    expect(screen.getByText('Áreas')).toBeTruthy();
    expect(screen.getByText(/no está activa en esta versión/i)).toBeTruthy();
  });

  it('renders tecnicas placeholder messaging', () => {
    render(<TecnicasPage />);

    expect(screen.getByText('Técnicas')).toBeTruthy();
    expect(screen.getByText(/fuera del alcance de este batch/i)).toBeTruthy();
  });
});
