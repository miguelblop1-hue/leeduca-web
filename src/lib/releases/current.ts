/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.10",
  date: "2026-11-23",
  changes: [
    "Seguimiento: card de alumno clicable completo, nombre en mayúsculas y diseño más compacto; edición de nombre movida al modal de agenda.",
    "Página principal: Seguimiento primero, sin título 'Otros servicios', seguido de MVP y edades disponibles.",
  ],
} as const;
