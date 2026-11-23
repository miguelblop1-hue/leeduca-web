/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.20",
  date: "2026-11-23",
  changes: [
    "Seguimiento: reorganizado en micrófono, alumnos, añadir alumno compacto en grid e informes compactos al final.",
  ],
} as const;
