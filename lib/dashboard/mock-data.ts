import type {
  BlockTableRow,
  CaseTableRow,
  KpiMetric,
  MedicalTableRow,
  ModalDataset,
  ModalFilterOptions,
  ModalTableSchema,
  ModalVariantCatalog,
  NavigationItem,
  TechniqueBreakdown,
  TechSummaryRow,
  ToolbarFilters,
  WidgetArea,
  WidgetDefinition,
  WidgetId,
  WidgetRow,
} from '@/lib/dashboard/contracts';

export const navigationData: NavigationItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/',
    implemented: true,
    description: 'Vista principal operativa del dashboard BI4H.',
  },
  {
    id: 'widgets',
    label: 'Widgets',
    href: '/widgets',
    implemented: false,
    description:
      'Sección reservada para exploración de widgets en versiones futuras.',
  },
  {
    id: 'areas',
    label: 'Áreas',
    href: '/areas',
    implemented: false,
    description: 'Sección de indicadores por área en estado placeholder.',
  },
  {
    id: 'tecnicas',
    label: 'Técnicas',
    href: '/tecnicas',
    implemented: false,
    description: 'Sección de técnicas y desglose en estado placeholder.',
  },
];

export const kpiData: KpiMetric[] = [
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

export const toolbarData: ToolbarFilters = {
  areas: [
    { value: '', label: 'Todas las áreas', supported: true },
    { value: 'macro', label: 'Macroscopía', supported: true },
    { value: 'inclusion', label: 'Inclusión/Corte', supported: true },
    { value: 'hq', label: 'Histoquímicas', supported: false },
    { value: 'ihq-if', label: 'IHQ/IF', supported: false },
    { value: 'molecular', label: 'Molecular', supported: false },
    { value: 'citologia', label: 'Citología', supported: false },
  ],
  thresholds: [
    { value: 0, label: 'Todos' },
    { value: 3, label: '> 3 días' },
    { value: 5, label: '> 5 días' },
    { value: 7, label: '> 7 días' },
    { value: 14, label: '> 14 días' },
  ],
  pathologists: [
    { value: '', label: 'Todos' },
    { value: 'Dr. Rivas', label: 'Dr. Rivas' },
    { value: 'Dra. Pérez', label: 'Dra. Pérez' },
    { value: 'Dr. Muñoz', label: 'Dr. Muñoz' },
    { value: 'Dra. Soto', label: 'Dra. Soto' },
    { value: 'Dr. Lara', label: 'Dr. Lara' },
  ],
  defaultThreshold: 0,
};

const widgetAreaById: Record<WidgetId, WidgetArea> = {
  1: 'macro',
  2: 'macro',
  3: 'macro',
  4: 'macro',
  5: 'macro',
  6: 'inclusion',
  7: 'inclusion',
  8: 'medicos',
  9: 'medicos',
  10: 'medicos',
  11: 'medicos',
  12: 'medicos',
  13: 'laboratorio',
  14: 'laboratorio',
  15: 'laboratorio',
  16: 'laboratorio',
};

const widgetBaseMetrics: Array<
  Pick<WidgetDefinition, 'id' | 'label' | 'value' | 'thresholdDays'>
> = [
  { id: 1, label: 'Casetes en inicio', value: 50, thresholdDays: 4 },
  { id: 2, label: 'Casetes impresos', value: 160, thresholdDays: 3 },
  { id: 3, label: 'Casetes sin procesar', value: 38, thresholdDays: 2 },
  { id: 4, label: 'Casetes en el procesador', value: 6, thresholdDays: 1 },
  { id: 5, label: 'Casetes sin incluir', value: 41, thresholdDays: 2 },
  { id: 6, label: 'Bloques sin retirar', value: 8, thresholdDays: 3 },
  { id: 7, label: 'Bloques sin cortar', value: 38, thresholdDays: 2 },
  { id: 8, label: 'Casos sin macroscopía', value: 40, thresholdDays: 3 },
  { id: 9, label: 'Casos sin procesar', value: 17, thresholdDays: 4 },
  { id: 10, label: 'Casos sin microscopía', value: 71, thresholdDays: 5 },
  { id: 11, label: 'Casos sin firmar', value: 29, thresholdDays: 5 },
  { id: 12, label: 'Adendum sin firmar', value: 154, thresholdDays: 7 },
  { id: 13, label: 'Láminas en inicio', value: 238, thresholdDays: 2 },
  { id: 14, label: 'Láminas adicionales inicio', value: 82, thresholdDays: 2 },
  { id: 15, label: 'Láminas pagadas sin cortar', value: 41, thresholdDays: 2 },
  { id: 16, label: 'Láminas sin distribuir', value: 204, thresholdDays: 2 },
];

const widgetBehaviorById = {
  1: { type: 'modal', variant: 'blocks' },
  2: { type: 'modal', variant: 'blocks' },
  3: { type: 'modal', variant: 'blocks' },
  4: { type: 'modal', variant: 'blocks' },
  5: { type: 'modal', variant: 'blocks' },
  6: { type: 'modal', variant: 'blocks' },
  7: { type: 'modal', variant: 'blocks' },
  8: { type: 'modal', variant: 'medical' },
  9: { type: 'modal', variant: 'medical' },
  10: { type: 'modal', variant: 'medical' },
  11: { type: 'modal', variant: 'medical' },
  12: { type: 'modal', variant: 'medical' },
  13: { type: 'drilldown', variant: 'techniques', nextModal: 'cases' },
  14: { type: 'drilldown', variant: 'techniques', nextModal: 'cases' },
  15: { type: 'drilldown', variant: 'techniques', nextModal: 'cases' },
  16: { type: 'drilldown', variant: 'techniques', nextModal: 'cases' },
} as const;

const rowBlueprints = [
  {
    id: 'row-casetes',
    title: 'Casetes',
    subtitle: 'Macroscopía',
    area: 'macro' as const,
    widgetIds: [1, 2, 3, 4, 5] as const,
  },
  {
    id: 'row-bloques',
    title: 'Bloques',
    subtitle: 'Inclusión',
    area: 'inclusion' as const,
    widgetIds: [6, 7] as const,
    placeholders: 3,
  },
  {
    id: 'row-casos',
    title: 'Casos',
    subtitle: 'Médicos',
    area: 'medicos' as const,
    widgetIds: [8, 9, 10, 11, 12] as const,
  },
  {
    id: 'row-laminas',
    title: 'Láminas',
    subtitle: 'Laboratorio',
    area: 'laboratorio' as const,
    widgetIds: [13, 14, 15, 16] as const,
    placeholders: 1,
  },
] as const;

function getRowPlaceholderCount(
  row: (typeof rowBlueprints)[number],
): number {
  return 'placeholders' in row ? row.placeholders : 0;
}

export const widgetDefinitionsData: WidgetDefinition[] = rowBlueprints.flatMap(
  (row, rowIndex) =>
    row.widgetIds.map((widgetId, index) => {
      const base = widgetBaseMetrics.find((item) => item.id === widgetId);

      if (!base) {
        throw new Error(`Missing base metric for widget ${widgetId}`);
      }

      return {
        ...base,
        area: widgetAreaById[widgetId],
        threshold: base.thresholdDays,
        behavior: widgetBehaviorById[widgetId],
        rowId: row.id,
        rowIndex,
        position: index,
      } satisfies WidgetDefinition;
    }),
);

const widgetMap = Object.fromEntries(
  widgetDefinitionsData.map((widget) => [widget.id, widget]),
) as Record<WidgetId, WidgetDefinition>;

export const widgetRowsData: WidgetRow[] = rowBlueprints.map((row) => {
  const widgets = row.widgetIds.map((id) => widgetMap[id]);

  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    area: row.area,
    widgets: [
      ...widgets,
      ...Array.from({ length: getRowPlaceholderCount(row) }, () => null),
    ],
  } satisfies WidgetRow;
});

