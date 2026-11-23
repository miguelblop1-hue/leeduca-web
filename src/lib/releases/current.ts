/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.19",
  date: "2026-11-23",
  changes: [
    "Seguimiento: cabecera en tarjeta con micrófono y bloque de informes separado.",
    "Informes: selección de alumnos/comentarios (todos por defecto) para incluir solo lo deseado en la descarga.",
  ],
} as const;
