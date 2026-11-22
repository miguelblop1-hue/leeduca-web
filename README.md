# Leeduca · Preleo (Programa Universal)

MVP simplificado centrado en el recurso **Preleo / Programa Universal** como raíz de la aplicación. Desde la pantalla principal se accede a todos los servicios de la plantilla (cribado, evaluación e intervención). El contenido es demostrativo/placeholder, sin lógica real de evaluación, corrección ni informes.

El proyecto mantiene convenciones del **Sano App**: Next.js App Router, TypeScript estricto, i18n ES/EN con `next-intl`, rutas por locale, Server Components por defecto, tokens de diseño y separación `app/components/features/i18n/lib`.

## Puesta en marcha

```bash
npm install
npm run dev
```

- Español: http://localhost:3010/es
- Inglés: http://localhost:3010/en

> Arranca en el puerto **3010** por defecto. Puedes cambiarlo con `npm run dev -- -p <puerto>`.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sin emitir |

## Estructura

- `src/app/[locale]/(app)/` — raíz Universal y pantallas de servicios.
- `src/components/` — componentes reutilizables (UI y layout).
- `src/features/` — datos/utilidades por dominio (p. ej. edades y programas).
- `src/i18n/` — configuración y mensajes ES/EN.
- `src/lib/` — utilidades transversales.

## Mapa de pantallas

- **Raíz (`/es`, `/en`) — Preleo · Programa Universal:** acceso a todos los servicios.
- **Cribado individual:** `/cribado/individual` y `/cribado/individual/[edad]` (3–8 años).
- **Cribado colectivo:** `/cribado/colectivo` y `/cribado/colectivo/[edad]` (6–11 años).
- **Baterías de evaluación:** `/evaluacion/baterias`.
- **Intervención Leetrea:** `/leetrea`.
- **Líneas Preleo:** `/programas/intensificacion`, `/programas/repaso`, `/programas/paleta`.

## Notas

- Todo el contenido es placeholder para definir arquitectura y enrutado.
- Pendiente: contenidos reales, instrumentos/pruebas, lógica de cribado/puntuación, informes, roles, autenticación, persistencia y reglas de privacidad propias del dominio educativo.
