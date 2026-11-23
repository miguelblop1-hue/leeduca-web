/**
 * Versión de la release desplegada. Debe coincidir con `package.json`.
 * En cada subida a producción: bump de versión, actualizar aquí y añadir
 * entrada en docs/DEPLOY.md con cambios.
 */
export const CURRENT_RELEASE = {
  version: "0.1.22",
  date: "2026-11-23",
  changes: [
    "Nueva sección Actividades PRELEO de 4 años: menú por 4 bloques (conciencia fonológica, vocabulario, comprensión, fluidez) con 18 actividades y 108 ejercicios con fotografías reales.",
    "Flujo de diapositivas: 3 opciones → Siguiente → solución con solo la imagen correcta resaltada; sin feedback de acierto/error ni resultados guardados.",
    "Generador IA validado: solo crea instrucciones usando imágenes ya existentes del catálogo; sin generación de imágenes en tiempo de ejecución.",
  ],
} as const;
