<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Leeduca MVP — pautas de contenido y programación (referencia)

Este documento recoge la documentación y pautas proporcionadas para el MVP de Leeduca. **Toda la generación de contenidos, ejercicios y documentación técnica debe acogerse a esta referencia** para mantener un formato y estructura consistentes y fiables.

### Alcance actual del MVP
- **Edad activa:** 4 años (Educación Infantil). La página `/leeduca` solo ofrece acceso clicable a **4 años**.
- **Enfoque:** programación y actividades PRELEO para 4 años, según la programación didáctica facilitada.
- Las edades 3 y 5 no forman parte del MVP activo actual (pueden mostrarse como no disponibles o quedar fuera del flujo).

### Fuente de referencia (4 años)
- Documento facilitado: **`PROGRAMACIÓN INFANTIL 4 AÑOS.pdf`** (PRELEO).
- La documentación técnica mostrada en `/leeduca/4` (bloque “Información y contenidos técnicos”) debe reflejar esta programación.
- Al incorporar nuevas pautas/documentación del usuario, deben añadirse a este `AGENTS.md`.

### Estructura de la programación didáctica (formato a seguir)
La programación se organiza por **bloques**. Para cada bloque se especifica, cuando aplica:
- **Bloque** (p. ej. Conciencia fonológica, Vocabulario, Comprensión, Fluidez)
- **Objetivo(s)**
- **Contenido(s)**
- **Actividad PRELEO**
- **Criterios de evaluación**
- **Estándares / indicadores**

Mantener esta terminología y jerarquía al documentar o generar contenidos para 4 años. Priorizar fidelidad a la programación facilitada; no inventar actividades, criterios o secuencias no indicadas.

---

## Programación Infantil 4 años (PRELEO)

### 1. Conciencia fonológica
**Bloque general:** Conciencia fonológica — Conciencia silábica.  
**Objetivo general:** Hacer consciente al alumnado de que las palabras están compuestas por sílabas.

#### 1.1 Identificación silábica
| Objetivo | Contenido | Actividad PRELEO | Criterios de evaluación | Estándares |
|---|---|---|---|---|
| Identificar la sílaba dentro de la palabra | Identificación silábica | Rompiendo palabras | Identificar la sílaba dentro de la palabra | Distingue los diferentes golpes de voz. |
| Identificar las sílabas en posición inicial | Identificar sílabas (posición inicial) | ¿Cuál es la primera sílaba? | Identificar sílabas en posición inicial | Cuenta sílabas de una palabra y recuerda una posición solicitada. Enuncia una sílaba concreta de una palabra de forma aislada a las demás. Relaciona palabras que tienen la misma sílaba en la posición que se le pide. |
| Identificar las sílabas en posición final | Identificar sílabas (posición final) | ¿Cuál es la última sílaba? | Identificar sílabas en posición final | Cuenta sílabas de una palabra y recuerda una posición solicitada. Enuncia una sílaba concreta de una palabra de forma aislada a las demás. Relaciona palabras que tienen la misma sílaba en la posición que se le pide. |
| Identificar las sílabas en posición media | Identificar sílabas (posición media) | ¿Cuál es la sílaba de en medio? | Identificar sílabas en posición media | Cuenta sílabas de una palabra y recuerda una posición solicitada. Enuncia una sílaba concreta de una palabra de forma aislada a las demás. Relaciona palabras que tienen la misma sílaba en la posición que se le pide. |

#### 1.2 Conteo silábico
| Objetivo | Contenido | Actividad PRELEO | Criterios de evaluación | Estándares |
|---|---|---|---|---|
| Contar las sílabas que forman las palabras | Conteo silábico | Contando palmadas | Segmentar la palabra en sílabas de forma adecuada | Cuenta sílabas utilizando las palmas para distinguir los diferentes golpes de voz. Asocia las palmas de una palabra a tantas sílabas como tenga. |
| Entender que se puede formar una palabra uniendo varias sílabas | Conteo silábico / síntesis | Junto sílabas - 1 | Unir sílabas para formar palabras | Escucha con atención las sílabas que se enuncian. Recuerda las sílabas que se enuncian y las une formando palabras con diferente número de sílabas. |

#### 1.3 Manipulación silábica — Omisión
| Objetivo | Contenido | Actividad PRELEO | Criterios de evaluación | Estándares |
|---|---|---|---|---|
| Manipular las sílabas que están en posición inicial | Manipulación silábica: omisión (posición inicial) | Quitar la primera sílaba; Quitar la primera sílaba con resultado de pseudopalabra | Manipular sílabas a través de la omisión en distintas posiciones: posición inicial | Identifica la sílaba pedida de una palabra. Omite la sílaba en la posición solicitada de una palabra. |
| Manipular las sílabas que están en posición final | Manipulación silábica: omisión (posición final) | Quitar la última sílaba; Quitar la última sílaba con resultado de pseudopalabra | Manipular sílabas a través de la omisión en distintas posiciones: posición final | Identifica la sílaba pedida de una palabra. Omite la sílaba en la posición solicitada de una palabra. |
| Manipular las sílabas que están en posición media | Manipulación silábica: omisión (posición media) | Quitar la sílaba de en medio | Manipular sílabas a través de la omisión en distintas posiciones: posición media | Identifica la sílaba pedida de una palabra. Omite la sílaba en la posición solicitada de una palabra. |

