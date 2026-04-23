'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ModalFilters } from '@/components/dashboard/modal-filters';
import { ModalTable } from '@/components/dashboard/modal-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ModalFilterState } from '@/lib/dashboard/contracts';
import type { ModalVariantViewModel } from '@/lib/dashboard/selectors';

interface CasesModalProps {
  open: boolean;
  viewModel?: ModalVariantViewModel;
  filters: ModalFilterState;
  technique?: string;
  onFiltersChange: (next: ModalFilterState) => void;
  onReset: () => void;
  onClose: () => void;
}

export function CasesModal({
  open,
  viewModel,
  filters,
  technique,
  onFiltersChange,
  onReset,
  onClose,
}: CasesModalProps) {
  if (!viewModel) {
    return null;
  }

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
          <DialogContent
            className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-md border border-border bg-background p-0"
            aria-modal="true"
            aria-labelledby="cases-modal-title"
          >
            <DialogTitle
              id="cases-modal-title"
              className="text-base font-semibold leading-tight"
            >
              {getModalTitle(viewModel.variant)} — Widget{' '}
              {String(viewModel.widgetId).padStart(2, '0')} /{' '}
              {viewModel.widgetLabel}
              {technique ? (
                <span className="text-muted-foreground"> / {technique}</span>
              ) : null}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Modal de detalle para {viewModel.widgetLabel}
            </DialogDescription>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onReset}
                  className="rounded-md border border-border px-3 py-1 text-sm text-muted-foreground focus-visible:border-primary focus-visible:outline-none"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-border px-3 py-1 text-sm text-muted-foreground focus-visible:border-primary focus-visible:outline-none"
                >
                  Cerrar
                </button>
              </div>

              <div className="p-4">
                <ModalFilters
                  filters={filters}
                  options={viewModel.filterOptions}
                  onChange={onFiltersChange}
                />

                <div className="mb-3 grid gap-2 sm:grid-cols-3">
                  <div className="rounded-md border border-border bg-card p-3">
                    <p className="text-xs font-medium text-muted-foreground">
                      Filas visibles
                    </p>
                    <p className="mt-2 text-xl font-bold tabular-nums">
                      {viewModel.stats.visibleRows}
                    </p>
                  </div>
                  <div className="rounded-md border border-border bg-card p-3">
                    <p className="text-xs font-medium text-muted-foreground">
                      Total días
                    </p>
                    <p className="mt-2 text-xl font-bold tabular-nums">
                      {viewModel.stats.totalDays.toLocaleString('es-CL')}
                    </p>
                  </div>
                  <div className="rounded-md border border-border bg-card p-3">
                    <p className="text-xs font-medium text-muted-foreground">
                      Patólogos únicos
                    </p>
                    <p className="mt-2 text-xl font-bold tabular-nums">
                      {viewModel.stats.uniquePathologists}
                    </p>
                  </div>
                </div>

                <ModalTable schema={viewModel.schema} rows={viewModel.rows} />
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

function getModalTitle(variant: ModalVariantViewModel['variant']): string {
  switch (variant) {
    case 'blocks':
      return 'Bloques';
    case 'medical':
      return 'Casos médicos';
    case 'cases':
      return 'Casos';
    case 'tech-summary':
      return 'Resumen técnico';
    default:
      return 'Detalle';
  }
}
