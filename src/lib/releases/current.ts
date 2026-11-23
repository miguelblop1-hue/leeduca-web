/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.5",
  date: "2026-11-23",
  changes: [
    "Seguimiento: el dictado rápido por voz extrae solo el comentario, eliminando nombre del alumno y frases de comando.",
  ],
} as const;
