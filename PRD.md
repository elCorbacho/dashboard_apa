# BI4H Dashboard Refactor — Product Requirements Document

## 1. Executive Summary

- **Problem Statement**: El dashboard actual de BI4H funciona como un prototipo útil, pero está concentrado en un único archivo HTML con estilos y lógica acoplados. Esto dificulta mantenerlo, mejorar la experiencia visual y escalar nuevas pantallas sin degradar la base existente.
- **Proposed Solution**: Reescribir la aplicación como un sitio estático en **Next.js App Router** con **React**, **TypeScript estricto**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion** y **next-themes**, preservando el contenido útil actual del Overview y alineando la interfaz al sistema visual definido en `design.md`.
- **Success Criteria**:
  - El sitio se despliega como **SSG estático** y funciona correctamente en Vercel.
  - El **Overview** conserva el contenido útil actual y queda implementado con componentes React reutilizables.
  - Se incorpora **dark/light mode** consistente y persistente.
  - La aplicación funciona correctamente en **mobile y desktop**.
  - La base queda preparada para una **API futura** mediante una capa adaptadora sin romper la UI.

---

## 2. User Experience & Functionality

### User Personas

- **Coordinación de Anatomía Patológica**: necesita monitorear el estado general del tablero, revisar indicadores operativos y detectar rápidamente áreas críticas.
- **Jefatura médica / operativa**: necesita una vista ejecutiva clara del Overview para entender carga, alertas y focos de atención.
- **Responsable técnico del producto**: necesita una base mantenible, escalable y desacoplada para evolucionar nuevas pantallas más adelante.

### User Stories

#### Story 1 — Overview útil, moderno y fiel al producto actual

As a user, I want to see the current BI4H overview in a cleaner and more modern interface so that I can understand the operational state quickly without losing the information I already use.

**Acceptance Criteria**

- El nuevo Overview preserva el contenido útil ya existente en el dashboard actual.
- Se mantienen los KPIs principales visibles en una jerarquía clara.
- Se mantienen los filtros visibles del toolbar, adaptados a la nueva UI.
- Se mantienen widgets, indicadores y drilldowns útiles que hoy forman parte del flujo del Overview.
- La migración no reemplaza el producto actual por métricas nuevas inventadas.

#### Story 2 — Navegación presente, pero acotada al alcance real

As a user, I want to keep seeing the existing navigation structure so that the product preserves its current information architecture, even if only the Overview is fully functional in this version.

**Acceptance Criteria**

- La navegación actual sigue presente en la UI.
- Solo **Overview** tiene implementación funcional completa en esta versión.
- Las demás entradas visibles se presentan como placeholders o estados no activos.
- No se inventa contenido nuevo para secciones que hoy no tienen alcance definido.

#### Story 3 — Tema dark/light coherente con el sistema visual

As a user, I want to switch between dark and light themes so that I can use the dashboard comfortably in different contexts.

**Acceptance Criteria**

- Existe un control claro para alternar el tema.
- Se usa `next-themes` para manejar la preferencia.
- La preferencia del usuario persiste entre sesiones.
- El dark mode y el light mode derivan del sistema definido en `design.md`.
- Ambos temas mantienen legibilidad, contraste y consistencia visual.

#### Story 4 — Base técnica escalable para futuras pantallas

As a developer, I want the dashboard split into reusable React components and typed data contracts so that future screens can be added without returning to a monolithic file structure.

**Acceptance Criteria**

- El Overview se divide en componentes reutilizables.
- El proyecto usa TypeScript con `strict: true`.
- Existe una capa adaptadora para desacoplar la UI de la fuente de datos.
- La organización del proyecto favorece separación entre layout, componentes, adapters y utilidades.

#### Story 5 — Responsive real para uso en escritorio y móvil

As a user, I want to use the dashboard from desktop and mobile so that the product remains understandable and operable on different screen sizes.

**Acceptance Criteria**

- La interfaz se adapta correctamente a desktop, tablet y mobile.
- No hay desbordes críticos ni pérdida severa de legibilidad.
- Modales, tablas, widgets y toolbar responden razonablemente a pantallas pequeñas.
- Los objetivos táctiles conservan tamaño suficiente en mobile.

### Acceptance Criteria Globales de Paridad

