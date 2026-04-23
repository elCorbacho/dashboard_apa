import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { KpiBar } from '@/components/dashboard/kpi-bar';
import type { KpiMetric } from '@/lib/dashboard/contracts';

const mockKpis: KpiMetric[] = [
  {
    id: 'casos-activos',
    label: 'Casos Activos',
    value: 1247,
    subtext: 'Últimos 30 días',
    tone: 'default',
  },
  {
    id: 'alarmas-abiertas',
    label: 'Alarmas Abiertas',
    value: 16,
    subtext: 'Widgets activos (filtro actual)',
    tone: 'warning',
  },
  {
    id: 'tat-promedio',
    label: 'TAT Promedio',
    value: 4.2,
    unit: 'días',
    subtext: 'Ingreso → Firma',
    tone: 'default',
  },
  {
    id: 'adendum-pendientes',
    label: 'Adendum Pendientes',
    value: 154,
    subtext: 'Sin firmar',
    tone: 'critical',
  },
];

describe('KpiBar', () => {
  it('renders without crashing', () => {
    render(<KpiBar kpis={mockKpis} />);
    expect(
      screen.getByRole('region', { name: /indicadores clave/i }),
    ).toBeTruthy();
  });

  it('renders all KPI cards with correct labels', () => {
    render(<KpiBar kpis={mockKpis} />);
    mockKpis.forEach((kpi) => {
      expect(screen.getByText(kpi.label)).toBeTruthy();
    });
  });

  it('displays KPI subtexts', () => {
    render(<KpiBar kpis={mockKpis} />);
    mockKpis.forEach((kpi) => {
      expect(screen.getByText(kpi.subtext)).toBeTruthy();
    });
  });

  it('displays unit when present', () => {
    render(<KpiBar kpis={mockKpis} />);
    expect(screen.getByText('días')).toBeTruthy();
  });

  it('animates KPI values', async () => {
    render(<KpiBar kpis={mockKpis} />);

    // Wait for animation to complete - es-CL uses period as thousands separator
    await waitFor(
      () => {
        expect(screen.getByText('1.247')).toBeTruthy();
      },
      { timeout: 1000 },
    );
  });

  it('renders with prefers-reduced-motion', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    render(<KpiBar kpis={mockKpis} />);
    // With reduced motion, values should still render
    mockKpis.forEach((kpi) => {
      expect(screen.getByText(kpi.label)).toBeTruthy();
    });
  });
});
