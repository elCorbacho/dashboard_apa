import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import type { KpiMetric } from '@/lib/dashboard/contracts';
import { Card } from '@/lib/ui/components';

interface KpiBarProps {
  kpis: KpiMetric[];
}

const toneClassMap: Record<KpiMetric['tone'], string> = {
  default: 'border-border',
  warning: 'border-op-warning/60',
  critical: 'border-op-danger/60',
};

function AnimatedNumber({ value, unit }: { value: number; unit?: string }) {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState('0');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 0.6,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [motionValue, value, shouldReduceMotion]);

  useEffect(() => {
    return motionValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest).toLocaleString('es-CL'));
    });
  }, [motionValue]);

  return (
    <span className="tabular-nums">
      {displayValue}
      {unit ? (
        <span className="ml-1 text-sm font-normal text-muted-foreground">
          {unit}
        </span>
      ) : null}
    </span>
  );
}

export function KpiBar({ kpis }: KpiBarProps) {
  return (
    <section
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      aria-label="Indicadores clave"
    >
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.05,
            duration: 0.2,
            ease: 'easeOut',
          }}
        >
          <Card
            className={`p-4 ${toneClassMap[kpi.tone]}`}
            aria-label={kpi.label}
          >
            <p className="text-sm font-medium text-muted-foreground">
              {kpi.label}
            </p>
            <p className="mt-1 text-2xl font-bold">
              <AnimatedNumber value={kpi.value} unit={kpi.unit} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{kpi.subtext}</p>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
