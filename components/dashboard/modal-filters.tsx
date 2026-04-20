'use client';

import type { ModalFilterOptions, ModalFilterState } from '@/lib/dashboard/contracts';

interface ModalFiltersProps {
  filters: ModalFilterState;
  options: ModalFilterOptions;
  onChange: (next: ModalFilterState) => void;
}

export function ModalFilters({ filters, options, onChange }: ModalFiltersProps) {
  return (
    <section
      className="mb-3 grid gap-2 rounded-md border border-border bg-card/40 p-3 lg:grid-cols-5"
      aria-label="Filtros del modal"
    >
      <FilterSelect
        id="modal-filter-pathologist"
        label="Patólogo"
        value={filters.pathologist}
        onChange={(value) => onChange({ ...filters, pathologist: value })}
        options={options.pathologists}
      />

      <FilterSelect
        id="modal-filter-organ"
        label="Órgano"
        value={filters.organType}
        onChange={(value) => onChange({ ...filters, organType: value })}
        options={options.organTypes}
      />

      <FilterSelect
        id="modal-filter-case-type"
        label="Tipo"
        value={filters.caseType}
        onChange={(value) => onChange({ ...filters, caseType: value })}
        options={options.caseTypes}
      />

      <FilterSelect
        id="modal-filter-macro-pathologist"
        label="Macro"
        value={filters.macroPathologist}
        onChange={(value) => onChange({ ...filters, macroPathologist: value })}
        options={options.macroPathologists}
      />

      <label className="grid gap-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Buscar
        <input
          type="search"
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          className="h-9 rounded-md border border-border bg-background px-3 text-sm tracking-normal text-foreground focus-visible:border-primary focus-visible:outline-none"
          placeholder="Caso, técnica, paciente..."
        />
      </label>
    </section>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label
      htmlFor={id}
      className="grid gap-1 text-xs uppercase tracking-[0.12em] text-muted-foreground"
    >
      {label}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 rounded-md border border-border bg-background px-3 text-sm tracking-normal text-foreground focus-visible:border-primary focus-visible:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
