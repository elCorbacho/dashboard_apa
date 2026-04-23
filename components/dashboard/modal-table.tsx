import { motion } from 'framer-motion';
import type {
  ModalTableSchema,
  ModalVariantRow,
} from '@/lib/dashboard/contracts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/lib/ui/components';
import { cn } from '@/lib/utils';

interface ModalTableProps {
  schema: ModalTableSchema;
  rows: ModalVariantRow[];
}

export function ModalTable({ schema, rows }: ModalTableProps) {
  if (rows.length === 0) {
    return (
      <div className="overflow-x-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              {schema.columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="text-xs font-medium text-muted-foreground"
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        </Table>
        <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            {schema.columns.map((column) => (
              <TableHead
                key={column.key}
                className="uppercase tracking-[0.12em]"
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: rowIndex * 0.03,
                duration: 0.15,
                ease: 'easeOut',
              }}
              className="table-row-hover"
            >
              {schema.columns.map((column) => (
                <TableCell
                  key={`${row.id}-${column.key}`}
                  className={cn(
                    column.align === 'right' && 'text-right tabular-nums',
                    column.align === 'center' && 'text-center',
                  )}
                >
                  {renderCellValue(row, column.key)}
                </TableCell>
              ))}
            </motion.tr>
          ))}
        </TableBody>
      </Table>
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
