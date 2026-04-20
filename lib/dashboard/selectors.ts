import type {
  BlockTableRow,
  CaseTableRow,
  DrilldownWidgetId,
  MedicalTableRow,
  ModalDataset,
  ModalFilterState,
  ModalVariant,
  ModalVariantCatalog,
  ModalVariantDataset,
  ModalVariantRow,
  NavigationItem,
  OverviewFiltersState,
  OverviewUiState,
  TechSummaryRow,
  ToolbarFilters,
  WidgetArea,
  WidgetDefinition,
  WidgetId,
  WidgetRow,
} from '@/lib/dashboard/contracts';

export interface OverviewFilterState {
  area?: WidgetArea;
  threshold?: number;
  pathologist?: string;
}

export interface OverviewDerivedData {
  kpiAlertCount: number;
  filteredRows: WidgetRow[];
  visibleWidgetCount: number;
}

export type ModalStatSummary = {
  visibleRows: number;
  totalDays: number;
  uniquePathologists: number;
};

export type ModalVariantViewModel =
  | (ModalVariantDataset<BlockTableRow> & {
      rows: BlockTableRow[];
      stats: ModalStatSummary;
    })
  | (ModalVariantDataset<MedicalTableRow> & {
      rows: MedicalTableRow[];
      stats: ModalStatSummary;
    })
  | (ModalVariantDataset<CaseTableRow> & {
      rows: CaseTableRow[];
      stats: ModalStatSummary;
    })
  | (ModalVariantDataset<TechSummaryRow> & {
      rows: TechSummaryRow[];
      stats: ModalStatSummary;
    });

const drilldownWidgetIdSet = new Set<WidgetId>([13, 14, 15, 16]);

export function isDrilldownWidgetId(
  widgetId: WidgetId,
): widgetId is DrilldownWidgetId {
  return drilldownWidgetIdSet.has(widgetId);
}

export function flattenWidgets(rows: WidgetRow[]): WidgetDefinition[] {
  return rows.flatMap((row) =>
    row.widgets.filter((widget): widget is WidgetDefinition => widget !== null),
  );
}

export function getWidgetDefinitions(rows: WidgetRow[]): WidgetDefinition[] {
  return flattenWidgets(rows);
}

export function countVisibleWidgets(
  rows: WidgetRow[],
  filter: Pick<OverviewFilterState, 'area' | 'threshold'> = {},
): number {
  return flattenWidgets(rows).filter((widget) => {
    const areaMatch = !filter.area || widget.area === filter.area;
    const thresholdMatch =
      typeof filter.threshold !== 'number' ||
      filter.threshold === 0 ||
      widget.thresholdDays >= filter.threshold;

    return areaMatch && thresholdMatch;
  }).length;
}

export function getNavigationStats(navigation: NavigationItem[]) {
  const implemented = navigation.filter((item) => item.implemented).length;
  const placeholders = navigation.length - implemented;

  return {
    implemented,
    placeholders,
  };
}

export function getDefaultPathologist(
  pathologistOptions: Array<{ value: string }>,
): string | undefined {
  return pathologistOptions.find((option) => option.value !== '')?.value;
}

export function getDefaultOverviewFilters(
  toolbar: ToolbarFilters,
): OverviewFiltersState {
  return {
    area: '',
    threshold: toolbar.defaultThreshold,
    pathologist: '',
  };
}

export function getDefaultModalFilters(): ModalFilterState {
  return {
    pathologist: '',
    organType: '',
    caseType: '',
    macroPathologist: '',
    search: '',
  };
}

export function getDefaultOverviewUiState(): OverviewUiState {
  return {
    activeWidgetId: undefined,
    drilldown: undefined,
    modal: undefined,
  };
}

export function applyWidgetFilters(
  rows: WidgetRow[],
  filters: Pick<OverviewFiltersState, 'area' | 'threshold'>,
): WidgetRow[] {
  return rows.map((row) => {
    const widgets = row.widgets.map((widget) => {
      if (!widget) {
        return null;
      }

      const areaMatches = filters.area === '' || widget.area === filters.area;
      const thresholdMatches =
        filters.threshold === 0 || widget.thresholdDays >= filters.threshold;

      return areaMatches && thresholdMatches ? widget : null;
    });

    return {
      ...row,
      widgets,
    };
  });
}

