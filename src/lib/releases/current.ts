/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.2",
  date: "2026-11-23",
  changes: [
    "Seguimiento: dictado por voz en comentarios del alumno (botón de micrófono, Web Speech API).",
  ],
} as const;
