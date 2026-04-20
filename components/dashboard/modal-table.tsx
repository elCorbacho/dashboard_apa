import type { ModalTableSchema, ModalVariantRow } from '@/lib/dashboard/contracts';

interface ModalTableProps {
  schema: ModalTableSchema;
  rows: ModalVariantRow[];
}

export function ModalTable({ schema, rows }: ModalTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-card text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {schema.columns.map((column) => (
              <th
                key={column.key}
                className={getCellClassName(column.align, true)}
                scope="col"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border/60 last:border-b-0">
              {schema.columns.map((column) => (
                <td key={`${row.id}-${column.key}`} className={getCellClassName(column.align)}>
                  {renderCellValue(row, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderCellValue(row: ModalVariantRow, key: string): string | number {
  const value = row[key as keyof ModalVariantRow];

  if (typeof value === 'number') {
    return Number.isInteger(value) ? value.toLocaleString('es-CL') : value;
  }

  if (typeof value === 'string') {
    return value;
  }

  return '—';
}

function getCellClassName(align: 'left' | 'right' | 'center' = 'left', head = false) {
  const alignmentClass =
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';

  return `${head ? 'px-3 py-2' : 'px-3 py-2'} ${alignmentClass} ${
    align === 'right' ? 'tabular-nums' : ''
  }`;
}
