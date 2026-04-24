import React from 'react';
import type { ComponentType } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ModalTable } from '@/components/dashboard/modal-table';
import type {
  ModalTableSchema,
  ModalVariantRow,
} from '@/lib/dashboard/contracts';

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

const mockSchema: ModalTableSchema = {
  variant: 'blocks',
  columns: [
    { key: 'blockId', label: 'Bloque' },
    { key: 'caseNumber', label: 'N° caso' },
    { key: 'location', label: 'Ubicación' },
    { key: 'status', label: 'Estado' },
    { key: 'pathologist', label: 'Patólogo' },
    { key: 'days', label: 'Días', align: 'right' },
  ],
};

const mockRows: ModalVariantRow[] = [
  {
    id: 'block-1',
    widgetId: 1,
    area: 'macro',
    blockId: 'BL-101',
    caseNumber: 'B26-00100',
    location: 'Estantería A',
    status: 'Pendiente retiro',
    pathologist: 'Dr. Rivas',
    macroPathologist: 'Dra. Salas',
    days: 2,
  },
  {
    id: 'block-2',
    widgetId: 1,
    area: 'macro',
    blockId: 'BL-102',
    caseNumber: 'B26-00101',
    location: 'Estantería B',
    status: 'En corte',
    pathologist: 'Dra. Pérez',
    macroPathologist: 'Dr. Cornejo',
    days: 1,
  },
];

describe('ModalTable', () => {
  it('renders table headers', () => {
    render(<ModalTable schema={mockSchema} rows={mockRows} />);
    expect(screen.getByText('Bloque')).toBeTruthy();
    expect(screen.getByText('N° caso')).toBeTruthy();
    expect(screen.getByText('Ubicación')).toBeTruthy();
  });

  it('renders table rows', () => {
    render(<ModalTable schema={mockSchema} rows={mockRows} />);
    expect(screen.getByText('BL-101')).toBeTruthy();
    expect(screen.getByText('BL-102')).toBeTruthy();
  });

  it('renders empty state when no rows', () => {
    render(<ModalTable schema={mockSchema} rows={[]} />);
    expect(screen.getByText('No data available')).toBeTruthy();
  });

  it('renders with prefers-reduced-motion', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    render(<ModalTable schema={mockSchema} rows={mockRows} />);
    expect(screen.getByText('BL-101')).toBeTruthy();
  });
});