#### 1.4 Manipulación silábica — Adición
| Objetivo | Contenido | Actividad PRELEO | Criterios de evaluación | Estándares |
|---|---|---|---|---|
| Manipular las sílabas que están en posición inicial | Manipulación silábica: adición (posición inicial) | Unir la primera sílaba; Unir la primera sílaba con resultado de pseudopalabra | Manipular sílabas a través de la adición en distintas posiciones: posición inicial | Identifica la sílaba en diferentes posiciones dentro de una palabra. Añade una sílaba en diferentes posiciones en una palabra. |
| Manipular las sílabas que están en posición final | Manipulación silábica: adición (posición final) | Unir la última sílaba; Unir la última sílaba con resultado de pseudopalabra | Manipular sílabas a través de la adición en distintas posiciones: posición final | Identifica la sílaba en diferentes posiciones dentro de una palabra. Añade una sílaba en diferentes posiciones en una palabra. |
| Manipular las sílabas que están en posición media | Manipulación silábica: adición (posición media) | Unir la sílaba de en medio | Manipular sílabas a través de la adición en distintas posiciones: posición media | Identifica la sílaba en diferentes posiciones dentro de una palabra. Añade una sílaba en diferentes posiciones en una palabra. |

#### 1.5 La sílaba tónica
| Objetivo | Contenido | Actividad PRELEO | Criterios de evaluación | Estándares |
|---|---|---|---|---|
| Descubrir diferencias de intensidad entre las sílabas | La sílaba tónica | La palmada más fuerte | Identificar la sílaba tónica de una palabra | Reconoce que las sílabas tienen diferente intensidad. Enuncia la sílaba de mayor intensidad. |

#### 1.6 Manipulación silábica — Cambios
| Objetivo | Contenido | Actividad PRELEO | Criterios de evaluación | Estándares |
|---|---|---|---|---|
| Cambiar la última sílaba de las palabras para descubrir otras nuevas | Manipulación silábica: cambios | Construyo palabras: cambio sílaba final | Cambiar la sílaba final de la palabra | Identifica las sílabas en diferentes posiciones. Cambia la sílaba inicial/final. Identifica la sílaba inicial/final. |
| Cambiar la primera sílaba de las palabras para descubrir otras nuevas | Manipulación silábica: cambios | Construyo palabras: cambio sílaba inicial | Cambiar la sílaba inicial de la palabra | Identifica las sílabas en diferentes posiciones. Cambia la sílaba inicial/final. Identifica la sílaba inicial/final. |
| Cambiar el orden de las sílabas de una palabra bisílaba | Manipulación silábica: inversión | Cambio el orden de las sílabas | Cambiar el orden de las sílabas en palabras bisílabas a través de inversiones | Identifica la sílaba inicial de una palabra. Identifica la sílaba final de una palabra. Invierte el orden de las sílabas en una palabra bisílaba. |

#### 1.7 Cadena de palabras y síntesis silábica
| Objetivo | Contenido | Actividad PRELEO | Criterios de evaluación | Estándares |
|---|---|---|---|---|
| Identificar sílabas en diferentes posiciones; buscar palabras que empiecen por una sílaba determinada | Cadena de palabras | Cadena de palabras | Identificar distintas posiciones de la sílaba dentro de la palabra | Identifica la sílaba inicial de una palabra. Identifica la sílaba final de una palabra. |
| Identificar sílaba inicial; realizar síntesis con sílabas dadas | Síntesis silábica | Junto sílabas - 2 | Unir sílabas para formar palabras | Identifica la sílaba inicial de una palabra. Recuerda las sílabas iniciales de dos palabras. Une dos sílabas memorizadas formando una nueva. |

### 2. Vocabulario
**Objetivo general:** Mejorar la calidad del léxico del alumnado.

