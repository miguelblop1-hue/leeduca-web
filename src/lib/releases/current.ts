/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.1",
  date: "2026-11-23",
  changes: [
    "Seguimiento: reordenar alumnos arrastrando el icono de agarre (ratón y táctil).",
    "Seguimiento: editar nombre de alumno con icono de lápiz en la misma tarjeta.",
    "Persistencia: Turso + Drizzle (misma stack que Sano App); esquema aplicado con migración segura.",
  ],
} as const;
