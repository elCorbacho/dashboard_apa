import { motion, useReducedMotion } from 'framer-motion';

import type { TechniqueBreakdown } from '@/lib/dashboard/contracts';

interface DrilldownPanelProps {
  rows: TechniqueBreakdown[];
  widgetId?: number;
  onClose: () => void;
  onSelectTechnique?: (technique: string) => void;
}

export function DrilldownPanel({
  rows,
  widgetId,
  onClose,
  onSelectTechnique,
}: DrilldownPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!widgetId || rows.length === 0) {
    return null;
  }

  const total = rows.reduce((acc, item) => acc + item.count, 0);

  return (
    <motion.section
      className="rounded-md border border-border bg-card p-4"
      aria-label="Desglose por técnica"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.14, ease: 'easeOut' }
      }
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">
          Desglose por Técnica — Widget {String(widgetId).padStart(2, '0')}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground focus-visible:border-primary focus-visible:outline-none"
        >
          Cerrar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <th className="px-2 py-2">Técnica</th>
              <th className="px-2 py-2">Láminas</th>
              <th className="px-2 py-2">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const percentage = total
                ? ((row.count / total) * 100).toFixed(1)
                : '0.0';

              return (
                <tr
                  key={row.technique}
                  className="border-b border-border/60 last:border-b-0"
                >
                  <td className="px-2 py-2">
                    <button
                      type="button"
                      className="text-left font-medium text-foreground hover:text-primary focus-visible:rounded-sm focus-visible:border-b focus-visible:border-primary focus-visible:outline-none"
                      onClick={() => onSelectTechnique?.(row.technique)}
                    >
                      {row.technique}
                    </button>
                    {row.description ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {row.description}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-2 py-2 tabular-nums">
                    {row.count.toLocaleString('es-CL')}
                  </td>
                  <td className="px-2 py-2 tabular-nums">{percentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
