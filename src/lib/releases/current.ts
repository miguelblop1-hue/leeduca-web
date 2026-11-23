/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.8",
  date: "2026-11-23",
  changes: [
    "Seguimiento: reconocimiento por voz mejorado con Groq Whisper (grabación MediaRecorder + transcripción en servidor) en dictado rápido y comentarios.",
  ],
} as const;