| Objetivo | Contenido | Actividad PRELEO | Criterios de evaluación | Estándares |
|---|---|---|---|---|
| Mejorar la calidad del léxico del alumnado | Vocabulario — Categorías semánticas / Campo semántico | — | Ampliar su vocabulario expresivo relacionado con los campos semánticos trabajados | Nombra un número de palabras pertenecientes a los campos semánticos trabajados. |
| Mejorar el conocimiento de cada uno de los conceptos incorporando rasgos; relacionar los conceptos aprendidos con otros; facilitar la formación de categorías semánticas | Vocabulario — Categorías semánticas | Cada oveja con su pareja | Clasificar palabras por categorías semánticas | Clasifica palabras siguiendo un criterio semántico. |
| Facilitar que el alumnado aprenda a agrupar objetos según criterios semánticos y establezca categorías semánticas | Vocabulario — Campo semántico / Actualización semántica – 1 | — | Establecer relaciones semánticas entre las palabras | Identifica la palabra que no pertenece a un campo semántico determinado. |
| (Actualización semántica por criterio) | Vocabulario — Criterio semántico / Actualización semántica – 2 | — | Establecer relaciones semánticas entre las palabras | Identifica la palabra que responde al criterio establecido. |
| Facilitar la generación de categorías semánticas mediante la identificación de los elementos que no pueden agruparse con los demás | Vocabulario — Palabras relacionadas | Palabra equivocada | Establecer diferentes relaciones entre las palabras | Identifica la palabra que no mantiene relación con las demás de entre tres dadas. |
| Establecer relaciones entre conceptos a partir de los rasgos funcionales | Vocabulario — Palabras relacionadas | Relaciona palabras | Establecer diferentes relaciones entre las palabras | Establece relación justificada entre dos palabras de entre varias dadas. |
| Profundizar en el conocimiento semántico pidiendo al alumnado que seleccione los objetos por un determinado rasgo | Vocabulario — Definición por el uso | Para qué sirven | Establecer relaciones entre las palabras según la función de uso | Identifica palabras siguiendo el criterio función de uso. |
| Aprender a discriminar objetos a partir de sus rasgos | Vocabulario — Rasgos de objetos | Análisis de rasgos | Clasificar palabras en función de sus rasgos | Identifica una palabra entre varias en función de sus rasgos. |
| Entender que las palabras son unidades que se pueden manipular | Vocabulario — Palabras compuestas | Palabras amigas | Construir palabras compuestas | Enuncia una palabra compuesta mediante la unión de dos palabras dadas. |
| Profundizar en el conocimiento semántico pidiendo que seleccionen los objetos que tienen una relación lógica con la historia que se está narrando | Vocabulario — Relaciones temáticas | Relaciones temáticas | Establecer relaciones entre las palabras siguiendo el criterio relación temática | Establece relaciones entre las palabras siguiendo el criterio relación temática. |

### 3. Comprensión
**Objetivo general:** Comprensión de una imagen y/o mensaje mediante la construcción de inferencias lógicas.

| Objetivo | Contenido | Actividad PRELEO | Criterios de evaluación | Estándares |
|---|---|---|---|---|
| Comprender una imagen mediante la construcción de inferencias lógicas; detectar pistas dadas en la imagen y utilizarlas para responder a las preguntas realizando inferencias lógicas | Comprensión oral | El Juego del Detective | Inferir, interpretar y formular hipótesis sobre un contenido. Crear modelos mentales. | Observa el conjunto de la imagen atentamente. Identifica las pistas dadas en la imagen. Responde correctamente a la pregunta mediante una inferencia lógica. Justifica la respuesta de manera adecuada. |
| Detectar pistas y responder mediante inferencias lógicas | Comprensión oral | El león fisgón | Inferir, interpretar y formular hipótesis sobre un contenido | Escucha con atención la frase enunciada. Identifica las pistas dadas en la imagen. Responde correctamente a la pregunta mediante una inferencia lógica. |

### 4. Fluidez
**Objetivo general:** Conseguir una denominación fluida de imágenes sin paradas excesivas ni titubeos en el nombrado.

| Objetivo | Contenido | Actividad PRELEO | Criterios de evaluación | Estándares |
|---|---|---|---|---|
| Conseguir una denominación fluida de imágenes sin paradas excesivas ni titubeos en el nombrado | Fluidez oral | Fluidez 4 años | Expresar un mensaje con una pronunciación y una dicción correctas (articulación, ritmo, entonación y volumen) | Denomina imágenes siguiendo un ritmo fluido, mostrando un acceso fácil a la verbalización de la palabra. |

---

## Pautas para contenidos y ejercicios (MVP 4 años)
- Alinear objetivos, actividades y feedback con los bloques y actividades PRELEO de la programación de 4 años.
- Usar lenguaje claro, sencillo y adecuado a alumnado de 4 años.
- Cuando se generen ejercicios con IA o se creen contenidos nuevos, respetar los bloques: conciencia fonológica (silábica, identificación/conteo/manipulación/sílaba tónica), vocabulario, comprensión, fluidez, según proceda.
- Mantener coherencia terminológica: “Actividad PRELEO”, “criterios de evaluación”, “estándares”, posiciones silábicas (inicial/final/media), etc.
- Esta sección debe ampliarse con nuevas pautas que el usuario proporcione.
