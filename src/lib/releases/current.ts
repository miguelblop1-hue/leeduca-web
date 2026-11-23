/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.7",
  date: "2026-11-23",
  changes: [
    "Seguimiento: eliminado el cierre automático por silencio del micrófono de dictado rápido; el cierre pasa a ser solo manual.",
  ],
} as const;
