# Despliegue Leeduca

## Regla de release (obligatoria)
Cada subida a producciÃ³n debe publicar una **subversiÃ³n** `MAJOR.MINOR.PATCH`:
1. Actualizar `"version"` en `package.json`.
2. Actualizar `src/lib/releases/current.ts` (versiÃ³n, fecha, cambios).
3. AÃ±adir entrada en este archivo con versiÃ³n, commit, resumen de cambios y verificaciÃ³n.
4. Commit con formato `release: vX.Y.Z ...`, push y deploy a producciÃ³n.

No usar `drizzle-kit push --force` contra producciÃ³n. Para cambios de esquema: aplicar SQL/migraciÃ³n segura y verificar antes de desplegar.

## Despliegues

### v0.1.21 â€” 2026-11-23
- **Commit**: `78b8512`
- **Cambios**:
  - Fase 1 auth (better-auth + Drizzle/Turso, misma stack que Sano): tablas `user/session/account/verification`, login email+contraseÃ±a, logout, guards en layout y server actions. Sin registro pÃºblico.
  - Seguimiento: datos filtrados por `user_id`; acciones verifican propiedad. Datos existentes backfilled al usuario inicial sin pÃ©rdida (15 alumnos, 2 comentarios verificados).
  - UI: bloques Seguimiento e Informes compactados al 60% en escritorio.
- **BD**: migraciÃ³n segura aplicada (script `scripts/migrate-auth-phase1.mjs`): auth tables + `user_id` en seguimiento_student/comment + Ã­ndices + backfill. Sin `push --force`. VerificaciÃ³n post-migraciÃ³n OK.
- **Env**: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` en Vercel prod.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.20 â€” 2026-11-23
- **Commit**: `2078f18`
- **Cambios**:
  - Seguimiento reorganizado (opciÃ³n 1+2): primero micrÃ³fono, luego grid de alumnos con tile compacto "+ AÃ±adir alumno" integrado, y al final barra compacta de informes.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.19 â€” 2026-11-23
- **Commit**: `093c453`
- **Cambios**:
  - Seguimiento: micrÃ³fono dentro de tarjeta "Seguimiento de alumnos" con descripciÃ³n; nuevo bloque "Informe" con descripciÃ³n y botones semanal/mensual.
  - Informes: selecciÃ³n de alumnos y comentarios (todos seleccionados por defecto, toggle global, por alumno y por comentario) para descargar solo lo seleccionado.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.18 â€” 2026-11-23
- **Commit**: `1a3407d`
- **Cambios**:
  - Seguimiento: al cancelar una transcripciÃ³n no asignada a ningÃºn alumno, se elimina tambiÃ©n la transcripciÃ³n mostrada.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.17 â€” 2026-11-23
- **Commit**: `656e251`
- **Cambios**:
  - Seguimiento del alumnado: se simplifica la cabecera eliminando el bloque de presentaciÃ³n, dejando el micrÃ³fono mÃ¡s grande y la explicaciÃ³n debajo.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.16 â€” 2026-11-23
- **Commit**: `61e833e`
- **Cambios**:
  - Se aÃ±ade aviso de novedades de versiÃ³n: al entrar despuÃ©s de una nueva release, aparece un modal con los cambios (localStorage `leeduca:release-seen`).
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.15 â€” 2026-11-23
- **Commit**: `f01b96e`
- **Cambios**:
  - Seguimiento del alumnado: ediciÃ³n de comentarios desde la agenda del alumno (botÃ³n editar, guardar/cancelar).
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.14 â€” 2026-11-23
- **Commit**: `d3776cf`
- **Cambios**:
  - Seguimiento del alumnado: botones "Informe semanal" e "Informe mensual" sobre el bloque de aÃ±adir alumnos. Permiten seleccionar semana/mes, ver menciones por alumno y comentarios por dÃ­a, y descargar el informe en .txt.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.13 â€” 2026-11-23
- **Commit**: `8df62a7`
- **Cambios**:
  - Seguimiento del alumnado: si hay comentarios en el dÃ­a actual, el tile del nombre muestra el nÃºmero entre parÃ©ntesis, p. ej. `(2)`.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.12 â€” 2026-11-23
- **Commit**: `79b12c2`
- **Cambios**:
  - Interfaz: se fuerza modo claro y se elimina la opciÃ³n/cambio a modo oscuro (ThemeToggle, script de tema, estilos dark).
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.11 â€” 2026-11-23
- **Commit**: `4c2b187`
- **Cambios**:
  - Seguimiento del alumnado: tarjetas aÃºn mÃ¡s compactas para mostrar mÃ¡s alumnos por fila; X de eliminar centrada verticalmente a la derecha.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.10 â€” 2026-11-23
- **Commit**: `ebf3b16`
- **Cambios**:
  - Seguimiento del alumnado: card completo clicable, nombre en MAYÃšSCULAS y diseÃ±o mÃ¡s compacto; lÃ¡piz de ediciÃ³n movido al modal de agenda junto al nombre.
  - PÃ¡gina principal `/leeduca`: reordenada para mostrar primero Seguimiento (sin tÃ­tulo "Otros servicios"), luego MVP/presentaciÃ³n y edades disponibles.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.9 â€” 2026-11-23
- **Commit**: `6617142`
- **Cambios**:
  - Seguimiento del alumnado: tarjetas compactas (solo nombre). Clic en el nombre abre la agenda. Botones de acciÃ³n eliminados; eliminar alumno con X en esquina superior derecha con confirmaciÃ³n. Grid mÃ¡s denso para ver mÃ¡s alumnos.
- **BD**: sin cambios de esquema.
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

### v0.1.8 â€” 2026-11-23
- **Commit**: `e42db47`
- **Cambios**:
  - Seguimiento: reconocimiento por voz migrado a Groq Whisper (`whisper-large-v3-turbo` por defecto). Se graba audio con `MediaRecorder`, se transcribe en server action con `GROQ_API_KEY`, y se aplica en dictado rÃ¡pido de cabecera y botones de dictado en comentarios.
- **BD**: sin cambios de esquema.
- **Env**: requiere `GROQ_API_KEY` (ya configurada en Vercel).
- **VerificaciÃ³n**: `npx tsc --noEmit`, `npm run lint`, deploy Vercel prod.

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






















