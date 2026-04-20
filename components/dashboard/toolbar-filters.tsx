'use client';

import type { ReactNode } from 'react';

import type {
  OverviewFiltersState,
  ToolbarFilters,
} from '@/lib/dashboard/contracts';

interface ToolbarFiltersProps {
  filters: ToolbarFilters;
  value: OverviewFiltersState;
  onChange: (next: OverviewFiltersState) => void;
}

export function ToolbarFilters({
  filters,
  value,
  onChange,
}: ToolbarFiltersProps) {
  return (
    <section
      className="flex flex-col gap-4 rounded-md border border-border bg-card p-4"
      aria-label="Filtros del overview"
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="grid gap-3 md:grid-cols-3 xl:flex xl:flex-wrap xl:items-end xl:gap-4">
        <FilterControl label="Área" htmlFor="filterArea">
          <select
            id="filterArea"
            value={value.area}
            onChange={(event) =>
              onChange({
                ...value,
                area: event.target.value as OverviewFiltersState['area'],
              })
            }
            className="h-10 w-full min-w-[13rem] rounded-md border border-border bg-background px-3 text-sm focus-visible:border-primary focus-visible:outline-none"
          >
            {filters.areas.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.supported === false}
              >
                {option.label}
                {option.supported === false ? ' (placeholder)' : ''}
              </option>
            ))}
          </select>
        </FilterControl>

        <FilterControl label="Umbral" htmlFor="filterThreshold">
          <select
            id="filterThreshold"
            value={value.threshold}
            onChange={(event) =>
              onChange({
                ...value,
                threshold: Number(event.target.value),
              })
            }
            className="h-10 w-full min-w-[10rem] rounded-md border border-border bg-background px-3 text-sm focus-visible:border-primary focus-visible:outline-none"
          >
            {filters.thresholds.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FilterControl>

        <FilterControl label="Patólogo" htmlFor="filterPathologist">
          <select
            id="filterPathologist"
            value={value.pathologist}
            onChange={(event) =>
              onChange({
                ...value,
                pathologist: event.target.value,
              })
            }
            className="h-10 w-full min-w-[12rem] rounded-md border border-border bg-background px-3 text-sm focus-visible:border-primary focus-visible:outline-none"
          >
            {filters.pathologists.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FilterControl>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row xl:shrink-0 xl:justify-end">
          <button
            type="button"
            className="h-10 rounded-md border border-border px-4 text-sm font-medium text-muted-foreground focus-visible:border-primary focus-visible:outline-none"
            aria-label="Actualizar datos (placeholder v1)"
            title="Acción placeholder en v1"
          >
            Actualizar (placeholder)
          </button>
          <button
            type="button"
            className="h-10 rounded-md border border-primary/40 bg-primary/10 px-4 text-sm font-medium focus-visible:border-primary focus-visible:outline-none"
            aria-label="Exportar resultados (placeholder v1)"
            title="Exportación no implementada en v1"
          >
            Exportar (placeholder)
          </button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Opciones marcadas como placeholder se muestran solo como referencia de roadmap.
      </p>
    </section>
  );
}

function FilterControl({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2 xl:min-w-[12rem]">
      <label
        htmlFor={htmlFor}
        className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
      >
        {label}
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
