/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.24",
  date: "2026-11-23",
  changes: [
    "Imágenes más claras para casa, cama, mesa, vaca, globo, regalo, queso y pan sustituidas por fotos más obvias.",
    "Créditos de imágenes actualizados en docs/IMAGE_CREDITS.md.",
  ],
} as const;
