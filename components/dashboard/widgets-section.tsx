import { motion } from 'framer-motion';
import type { WidgetDefinition, WidgetRow } from '@/lib/dashboard/contracts';

interface WidgetsSectionProps {
  rows: WidgetRow[];
  onWidgetSelect: (widget: WidgetDefinition) => void;
}

export function WidgetsSection({ rows, onWidgetSelect }: WidgetsSectionProps) {
  const totalVisible = rows.reduce(
    (acc, row) => acc + row.widgets.filter((widget) => widget !== null).length,
    0,
  );

  return (
    <section className="space-y-4" aria-label="Monitoreo de alarmas">
      <header className="rounded-md border border-border bg-card p-4">
        <h2 className="text-base font-semibold">
          Monitoreo de Alarmas — {totalVisible} widgets
        </h2>
      </header>

      {rows.map((row, rowIndex) => (
        <motion.article
          key={row.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: rowIndex * 0.05,
            duration: 0.2,
            ease: 'easeOut',
          }}
          className="rounded-md border border-border bg-card p-4"
        >
          <div className="mb-3">
            <p className="text-sm font-medium">{row.title}</p>
            <p className="text-sm text-muted-foreground">{row.subtitle}</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {row.widgets.map((widget, index) =>
              widget ? (
                <motion.button
                  key={widget.id}
                  type="button"
                  onClick={() => onWidgetSelect(widget)}
                  className="rounded-md border border-border bg-background p-3 text-left"
                  aria-label={`Widget ${widget.id}: ${widget.label}`}
                  title={
                    widget.behavior.type === 'drilldown'
                      ? 'Abrir desglose por técnica'
                      : `Abrir modal ${widget.behavior.variant}`
                  }
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderColor: 'hsl(213, 100%, 50%, 0.5)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {String(widget.id).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium">{widget.label}</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums">
                    {widget.value.toLocaleString('es-CL')}
                  </p>
                  {widget.behavior.type === 'drilldown' ? (
                    <p className="mt-1 text-sm text-primary">
                      {widget.thresholdDays} días
                    </p>
                  ) : null}
                </motion.button>
              ) : (
                <div
                  key={`placeholder-${row.id}-${index}`}
                  className="rounded-md border border-dashed border-border/60 bg-background/40"
                  aria-hidden="true"
                />
              ),
            )}
          </div>
        </motion.article>
      ))}
    </section>
  );
}
