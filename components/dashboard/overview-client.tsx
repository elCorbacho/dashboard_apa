'use client';

import { useMemo, useState } from 'react';

import { CasesModal } from '@/components/dashboard/cases-modal';
import { DrilldownPanel } from '@/components/dashboard/drilldown-panel';
import { KpiBar } from '@/components/dashboard/kpi-bar';
import { ToolbarFilters } from '@/components/dashboard/toolbar-filters';
import { WidgetsSection } from '@/components/dashboard/widgets-section';
import type {
  DashboardSnapshot,
  OverviewFiltersState,
  OverviewUiState,
  WidgetDefinition,
} from '@/lib/dashboard/contracts';
import {
  getDefaultModalFilters,
  getDefaultOverviewUiState,
  getDrilldownRows,
  getModalViewModel,
  getOverviewDerivedData,
  isDrilldownWidgetId,
} from '@/lib/dashboard/selectors';

interface OverviewClientProps {
  snapshot: DashboardSnapshot;
  initialFilters: OverviewFiltersState;
}

export function OverviewClient({
  snapshot,
  initialFilters,
}: OverviewClientProps) {
  const [filters, setFilters] = useState<OverviewFiltersState>(initialFilters);
  const [uiState, setUiState] = useState<OverviewUiState>(
    snapshot.initialUiState,
  );

  const activeTechnique = uiState.modal?.technique;
  const modalOpen = Boolean(uiState.modal);

  const derived = useMemo(
    () =>
      getOverviewDerivedData(snapshot.widgetRows, {
        area: filters.area,
        threshold: filters.threshold,
      }),
    [snapshot.widgetRows, filters.area, filters.threshold],
  );

  const drilldownRows = useMemo(
    () => getDrilldownRows(snapshot.drilldowns, uiState.drilldown?.widgetId),
    [snapshot.drilldowns, uiState.drilldown?.widgetId],
  );

  const modalViewModel = useMemo(
    () => getModalViewModel(snapshot.modalCatalog, uiState.modal),
    [snapshot.modalCatalog, uiState.modal],
  );

  const kpis = useMemo(
    () =>
      snapshot.kpis.map((kpi) =>
        kpi.id === 'alarmas-abiertas'
          ? {
              ...kpi,
              value: derived.visibleWidgetCount,
            }
          : kpi,
      ),
    [snapshot.kpis, derived.visibleWidgetCount],
  );

  const handleWidgetSelect = (widget: WidgetDefinition) => {
    if (widget.behavior.type === 'drilldown') {
      if (!isDrilldownWidgetId(widget.id)) {
        return;
      }

      setUiState({
        activeWidgetId: widget.id,
        drilldown: {
          widgetId: widget.id,
        },
        modal: undefined,
      });
      return;
    }

    setUiState({
      activeWidgetId: widget.id,
      drilldown: undefined,
      modal: {
        variant: widget.behavior.variant,
        widgetId: widget.id,
        filters: getDefaultModalFilters(),
      },
    });
  };

  return (
    <section className="space-y-4">
      <p className="text-sm uppercase tracking-[0.2em] text-primary">Overview</p>
      <h2 className="text-xl font-semibold">Monitoreo operativo BI4H</h2>
      <p className="max-w-2xl text-sm text-muted-foreground">
        Paridad funcional basada en adapter mock: KPIs, filtros, widgets,
        drilldown y tabla de casos listos para evolución hacia una API real.
      </p>

      <KpiBar kpis={kpis} />

      <ToolbarFilters
        filters={snapshot.toolbar}
        value={filters}
        onChange={setFilters}
      />

      <WidgetsSection
        rows={derived.filteredRows}
        onWidgetSelect={handleWidgetSelect}
      />

      <DrilldownPanel
        rows={drilldownRows}
        widgetId={uiState.drilldown?.widgetId}
        onClose={() => {
          setUiState((current) => ({
            ...current,
            drilldown: undefined,
          }));
        }}
        onSelectTechnique={(technique) => {
          if (!uiState.drilldown || !isDrilldownWidgetId(uiState.drilldown.widgetId)) {
            return;
          }

          setUiState({
            activeWidgetId: uiState.drilldown.widgetId,
            drilldown: {
              widgetId: uiState.drilldown.widgetId,
              selectedTechnique: technique,
            },
            modal: {
              variant: 'cases',
              widgetId: uiState.drilldown.widgetId,
              technique,
              filters: getDefaultModalFilters(),
            },
          });
        }}
      />

      <CasesModal
        open={modalOpen}
        viewModel={modalViewModel}
        filters={uiState.modal?.filters ?? getDefaultModalFilters()}
        technique={activeTechnique}
        onFiltersChange={(nextFilters) => {
          setUiState((current) => {
            if (!current.modal) {
              return current;
            }

            return {
              ...current,
              modal: {
                ...current.modal,
                filters: nextFilters,
              },
            };
          });
        }}
        onReset={() => {
          setUiState((current) => {
            if (!current.modal) {
              return current;
            }

            return {
              ...current,
              modal: {
                ...current.modal,
                filters: getDefaultModalFilters(),
              },
            };
          });
        }}
        onClose={() => {
          setUiState((current) => {
            if (!current.modal) {
              return current;
            }

            if (current.drilldown) {
              return {
                ...current,
                drilldown: {
                  ...current.drilldown,
                  selectedTechnique: undefined,
                },
                modal: undefined,
              };
            }

            return getDefaultOverviewUiState();
          });
        }}
      />
    </section>
  );
}
