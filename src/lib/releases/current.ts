/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.6",
  date: "2026-11-23",
  changes: [
    "Seguimiento: el micrófono de dictado rápido se cierra automáticamente tras unos segundos sin voz (manteniendo cierre manual).",
    "Seguimiento: confirmación antes de eliminar un alumno o un comentario.",
  ],
} as const;
