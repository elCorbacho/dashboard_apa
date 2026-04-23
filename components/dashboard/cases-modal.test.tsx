import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CasesModal } from '@/components/dashboard/cases-modal';
import type { ModalVariantViewModel } from '@/lib/dashboard/selectors';

const mockViewModel: ModalVariantViewModel = {
  widgetId: 1,
  widgetLabel: 'Casetes en inicio',
  variant: 'blocks',
  schema: {
    variant: 'blocks',
    columns: [
      { key: 'blockId', label: 'Bloque' },
      { key: 'caseNumber', label: 'N° caso' },
      { key: 'location', label: 'Ubicación' },
      { key: 'status', label: 'Estado' },
      { key: 'pathologist', label: 'Patólogo' },
      { key: 'days', label: 'Días', align: 'right' },
    ],
  },
  filterOptions: {
    pathologists: [{ value: '__all__', label: 'Todos' }],
    organTypes: [{ value: '__all__', label: 'Todos' }],
    caseTypes: [{ value: '__all__', label: 'Todos' }],
    macroPathologists: [{ value: '__all__', label: 'Todos' }],
  },
  rows: [],
  stats: {
    visibleRows: 0,
    totalDays: 0,
    uniquePathologists: 0,
  },
};

describe('CasesModal', () => {
  it('renders modal when open', () => {
    const onClose = vi.fn();
    const onFiltersChange = vi.fn();
    const onReset = vi.fn();

    render(
      <CasesModal
        open={true}
        viewModel={mockViewModel}
        filters={{
          pathologist: '',
          organType: '',
          caseType: '',
          macroPathologist: '',
          search: '',
        }}
        onFiltersChange={onFiltersChange}
        onReset={onReset}
        onClose={onClose}
      />,
    );

    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('does not render when closed', () => {
    const onClose = vi.fn();
    const onFiltersChange = vi.fn();
    const onReset = vi.fn();

    render(
      <CasesModal
        open={false}
        viewModel={mockViewModel}
        filters={{
          pathologist: '',
          organType: '',
          caseType: '',
          macroPathologist: '',
          search: '',
        }}
        onFiltersChange={onFiltersChange}
        onReset={onReset}
        onClose={onClose}
      />,
    );

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    const onFiltersChange = vi.fn();
    const onReset = vi.fn();

    render(
      <CasesModal
        open={true}
        viewModel={mockViewModel}
        filters={{
          pathologist: '',
          organType: '',
          caseType: '',
          macroPathologist: '',
          search: '',
        }}
        onFiltersChange={onFiltersChange}
        onReset={onReset}
        onClose={onClose}
      />,
    );

    const closeButton = screen.getByRole('button', { name: 'Cerrar' });
    closeButton.click();
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onReset when reset button is clicked', () => {
    const onClose = vi.fn();
    const onFiltersChange = vi.fn();
    const onReset = vi.fn();

    render(
      <CasesModal
        open={true}
        viewModel={mockViewModel}
        filters={{
          pathologist: 'Dr. Rivas',
          organType: '',
          caseType: '',
          macroPathologist: '',
          search: '',
        }}
        onFiltersChange={onFiltersChange}
        onReset={onReset}
        onClose={onClose}
      />,
    );

    const resetButton = screen.getByRole('button', { name: 'Limpiar' });
    resetButton.click();
    expect(onReset).toHaveBeenCalled();
  });

  it('renders with prefers-reduced-motion', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    const onClose = vi.fn();
    const onFiltersChange = vi.fn();
    const onReset = vi.fn();

    render(
      <CasesModal
        open={true}
        viewModel={mockViewModel}
        filters={{
          pathologist: '',
          organType: '',
          caseType: '',
          macroPathologist: '',
          search: '',
        }}
        onFiltersChange={onFiltersChange}
        onReset={onReset}
        onClose={onClose}
      />,
    );

    expect(screen.getByRole('dialog')).toBeTruthy();
  });
});
