'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

import { ModalFilters } from '@/components/dashboard/modal-filters';
import { ModalTable } from '@/components/dashboard/modal-table';
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
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!viewModel) {
    return null;
  }

  const overlayTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.14, ease: 'easeOut' as const };

  const modalTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.16, ease: 'easeOut' as const };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cases-modal-title"
            className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-md border border-border bg-background"
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }
            }
            animate={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={modalTransition}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-border p-4">
              <h3
                id="cases-modal-title"
                className="text-base font-semibold leading-tight"
              >
                {getModalTitle(viewModel.variant)} — Widget{' '}
                {String(viewModel.widgetId).padStart(2, '0')} / {viewModel.widgetLabel}
                {technique ? (
                  <span className="text-muted-foreground"> / {technique}</span>
                ) : null}
              </h3>
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
            </header>

            <div className="p-4">
              <ModalFilters
                filters={filters}
                options={viewModel.filterOptions}
                onChange={onFiltersChange}
              />

              <div className="mb-3 grid gap-2 sm:grid-cols-3">
                <div className="rounded-md border border-border bg-card p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    Filas visibles
                  </p>
                  <p className="mt-2 text-xl font-bold tabular-nums">
                    {viewModel.stats.visibleRows}
                  </p>
                </div>
                <div className="rounded-md border border-border bg-card p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    Total días
                  </p>
                  <p className="mt-2 text-xl font-bold tabular-nums">
                    {viewModel.stats.totalDays.toLocaleString('es-CL')}
                  </p>
                </div>
                <div className="rounded-md border border-border bg-card p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
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
        </motion.div>
      ) : null}
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