export const drilldownData: Record<WidgetId, TechniqueBreakdown[]> = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
  11: [],
  12: [],
  13: [
    {
      technique: 'CORTE',
      count: 101,
      description: 'Corte estándar · rutina diaria',
    },
    {
      technique: 'HQ',
      count: 20,
      description: 'Histoquímicas · tinciones especiales',
    },
    {
      technique: 'IHQ',
      count: 54,
      description: 'Inmunohistoquímica · anticuerpos',
    },
    {
      technique: 'IF',
      count: 28,
      description: 'Inmunofluorescencia · directa/indirecta',
    },
    { technique: 'ELECTR', count: 2, description: 'Microscopía electrónica' },
    {
      technique: 'MOLECULAR',
      count: 3,
      description: 'NGS, FISH, PCR, metiloma',
    },
  ],
  14: [
    {
      technique: 'CORTE',
      count: 20,
      description: 'Corte estándar · rutina diaria',
    },
    {
      technique: 'HQ',
      count: 43,
      description: 'Histoquímicas · tinciones especiales',
    },
    {
      technique: 'IHQ',
      count: 28,
      description: 'Inmunohistoquímica · anticuerpos',
    },
    {
      technique: 'IF',
      count: 10,
      description: 'Inmunofluorescencia · directa/indirecta',
    },
    { technique: 'ELECTR', count: 5, description: 'Microscopía electrónica' },
    {
      technique: 'MOLECULAR',
      count: 50,
      description: 'NGS, FISH, PCR, metiloma',
    },
  ],
  15: [
    {
      technique: 'CORTE',
      count: 31,
      description: 'Corte estándar · rutina diaria',
    },
    {
      technique: 'HQ',
      count: 67,
      description: 'Histoquímicas · tinciones especiales',
    },
    {
      technique: 'IHQ',
      count: 79,
      description: 'Inmunohistoquímica · anticuerpos',
    },
    {
      technique: 'IF',
      count: 15,
      description: 'Inmunofluorescencia · directa/indirecta',
    },
    { technique: 'ELECTR', count: 10, description: 'Microscopía electrónica' },
    {
      technique: 'MOLECULAR',
      count: 26,
      description: 'NGS, FISH, PCR, metiloma',
    },
  ],
  16: [
    {
      technique: 'CORTE',
      count: 304,
      description: 'Corte estándar · rutina diaria',
    },
    {
      technique: 'HQ',
      count: 71,
      description: 'Histoquímicas · tinciones especiales',
    },
    {
      technique: 'IHQ',
      count: 105,
      description: 'Inmunohistoquímica · anticuerpos',
    },
    {
      technique: 'IF',
      count: 31,
      description: 'Inmunofluorescencia · directa/indirecta',
    },
    { technique: 'ELECTR', count: 3, description: 'Microscopía electrónica' },
    {
      technique: 'MOLECULAR',
      count: 21,
      description: 'NGS, FISH, PCR, metiloma',
    },
  ],
};

