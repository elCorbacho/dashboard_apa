/**
 * Rutas de navegación visibles en el shell del dashboard.
 */
export type DashboardRoute = 'overview' | 'widgets' | 'areas' | 'tecnicas';

/**
 * Áreas operativas usadas por widgets y tablas.
 */
export type WidgetArea = 'macro' | 'inclusion' | 'medicos' | 'laboratorio';

/**
 * Identificadores fijos de widgets legacy del Overview.
 */
export type WidgetId =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;

/**
 * Widgets de laboratorio que habilitan drilldown por técnica.
 */
export type DrilldownWidgetId = 13 | 14 | 15 | 16;

/**
 * Variantes de modal soportadas por la capa de paridad.
 */
export type ModalVariant = 'cases' | 'blocks' | 'medical' | 'tech-summary';

/**
 * Definición de acción de widget para enrutar modal/drilldown.
 */
export type WidgetBehavior =
  | {
      type: 'modal';
      variant: Extract<ModalVariant, 'blocks' | 'medical' | 'tech-summary'>;
    }
  | {
      type: 'drilldown';
      variant: 'techniques';
      nextModal: Extract<ModalVariant, 'cases'>;
    };

/**
 * Item de navegación para sidebar y header.
 */
export interface NavigationItem {
  id: DashboardRoute;
  label: string;
  href: string;
  implemented: boolean;
  description: string;
}

/**
 * Indicador KPI principal mostrado en la barra superior.
 */
export interface KpiMetric {
  id:
    | 'casos-activos'
    | 'alarmas-abiertas'
    | 'tat-promedio'
    | 'adendum-pendientes';
  label: string;
  value: number;
  unit?: string;
  subtext: string;
  tone: 'default' | 'warning' | 'critical';
}

/**
 * Opción de filtro genérica (label/value).
 */
export interface ToolbarOption {
  value: string;
  label: string;
  supported?: boolean;
}

/**
 * Opción de umbral en días para resaltar widgets críticos.
 */
export interface ThresholdOption {
  value: number;
  label: string;
}

/**
 * Configuración completa de filtros de toolbar.
 */
export interface ToolbarFilters {
  areas: ToolbarOption[];
  pathologists: ToolbarOption[];
  thresholds: ThresholdOption[];
  defaultThreshold: number;
}

/**
 * Filtros de modal para variantes de detalle.
 */
export interface ModalFilterState {
  pathologist: string;
  organType: string;
  caseType: string;
  macroPathologist: string;
  search: string;
}

/**
 * Definición de columna para tablas de modal por variante.
 */
export interface ModalTableColumn {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
}

/**
 * Esquema de tabla para renderizado por variante.
 */
export interface ModalTableSchema {
  variant: ModalVariant;
  columns: ModalTableColumn[];
}

/**
 * Opciones de filtros disponibles por variante.
 */
export interface ModalFilterOptions {
  pathologists: ToolbarOption[];
  organTypes: ToolbarOption[];
  caseTypes: ToolbarOption[];
  macroPathologists: ToolbarOption[];
}

/**
 * Métrica puntual renderizada en una tarjeta/widget.
 */
export interface WidgetMetric {
  id: WidgetId;
  area: WidgetArea;
  label: string;
  value: number;
  threshold: number;
  thresholdDays: number;
  behavior: WidgetBehavior;
}

/**
 * Definición completa de widget legacy para paridad de comportamiento.
 */
export interface WidgetDefinition extends WidgetMetric {
  rowId: WidgetRow['id'];
  rowIndex: number;
  position: number;
}

/**
 * Fila visual del grid de widgets con hasta 5 posiciones.
 */
export interface WidgetRow {
  id: string;
  title: string;
  subtitle: string;
  area: WidgetArea;
  widgets: Array<WidgetDefinition | null>;
}

/**
 * Entrada de desglose técnico para panel drilldown.
 */
export interface TechniqueBreakdown {
  technique: string;
  count: number;
  description?: string;
}

/**
 * Fila de caso para tablas de modal de detalle.
 */
