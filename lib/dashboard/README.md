# Dashboard Adapter Pattern

Este módulo define una frontera explícita entre la UI de Next.js y la fuente de datos.

## Objetivo

Evitar que los componentes dependan de estructuras legacy (`index.html`) o de literales
dispersos. La UI consume contratos tipados y view models estables.

## Estructura

- `contracts.ts`: tipos de dominio (navegación, KPIs, widgets, drilldown, modal, filtros).
- `mock-data.ts`: dataset local estático que conserva la paridad funcional de Overview.
- `selectors.ts`: funciones puras para derivar estado (filtros, conteos, datasets).
- `mock-adapter.ts`: punto de entrada que normaliza y expone datos a la UI.

## Flujo recomendado

1. Página/route obtiene snapshot desde `getDashboardSnapshot()`.
2. Componentes cliente derivan estado con `selectors.ts` (sin mutar fuente original).
3. Para migrar a backend real, se reemplaza la implementación de `mock-adapter.ts`
   por un adapter API-compatible manteniendo los contratos de `contracts.ts`.

## Regla de evolución

Si cambia la forma de datos, primero ajustar contratos y tests de selectors,
luego adaptar `mock-adapter.ts`. Los componentes deberían requerir cambios mínimos.
