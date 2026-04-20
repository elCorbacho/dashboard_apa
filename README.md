# Dashboard BI4H — Anatomía Patológica UC Christus

Dashboard de inteligencia de negocios para el Laboratorio de Anatomía Patológica de la Red de Salud UC Christus. Monitoreo en tiempo real de métricas operativas, flujo de casos, y alertas por área de procesamiento.

## Descripción

Dashboard web estático para visualización de KPIs y métricas del laboratorio de anatomía patológica. Muestra:

- **KPIs principales**: Casos activos, alarmas abiertas, TAT promedio, adendums pendientes
- **Widgets por área**: Macroscopía, Inclusión/Corte, Histoquímicas, IHQ/IF, Molecular, Citología
- **Drill-down**: Tablas detalladas por bloque de casos
- **Navegación lateral**: Overview, Widgets, Áreas, Técnicas

## Stack Tecnológico

- **Frontend**: HTML5 + CSS3 (inline) + Vanilla JavaScript
- **Arquitectura**: Single-file SPA (bi4h_dashboard.html)
- **Datos**: Mockeados en memoria (simulación)
- **Sin dependencias**: No requiere build, npm, ni servidor backend

## Estructura del Proyecto

```
dashboard_apa/
├── bi4h_dashboard.html    # Dashboard completo (todo en un archivo)
├── README.md              # Este documento
└── .atl/                  # Directorio de configuración SDD
```

## Cómo Ejecutar

1. Abre el archivo `bi4h_dashboard.html` en cualquier navegador moderno
2. No requiere servidor local (funciona con file://)
3. Soporta Force Light Mode

```bash
# Opción: Servidor local con Python
python3 -m http.server 8080
# Luego visita http://localhost:8080
```

## Características

### UI/UX
- Diseño profesional institucional (colores UC)
- Mode forced light (fondo claro)
- Animaciones suaves en entrada (KPIs, widgets, áreas)
- Responsive: desktop, tablet, mobile
- Print-friendly: oculta navegación al imprimir

### Navegación
- Sidebar con secciones: Overview, Widgets, Áreas, Técnicas
- Filtros en toolbar: Área, Umbral de días, Patólogo
- Drill-down clickeable en widgets

### Secciones
1. **Overview**: KPIs + toolbar + widgets principales
2. **Widgets**: Detalle por área de procesamiento
3. **Áreas**: Paneles colapsables por área (reservado para futura implementación)
4. **Técnicas**: Tabla de técnicas por caso

## Áreas del Laboratorio

| Área | Descripción | Color |
|------|-------------|-------|
| Macro | Macroscopía | #0e3566 |
| Inclusion | Inclusión y Corte | #8a5a14 |
| Medicos | Procesamiento Médico | #1a5a4f |
| Laboratorio | Laboratorio General | #ba1a1a |
| Citología | Citopatología | #5a3d8a |
| Molecular | Biología Molecular | #006874 |

## Fase de Desarrollo

**Estado**: Prototipo funcional (MVP)

Este es un dashboard de demostración con datos mockeados. Para producción se requiere:
- Conexión a API real del sistema LIS
- Autenticación
- Testing automatizado
- Build system para producción

## Tecnologías de Referencia (Futuro)

Si el proyecto evoluciona, considerar:
- **React/Next.js** para componentes dinámicos
- **TypeScript** para tipado estático
- **Vite** para build y dev server
- **Testing Library** para tests unitarios
- **API REST** conectada al sistema LIS (Sillab, Coanase)

---

**Institución**: Red de Salud UC Christus  
**Proyecto**: BI4H — Business Intelligence para Anatomía Patológica  
**Versión**: 1.0.0 (Prototype)