export function getOverviewDerivedData(
  rows: WidgetRow[],
  filters: Pick<OverviewFiltersState, 'area' | 'threshold'>,
): OverviewDerivedData {
  const filteredRows = applyWidgetFilters(rows, filters);
  const filteredWidgets = flattenWidgets(filteredRows);

  return {
    kpiAlertCount: filteredWidgets.length,
    filteredRows,
    visibleWidgetCount: filteredWidgets.length,
  };
}

export function getDrilldownRows(
  drilldowns: Record<WidgetId, Array<{ technique: string; count: number }>>,
  widgetId?: WidgetId,
) {
  if (!widgetId || !isDrilldownWidgetId(widgetId)) {
    return [];
  }

  return drilldowns[widgetId] ?? [];
}

function includesSearch(text: string, query: string): boolean {
  if (!query) {
    return true;
  }

  return text.toLocaleLowerCase().includes(query.toLocaleLowerCase());
}

function filterByModalFilters<T>(
  rows: T[],
  filters: ModalFilterState,
  resolver: {
    pathologist?: (row: T) => string | undefined;
    organType?: (row: T) => string | undefined;
    caseType?: (row: T) => string | undefined;
    macroPathologist?: (row: T) => string | undefined;
    searchText: (row: T) => string;
  },
): T[] {
  return rows.filter((row) => {
    const pathologistMatch =
      !filters.pathologist ||
      !resolver.pathologist ||
      resolver.pathologist(row) === filters.pathologist;
    const organMatch =
      !filters.organType ||
      !resolver.organType ||
      resolver.organType(row) === filters.organType;
    const caseTypeMatch =
      !filters.caseType ||
      !resolver.caseType ||
      resolver.caseType(row) === filters.caseType;
    const macroPathologistMatch =
      !filters.macroPathologist ||
      !resolver.macroPathologist ||
      resolver.macroPathologist(row) === filters.macroPathologist;
    const searchMatch = includesSearch(resolver.searchText(row), filters.search);

    return (
      pathologistMatch &&
      organMatch &&
      caseTypeMatch &&
      macroPathologistMatch &&
      searchMatch
    );
  });
}

export function getBlocksModalViewModel(
  catalog: ModalVariantCatalog,
  widgetId?: WidgetId,
  filters: ModalFilterState = getDefaultModalFilters(),
) {
  if (!widgetId) {
    return undefined;
  }

  const dataset = catalog.blocks[widgetId];

  if (!dataset) {
    return undefined;
  }

  const rows = filterByModalFilters(dataset.rows, filters, {
    pathologist: (row) => row.pathologist,
    macroPathologist: (row) => row.macroPathologist,
    searchText: (row) =>
      `${row.blockId} ${row.caseNumber} ${row.location} ${row.status} ${row.pathologist}`,
  });

  return {
    ...dataset,
    rows,
    stats: getModalStats(rows),
  };
}

export function getMedicalModalViewModel(
  catalog: ModalVariantCatalog,
  widgetId?: WidgetId,
  filters: ModalFilterState = getDefaultModalFilters(),
) {
  if (!widgetId) {
    return undefined;
  }

  const dataset = catalog.medical[widgetId];

  if (!dataset) {
    return undefined;
  }

  const rows = filterByModalFilters(dataset.rows, filters, {
    pathologist: (row) => row.pathologist,
    organType: (row) => row.organType,
    caseType: (row) => row.caseType,
    searchText: (row) =>
      `${row.caseId} ${row.patientService} ${row.status} ${row.organType} ${row.caseType} ${row.pathologist}`,
  });

  return {
    ...dataset,
    rows,
    stats: getModalStats(rows),
  };
}