const fallbackPathologists = [
  'Dr. Rivas',
  'Dra. Pérez',
  'Dr. Muñoz',
  'Dra. Soto',
  'Dr. Lara',
] as const;

const fallbackMacroPathologists = [
  'Dra. Salas',
  'Dr. Cornejo',
  'Dra. Lagos',
] as const;

const fallbackOrganTypes = [
  'Mama',
  'Pulmón',
  'Piel',
  'Tiroides',
  'Colon',
] as const;

const fallbackCaseTypes = ['#B# Biopsia', '#C# Citología', '#P# Pieza'] as const;

const blockLocations = ['Estantería A', 'Estantería B', 'Microtomía'] as const;
const blockStatuses = ['Pendiente retiro', 'En corte', 'Listo'] as const;
const medicalStatuses = ['Ingreso', 'En microscopía', 'Pendiente firma'] as const;

export const baseModalFilterOptions: ModalFilterOptions = {
  pathologists: [
    { value: '', label: 'Todos' },
    ...fallbackPathologists.map((value) => ({ value, label: value })),
  ],
  organTypes: [
    { value: '', label: 'Todos' },
    ...fallbackOrganTypes.map((value) => ({ value, label: value })),
  ],
  caseTypes: [
    { value: '', label: 'Todos' },
    ...fallbackCaseTypes.map((value) => ({ value, label: value })),
  ],
  macroPathologists: [
    { value: '', label: 'Todos' },
    ...fallbackMacroPathologists.map((value) => ({ value, label: value })),
  ],
};