- El refactor debe preservar el contenido útil del archivo actual `bi4h_dashboard.html` / `index.html`.
- Las interacciones útiles existentes deben mantenerse o quedar explícitamente representadas como placeholder.
- El nuevo diseño puede modernizar la experiencia, pero no debe degradar la utilidad operativa del dashboard.
- El proyecto final debe seguir siendo un **sitio estático**.

### Functional Parity Baseline

- KPIs superiores actualmente visibles en el dashboard.
- Toolbar con filtros actualmente visibles.
- Sidebar y estructura de navegación actualmente reconocible.
- Widgets y bloques operativos del Overview actual.
- Modales, drilldowns o tablas actualmente útiles en el flujo principal.
- Acción de export visible como placeholder.
- Estructura general del dashboard reconocible respecto del producto original.

### Non-Goals

- No integrar backend real en esta versión.
- No implementar nuevas pantallas funcionales fuera del Overview.
- No agregar lógica nueva de negocio no presente hoy.
- No implementar exportación real de datos; solo placeholder visual.
- No convertir esta etapa en una reimaginación completa del producto.

---

## 3. AI System Requirements (If Applicable)

No aplica para esta versión.

Este refactor no incluye capacidades de IA, inferencia, recomendaciones ni features basadas en LLMs. El alcance está centrado en migración tecnológica, mejora UX/UI y preparación arquitectónica para evolución futura.

---

## 4. Technical Specifications

### Architecture Overview

La aplicación se implementará con **Next.js App Router** como **sitio 100% estático**, usando React y TypeScript estricto. La UI se construirá con componentes reutilizables y una capa adaptadora separará el origen de datos mock actual de una futura API.

La arquitectura debe priorizar:

- simplicidad de despliegue estático,
- paridad funcional del Overview actual,
- mantenibilidad,
- escalabilidad hacia nuevas pantallas,
- consistencia visual respecto de `design.md`.

### Technical Stack

- **Framework**: Next.js con App Router
- **Rendering**: Static Site Generation
- **Language**: TypeScript con `strict: true`
- **UI**: React components
- **Styling**: Tailwind CSS
- **Component primitives**: shadcn/ui
- **Motion**: Framer Motion con animaciones sutiles
- **Themes**: next-themes
- **Quality**: ESLint + Prettier
- **Optional visual blocks**: 21st.dev solo si respetan la dirección visual del proyecto

### Functional Scope Mapping

#### Implementación funcional real en v1

- Overview
- Header
- Sidebar / navegación visible
- Toolbar con filtros visibles
- KPIs principales
- Widgets / bloques operativos del tablero
- Drilldowns / modales / tablas útiles actualmente presentes
- Toggle dark/light

#### Implementación placeholder en v1

- Exportación
- Secciones no activas del menú

#### Fuera de alcance en v1

- Nuevas pantallas funcionales completas
- Integración con API real
- Autenticación
- Persistencia de datos remotos

### UI Composition Requirements

Como mínimo, el Overview debe modularizarse en componentes equivalentes a:

- `AppShell`
- `Header`
- `Sidebar`
- `ThemeToggle`
- `OverviewPage`
- `KpiBar`
- `ToolbarFilters`
- `WidgetsSection`
- `CasesModal` o equivalente
- `PlaceholderSection` para rutas no implementadas

La modularización puede variar en nombre, pero debe respetar separación clara de responsabilidades.

### Data Layer Requirements

- Los datos actuales seguirán siendo locales/mock en esta etapa.
- Debe existir una interfaz o contrato tipado que permita reemplazar la fuente mock por una API futura.
- La UI no debe depender directamente de estructuras rígidas acopladas al archivo HTML original.
- La migración debe dejar preparado un adapter layer para evolución futura.

### Initial Data Strategy

- Normalizar los datos mock actuales a contratos TypeScript claros.
- Separar datos, presentación y comportamiento desde el inicio.
- Evitar trasladar directamente patrones imperativos del HTML actual a componentes React sin rediseño estructural.
- Hacer que la UI consuma estructuras tipadas y predecibles, no markup heredado.

### Styling & Design Requirements

El diseño debe alinearse a `design.md` como fuente de verdad visual. En particular:

