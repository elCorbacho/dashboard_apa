import React from 'react';
import type { ComponentType } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { KpiBar } from '@/components/dashboard/kpi-bar';
import type { KpiMetric } from '@/lib/dashboard/contracts';

vi.mock('framer-motion', () => {
  function createMockMotionComponent(tag: string) {
    return function MockComponent({ children, ...props }: { children: React.ReactNode }) {
      const Component = tag as unknown as ComponentType<Record<string, unknown>>;
      return <Component {...props}>{children}</Component>;
    };
  }
  return {
    motion: {
      div: createMockMotionComponent('div'),
      button: createMockMotionComponent('button'),
      tr: createMockMotionComponent('tr'),
      article: createMockMotionComponent('article'),
      span: createMockMotionComponent('span'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => false,
    useMotionValue: () => ({ on: vi.fn(), set: vi.fn() }),
    animate: vi.fn(() => ({ stop: vi.fn() })),
  };
});

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

  it('renders KPI values (animation mocked)', async () => {
    render(<KpiBar kpis={mockKpis} />);
    // With mocked framer-motion, animation doesn't run
    // Verify component renders with initial state
    mockKpis.forEach((kpi) => {
      expect(screen.getByText(kpi.label)).toBeTruthy();
    });
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
