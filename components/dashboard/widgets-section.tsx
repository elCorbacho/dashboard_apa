import type { WidgetDefinition, WidgetRow } from '@/lib/dashboard/contracts';

interface WidgetsSectionProps {
  rows: WidgetRow[];
  onWidgetSelect: (widget: WidgetDefinition) => void;
}

const areaColorClassMap: Record<WidgetDefinition['area'], string> = {
  macro: 'border-l-op-warning',
  inclusion: 'border-l-op-success',
  medicos: 'border-l-op-blue',
  laboratorio: 'border-l-op-danger',
};

export function WidgetsSection({ rows, onWidgetSelect }: WidgetsSectionProps) {
  const totalVisible = rows.reduce(
    (acc, row) => acc + row.widgets.filter((widget) => widget !== null).length,
    0,
  );

  return (
    <section className="space-y-4" aria-label="Monitoreo de alarmas">
      <header className="rounded-md border border-border bg-card p-4">
        <h2 className="text-base font-bold leading-tight">
          Monitoreo de Alarmas — {totalVisible} Widgets
        </h2>
      </header>

      {rows.map((row) => (
        <article
          key={row.id}
          className="space-y-3 rounded-md border border-border bg-card p-4"
        >
          <div className={`border-l-4 pl-3 ${areaColorClassMap[row.area]}`}>
            <p className="text-sm font-semibold">{row.title}</p>
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {row.subtitle}
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {row.widgets.map((widget, index) =>
              widget ? (
                <button
                  key={widget.id}
                  type="button"
                  onClick={() => onWidgetSelect(widget)}
                  className="rounded-md border border-border bg-background p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent focus-visible:border-primary focus-visible:outline-none"
                  aria-label={`Widget ${widget.id}: ${widget.label}`}
                  title={
                    widget.behavior.type === 'drilldown'
                      ? 'Abrir desglose por técnica'
                      : `Abrir modal ${widget.behavior.variant}`
                  }
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {String(widget.id).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      &gt; {widget.thresholdDays} días
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-tight">
                    {widget.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold tabular-nums leading-tight">
                    {widget.value.toLocaleString('es-CL')}
                  </p>
                  {widget.behavior.type === 'drilldown' ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.08em] text-primary">
                      Ver desglose
                    </p>
                  ) : null}
                </button>
              ) : (
                <div
                  key={`placeholder-${row.id}-${index}`}
                  className="rounded-md border border-dashed border-border/60 bg-background/40"
                  aria-hidden="true"
                />
              ),
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
