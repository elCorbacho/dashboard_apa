# Resumen de Pendientes - Reporte de Verificación

Este archivo detalla los puntos críticos pendientes para completar la paridad y calidad del dashboard según el último reporte de verificación.

## Hallazgos Críticos

1.  **Funcionalidad del Modal**: Falta el marcador de posición (placeholder) para la **exportación** dentro del modal de casos, un requerimiento de paridad con la línea base.
2.  **Validación de Tipos (Typecheck)**: El comando `npm run typecheck` falla en un estado limpio porque depende de los tipos generados en `.next/types` tras un `next build`. Se debe desacoplar o documentar esta dependencia en el flujo de CI.
3.  **Estado de Tareas**: El artefacto de tareas (`tasks.md`) se encuentra incompleto o desactualizado respecto al progreso real de la implementación.
4.  **Evidencia de Especificación**: Falta evidencia técnica (behavioral proof) que valide la mayoría de los escenarios definidos en `spec.md`.
5.  **Validaciones de Calidad Pendientes**:
    *   **Persistencia de Tema**: Asegurar que el modo oscuro/claro se mantenga tras recargar.
    *   **Accesibilidad (WCAG AA)**: Verificar contrastes de color en toda la interfaz.
    *   **Diseño Responsivo**: Validar el comportamiento y adaptabilidad en dispositivos móviles y tablets.
    *   **Paridad Visual**: Comparativa final contra el diseño original en `index.html`.
    *   **Cobertura E2E**: Implementar más pruebas de extremo a extremo (Playwright) para flujos de usuario críticos.

## Checklist de Tareas

- [ ] Agregar placeholder de exportación al modal de casos.
- [ ] Corregir la configuración de TypeScript para no depender de `.next` o asegurar el orden en el pipeline.
- [ ] Sincronizar y completar el archivo de tareas (`tasks.md`).
- [ ] Generar registros de ejecución (logs/capturas) que prueben los escenarios de la `spec`.
- [ ] Validar persistencia en `localStorage` del componente de tema.
- [ ] Realizar auditoría de contraste con herramientas de accesibilidad.
- [ ] Ajustar estilos responsivos faltantes.
- [ ] Ejecutar validación de paridad visual 1:1 con `index.html`.
- [ ] Incrementar la cobertura de pruebas E2E.