export interface CaseTableRow {
  id: string;
  widgetId: WidgetId;
  area: WidgetArea;
  caseNumber: string;
  patientService: string;
  caseType: string;
  phase: string;
  pathologist: string;
  days: number;
  technique?: string;
  organType?: string;
  macroPathologist?: string;
}

/**
 * Fila para modal de bloques (widgets 1-7).
 */
export interface BlockTableRow {
  id: string;
  widgetId: WidgetId;
  area: WidgetArea;
  blockId: string;
  caseNumber: string;
  location: string;
  status: string;
  pathologist: string;
  macroPathologist: string;
  days: number;
}

/**
 * Fila para modal médico (widgets 8-12).
 */
export interface MedicalTableRow {
  id: string;
  widgetId: WidgetId;
  area: WidgetArea;
  caseId: string;
  patientService: string;
  status: string;
  pathologist: string;
  organType: string;
  caseType: string;
  days: number;
}

/**
 * Fila de agregado por técnica (resumen).
 */
export interface TechSummaryRow {
  id: string;
  widgetId: WidgetId;
  technique: string;
  pendingCases: number;
  averageDays: number;
  criticalCases: number;
}

/**
 * Unión de filas por variante de modal.
 */
export type ModalVariantRow =
  | CaseTableRow
  | BlockTableRow
  | MedicalTableRow
  | TechSummaryRow;

/**
 * Dataset de modal asociado a un widget.
 */
export interface ModalDataset {
  widgetId: WidgetId;
  widgetLabel: string;
  rows: CaseTableRow[];
}

/**
 * Dataset tipado por variante para paridad de modal.
 */
export interface ModalVariantDataset<T extends ModalVariantRow> {
  widgetId: WidgetId;
  widgetLabel: string;
  variant: ModalVariant;
  schema: ModalTableSchema;
  filterOptions: ModalFilterOptions;
  rows: T[];
}

/**
 * Catálogo de datasets por variante y widget.
 */
export interface ModalVariantCatalog {
  blocks: Partial<Record<WidgetId, ModalVariantDataset<BlockTableRow>>>;
  medical: Partial<Record<WidgetId, ModalVariantDataset<MedicalTableRow>>>;
  cases: Partial<Record<WidgetId, ModalVariantDataset<CaseTableRow>>>;
  'tech-summary': Partial<Record<WidgetId, ModalVariantDataset<TechSummaryRow>>>;
}

/**
 * Estado de filtros activos en Overview.
 */
export interface OverviewFiltersState {
  area: string;
  threshold: number;
  pathologist: string;
}

/**
 * Estado de UI de Overview para enrutar widget → drilldown → modal.
 */
export interface OverviewUiState {
  activeWidgetId?: WidgetId;
  drilldown?: {
    widgetId: DrilldownWidgetId;
    selectedTechnique?: string;
  };
  modal?: {
    variant: ModalVariant;
    widgetId: WidgetId;
    technique?: string;
    filters: ModalFilterState;
  };
}

/**
 * ViewModel de toolbar: opciones + estado seleccionado.
 */
export interface ToolbarFiltersViewModel {
  options: ToolbarFilters;
  value: OverviewFiltersState;
}

/**
 * Snapshot normalizado consumido por la UI del dashboard.
 */
export interface DashboardSnapshot {
  navigation: NavigationItem[];
  kpis: KpiMetric[];
  toolbar: ToolbarFilters;
  widgets: WidgetDefinition[];
  widgetRows: WidgetRow[];
  drilldowns: Record<WidgetId, TechniqueBreakdown[]>;
  modalData: Record<WidgetId, ModalDataset>;
  modalCatalog: ModalVariantCatalog;
  initialUiState: OverviewUiState;
}

/**
 * Alias semántico para snapshots centrados en Overview.
 */
export type OverviewSnapshot = DashboardSnapshot;

/**
 * ViewModel mínimo para render inicial de Overview.
 */
export interface OverviewFoundationViewModel {
  kpis: KpiMetric[];
  widgetRows: WidgetRow[];
  widgetCount: number;
  implementedRouteCount: number;
  placeholderRouteCount: number;
}
