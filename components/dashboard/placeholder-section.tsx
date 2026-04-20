interface PlaceholderSectionProps {
  title: string;
  description: string;
  tone?: 'default' | 'muted';
}

export function PlaceholderSection({
  title,
  description,
  tone = 'default',
}: PlaceholderSectionProps) {
  return (
    <section
      className={`rounded-md border border-dashed p-6 ${
        tone === 'muted'
          ? 'border-border/60 bg-card/20'
          : 'border-border bg-card/40'
      }`}
      aria-label={`Sección placeholder: ${title}`}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        v1 placeholder · no implementado
      </p>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {description}
      </p>
    </section>
  );
}
