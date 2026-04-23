import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WidgetsSection } from '@/components/dashboard/widgets-section';
import type { WidgetRow } from '@/lib/dashboard/contracts';

const mockRows: WidgetRow[] = [
  {
    id: 'row-1',
    title: 'Casetes',
    subtitle: 'Macroscopía',
    area: 'macro',
    widgets: [
      {
        id: 1,
        area: 'macro',
        label: 'Casetes en inicio',
        value: 50,
        threshold: 4,
        thresholdDays: 4,
        behavior: { type: 'modal', variant: 'blocks' },
        rowId: 'row-1',
        rowIndex: 0,
        position: 0,
      },
      {
        id: 2,
        area: 'macro',
        label: 'Casetes impresos',
        value: 160,
        threshold: 3,
        thresholdDays: 3,
        behavior: { type: 'modal', variant: 'blocks' },
        rowId: 'row-1',
        rowIndex: 0,
        position: 1,
      },
    ],
  },
];

describe('WidgetsSection', () => {
  it('renders without crashing', () => {
    const onWidgetSelect = vi.fn();
    render(<WidgetsSection rows={mockRows} onWidgetSelect={onWidgetSelect} />);
    expect(
      screen.getByRole('region', { name: /monitoreo de alarmas/i }),
    ).toBeTruthy();
  });

  it('renders widget buttons', () => {
    const onWidgetSelect = vi.fn();
    render(<WidgetsSection rows={mockRows} onWidgetSelect={onWidgetSelect} />);
    expect(screen.getByRole('button', { name: /widget 1:/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /widget 2:/i })).toBeTruthy();
  });

  it('renders row titles', () => {
    const onWidgetSelect = vi.fn();
    render(<WidgetsSection rows={mockRows} onWidgetSelect={onWidgetSelect} />);
    expect(screen.getByText('Casetes')).toBeTruthy();
    expect(screen.getByText('Macroscopía')).toBeTruthy();
  });

  it('calls onWidgetSelect when button is clicked', () => {
    const onWidgetSelect = vi.fn();
    render(<WidgetsSection rows={mockRows} onWidgetSelect={onWidgetSelect} />);
    const button = screen.getByRole('button', { name: /widget 1:/i });
    button.click();
    expect(onWidgetSelect).toHaveBeenCalled();
  });

  it('renders with prefers-reduced-motion', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    const onWidgetSelect = vi.fn();
    render(<WidgetsSection rows={mockRows} onWidgetSelect={onWidgetSelect} />);
    expect(screen.getByText('Casetes')).toBeTruthy();
  });
});
