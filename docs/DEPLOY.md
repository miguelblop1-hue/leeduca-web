# Despliegue Leeduca

## Regla de release (obligatoria)
Cada subida a producciÃ³n debe publicar una **subversiÃ³n** `MAJOR.MINOR.PATCH`:
1. Actualizar `"version"` en `package.json`.
2. Actualizar `src/lib/releases/current.ts` (versiÃ³n, fecha, cambios).
3. AÃ±adir entrada en este archivo con versiÃ³n, commit, resumen de cambios y verificaciÃ³n.
4. Commit con formato `release: vX.Y.Z ...`, push y deploy a producciÃ³n.

No usar `drizzle-kit push --force` contra producciÃ³n. Para cambios de esquema: aplicar SQL/migraciÃ³n segura y verificar antes de desplegar.

## Despliegues

### v0.1.7 â€” 2026-11-23
- **Commit**: `d1eefde`
- **Cambios**:
  - Seguimiento: eliminado el cierre automÃ¡tico por silencio del micrÃ³fono de dictado rÃ¡pido; el cierre vuelve a ser solo manual por fiabilidad del reconocimiento de voz.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.6 â€” 2026-11-23
- **Commit**: `d6a1e39`
- **Cambios**:
  - Seguimiento: el micrÃ³fono de dictado rÃ¡pido se cierra automÃ¡ticamente tras ~5s sin voz, manteniendo la opciÃ³n de cierre manual.
  - Seguimiento: confirmaciÃ³n al eliminar un comentario (nuevo botÃ³n eliminar en comentarios del calendario) y confirmaciÃ³n existente mantenida al eliminar alumno.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.5 â€” 2026-11-23
- **Commit**: `b42448f`
- **Cambios**:
  - Seguimiento del alumnado: el dictado rÃ¡pido por voz extrae solo el contenido del comentario, eliminando el nombre del alumno y frases de comando (p. ej. "aÃ±ade a AntÃ­a este comentario hola buenos dÃ­as" guarda "hola buenos dÃ­as").
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.4 â€” 2026-11-23
- **Commit**: `804755c`
- **Cambios**:
  - Seguimiento del alumnado: micrÃ³fono en la cabecera de presentaciÃ³n para dictar un comentario por voz y asignarlo al alumno nombrado en el mismo dictado. Se guarda en el dÃ­a actual; si no se detecta el alumno, se muestra selector para asignarlo.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.3 â€” 2026-11-23
- **Commit**: `eb9490a`
- **Cambios**:
  - Seguimiento del alumnado: botones de acciÃ³n (aÃ±adir comentario, agenda, eliminar) pasan a iconos sin texto para alinearse mejor con el nombre, especialmente en responsive.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.2 â€” 2026-11-23
- **Commit**: `29f3862`
- **Cambios**:
  - Seguimiento del alumnado: dictado por voz en los comentarios (botÃ³n de micrÃ³fono en "AÃ±adir comentario" y en comentarios por dÃ­a del calendario). Usa Web Speech API (`es-ES`) cuando el navegador la soporta.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.1 â€” 2026-11-23
- **Commit**: `be8ddf5`
- **Cambios**:
  - Seguimiento del alumnado: reordenar alumnos arrastrando el icono de agarre (compatible con ratÃ³n y tÃ¡ctil/pointer).
  - Seguimiento del alumnado: editar nombre del alumno con icono de lÃ¡piz en la misma tarjeta.
  - Fix de esquema BD: `sort_order` aplicado con migraciÃ³n segura (sin pÃ©rdida de datos).
- **BD**: Turso/libsql + Drizzle. Cambio de esquema aplicado con `ALTER TABLE ... ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0`.
- **VerificaciÃ³n**: `tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.0 â€” base
- MVP inicial Leeduca (4 aÃ±os, ejercicios, seguimiento bÃ¡sico, Turso/Drizzle).








