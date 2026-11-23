/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.3",
  date: "2026-11-23",
  changes: [
    "Seguimiento: acciones de alumno en modo icono (comentario, agenda, eliminar) para mejor alineación responsive.",
  ],
} as const;
