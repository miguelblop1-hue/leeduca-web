/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.21",
  date: "2026-11-23",
  changes: [
    "Acceso con login: seguimiento protegido por usuario y contraseña. Los datos existentes se asignan al usuario inicial.",
    "Seguimiento e informes: bloques compactados al 60% en escritorio para una vista más centrada.",
  ],
} as const;
