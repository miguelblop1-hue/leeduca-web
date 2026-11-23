/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.16",
  date: "2026-11-23",
  changes: [
    "Aviso de novedades: al entrar tras una nueva versión, se muestra un modal con los cambios de la release.",
  ],
} as const;