export function getCasesModalViewModel(
  catalog: ModalVariantCatalog,
  widgetId?: WidgetId,
  filters: ModalFilterState = getDefaultModalFilters(),
  technique?: string,
) {
  if (!widgetId) {
    return undefined;
  }

  const dataset = catalog.cases[widgetId];

  if (!dataset) {
    return undefined;
  }

  const baseRows = technique
    ? dataset.rows.filter((row) => row.technique === technique)
    : dataset.rows;

  const rows = filterByModalFilters(baseRows, filters, {
    pathologist: (row) => row.pathologist,
    organType: (row) => row.organType,
    caseType: (row) => row.caseType,
    macroPathologist: (row) => row.macroPathologist,
    searchText: (row) =>
      `${row.caseNumber} ${row.patientService} ${row.caseType} ${row.phase} ${row.pathologist}`,
  });

  return {
    ...dataset,
    rows,
    stats: getModalStats(rows),
  };
}

export function getTechSummaryViewModel(
  catalog: ModalVariantCatalog,
  widgetId?: WidgetId,
  filters: ModalFilterState = getDefaultModalFilters(),
) {
  if (!widgetId) {
    return undefined;
  }

  const dataset = catalog['tech-summary'][widgetId];

  if (!dataset) {
    return undefined;
  }

  const rows = filterByModalFilters(dataset.rows, filters, {
    searchText: (row) => `${row.technique} ${row.pendingCases}`,
  });

  return {
    ...dataset,
    rows,
    stats: {
      visibleRows: rows.length,
      totalDays: rows.reduce((acc, row) => acc + row.averageDays, 0),
      uniquePathologists: 0,
    },
  };
}

export function getModalViewModel(
  catalog: ModalVariantCatalog,
  modal?: OverviewUiState['modal'],
): ModalVariantViewModel | undefined {
  if (!modal) {
    return undefined;
  }

  const { variant, widgetId, filters, technique } = modal;

  switch (variant) {
    case 'blocks':
      return getBlocksModalViewModel(catalog, widgetId, filters);
    case 'medical':
      return getMedicalModalViewModel(catalog, widgetId, filters);
    case 'cases':
      return getCasesModalViewModel(catalog, widgetId, filters, technique);
    case 'tech-summary':
      return getTechSummaryViewModel(catalog, widgetId, filters);
    default:
      return undefined;
  }
}

export function getModalStats(
  rows: Array<
    Pick<BlockTableRow, 'days' | 'pathologist'> |
      Pick<MedicalTableRow, 'days' | 'pathologist'> |
      Pick<CaseTableRow, 'days' | 'pathologist'>
  >,
): ModalStatSummary {
  return {
    visibleRows: rows.length,
    totalDays: rows.reduce((acc, row) => acc + row.days, 0),
    uniquePathologists: new Set(rows.map((row) => row.pathologist)).size,
  };
}

export function filterModalRows(
  rows: CaseTableRow[],
  filters: Pick<OverviewFiltersState, 'pathologist'>,
) {
  if (!filters.pathologist) {
    return rows;
  }

  return rows.filter((row) => row.pathologist === filters.pathologist);
}

export function getModalDataset(
  datasets: Record<WidgetId, ModalDataset>,
  widgetId?: WidgetId,
): ModalDataset | undefined {
  if (!widgetId) {
    return undefined;
  }

  return datasets[widgetId];
}

export function getModalVariantDataset(
  catalog: ModalVariantCatalog,
  variant: ModalVariant,
  widgetId?: WidgetId,
):
  | ModalVariantDataset<BlockTableRow>
  | ModalVariantDataset<MedicalTableRow>
  | ModalVariantDataset<CaseTableRow>
  | ModalVariantDataset<TechSummaryRow>
  | ModalVariantDataset<ModalVariantRow>
  | undefined {
  if (!widgetId) {
    return undefined;
  }

  return catalog[variant][widgetId] as
    | ModalVariantDataset<BlockTableRow>
    | ModalVariantDataset<MedicalTableRow>
    | ModalVariantDataset<CaseTableRow>
    | ModalVariantDataset<TechSummaryRow>
    | undefined;
}
