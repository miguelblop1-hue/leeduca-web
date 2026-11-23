/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.4",
  date: "2026-11-23",
  changes: [
    "Seguimiento: dictado rápido por voz en la cabecera para crear comentario del día asignándolo al alumno nombrado; si no se detecta, se pide seleccionar alumno.",
  ],
} as const;
