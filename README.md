# Dashboard BI4H (Next.js Static Export)

Migración del dashboard de anatomía patológica a **Next.js App Router** con foco en
paridad funcional de **Overview** y despliegue estático.

## Estado del proyecto

- ✅ Stack migrado a Next.js + TypeScript strict.
- ✅ Overview funcional con KPIs, toolbar de filtros, widgets, drilldown y modal.
- ✅ Rutas `widgets`, `areas` y `tecnicas` como placeholders explícitos (v1).
- ✅ Theming dark/light persistente con `next-themes`.
- ✅ Configuración de deploy alineada a export estático (`output: 'export'`, `out/`).
- 📌 Se preservan `index.html` y `bi4h_dashboard.html` como baseline legado para comparación.

## Stack técnico

- Next.js (App Router)
- React
- TypeScript (strict)
- Tailwind CSS
- next-themes
- Framer Motion
- ESLint + Prettier
- Vitest (tests unitarios de selectors)

## Estructura relevante

```text
app/                      # Layouts y rutas App Router
components/dashboard/     # Shell + componentes de Overview
components/providers/     # Providers de cliente (theme)
lib/dashboard/            # Contratos, mock data, selectors y adapter
index.html                # Baseline legado
bi4h_dashboard.html       # Baseline legado
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Scripts disponibles

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run format:check
npm run format
npm run build
```

> Nota: para este batch de cierre **no se ejecutó build de producción** por restricción de flujo.

## Verificación rápida (sin build)

Checklist sugerido para validar cambios de desarrollo:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`
4. `npm run format:check`
5. Validación manual en navegador:
   - Overview carga con KPIs/widgets/drilldown/modal.
   - Toggle de tema conserva preferencia tras recarga.
   - Rutas placeholder muestran mensaje "no implementado".
   - Comportamiento responsive básico (desktop + mobile).

## Despliegue en Vercel (static export)

El proyecto está configurado para generar artefacto estático en `out/`:

- `next.config.ts` usa `output: 'export'` y `trailingSlash: true`.
- `vercel.json` define framework `nextjs` y `outputDirectory: "out"`.

### Opción A: desde Git (recomendada)

1. Importar el repositorio en Vercel.
2. Framework Preset: **Next.js**.
3. Build Command: `npm run build`.
4. Output Directory: `out`.
5. Deploy.

### Opción B: CLI

```bash
npm run build
vercel --prod
```

## Adapter pattern

Ver `lib/dashboard/README.md` para la guía de contratos/adapters y cómo reemplazar
mock data por una futura API sin romper la UI.
