import { describe, expect, it } from 'vitest';

import {
  modalCatalogData,
  toolbarData,
  widgetRowsData,
} from '@/lib/dashboard/mock-data';
import {
  applyWidgetFilters,
  getBlocksModalViewModel,
  getDefaultModalFilters,
  getDefaultOverviewFilters,
  getModalViewModel,
} from '@/lib/dashboard/selectors';

describe('dashboard selectors', () => {
  it('returns default filters with empty area/pathologist and default threshold', () => {
    expect(getDefaultOverviewFilters(toolbarData)).toEqual({
      area: '',
      threshold: 0,
      pathologist: '',
    });
  });

  it('shows all widgets when threshold is 0 (Todos)', () => {
    const filtered = applyWidgetFilters(widgetRowsData, {
      area: '',
      threshold: 0,
    });

    const nonNullCount = filtered
      .flatMap((row) => row.widgets)
      .filter((widget) => widget !== null).length;

    expect(nonNullCount).toBe(16);
  });

  it('filters widgets by threshold preserving row shape', () => {
    const filtered = applyWidgetFilters(widgetRowsData, {
      area: '',
      threshold: 7,
    });

    expect(filtered).toHaveLength(widgetRowsData.length);

    const nonNullCount = filtered
      .flatMap((row) => row.widgets)
      .filter((widget) => widget !== null).length;

    expect(nonNullCount).toBe(1);
    expect(filtered[2]?.widgets[4]?.id).toBe(12);
  });

  it('filters widgets by area and threshold together', () => {
    const filtered = applyWidgetFilters(widgetRowsData, {
      area: 'laboratorio',
      threshold: 2,
    });

    const selectedIds = filtered
      .flatMap((row) => row.widgets)
      .filter((widget) => widget !== null)
      .map((widget) => widget.id);

    expect(selectedIds).toEqual([13, 14, 15, 16]);
  });

  it('builds blocks modal view model and applies filters', () => {
    const viewModel = getBlocksModalViewModel(modalCatalogData, 1, {
      ...getDefaultModalFilters(),
      pathologist: 'Dr. Rivas',
      search: 'Estantería',
    });

    expect(viewModel).toBeDefined();
    expect(viewModel?.variant).toBe('blocks');
    expect(viewModel?.rows.every((row) => row.pathologist === 'Dr. Rivas')).toBe(
      true,
    );
    expect(viewModel?.rows.every((row) => row.location.includes('Estantería'))).toBe(
      true,
    );
  });

  it('resolves modal view model by ui state variant', () => {
    const medical = getModalViewModel(modalCatalogData, {
      variant: 'medical',
      widgetId: 8,
      filters: getDefaultModalFilters(),
    });

    const cases = getModalViewModel(modalCatalogData, {
      variant: 'cases',
      widgetId: 13,
      technique: 'CORTE',
      filters: getDefaultModalFilters(),
    });

    expect(medical?.variant).toBe('medical');
    expect(cases?.variant).toBe('cases');

    if (cases?.variant !== 'cases') {
      throw new Error('Expected cases modal variant');
    }

    expect(
      cases.rows.every((row) => 'technique' in row && row.technique === 'CORTE'),
    ).toBe(true);
  });
});