- **Berkeley Mono** como voz tipográfica principal.
- Paleta **warm dark / warm light** derivada del sistema definido.
- Superficies planas, evitando exceso de sombras y ornamentos innecesarios.
- Border radius mínimo.
- Colores semánticos tipo Apple HIG.
- Motion sutil, no protagónico.
- El diseño debe modernizar el dashboard sin perder densidad informativa útil.

### Visual Acceptance Criteria

- Berkeley Mono debe usarse como tipografía principal del sistema visual.
- El dark theme debe funcionar como referencia principal del diseño.
- El light theme debe derivar de los mismos tokens visuales.
- Los radios deben mantenerse mínimos, alineados a `design.md`.
- No introducir sombras fuertes, ornamentos excesivos ni estilos ajenos al lenguaje visual definido.
- Las animaciones deben ser sutiles y nunca competir con la lectura del contenido operativo.

### Dark / Light Theme Requirements

- El tema oscuro debe ser la referencia principal de diseño.
- El tema claro debe derivar del mismo sistema visual y no sentirse como un tema separado sin relación.
- Los colores deben implementarse con tokens o variables consistentes.
- El cambio de tema no debe romper contraste, jerarquía ni legibilidad de KPIs, tablas, widgets o modales.

### Accessibility Requirements

- Navegación por teclado en elementos interactivos principales.
- Estados de foco visibles y consistentes.
- Contraste suficiente en dark y light mode.
- Estructura semántica razonable (`header`, `nav`, `main`, `section`, `button`, etc.).
- Elementos placeholder deben comunicar claramente que aún no están activos.
- Las animaciones deben respetar `prefers-reduced-motion` cuando corresponda.
- El toggle de tema debe ser operable por teclado.
- Los modales deben poder cerrarse mediante teclado.
- El contraste debe mantenerse en nivel AA en ambos temas.

### Responsive Requirements

- Desktop y mobile deben ser requisitos de primera clase.
- El layout debe adaptarse sin romper jerarquía informativa.
- Tablas y bloques densos deben tener una estrategia clara en mobile (scroll horizontal, reorganización o contención).
- Sidebar y navegación deben responder apropiadamente en pantallas pequeñas.

### Code Quality Requirements

- Configurar **ESLint** para calidad y consistencia del código.
- Configurar **Prettier** para formateo automático consistente.
- Evitar conflictos entre ESLint y Prettier.
- Mantener TypeScript en modo estricto.
- El código generado para la migración debe ser legible, modular y consistente.

### Integration Points

- **Current data source**: datos mock / locales
- **Future data source**: API a través de adapter layer
- **Deployment target**: Vercel como sitio estático

### Security & Privacy

- No exponer secretos ni credenciales en cliente.
- Al no existir backend en esta versión, la superficie de riesgo es baja.
- Cualquier integración futura con API deberá redefinir seguridad fuera del alcance de este PRD.

---

## 5. Risks & Scope Controls

### Technical Risks

- **Pérdida de paridad funcional**: riesgo de que el refactor priorice estética por sobre utilidad operativa.
- **Sobrediseño**: riesgo de introducir componentes o bloques visuales que no respeten `design.md`.
- **Acoplamiento residual**: riesgo de trasladar la lógica monolítica actual a React sin verdadera separación de responsabilidades.
- **Responsive insuficiente**: riesgo de que tablas, widgets o modales no funcionen bien en mobile.
- **Inconsistencia de theming**: riesgo de que dark/light mode no queden alineados al sistema visual base.

### Mitigation Strategy

- Usar `design.md` como contrato visual obligatorio.
- Validar el nuevo Overview contra el dashboard actual antes de considerar terminada la migración.
- Mantener el alcance controlado: Overview funcional, resto placeholder.
- Introducir adapter layer desde el inicio para evitar acoplamiento futuro.
- Diseñar desktop y mobile desde el comienzo.

### Out of Scope Reminder

- No hay roadmap por fases en este documento porque el cambio se define como un refactor acotado.
- Cualquier expansión futura deberá documentarse como una nueva decisión o un nuevo cambio.

---

## Definition of Done

- Next.js SSG funcionando correctamente como sitio estático.
- Overview migrado con paridad funcional mínima respecto del dashboard actual.
- Dark/light mode operativo y persistente.
- Responsive validado en desktop y mobile.
- ESLint y Prettier configurados.
- Secciones no implementadas visibles como placeholders claros.
- UI alineada con `design.md`.
