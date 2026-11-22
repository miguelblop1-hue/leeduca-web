export type AreaContent = {
  title: string;
  items: string[];
};

export type SectionContent = {
  title: string;
  intro?: string;
  items?: string[];
  areas?: AreaContent[];
};

export type AgeContent = {
  age: string;
  stage: string;
  summary: string;
  note: string;
  sections: SectionContent[];
};

export const edades345: Record<string, { es: AgeContent; en: AgeContent }> = {
  "3": {
    es: {
      age: "3",
      stage: "Educación Infantil · 3 años",
      summary:
        "Inicio de la estimulación sistemática del lenguaje oral y de los precursores de la lectura. Se prioriza la experiencia oral, el juego, la escucha activa y la familiarización con los sonidos y las palabras.",
      note:
        "Contenido orientativo de plantilla, estructurado según el enfoque público de Leeduca/Preleo (lenguaje oral, conciencia fonológica, vocabulario, comprensión, memoria verbal, morfosintaxis y principio alfabético). No reproduce materiales, pruebas ni secuencias propietarias.",
      sections: [
        {
          title: "Objetivos prioritarios",
          items: [
            "Desarrollar la atención y la escucha en situaciones comunicativas y de juego.",
            "Ampliar el vocabulario cotidiano y la comprensión de palabras y consignas sencillas.",
            "Iniciar la conciencia fonológica con rimas, sílabas y sonidos del entorno.",
            "Favorecer la expresión oral con frases sencillas y participación en rutinas.",
            "Acercar al alumnado al lenguaje escrito a través de cuentos, imágenes y nombres.",
          ],
        },
        {
          title: "Áreas y progresión",
          areas: [
            {
              title: "Conciencia fonológica",
              items: [
                "Discriminación de sonidos ambientales y onomatopeyas.",
                "Identificación y disfrute de rimas y canciones.",
                "Segmentación y palmadas por sílabas en palabras familiares.",
                "Reconocimiento auditivo de palabras que empiezan igual (iniciación).",
              ],
            },
            {
              title: "Vocabulario",
              items: [
                "Vocabulario básico: entorno cercano, cuerpo, familia, aula, alimentos y objetos.",
                "Denominación de imágenes y objetos conocidos.",
                "Agrupaciones sencillas por categorías (animales, colores, juguetes).",
                "Comprensión de palabras frecuentes en instrucciones y relatos breves.",
              ],
            },
            {
              title: "Comprensión oral",
              items: [
                "Seguimiento de instrucciones simples de uno o dos pasos.",
                "Comprensión de cuentos cortos con apoyo visual.",
                "Respuesta a preguntas básicas: quién, qué, dónde (con apoyo).",
                "Identificación de personajes, acciones y situaciones cotidianas.",
              ],
            },
            {
              title: "Memoria verbal",
              items: [
                "Recuerdo de palabras o elementos en secuencias breves.",
                "Repetición de canciones, retahílas y frases cortas.",
                "Memoria de rutinas y consignas habituales del aula.",
              ],
            },
            {
              title: "Morfosintaxis",
              items: [
                "Uso de palabras y combinaciones de dos o tres elementos para comunicar.",
                "Producción de frases sencillas en presente y situaciones conocidas.",
                "Comprensión y uso inicial de artículos, plurales y negaciones básicas.",
                "Ampliación progresiva de la longitud y claridad del enunciado.",
              ],
            },
            {
              title: "Principio alfabético y acercamiento a lo impreso",
              items: [
                "Interés por cuentos, imágenes, símbolos y el propio nombre.",
                "Reconocimiento de que el texto y las imágenes transmiten significado.",
                "Familiarización con la dirección de la lectura en situaciones compartidas.",
                "Identificación visual de letras o nombres significativos (iniciación).",
              ],
            },
          ],
        },
        {
          title: "Cribado universal individual (3 años)",
          intro:
            "Valoración orientativa del desarrollo del lenguaje oral y de precursores tempranos para detectar necesidades de apoyo y planificar la intervención.",
          items: [
            "Ámbitos a observar: escucha, vocabulario receptivo/expresivo, comprensión oral, conciencia fonológica inicial, memoria verbal y expresión morfosintáctica.",
            "Formato: aplicación individual, breve y adaptada al ritmo del alumnado, con apoyo visual y dinámicas lúdicas.",
            "Periodicidad orientativa: valoración inicial y seguimiento según criterio del centro/profesional (a los 3 años la evaluación puede tener una pauta específica).",
            "Resultado esperado: perfil de fortalezas y necesidades, señales de alerta y recomendaciones de estimulación.",
          ],
        },
        {
          title: "Intervención · Programa Universal Preleo",
          areas: [
            {
              title: "Tipos de actividades",
              items: [
                "Juegos de escucha, ritmos, rimas y canciones.",
                "Narración y diálogo en torno a cuentos e imágenes.",
                "Denominación, clasificación y juegos de vocabulario.",
                "Juegos silábicos con palmadas, saltos o apoyos manipulativos.",
                "Rutinas orales, repetición de modelos y ampliación de frases.",
              ],
            },
            {
              title: "Organización",
              items: [
                "Intervención en gran grupo con apoyos en pequeño grupo cuando sea necesario.",
                "Secuencias breves, frecuentes y contextualizadas en el aula.",
                "Modelado del profesional educativo y participación activa del alumnado.",
                "Registro de observaciones para ajustar la respuesta educativa.",
              ],
            },
          ],
        },
        {
          title: "Repaso e intensificación",
          items: [
            "Repaso: refuerzo de rimas, vocabulario, comprensión y formulación oral ante primeros signos de retraso o menor progreso.",
            "Intensificación: mayor frecuencia, grupos reducidos y objetivos más ajustados si la respuesta al apoyo inicial es baja.",
            "Coordinación con especialistas y familias cuando se identifican necesidades persistentes.",
            "Ajuste continuo basado en observación y evidencias de progreso.",
          ],
        },
        {
          title: "Seguimiento, recursos y registro",
          items: [
            "Observación sistemática del lenguaje oral y la participación en actividades.",
            "Registro de avances en vocabulario, comprensión, conciencia fonológica y expresión.",
            "Informes de progreso y orientaciones para el aula (según configuración del servicio).",
            "Materiales previstos: fichas didácticas, modelado, actividades guiadas y propuestas de apoyo (pendientes de incorporar contenido real).",
          ],
        },
      ],
    },
    en: {
      age: "3",
      stage: "Early Childhood Education · Age 3",
      summary:
        "Start of systematic stimulation of oral language and early reading precursors. Priority is given to oral experience, play, active listening, and familiarity with sounds and words.",
      note:
        "Template guidance content, structured according to Leeduca/Preleo's public approach (oral language, phonological awareness, vocabulary, comprehension, verbal memory, morphosyntax, and alphabetic principle). It does not reproduce proprietary materials, tests, or sequences.",
      sections: [
        {
          title: "Priority objectives",
          items: [
            "Develop attention and listening in communication and play situations.",
            "Expand everyday vocabulary and understanding of simple words and instructions.",
            "Begin phonological awareness through rhymes, syllables, and environmental sounds.",
            "Encourage oral expression with simple sentences and participation in routines.",
            "Introduce print through stories, images, and names.",
          ],
        },
        {
          title: "Areas and progression",
          areas: [
            {
              title: "Phonological awareness",
              items: [
                "Discrimination of environmental sounds and onomatopoeia.",
                "Identification and enjoyment of rhymes and songs.",
                "Syllable segmentation and clapping in familiar words.",
                "Auditory recognition of words that start the same (early stage).",
              ],
            },
            {
              title: "Vocabulary",
              items: [
                "Basic vocabulary: close environment, body, family, classroom, food, and objects.",
                "Naming familiar pictures and objects.",
                "Simple grouping by categories (animals, colors, toys).",
                "Understanding frequent words in instructions and short stories.",
              ],
            },
            {
              title: "Oral comprehension",
              items: [
                "Following simple one- or two-step instructions.",
                "Understanding short stories with visual support.",
                "Answering basic who/what/where questions (with support).",
                "Identifying characters, actions, and everyday situations.",
              ],
            },
            {
              title: "Verbal memory",
              items: [
                "Recalling words or items in short sequences.",
                "Repeating songs, rhymes, and short phrases.",
                "Remembering classroom routines and common instructions.",
              ],
            },
            {
              title: "Morphosyntax",
              items: [
                "Using words and two- or three-element combinations to communicate.",
                "Producing simple sentences in present and familiar situations.",
                "Early understanding and use of articles, plurals, and basic negation.",
                "Gradual increase in sentence length and clarity.",
              ],
            },
            {
              title: "Alphabetic principle and print awareness",
              items: [
                "Interest in stories, images, symbols, and one's own name.",
                "Recognizing that text and images convey meaning.",
                "Familiarity with reading direction in shared reading situations.",
                "Visual identification of meaningful letters or names (early stage).",
              ],
            },
          ],
        },
        {
          title: "Universal individual screening (age 3)",
          intro:
            "Guidance assessment of oral language development and early precursors to identify support needs and plan intervention.",
          items: [
            "Areas to observe: listening, receptive/expressive vocabulary, oral comprehension, early phonological awareness, verbal memory, and morphosyntactic expression.",
            "Format: brief individual application adapted to the child's pace, with visual support and playful dynamics.",
            "Indicative frequency: initial assessment and follow-up based on school/professional criteria (age 3 may follow a specific schedule).",
            "Expected outcome: strengths and needs profile, warning signs, and stimulation recommendations.",
          ],
        },
        {
          title: "Intervention · Preleo Universal Program",
          areas: [
            {
              title: "Activity types",
              items: [
                "Listening, rhythm, rhyme, and song games.",
                "Storytelling and dialogue around books and pictures.",
                "Naming, categorizing, and vocabulary games.",
                "Syllable games with clapping, movement, or manipulatives.",
                "Oral routines, model repetition, and sentence expansion.",
              ],
            },
            {
              title: "Organization",
              items: [
                "Whole-group intervention with small-group support when needed.",
                "Short, frequent sequences embedded in classroom routines.",
                "Teacher modeling and active student participation.",
                "Observation records to adjust educational response.",
              ],
            },
          ],
        },
        {
          title: "Review and intensification",
          items: [
            "Review: reinforcement of rhymes, vocabulary, comprehension, and oral formulation when early delays or limited progress appear.",
            "Intensification: higher frequency, smaller groups, and more targeted objectives if response to initial support is low.",
            "Coordination with specialists and families when needs persist.",
            "Continuous adjustment based on observation and progress evidence.",
          ],
        },
        {
          title: "Monitoring, resources, and records",
          items: [
            "Systematic observation of oral language and participation in activities.",
            "Recording progress in vocabulary, comprehension, phonological awareness, and expression.",
            "Progress reports and classroom guidance (depending on service setup).",
            "Planned resources: teaching guides, modeling, guided activities, and support materials (real content pending).",
          ],
        },
      ],
    },
  },
  "4": {
    es: {
      age: "4",
      stage: "Educación Infantil · 4 años",
      summary:
        "Programación didáctica PRELEO para 4 años. Se trabaja la conciencia fonológica (silábica), el vocabulario, la comprensión oral y la fluidez, con objetivos, contenidos, actividades PRELEO, criterios de evaluación y estándares definidos.",
      note:
        "Fuente: “PROGRAMACIÓN INFANTIL 4 AÑOS.pdf” (PRELEO) facilitada para el MVP. Esta documentación es la referencia de contenidos y estructura para 4 años.",
      sections: [
        {
          title: "1. Conciencia fonológica",
          intro:
            "Bloque: Conciencia fonológica — Conciencia silábica. Objetivo general: hacer consciente al alumnado de que las palabras están compuestas por sílabas.",
          areas: [
            {
              title: "1.1 Identificación silábica",
              items: [
                "Rompiendo palabras — Objetivo: identificar la sílaba dentro de la palabra. Criterio: identificar la sílaba dentro de la palabra. Estándar: distingue los diferentes golpes de voz.",
                "¿Cuál es la primera sílaba? (posición inicial) — Objetivo/contenido: identificar sílabas en posición inicial. Estándares: cuenta sílabas de una palabra y recuerda una posición solicitada; enuncia una sílaba concreta de una palabra de forma aislada a las demás; relaciona palabras que tienen la misma sílaba en la posición que se le pide.",
                "¿Cuál es la última sílaba? (posición final) — Objetivo/contenido: identificar sílabas en posición final. Estándares: cuenta sílabas de una palabra y recuerda una posición solicitada; enuncia una sílaba concreta de una palabra de forma aislada a las demás; relaciona palabras que tienen la misma sílaba en la posición que se le pide.",
                "¿Cuál es la sílaba de en medio? (posición media) — Objetivo/contenido: identificar sílabas en posición media. Estándares: cuenta sílabas de una palabra y recuerda una posición solicitada; enuncia una sílaba concreta de una palabra de forma aislada a las demás; relaciona palabras que tienen la misma sílaba en la posición que se le pide.",
              ],
            },
            {
              title: "1.2 Conteo silábico",
              items: [
                "Contando palmadas — Objetivo: contar las sílabas que forman las palabras. Criterio: segmentar la palabra en sílabas de forma adecuada. Estándares: cuenta sílabas utilizando las palmas para distinguir los diferentes golpes de voz; asocia las palmas de una palabra a tantas sílabas como tenga.",
                "Junto sílabas - 1 — Objetivo: entender que se puede formar una palabra uniendo varias sílabas. Criterio: unir sílabas para formar palabras. Estándares: escucha con atención las sílabas que se enuncian; recuerda las sílabas que se enuncian y las une formando palabras con diferente número de sílabas.",
              ],
            },
            {
              title: "1.3 Manipulación silábica — Omisión",
              items: [
                "Posición inicial — Actividades PRELEO: Quitar la primera sílaba; Quitar la primera sílaba con resultado de pseudopalabra. Criterio: manipular sílabas a través de la omisión en posición inicial. Estándares: identifica la sílaba pedida de una palabra; omite la sílaba en la posición solicitada de una palabra.",
                "Posición final — Actividades PRELEO: Quitar la última sílaba; Quitar la última sílaba con resultado de pseudopalabra. Criterio: manipular sílabas a través de la omisión en posición final. Estándares: identifica la sílaba pedida de una palabra; omite la sílaba en la posición solicitada de una palabra.",
                "Posición media — Actividad PRELEO: Quitar la sílaba de en medio. Criterio: manipular sílabas a través de la omisión en posición media. Estándares: identifica la sílaba pedida de una palabra; omite la sílaba en la posición solicitada de una palabra.",
              ],
            },
            {
              title: "1.4 Manipulación silábica — Adición",
              items: [
                "Posición inicial — Actividades PRELEO: Unir la primera sílaba; Unir la primera sílaba con resultado de pseudopalabra. Criterio: manipular sílabas a través de la adición en posición inicial. Estándares: identifica la sílaba en diferentes posiciones dentro de una palabra; añade una sílaba en diferentes posiciones en una palabra.",
                "Posición final — Actividades PRELEO: Unir la última sílaba; Unir la última sílaba con resultado de pseudopalabra. Criterio: manipular sílabas a través de la adición en posición final. Estándares: identifica la sílaba en diferentes posiciones dentro de una palabra; añade una sílaba en diferentes posiciones en una palabra.",
                "Posición media — Actividad PRELEO: Unir la sílaba de en medio. Criterio: manipular sílabas a través de la adición en posición media. Estándares: identifica la sílaba en diferentes posiciones dentro de una palabra; añade una sílaba en diferentes posiciones en una palabra.",
              ],
            },
            {
              title: "1.5 La sílaba tónica",
              items: [
                "La palmada más fuerte — Objetivo: descubrir diferencias de intensidad entre las sílabas. Criterio: identificar la sílaba tónica de una palabra. Estándares: reconoce que las sílabas tienen diferente intensidad; enuncia la sílaba de mayor intensidad.",
              ],
            },
            {
              title: "1.6 Manipulación silábica — Cambios",
              items: [
                "Construyo palabras: cambio sílaba final — Objetivo: cambiar la última sílaba de las palabras para descubrir otras nuevas. Criterio: cambiar la sílaba final de la palabra. Estándares: identifica las sílabas en diferentes posiciones; cambia la sílaba inicial/final; identifica la sílaba inicial/final.",
                "Construyo palabras: cambio sílaba inicial — Objetivo: cambiar la primera sílaba de las palabras para descubrir otras nuevas. Criterio: cambiar la sílaba inicial de la palabra. Estándares: identifica las sílabas en diferentes posiciones; cambia la sílaba inicial/final; identifica la sílaba inicial/final.",
                "Cambio el orden de las sílabas — Objetivo: cambiar el orden de las sílabas de una palabra bisílaba. Criterio: cambiar el orden de las sílabas en palabras bisílabas a través de inversiones. Estándares: identifica la sílaba inicial de una palabra; identifica la sílaba final de una palabra; invierte el orden de las sílabas en una palabra bisílaba.",
              ],
            },
            {
              title: "1.7 Cadena de palabras y síntesis silábica",
              items: [
                "Cadena de palabras — Objetivos: identificar sílabas en diferentes posiciones; buscar palabras que empiecen por una sílaba determinada. Criterio: identificar distintas posiciones de la sílaba dentro de la palabra. Estándares: identifica la sílaba inicial de una palabra; identifica la sílaba final de una palabra.",
                "Junto sílabas - 2 — Objetivos: identificar sílaba inicial; realizar síntesis con sílabas dadas. Criterio: unir sílabas para formar palabras. Estándares: identifica la sílaba inicial de una palabra; recuerda las sílabas iniciales de dos palabras; une dos sílabas memorizadas formando una nueva.",
              ],
            },
          ],
        },
        {
          title: "2. Vocabulario",
          intro: "Objetivo general: mejorar la calidad del léxico del alumnado.",
          areas: [
            {
              title: "Categorías y campos semánticos",
              items: [
                "Campo semántico (categorías semánticas) — Criterio: ampliar el vocabulario expresivo relacionado con los campos semánticos trabajados. Estándar: nombra un número de palabras pertenecientes a los campos semánticos trabajados.",
                "Cada oveja con su pareja — Objetivos: mejorar el conocimiento de conceptos incorporando rasgos, relacionar conceptos aprendidos y facilitar la formación de categorías semánticas. Criterio: clasificar palabras por categorías semánticas. Estándar: clasifica palabras siguiendo un criterio semántico.",
                "Actualización semántica – 1 (campo semántico) — Objetivo: facilitar que el alumnado agrupe objetos según criterios semánticos y establezca categorías semánticas. Criterio: establecer relaciones semánticas entre las palabras. Estándar: identifica la palabra que no pertenece a un campo semántico determinado.",
                "Actualización semántica – 2 (criterio semántico) — Criterio: establecer relaciones semánticas entre las palabras. Estándar: identifica la palabra que responde al criterio establecido.",
              ],
            },
            {
              title: "Relaciones, rasgos y formación de palabras",
              items: [
                "Palabra equivocada (palabras relacionadas) — Objetivo: facilitar la generación de categorías semánticas mediante la identificación de elementos que no pueden agruparse con los demás. Criterio: establecer diferentes relaciones entre las palabras. Estándar: identifica la palabra que no mantiene relación con las demás de entre tres dadas.",
                "Relaciona palabras — Objetivo: establecer relaciones entre conceptos a partir de los rasgos funcionales. Criterio: establecer diferentes relaciones entre las palabras. Estándar: establece relación justificada entre dos palabras de entre varias dadas.",
                "Para qué sirven (definición por el uso) — Objetivo: profundizar en el conocimiento semántico seleccionando objetos por un determinado rasgo/uso. Criterio: establecer relaciones entre las palabras según la función de uso. Estándar: identifica palabras siguiendo el criterio función de uso.",
                "Análisis de rasgos (rasgos de objetos) — Objetivo: aprender a discriminar objetos a partir de sus rasgos. Criterio: clasificar palabras en función de sus rasgos. Estándar: identifica una palabra entre varias en función de sus rasgos.",
                "Palabras amigas (palabras compuestas) — Objetivo: entender que las palabras son unidades que se pueden manipular. Criterio: construir palabras compuestas. Estándar: enuncia una palabra compuesta mediante la unión de dos palabras dadas.",
                "Relaciones temáticas — Objetivo: profundizar en el conocimiento semántico seleccionando objetos con relación lógica con la historia narrada. Criterio: establecer relaciones entre las palabras siguiendo el criterio relación temática. Estándar: establece relaciones entre las palabras siguiendo el criterio relación temática.",
              ],
            },
          ],
        },
        {
          title: "3. Comprensión",
          intro:
            "Objetivo general: comprensión de una imagen y/o mensaje mediante la construcción de inferencias lógicas.",
          areas: [
            {
              title: "Comprensión oral e inferencias",
              items: [
                "El Juego del Detective — Objetivo: comprender una imagen mediante la construcción de inferencias lógicas; detectar pistas y utilizarlas para responder preguntas. Criterios: inferir, interpretar y formular hipótesis sobre un contenido; crear modelos mentales. Estándares: observa el conjunto de la imagen atentamente; identifica las pistas dadas en la imagen; responde correctamente a la pregunta mediante una inferencia lógica; justifica la respuesta de manera adecuada.",
                "El león fisgón — Objetivo: detectar pistas y responder mediante inferencias lógicas. Criterio: inferir, interpretar y formular hipótesis sobre un contenido. Estándares: escucha con atención la frase enunciada; identifica las pistas dadas en la imagen; responde correctamente a la pregunta mediante una inferencia lógica.",
              ],
            },
          ],
        },
        {
          title: "4. Fluidez",
          intro:
            "Objetivo general: conseguir una denominación fluida de imágenes sin paradas excesivas ni titubeos en el nombrado.",
          areas: [
            {
              title: "Fluidez oral",
              items: [
                "Fluidez 4 años — Objetivo: conseguir una denominación fluida de imágenes sin paradas excesivas ni titubeos en el nombrado. Criterio: expresar un mensaje con una pronunciación y una dicción correctas (articulación, ritmo, entonación y volumen). Estándar: denomina imágenes siguiendo un ritmo fluido, mostrando un acceso fácil a la verbalización de la palabra.",
              ],
            },
          ],
        },
      ],
    },
    en: {
      age: "4",
      stage: "Early Childhood Education · Age 4",
      summary:
        "PRELEO didactic program for age 4. It works on phonological awareness (syllabic), vocabulary, oral comprehension, and fluency, with defined objectives, contents, PRELEO activities, assessment criteria, and standards.",
      note:
        "Source: “PROGRAMACIÓN INFANTIL 4 AÑOS.pdf” (PRELEO) provided for the MVP. This documentation is the reference for age 4 content and structure.",
      sections: [
        {
          title: "1. Phonological awareness",
          intro:
            "Block: Phonological awareness — Syllabic awareness. General objective: help children become aware that words are made up of syllables.",
          areas: [
            {
              title: "1.1 Syllable identification",
              items: [
                "Rompiendo palabras (Breaking words) — Objective: identify the syllable within the word. Criterion: identify the syllable within the word. Standard: distinguishes the different beats/syllable pulses in words.",
                "¿Cuál es la primera sílaba? (What is the first syllable?, initial position) — Objective/content: identify syllables in initial position. Standards: counts syllables in a word and remembers a requested position; states a specific syllable in isolation; relates words that share the same syllable in the requested position.",
                "¿Cuál es la última sílaba? (What is the last syllable?, final position) — Objective/content: identify syllables in final position. Standards: counts syllables in a word and remembers a requested position; states a specific syllable in isolation; relates words that share the same syllable in the requested position.",
                "¿Cuál es la sílaba de en medio? (What is the middle syllable?, medial position) — Objective/content: identify syllables in medial position. Standards: counts syllables in a word and remembers a requested position; states a specific syllable in isolation; relates words that share the same syllable in the requested position.",
              ],
            },
            {
              title: "1.2 Syllable counting",
              items: [
                "Contando palmadas (Counting claps) — Objective: count the syllables that form words. Criterion: segment the word into syllables appropriately. Standards: counts syllables using claps to distinguish beats; associates claps with the number of syllables in a word.",
                "Junto sílabas - 1 (Joining syllables 1) — Objective: understand that a word can be formed by joining syllables. Criterion: join syllables to form words. Standards: listens carefully to the syllables spoken; remembers the syllables and joins them to form words with different numbers of syllables.",
              ],
            },
            {
              title: "1.3 Syllable manipulation — Omission",
              items: [
                "Initial position — PRELEO activities: Quitar la primera sílaba (Remove the first syllable); Quitar la primera sílaba con resultado de pseudopalabra (with nonword result). Criterion: manipulate syllables through omission in initial position. Standards: identifies the requested syllable in a word; omits the syllable in the requested position.",
                "Final position — PRELEO activities: Quitar la última sílaba (Remove the last syllable); Quitar la última sílaba con resultado de pseudopalabra. Criterion: manipulate syllables through omission in final position. Standards: identifies the requested syllable in a word; omits the syllable in the requested position.",
                "Medial position — PRELEO activity: Quitar la sílaba de en medio (Remove the middle syllable). Criterion: manipulate syllables through omission in medial position. Standards: identifies the requested syllable in a word; omits the syllable in the requested position.",
              ],
            },
            {
              title: "1.4 Syllable manipulation — Addition",
              items: [
                "Initial position — PRELEO activities: Unir la primera sílaba (Add/join the first syllable); Unir la primera sílaba con resultado de pseudopalabra. Criterion: manipulate syllables through addition in initial position. Standards: identifies the syllable in different positions within a word; adds a syllable in different positions in a word.",
                "Final position — PRELEO activities: Unir la última sílaba (Add/join the last syllable); Unir la última sílaba con resultado de pseudopalabra. Criterion: manipulate syllables through addition in final position. Standards: identifies the syllable in different positions within a word; adds a syllable in different positions in a word.",
                "Medial position — PRELEO activity: Unir la sílaba de en medio (Add/join the middle syllable). Criterion: manipulate syllables through addition in medial position. Standards: identifies the syllable in different positions within a word; adds a syllable in different positions in a word.",
              ],
            },
            {
              title: "1.5 Stressed syllable",
              items: [
                "La palmada más fuerte (The strongest clap) — Objective: discover differences in intensity between syllables. Criterion: identify the stressed syllable in a word. Standards: recognizes that syllables have different intensity; states the syllable with the greatest intensity.",
              ],
            },
            {
              title: "1.6 Syllable manipulation — Changes",
              items: [
                "Construyo palabras: cambio sílaba final (Change final syllable) — Objective: change the last syllable of words to discover new ones. Criterion: change the final syllable of the word. Standards: identifies syllables in different positions; changes the initial/final syllable; identifies the initial/final syllable.",
                "Construyo palabras: cambio sílaba inicial (Change initial syllable) — Objective: change the first syllable of words to discover new ones. Criterion: change the initial syllable of the word. Standards: identifies syllables in different positions; changes the initial/final syllable; identifies the initial/final syllable.",
                "Cambio el orden de las sílabas (Swap syllable order) — Objective: change the order of syllables in a disyllabic word. Criterion: change syllable order in disyllabic words through inversion. Standards: identifies the initial syllable; identifies the final syllable; inverts the order of syllables in a disyllabic word.",
              ],
            },
            {
              title: "1.7 Word chain and syllable synthesis",
              items: [
                "Cadena de palabras (Word chain) — Objectives: identify syllables in different positions; find words that begin with a given syllable. Criterion: identify different positions of the syllable within the word. Standards: identifies the initial syllable of a word; identifies the final syllable of a word.",
                "Junto sílabas - 2 (Joining syllables 2) — Objectives: identify initial syllable; perform synthesis with given syllables. Criterion: join syllables to form words. Standards: identifies the initial syllable of a word; remembers the initial syllables of two words; joins two memorized syllables to form a new one.",
              ],
            },
          ],
        },
        {
          title: "2. Vocabulary",
          intro: "General objective: improve the quality of children's vocabulary.",
          areas: [
            {
              title: "Semantic categories and fields",
              items: [
                "Semantic field (semantic categories) — Criterion: expand expressive vocabulary related to worked semantic fields. Standard: names a number of words belonging to the worked semantic fields.",
                "Cada oveja con su pareja (Each sheep with its pair) — Objectives: improve concept knowledge by incorporating features, relate learned concepts, and facilitate formation of semantic categories. Criterion: classify words by semantic categories. Standard: classifies words following a semantic criterion.",
                "Actualización semántica – 1 (semantic field) — Objective: help children group objects by semantic criteria and establish semantic categories. Criterion: establish semantic relationships between words. Standard: identifies the word that does not belong to a given semantic field.",
                "Actualización semántica – 2 (semantic criterion) — Criterion: establish semantic relationships between words. Standard: identifies the word that responds to the established criterion.",
              ],
            },
            {
              title: "Relations, features, and word formation",
              items: [
                "Palabra equivocada (Odd word out, related words) — Objective: facilitate formation of semantic categories by identifying elements that cannot be grouped with others. Criterion: establish different relationships between words. Standard: identifies the word that does not relate to the others among three given.",
                "Relaciona palabras (Relate words) — Objective: establish relationships between concepts based on functional features. Criterion: establish different relationships between words. Standard: establishes a justified relationship between two words among several given.",
                "Para qué sirven (What are they for?, definition by use) — Objective: deepen semantic knowledge by selecting objects by a given feature/use. Criterion: establish relationships between words according to function of use. Standard: identifies words following the function-of-use criterion.",
                "Análisis de rasgos (Feature analysis) — Objective: learn to discriminate objects based on their features. Criterion: classify words according to their features. Standard: identifies a word among several based on its features.",
                "Palabras amigas (Compound words) — Objective: understand that words are units that can be manipulated. Criterion: build compound words. Standard: states a compound word by joining two given words.",
                "Relaciones temáticas (Thematic relations) — Objective: deepen semantic knowledge by selecting objects with a logical relation to the narrated story. Criterion: establish relationships between words following the thematic-relation criterion. Standard: establishes relationships between words following the thematic-relation criterion.",
              ],
            },
          ],
        },
        {
          title: "3. Comprehension",
          intro:
            "General objective: comprehension of an image and/or message through the construction of logical inferences.",
          areas: [
            {
              title: "Oral comprehension and inferences",
              items: [
                "El Juego del Detective (The Detective Game) — Objective: understand an image by building logical inferences; detect clues and use them to answer questions. Criteria: infer, interpret, and formulate hypotheses about content; create mental models. Standards: observes the whole image carefully; identifies clues in the image; answers the question correctly through a logical inference; justifies the answer appropriately.",
                "El león fisgón (The curious lion) — Objective: detect clues and answer through logical inferences. Criterion: infer, interpret, and formulate hypotheses about content. Standards: listens carefully to the spoken sentence; identifies clues in the image; answers the question correctly through a logical inference.",
              ],
            },
          ],
        },
        {
          title: "4. Fluency",
          intro:
            "General objective: achieve fluent naming of images without excessive pauses or hesitation.",
          areas: [
            {
              title: "Oral fluency",
              items: [
                "Fluidez 4 años (Fluency age 4) — Objective: achieve fluent naming of images without excessive pauses or hesitation. Criterion: express a message with correct pronunciation and diction (articulation, rhythm, intonation, and volume). Standard: names images fluently, showing easy access to word verbalization.",
              ],
            },
          ],
        },
      ],
    },
  },
  "5": {
    es: {
      age: "5",
      stage: "Educación Infantil · 5 años",
      summary:
        "Preparación directa para el aprendizaje formal de la lectura. Se consolidan el lenguaje oral, la conciencia fonémica inicial, el vocabulario, la comprensión, la memoria verbal, la morfosintaxis y el principio alfabético.",
      note:
        "Contenido orientativo de plantilla, estructurado según el enfoque público de Leeduca/Preleo. No reproduce materiales, pruebas ni secuencias propietarias.",
      sections: [
        {
          title: "Objetivos prioritarios",
          items: [
            "Consolidar la comprensión y expresión oral en situaciones cada vez más complejas.",
            "Desarrollar conciencia fonémica inicial (identificación y manipulación sencilla de sonidos).",
            "Ampliar vocabulario y comprensión narrativa e inferencial básica.",
            "Reforzar la memoria verbal, la secuenciación y la organización del discurso.",
            "Afianzar el principio alfabético y la relación entre oralidad y escritura.",
          ],
        },
        {
          title: "Áreas y progresión",
          areas: [
            {
              title: "Conciencia fonológica",
              items: [
                "Dominio de la segmentación silábica y trabajo con rimas.",
                "Identificación de fonema inicial y, progresivamente, final en palabras conocidas.",
                "Juegos de comparación y discriminación de sonidos del habla.",
                "Tareas iniciales de unión/segmentación fonémica con apoyo (según nivel).",
              ],
            },
            {
              title: "Vocabulario",
              items: [
                "Vocabulario más amplio y preciso, incluyendo términos abstractos básicos y escolares.",
                "Uso de definiciones sencillas, categorías y relaciones semánticas.",
                "Comprensión y uso de vocabulario en narraciones y explicaciones.",
                "Expresión de ideas con mayor riqueza léxica.",
              ],
            },
            {
              title: "Comprensión oral",
              items: [
                "Comprensión de relatos más largos y con mayor detalle.",
                "Respuesta a preguntas literales e inferenciales sencillas.",
                "Identificación de secuencias, causas/consecuencias básicas y personajes.",
                "Seguimiento de instrucciones complejas y participación en conversaciones guiadas.",
              ],
            },
            {
              title: "Memoria verbal",
              items: [
                "Recuerdo de secuencias más extensas y detalles relevantes.",
                "Retención de consignas múltiples y relatos breves.",
                "Reproducción ordenada de historias y experiencias.",
                "Apoyo a la planificación del discurso oral.",
              ],
            },
            {
              title: "Morfosintaxis",
              items: [
                "Uso de oraciones complejas sencillas, conectores y tiempos verbales variados.",
                "Mayor concordancia, cohesión y claridad en la expresión.",
                "Narración, descripción y explicación con estructura básica.",
                "Reformulación y ampliación de mensajes con apoyo.",
              ],
            },
            {
              title: "Principio alfabético y transición a la lectura",
              items: [
                "Reconocimiento de más letras y asociación con sus sonidos en contextos conocidos.",
                "Conciencia de que las palabras se forman por sonidos y se representan por letras.",
                "Interés y práctica emergente en lectura y escritura del nombre y palabras significativas.",
                "Preparación para la decodificación inicial y el aprendizaje formal de la lectura.",
              ],
            },
          ],
        },
        {
          title: "Cribado universal individual (5 años)",
          intro:
            "Valoración del nivel de preparación lectora y del desarrollo del lenguaje oral para orientar la intervención antes del paso a Primaria.",
          items: [
            "Ámbitos a valorar: conciencia fonémica/silábica, vocabulario, comprensión oral, memoria verbal, morfosintaxis, conocimiento del nombre/letras y principio alfabético.",
            "Aplicación individual en momentos definidos del curso para observar evolución.",
            "Identificación de perfiles que requieren refuerzo, seguimiento o intensificación.",
            "Resultados orientados a decisiones educativas: apoyo en aula, grupos de repaso e intervención focalizada.",
          ],
        },
        {
          title: "Intervención · Programa Universal Preleo",
          areas: [
            {
              title: "Tipos de actividades",
              items: [
                "Juegos fonémicos iniciales (identificar, comparar, segmentar con apoyo).",
                "Lectura dialogada, comprensión de historias y trabajo de vocabulario.",
                "Actividades de narración, descripción y organización del discurso.",
                "Juegos de letras, sonidos y palabras significativas (nombre, aula, entorno).",
                "Prácticas de memoria verbal y seguimiento de instrucciones complejas.",
              ],
            },
            {
              title: "Organización",
              items: [
                "Intervención sistemática integrada en la planificación de Infantil.",
                "Combinación de universal, refuerzo y apoyos personalizados según respuesta.",
                "Objetivos claros, modelado y práctica frecuente.",
                "Coordinación con el tránsito a Educación Primaria y seguimiento del progreso.",
              ],
            },
          ],
        },
        {
          title: "Repaso e intensificación",
          items: [
            "Repaso: consolidación de conciencia fonológica/fonémica, vocabulario y comprensión para alumnado que necesita más práctica.",
            "Intensificación: intervención más intensa y ajustada para reducir el riesgo de dificultades lectoras al inicio de Primaria.",
            "Metas específicas, revisión frecuente y adaptación de actividades.",
            "Trabajo coordinado con familias y profesionales de apoyo cuando procede.",
          ],
        },
        {
          title: "Seguimiento, recursos y registro",
          items: [
            "Seguimiento longitudinal del progreso en precursores de lectura y lenguaje oral.",
            "Registro de observaciones, respuesta a la intervención y necesidades detectadas.",
            "Informes para orientar la continuidad educativa (aula/familia/equipo, según servicio).",
            "Recursos previstos: secuencias guiadas, materiales manipulativos/audiovisuales y fichas de apoyo (contenido real pendiente).",
          ],
        },
      ],
    },
    en: {
      age: "5",
      stage: "Early Childhood Education · Age 5",
      summary:
        "Direct preparation for formal reading learning. Consolidates oral language, early phonemic awareness, vocabulary, comprehension, verbal memory, morphosyntax, and the alphabetic principle.",
      note:
        "Template guidance content, structured according to Leeduca/Preleo's public approach. It does not reproduce proprietary materials, tests, or sequences.",
      sections: [
        {
          title: "Priority objectives",
          items: [
            "Consolidate oral comprehension and expression in increasingly complex situations.",
            "Develop early phonemic awareness (identifying and simple manipulation of sounds).",
            "Expand vocabulary and narrative/basic inferential comprehension.",
            "Strengthen verbal memory, sequencing, and discourse organization.",
            "Consolidate the alphabetic principle and the link between oral and written language.",
          ],
        },
        {
          title: "Areas and progression",
          areas: [
            {
              title: "Phonological awareness",
              items: [
                "Mastery of syllable segmentation and rhyme work.",
                "Identification of initial and, progressively, final phonemes in familiar words.",
                "Games comparing and discriminating speech sounds.",
                "Early phoneme blending/segmentation tasks with support (depending on level).",
              ],
            },
            {
              title: "Vocabulary",
              items: [
                "Broader and more precise vocabulary, including basic abstract and school terms.",
                "Use of simple definitions, categories, and semantic relationships.",
                "Understanding and using vocabulary in narratives and explanations.",
                "Expressing ideas with richer lexical choices.",
              ],
            },
            {
              title: "Oral comprehension",
              items: [
                "Understanding longer and more detailed stories.",
                "Answering literal and simple inferential questions.",
                "Identifying sequences, basic cause/effect, and characters.",
                "Following complex instructions and participating in guided conversations.",
              ],
            },
            {
              title: "Verbal memory",
              items: [
                "Recalling longer sequences and relevant details.",
                "Retaining multiple instructions and short stories.",
                "Ordered reproduction of stories and experiences.",
                "Supporting oral discourse planning.",
              ],
            },
            {
              title: "Morphosyntax",
              items: [
                "Using simple complex sentences, connectors, and varied verb tenses.",
                "Greater agreement, cohesion, and clarity in expression.",
                "Narration, description, and explanation with basic structure.",
                "Reformulating and expanding messages with support.",
              ],
            },
            {
              title: "Alphabetic principle and transition to reading",
              items: [
                "Recognition of more letters and association with sounds in familiar contexts.",
                "Awareness that words are made of sounds and represented by letters.",
                "Emergent interest and practice in reading/writing one's name and meaningful words.",
                "Preparation for initial decoding and formal reading learning.",
              ],
            },
          ],
        },
        {
          title: "Universal individual screening (age 5)",
          intro:
            "Assessment of reading readiness and oral language development to guide intervention before the transition to primary education.",
          items: [
            "Areas assessed: syllabic/phonemic awareness, vocabulary, oral comprehension, verbal memory, morphosyntax, name/letter knowledge, and alphabetic principle.",
            "Individual application at defined points during the year to observe progress.",
            "Identification of profiles needing reinforcement, follow-up, or intensification.",
            "Results aimed at educational decisions: classroom support, review groups, and targeted intervention.",
          ],
        },
        {
          title: "Intervention · Preleo Universal Program",
          areas: [
            {
              title: "Activity types",
              items: [
                "Early phonemic games (identify, compare, segment with support).",
                "Dialogic reading, story comprehension, and vocabulary work.",
                "Narration, description, and discourse organization activities.",
                "Letter-sound and meaningful-word games (name, classroom, environment).",
                "Verbal memory practice and following complex instructions.",
              ],
            },
            {
              title: "Organization",
              items: [
                "Systematic intervention integrated into early childhood planning.",
                "Combination of universal, reinforcement, and personalized supports based on response.",
                "Clear objectives, modeling, and frequent practice.",
                "Coordination with transition to primary education and progress monitoring.",
              ],
            },
          ],
        },
        {
          title: "Review and intensification",
          items: [
            "Review: consolidation of phonological/phonemic awareness, vocabulary, and comprehension for students needing more practice.",
            "Intensification: more intensive and tailored intervention to reduce reading difficulty risk at the start of primary school.",
            "Specific goals, frequent review, and activity adaptation.",
            "Coordinated work with families and support professionals when appropriate.",
          ],
        },
        {
          title: "Monitoring, resources, and records",
          items: [
            "Longitudinal monitoring of progress in reading precursors and oral language.",
            "Recording observations, response to intervention, and identified needs.",
            "Reports to guide educational continuity (classroom/family/team, depending on service).",
            "Planned resources: guided sequences, manipulative/audiovisual materials, and support sheets (real content pending).",
          ],
        },
      ],
    },
  },
};