const blocksTableSchema: ModalTableSchema = {
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

const medicalTableSchema: ModalTableSchema = {
  variant: 'medical',
  columns: [
    { key: 'caseId', label: 'N° caso' },
    { key: 'patientService', label: 'Paciente / Servicio' },
    { key: 'status', label: 'Estado' },
    { key: 'organType', label: 'Órgano' },
    { key: 'pathologist', label: 'Patólogo' },
    { key: 'days', label: 'Días', align: 'right' },
  ],
};

const casesTableSchema: ModalTableSchema = {
  variant: 'cases',
  columns: [
    { key: 'caseNumber', label: 'N° caso' },
    { key: 'patientService', label: 'Paciente / Servicio' },
    { key: 'caseType', label: 'Tipo' },
    { key: 'phase', label: 'Fase' },
    { key: 'pathologist', label: 'Patólogo' },
    { key: 'days', label: 'Días', align: 'right' },
  ],
};

const techSummaryTableSchema: ModalTableSchema = {
  variant: 'tech-summary',
  columns: [
    { key: 'technique', label: 'Técnica' },
    { key: 'pendingCases', label: 'Casos pendientes', align: 'right' },
    { key: 'averageDays', label: 'Promedio días', align: 'right' },
    { key: 'criticalCases', label: 'Críticos', align: 'right' },
  ],
};

const widgetLabelById = Object.fromEntries(
  widgetDefinitionsData.map((widget) => [widget.id, widget.label]),
) as Record<WidgetId, string>;

function createCasesForWidget(widgetId: WidgetId): CaseTableRow[] {
  const area = widgetAreaById[widgetId] ?? 'macro';

  return Array.from({ length: 8 }, (_, index) => {
    const pathologist =
      fallbackPathologists[(widgetId + index) % fallbackPathologists.length];
    const macroPathologist =
      fallbackMacroPathologists[
        (widgetId + index) % fallbackMacroPathologists.length
      ];
    const organType = fallbackOrganTypes[(widgetId + index) % fallbackOrganTypes.length];
    const caseType = fallbackCaseTypes[index % fallbackCaseTypes.length];
    const techniqueOptions = drilldownData[widgetId].map((item) => item.technique);
    const technique = techniqueOptions[index % (techniqueOptions.length || 1)];

    return {
      id: `${widgetId}-${index + 1}`,
      widgetId,
      area,
      caseNumber: `B26-${(widgetId * 100 + index + 1).toString().padStart(5, '0')}`,
      patientService: `Paciente ${index + 1} · Servicio ${index % 2 === 0 ? 'Cirugía' : 'Ginecología'}`,
      caseType,
      phase: index % 3 === 0 ? 'Diagnóstico' : 'Firma',
      pathologist,
      days: (index % 6) + 1,
      technique,
      organType,
      macroPathologist,
    };
  });
}

function createBlocksRows(widgetId: WidgetId): BlockTableRow[] {
  return Array.from({ length: 8 }, (_, index) => ({
    id: `block-${widgetId}-${index + 1}`,
    widgetId,
    area: widgetAreaById[widgetId],
    blockId: `BL-${widgetId}${(index + 1).toString().padStart(3, '0')}`,
    caseNumber: `B26-${(widgetId * 100 + index + 10).toString().padStart(5, '0')}`,
    location: blockLocations[index % blockLocations.length],
    status: blockStatuses[index % blockStatuses.length],
    pathologist: fallbackPathologists[index % fallbackPathologists.length],
    macroPathologist:
      fallbackMacroPathologists[index % fallbackMacroPathologists.length],
    days: (index % 5) + 1,
  }));
}

function createMedicalRows(widgetId: WidgetId): MedicalTableRow[] {
  return Array.from({ length: 8 }, (_, index) => ({
    id: `med-${widgetId}-${index + 1}`,
    widgetId,
    area: widgetAreaById[widgetId],
    caseId: `M26-${(widgetId * 100 + index + 20).toString().padStart(5, '0')}`,
    patientService: `Paciente ${index + 1} · Servicio ${index % 2 === 0 ? 'Oncología' : 'Medicina interna'}`,
    status: medicalStatuses[index % medicalStatuses.length],
    pathologist: fallbackPathologists[index % fallbackPathologists.length],
    organType: fallbackOrganTypes[index % fallbackOrganTypes.length],
    caseType: fallbackCaseTypes[index % fallbackCaseTypes.length],
    days: (index % 7) + 1,
  }));
}

function createTechSummaryRows(widgetId: WidgetId): TechSummaryRow[] {
  return drilldownData[widgetId].map((item, index) => ({
    id: `tech-summary-${widgetId}-${item.technique}`,
    widgetId,
    technique: item.technique,
    pendingCases: item.count,
    averageDays: Number((2.2 + (index % 4) * 0.9).toFixed(1)),
    criticalCases: Math.max(1, Math.floor(item.count * 0.08)),
  }));
}

export const modalData: Record<WidgetId, ModalDataset> = Object.fromEntries(
  widgetDefinitionsData.map((widget) => {
    const rows = createCasesForWidget(widget.id);

    return [
      widget.id,
      {
        widgetId: widget.id,
        widgetLabel: widgetLabelById[widget.id],
        rows,
      },
    ];
  }),
) as Record<WidgetId, ModalDataset>;

const blockWidgetIds: WidgetId[] = [1, 2, 3, 4, 5, 6, 7];
const medicalWidgetIds: WidgetId[] = [8, 9, 10, 11, 12];
const laboratoryWidgetIds: WidgetId[] = [13, 14, 15, 16];

const blockModalDatasets = Object.fromEntries(
  blockWidgetIds.map((widgetId) => [
    widgetId,
    {
      widgetId,
      widgetLabel: widgetLabelById[widgetId],
      variant: 'blocks',
      schema: blocksTableSchema,
      filterOptions: baseModalFilterOptions,
      rows: createBlocksRows(widgetId),
    },
  ]),
);

const medicalModalDatasets = Object.fromEntries(
  medicalWidgetIds.map((widgetId) => [
    widgetId,
    {
      widgetId,
      widgetLabel: widgetLabelById[widgetId],
      variant: 'medical',
      schema: medicalTableSchema,
      filterOptions: baseModalFilterOptions,
      rows: createMedicalRows(widgetId),
    },
  ]),
);

const casesModalDatasets = Object.fromEntries(
  laboratoryWidgetIds.map((widgetId) => [
    widgetId,
    {
      widgetId,
      widgetLabel: widgetLabelById[widgetId],
      variant: 'cases',
      schema: casesTableSchema,
      filterOptions: baseModalFilterOptions,
      rows: modalData[widgetId].rows,
    },
  ]),
);

const techSummaryModalDatasets = Object.fromEntries(
  laboratoryWidgetIds.map((widgetId) => [
    widgetId,
    {
      widgetId,
      widgetLabel: widgetLabelById[widgetId],
      variant: 'tech-summary',
      schema: techSummaryTableSchema,
      filterOptions: baseModalFilterOptions,
      rows: createTechSummaryRows(widgetId),
    },
  ]),
);

export const modalCatalogData: ModalVariantCatalog = {
  blocks: blockModalDatasets,
  medical: medicalModalDatasets,
  cases: casesModalDatasets,
  'tech-summary': techSummaryModalDatasets,
};
