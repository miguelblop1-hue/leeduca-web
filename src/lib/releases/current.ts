/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.9",
  date: "2026-11-23",
  changes: [
    "Seguimiento: tarjetas de alumno compactas (solo nombre); clic en nombre abre agenda; eliminar con X en esquina y confirmación.",
  ],
} as const;
