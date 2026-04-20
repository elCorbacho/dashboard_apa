import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OverviewClient } from '@/components/dashboard/overview-client';
import {
  getDashboardSnapshot,
  getToolbarFiltersViewModel,
} from '@/lib/dashboard/mock-adapter';

function renderOverview(threshold = 2) {
  const snapshot = getDashboardSnapshot();
  const initialFilters = getToolbarFiltersViewModel({ threshold }).value;

  return render(
    <OverviewClient snapshot={snapshot} initialFilters={initialFilters} />,
  );
}

describe('OverviewClient runtime behavior', () => {
  it('renders overview baseline blocks', () => {
    renderOverview();

    expect(screen.getByText('Monitoreo operativo BI4H')).toBeTruthy();
    expect(screen.getByText(/Monitoreo de Alarmas/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Widget 13:/i })).toBeTruthy();
  });

  it('opens drilldown and then modal from technique interaction', () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 13:/i }));
    expect(screen.getByText(/Desglose por Técnica/i)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'CORTE' }));

    const dialog = screen.getByRole('dialog', { name: /Casos — Widget 13/i });
    expect(dialog).toBeTruthy();
    expect(screen.getByText(/\/ CORTE/)).toBeTruthy();
  });

  it('opens and closes modal for non-drilldown widget', async () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 12:/i }));
    expect(
      screen.getByRole('dialog', { name: /Casos médicos — Widget 12/i }),
    ).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  it('renders variant titles for blocks and medical widgets', () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 1:/i }));
    expect(screen.getByRole('dialog', { name: /Bloques — Widget 01/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));

    fireEvent.click(screen.getByRole('button', { name: /Widget 8:/i }));
    expect(
      screen.getByRole('dialog', { name: /Casos médicos — Widget 08/i }),
    ).toBeTruthy();
  });

  it('applies modal filters and reset from the modal controls', async () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 1:/i }));

    const pathologistFilter = screen.getByLabelText('Patólogo', {
      selector: '#modal-filter-pathologist',
    });
    fireEvent.change(pathologistFilter, { target: { value: 'Dr. Rivas' } });

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(3);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Limpiar' }));

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(9);
    });
  });

  it('keeps drilldown open when closing cases modal and resets technique', async () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 13:/i }));
    fireEvent.click(screen.getByRole('button', { name: 'CORTE' }));
    expect(screen.getByRole('dialog', { name: /Casos — Widget 13/i })).toBeTruthy();

    fireEvent.click(screen.getAllByRole('button', { name: 'Cerrar' })[1]);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(screen.getByText(/Desglose por Técnica/i)).toBeTruthy();
    });
  });

  it('closes modal with escape key', async () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 1:/i }));
    expect(screen.getByRole('dialog', { name: /Bloques — Widget 01/i })).toBeTruthy();

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  it('closes modal with overlay click', async () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 8:/i }));
    const overlay = screen.getByRole('presentation');
    fireEvent.click(overlay);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });
});
