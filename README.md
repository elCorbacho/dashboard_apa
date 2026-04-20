<div align="center">
  
  # 🔬 Dashboard BI4H 
  **Anatomía Patológica — Red UC Christus**
  
  <p>
    <i>Dashboard de Inteligencia de Negocios para el monitoreo en tiempo real de métricas operativas,<br>flujo de casos y alertas por área de procesamiento.</i>
  </p>

  <br>

  [![Status](https://img.shields.io/badge/Status-Prototype-blue.svg)]()
  [![Tech](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20Vanilla%20JS-f39f37.svg)]()
  [![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

</div>

<br>

## 📋 Descripción

Este proyecto es un **Dashboard web estático** diseñado específicamente para la visualización de KPIs y métricas clave del laboratorio de anatomía patológica. Proporciona a los directores médicos y coordinadores de laboratorio una visión clara y accionable del estado operativo al instante.

### ✨ Características Principales

*   📊 **KPIs en Tiempo Real**: Visualización de casos activos, alarmas abiertas, TAT (Turn Around Time) promedio y adendums pendientes.
*   🧩 **Widgets por Área**: Desglose detallado por Macroscopía, Inclusión/Corte, Histoquímicas, IHQ/IF, Molecular y Citología.
*   🔍 **Drill-down Interactivo**: Tablas detalladas que se expanden al hacer clic en los bloques de casos para un análisis profundo.
*   🧭 **Navegación Intuitiva**: Sidebar lateral con acceso rápido a Overview, Widgets, Áreas y Técnicas.
*   🎨 **Filtros Avanzados**: Filtrado dinámico en el toolbar por área, umbral de días críticos y patólogo asignado.
*   📱 **Diseño Adaptativo (Responsive)**: Interfaz moderna que se adapta a desktop, tablets y dispositivos móviles con *Force Light Mode* activado para máxima legibilidad.
*   🖨️ **Print-Friendly**: Estilos CSS optimizados para ocultar la navegación al imprimir reportes.

---

## 🛠️ Stack Tecnológico

El proyecto está construido bajo una arquitectura de **Single-file SPA**, lo que significa que todo el código reside en un único archivo, garantizando la máxima portabilidad sin requerir configuración compleja.

*   **Frontend**: `HTML5` + `CSS3` (Inline) + `Vanilla JavaScript`
*   **Arquitectura**: Monolito de un solo archivo (`bi4h_dashboard.html`)
*   **Gestión de Datos**: Datos mockeados en memoria (simulación para prototipo)
*   **Dependencias**: **Cero dependencias externas**. No requiere Node.js, npm, bundlers (Webpack/Vite) ni servidor backend para su ejecución básica.

---

## 📂 Estructura del Proyecto

```text
dashboard_apa/
├── 📄 bi4h_dashboard.html    # Dashboard completo (Estructura, Estilos y Lógica)
├── 📖 README.md              # Documentación del proyecto (Este archivo)
└── ⚙️ .atl/                  # Directorio de configuración para Spec-Driven Development (SDD)
```

---

## 🚀 Cómo Ejecutar (Quick Start)

Ejecutar este dashboard es increíblemente simple. No necesitas instalar nada.

1.  Navega hasta la carpeta del proyecto.
2.  Abre el archivo `bi4h_dashboard.html` directamente en cualquier navegador web moderno (Chrome, Edge, Safari, Firefox).
3.  *(Opcional)* Si prefieres visualizarlo a través de un servidor local HTTP:

```bash
# Iniciar un servidor local rápido usando Python 3
python3 -m http.server 8080

# Luego, abre tu navegador y visita: http://localhost:8080
```

---

## 🧪 Áreas del Laboratorio

El dashboard monitorea las siguientes áreas de procesamiento, cada una identificada por los colores institucionales:

| Área | Descripción | Color HEX | Indicador Visual |
| :--- | :--- | :---: | :---: |
| **Macro** | Macroscopía | `#0e3566` | 🔵 |
| **Inclusion** | Inclusión y Corte | `#8a5a14` | 🟤 |
| **Medicos** | Procesamiento Médico | `#1a5a4f` | 🟢 |
| **Laboratorio** | Laboratorio General | `#ba1a1a` | 🔴 |
| **Citología** | Citopatología | `#5a3d8a` | 🟣 |
| **Molecular** | Biología Molecular | `#006874` | 🩵 |

---

## 🛣️ Roadmap & Futuro del Proyecto

**Estado Actual:** Prototipo funcional (MVP) de demostración con datos simulados.

Para llevar este proyecto a un entorno de **Producción**, se recomienda la siguiente evolución tecnológica:

*   🔌 **Integración Backend**: Conexión a una API REST/GraphQL real vinculada al sistema LIS (Laboratory Information System) actual (e.g., Sillab, Coanase).
*   🔐 **Seguridad**: Implementación de un sistema de Autenticación y Autorización (Login).
*   ⚛️ **Migración a Framework**: Refactorización hacia **React** o **Next.js** para modularizar los componentes y mejorar la mantenibilidad a gran escala.
*   🛡️ **TypeScript**: Adopción de tipado estático riguroso para prevenir errores en tiempo de ejecución.
*   🧪 **Testing**: Implementación de pruebas automatizadas (Unitarias con Jest/Testing Library y E2E con Playwright/Cypress).

---

<div align="center">
  <p>Construido con dedicación para la <b>Red de Salud UC Christus</b>.</p>
</div>