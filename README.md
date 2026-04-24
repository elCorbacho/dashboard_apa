# Dashboard BI4H

[![GPL License](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Static Export](https://img.shields.io/badge/Output-Static-brightgreen?logo=vercel)](https://nextjs.org/docs/app/guides/static-exports)

Migración del dashboard de anatomía patológica a **Next.js App Router** con foco en
paridad funcional de **Overview** y despliegue estático.

## Estado del proyecto

- :white_check_mark: Stack migrado a Next.js + TypeScript strict.
- :white_check_mark: Overview funcional con KPIs, toolbar de filtros, widgets, drilldown y modal.
- :white_check_mark: Rutas `widgets`, `areas` y `tecnicas` como placeholders explícitos (v1).
- :white_check_mark: Theming dark/light persistente con `next-themes`.
- :white_check_mark: Configuración de deploy alineada a export estático (`output: 'export'`, `out/`).
- :pushpin: Se preservan `index.html` y `bi4h_dashboard.html` como baseline legado para comparación.

## Stack técnico

| Tecnología | Propósito |
|------------|-----------|
| Next.js 15 | App Router + static export |
| React 19 | UI framework |
| TypeScript (strict) | Type safety |
| Tailwind CSS | Styling |
| next-themes | Dark/light persistence |
| Framer Motion | Animations |
| Vitest | Unit tests |

## Estructura

```
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

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run lint` | Linting con ESLint |
| `npm run typecheck` | Verificación de tipos |
| `npm run test` | Tests unitarios |
| `npm run build` | Build static export a `out/` |

## Despliegue en Vercel

El proyecto genera artefacto estático en `out/`.

### Opción A: desde Git (recomendada)

1. Importar el repositorio en Vercel.
2. Framework Preset: **Next.js**.
3. Build Command: `npm run build`.
4. Output Directory: `out`.

### Opción B: CLI

```bash
npm run build
vercel --prod
```

## License

Este proyecto está bajo **GNU General Public License v3.0**.

Ver [LICENSE](LICENSE) para más detalles.

## Adapter pattern

Ver `lib/dashboard/README.md` para la guía de contratos/adapters y cómo reemplazar
mock data por una futura API sin romper la UI.