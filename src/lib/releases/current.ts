/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.12",
  date: "2026-11-23",
  changes: [
    "Interfaz: modo claro fijo; se elimina el selector de modo oscuro.",
  ],
} as const;
