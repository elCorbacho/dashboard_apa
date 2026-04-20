import type {
  DashboardSnapshot,
  ModalFilterState,
  OverviewSnapshot,
  OverviewUiState,
  OverviewFiltersState,
  OverviewFoundationViewModel,
  ToolbarFiltersViewModel,
} from '@/lib/dashboard/contracts';
import {
  drilldownData,
  kpiData,
  modalData,
  modalCatalogData,
  navigationData,
  toolbarData,
  widgetDefinitionsData,
  widgetRowsData,
} from '@/lib/dashboard/mock-data';
import {
  countVisibleWidgets,
  getDefaultOverviewFilters,
  getDefaultOverviewUiState,
  getNavigationStats,
} from '@/lib/dashboard/selectors';

/**
 * Entrega el snapshot estático completo del dashboard.
 *
 * Mantiene una frontera de adapter entre UI y fuente de datos local para
 * facilitar un reemplazo futuro por API sin cambiar componentes.
 */
export function getDashboardSnapshot(): DashboardSnapshot {
  return {
    navigation: navigationData,
    kpis: kpiData,
    toolbar: toolbarData,
    widgets: widgetDefinitionsData,
    widgetRows: widgetRowsData,
    drilldowns: drilldownData,
    modalData,
    modalCatalog: modalCatalogData,
    initialUiState: getDefaultOverviewUiState(),
  };
}

/**
 * Alias semántico para llamadas centradas en Overview.
 */
export function getOverviewSnapshot(): OverviewSnapshot {
  return getDashboardSnapshot();
}

/**
 * Construye el view model de filtros combinando defaults y overrides opcionales.
 */
export function getToolbarFiltersViewModel(
  initialValue?: Partial<OverviewFiltersState>,
): ToolbarFiltersViewModel {
  const base = getDefaultOverviewFilters(toolbarData);

  return {
    options: toolbarData,
    value: {
      ...base,
      ...initialValue,
    },
  };
}

/**
 * Genera el view model base de Overview para render inicial y métricas de shell.
 */
export function getOverviewFoundationViewModel(): OverviewFoundationViewModel {
  const snapshot = getDashboardSnapshot();
  const navStats = getNavigationStats(snapshot.navigation);

  return {
    kpis: snapshot.kpis,
    widgetRows: snapshot.widgetRows,
    widgetCount: countVisibleWidgets(snapshot.widgetRows),
    implementedRouteCount: navStats.implemented,
    placeholderRouteCount: navStats.placeholders,
  };
}

/**
 * Entrega el estado base de UI para Overview.
 */
export function getOverviewUiState(
  override?: Partial<OverviewUiState>,
): OverviewUiState {
  return {
    ...getDefaultOverviewUiState(),
    ...override,
  };
}

/**
 * Entrega filtros vacíos para modales.
 */
export function getDefaultModalFilters(): ModalFilterState {
  return {
    pathologist: '',
    organType: '',
    caseType: '',
    macroPathologist: '',
    search: '',
  };
}
