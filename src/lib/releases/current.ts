/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.23",
  date: "2026-11-23",
  changes: [
    "Imágenes más claras y reconocibles en las actividades PRELEO: gato, perro, flor, mariposa, pelota, sol, luna y queso sustituidos por fotos más obvias.",
    "Créditos de imágenes actualizados en docs/IMAGE_CREDITS.md.",
  ],
} as const;
