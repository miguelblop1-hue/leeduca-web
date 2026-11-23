import type {
  PreleoActivity,
  PreleoBlock,
  PreleoExercise,
  VisualId,
} from "./types";

function e(
  suffix: string,
  title: string,
  options: [VisualId, VisualId, VisualId],
  correct: VisualId,
  teacherNote: string,
): PreleoExercise {
  return {
    id: suffix,
    title,
    options,
    correct,
    teacherNote,
    source: "curated",
  };
}

const conciencia: PreleoActivity[] = [
  {
    id: "primera-silaba",
    blockId: "conciencia",
    title: "¿Cuál es la primera sílaba?",
    subtitle: "Identificación · posición inicial",
    objective: "Identificar las sílabas en posición inicial",
    standard:
      "Cuenta sílabas de una palabra y recuerda una posición solicitada. Enuncia una sílaba concreta de una palabra de forma aislada a las demás.",
    exercises: [
      e("ps-1", "¿Cuál empieza por CA?", ["casa", "gato", "mesa"], "casa", "Di las tres palabras en voz alta y repite la primera sílaba."),
      e("ps-2", "¿Cuál empieza por PA?", ["pato", "pan", "cama"], "pato", "Marca con una palmada la primera sílaba de cada palabra."),
      e("ps-3", "¿Cuál empieza por GA?", ["gato", "casa", "pato"], "gato", "Pide que nombre la imagen antes de elegir."),
      e("ps-4", "¿Cuál empieza por ME?", ["mesa", "pan", "queso"], "mesa", "Repite me-me-mesa para hacer consciente la sílaba inicial."),
      e("ps-5", "¿Cuál empieza por VA?", ["vaca", "cama", "gato"], "vaca", "Compara va-ca con ca-ma."),
      e("ps-6", "¿Cuál empieza por RE?", ["regalo", "perro", "pan"], "regalo", "Separa re-ga-lo con tres palmadas."),
    ],
  },
  {
    id: "ultima-silaba",
    blockId: "conciencia",
    title: "¿Cuál es la última sílaba?",
    subtitle: "Identificación · posición final",
    objective: "Identificar las sílabas en posición final",
    standard:
      "Cuenta sílabas de una palabra y recuerda una posición solicitada. Enuncia una sílaba concreta de una palabra de forma aislada a las demás.",
    exercises: [
      e("us-1", "¿Cuál termina en SA?", ["casa", "gato", "queso"], "casa", "Di ca-sa y destaca la última palmada."),
      e("us-2", "¿Cuál termina en MA?", ["cama", "vaca", "pato"], "cama", "Compara ca-ma con va-ca."),
      e("us-3", "¿Cuál termina en TO?", ["gato", "queso", "copa"], "gato", "Repite ga-to y señala la última sílaba."),
      e("us-4", "¿Cuál termina en PA?", ["copa", "pato", "casa"], "copa", "Di co-pa y haz la última palmada más marcada."),
      e("us-5", "¿Cuál termina en SO?", ["queso", "casa", "pato"], "queso", "Separa que-so y aísla la sílaba final."),
      e("us-6", "¿Cuál termina en BO?", ["globo", "queso", "perro"], "globo", "Di glo-bo y repite solo bo."),
    ],
  },
  {
    id: "silaba-media",
    blockId: "conciencia",
    title: "¿Cuál es la sílaba de en medio?",
    subtitle: "Identificación · posición media",
    objective: "Identificar las sílabas en posición media",
    standard:
      "Cuenta sílabas de una palabra y recuerda una posición solicitada. Relaciona palabras que tienen la misma sílaba en la posición que se le pide.",
    exercises: [
      e("sm-1", "¿Cuál tiene RI en medio?", ["mariposa", "regalo", "helado"], "mariposa", "Di ma-ri-po-sa y susurra solo ri."),
      e("sm-2", "¿Cuál tiene GA en medio?", ["regalo", "mariposa", "pelota"], "regalo", "Di re-ga-lo y destaca ga."),
      e("sm-3", "¿Cuál tiene LA en medio?", ["helado", "regalo", "mariposa"], "helado", "Di he-la-do y repite la sílaba central."),
      e("sm-4", "¿Cuál tiene LO en medio?", ["pelota", "helado", "regalo"], "pelota", "Di pe-lo-ta y haz tres palmadas."),
      e("sm-5", "¿Cuál tiene PO en medio?", ["mariposa", "pelota", "helado"], "mariposa", "Di ma-ri-po-sa y señala po."),
      e("sm-6", "¿Cuál lleva RI dentro?", ["mariposa", "helado", "regalo"], "mariposa", "Compara las sílabas centrales de las tres palabras."),
    ],
  },
  {
    id: "contando-palmadas",
    blockId: "conciencia",
    title: "Contando palmadas",
    subtitle: "Conteo silábico",
    objective: "Contar las sílabas que forman las palabras",
    standard:
      "Cuenta sílabas utilizando las palmas para distinguir los diferentes golpes de voz. Asocia las palmas de una palabra a tantas sílabas como tenga.",
    exercises: [
      e("cp-1", "¿Cuál tiene 2 palmadas?", ["casa", "pan", "mariposa"], "casa", "Dad una palmada por cada sílaba: ca-sa."),
      e("cp-2", "¿Cuál tiene 1 palmada?", ["pan", "casa", "globo"], "pan", "Una sola palmada: pan."),
      e("cp-3", "¿Cuál tiene 3 palmadas?", ["regalo", "casa", "pan"], "regalo", "Contad re-ga-lo con tres palmadas."),
      e("cp-4", "¿Cuál tiene 4 palmadas?", ["mariposa", "regalo", "pelota"], "mariposa", "Contad ma-ri-po-sa con cuatro palmadas."),
      e("cp-5", "¿Cuál tiene 2 palmadas?", ["globo", "mariposa", "pan"], "globo", "glo-bo: dos golpes de voz."),
      e("cp-6", "¿Cuál tiene 2 palmadas?", ["vaca", "helado", "flor"], "vaca", "va-ca: dos palmadas."),
    ],
  },
  {
    id: "unir-silabas",
    blockId: "conciencia",
    title: "Junto sílabas",
    subtitle: "Síntesis silábica",
    objective: "Unir sílabas para formar palabras",
    standard:
      "Escucha con atención las sílabas que se enuncian. Recuerda las sílabas que se enuncian y las une formando palabras con diferente número de sílabas.",
    exercises: [
      e("js-1", "Une CO + PA", ["copa", "casa", "pato"], "copa", "Di las sílabas separadas y luego la palabra completa."),
      e("js-2", "Une CA + SA", ["casa", "cama", "gato"], "casa", "Repite ca… sa… casa."),
      e("js-3", "Une CA + MA", ["cama", "casa", "mesa"], "cama", "Repite ca… ma… cama."),
      e("js-4", "Une GA + TO", ["gato", "pato", "queso"], "gato", "Espera a que el niño una las dos sílabas."),
      e("js-5", "Une PA + TO", ["pato", "gato", "pan"], "pato", "Di pa… to… pato."),
      e("js-6", "Une ME + SA", ["mesa", "casa", "queso"], "mesa", "Di me… sa… mesa."),
    ],
  },
  {
    id: "unir-primera-silaba",
    blockId: "conciencia",
    title: "Unir la primera sílaba",
    subtitle: "Manipulación · adición inicial",
    objective: "Manipular sílabas en posición inicial a través de la adición",
    standard:
      "Identifica la sílaba en diferentes posiciones dentro de una palabra. Añade una sílaba en diferentes posiciones en una palabra.",
    exercises: [
      e("ui-1", "Añade CA delante de SA", ["casa", "cama", "pato"], "casa", "Di ca… sa y luego casa entero."),
      e("ui-2", "Añade CA delante de MA", ["cama", "casa", "queso"], "cama", "La primera sílaba nueva es ca."),
      e("ui-3", "Añade PA delante de TO", ["pato", "gato", "pan"], "pato", "Di pa… to… pato."),
      e("ui-4", "Añade GA delante de TO", ["gato", "pato", "queso"], "gato", "Cambia solo el principio de pato."),
      e("ui-5", "Añade CO delante de PA", ["copa", "casa", "vaca"], "copa", "Escucha co… pa… copa."),
      e("ui-6", "Añade ME delante de SA", ["mesa", "casa", "cama"], "mesa", "Repite me… sa… mesa."),
    ],
  },
  {
    id: "unir-ultima-silaba",
    blockId: "conciencia",
    title: "Unir la última sílaba",
    subtitle: "Manipulación · adición final",
    objective: "Manipular sílabas en posición final a través de la adición",
    standard:
      "Identifica la sílaba en diferentes posiciones dentro de una palabra. Añade una sílaba en diferentes posiciones en una palabra.",
    exercises: [
      e("uf-1", "Añade MA detrás de CA", ["cama", "casa", "pan"], "cama", "La nueva sílaba va al final: ca… ma."),
      e("uf-2", "Añade SA detrás de CA", ["casa", "cama", "gato"], "casa", "Di ca… sa… casa."),
      e("uf-3", "Añade TO detrás de GA", ["gato", "pato", "queso"], "gato", "Escucha ga… to… gato."),
      e("uf-4", "Añade PA detrás de CO", ["copa", "casa", "pato"], "copa", "La última sílaba añadida es pa."),
      e("uf-5", "Añade TO detrás de PA", ["pato", "gato", "queso"], "pato", "Di pa… to… pato."),
      e("uf-6", "Añade BO detrás de GLO", ["globo", "queso", "casa"], "globo", "Repite glo… bo… globo."),
    ],
  },
  {
    id: "quitar-silaba-inicial",
    blockId: "conciencia",
    title: "Quitar la primera sílaba",
    subtitle: "Manipulación · omisión inicial",
    objective: "Manipular sílabas en posición inicial a través de la omisión",
    standard:
      "Identifica la sílaba pedida de una palabra. Omite la sílaba en la posición solicitada de una palabra.",
    exercises: [
      e("qi-1", "Quitar CA de CAMA", ["mariposa", "casa", "gato"], "mariposa", "Di ca-ma muy bajito en ca y muy fuerte en ma."),
      e("qi-2", "Quitar CO de COPA", ["pato", "casa", "gato"], "pato", "Al quitar co queda pa; busca la imagen que empieza por pa."),
      e("qi-3", "Quitar VA de VACA", ["casa", "cama", "queso"], "casa", "Al quitar va queda ca."),
      e("qi-4", "Quitar CA de CAMA", ["mariposa", "gato", "queso"], "mariposa", "Repite la operación con otros distractores."),
      e("qi-5", "Quitar CO de COPA", ["pato", "gato", "queso"], "pato", "Enfatiza la sílaba que desaparece."),
      e("qi-6", "Quitar VA de VACA", ["casa", "cama", "pato"], "casa", "Compara el resultado con las opciones."),
    ],
  },
  {
    id: "quitar-silaba-final",
    blockId: "conciencia",
    title: "Quitar la última sílaba",
    subtitle: "Manipulación · omisión final",
    objective: "Manipular sílabas en posición final",
    standard:
      "Identifica la sílaba pedida de una palabra. Omite la sílaba en la posición solicitada de una palabra.",
    exercises: [
      e("qf-1", "Quitar TO de PATO", ["pan", "gato", "mesa"], "pan", "Al quitar to queda pa; elige la imagen que empieza por pa."),
      e("qf-2", "Quitar SA de CASA", ["cama", "gato", "pan"], "cama", "Al quitar sa queda ca."),
      e("qf-3", "Quitar TO de PATO", ["pan", "queso", "flor"], "pan", "Repite pa-to y luego solo pa."),
      e("qf-4", "Quitar SA de CASA", ["cama", "perro", "queso"], "cama", "Susurra sa y luego elimínala."),
      e("qf-5", "Quitar GA de GATO", ["pato", "casa", "queso"], "pato", "Al quitar ga queda to; elige la imagen que empieza por to."),
      e("qf-6", "Quitar MA de CAMA", ["casa", "pato", "queso"], "casa", "Al quitar ma queda ca; elige la imagen que empieza por ca."),
    ],
  },
  {
    id: "palmada-mas-fuerte",
    blockId: "conciencia",
    title: "La palmada más fuerte",
    subtitle: "La sílaba tónica",
    objective: "Descubrir diferencias de intensidad entre las sílabas",
    standard:
      "Reconoce que las sílabas tienen diferente intensidad. Enuncia la sílaba de mayor intensidad.",
    exercises: [
      e("pf-1", "La palmada más fuerte: CO", ["copa", "lapiz", "queso"], "copa", "Di CO-pa y bate la primera palmada con más fuerza."),
      e("pf-2", "La palmada más fuerte: GA", ["regalo", "queso", "mariposa"], "regalo", "Di re-GA-lo."),
      e("pf-3", "La palmada más fuerte: PO", ["mariposa", "regalo", "helado"], "mariposa", "Di ma-ri-PO-sa."),
      e("pf-4", "La palmada más fuerte: LA", ["helado", "regalo", "mariposa"], "helado", "Di he-LA-do."),
      e("pf-5", "La palmada más fuerte: LO", ["pelota", "helado", "regalo"], "pelota", "Di pe-LO-ta y bate la palmada central con más fuerza."),
      e("pf-6", "La palmada más fuerte: PE", ["perro", "copa", "globo"], "perro", "Di PE-rro."),
    ],
  },
  {
    id: "cambio-silaba",
    blockId: "conciencia",
    title: "Construyo palabras: cambio de sílaba",
    subtitle: "Manipulación · cambios",
    objective: "Cambiar la sílaba inicial o final de las palabras para descubrir otras nuevas",
    standard:
      "Identifica las sílabas en diferentes posiciones. Cambia la sílaba inicial o final. Identifica la sílaba inicial o final.",
    exercises: [
      e("cs-1", "Cambia SA de CASA por MA", ["cama", "casa", "pato"], "cama", "La primera sílaba se queda: ca."),
      e("cs-2", "Cambia MA de CAMA por SA", ["casa", "cama", "queso"], "casa", "Cambia solo el final."),
      e("cs-3", "Cambia GA de GATO por PA", ["pato", "gato", "queso"], "pato", "La última sílaba sigue siendo to."),
      e("cs-4", "Cambia PA de PATO por GA", ["gato", "pato", "casa"], "gato", "Cambia la sílaba del principio."),
      e("cs-5", "Cambia ME de MESA por CA", ["casa", "cama", "mesa"], "casa", "La terminación sa no cambia."),
      e("cs-6", "Cambia MA de CAMA por SA", ["casa", "vaca", "pato"], "casa", "Repite el cambio del final."),
    ],
  },
  {
    id: "cadena-de-palabras",
    blockId: "conciencia",
    title: "Cadena de palabras",
    subtitle: "Identificación y síntesis silábica",
    objective: "Identificar sílabas en diferentes posiciones y unir sílabas dadas",
    standard:
      "Identifica la sílaba inicial de una palabra. Identifica la sílaba final de una palabra. Recuerda las sílabas y las une formando una nueva.",
    exercises: [
      e("cd-1", "Empieza por CA y acaba en SA", ["casa", "cama", "gato"], "casa", "Primero ca, después sa."),
      e("cd-2", "Empieza por PA y acaba en TO", ["pato", "pan", "queso"], "pato", "Escucha las dos pistas."),
      e("cd-3", "Empieza por GA y acaba en TO", ["gato", "casa", "pato"], "gato", "La primera pista es ga."),
      e("cd-4", "Empieza por CA y acaba en MA", ["cama", "casa", "mesa"], "cama", "Une ca y ma."),
      e("cd-5", "Empieza por CO y acaba en PA", ["copa", "casa", "vaca"], "copa", "Dos pistas: co y pa."),
      e("cd-6", "Une CA + SA", ["casa", "cama", "pan"], "casa", "Repite ca… sa… casa."),
    ],
  },
];

const vocabulario: PreleoActivity[] = [
  {
    id: "palabra-equivocada",
    blockId: "vocabulario",
    title: "Palabra equivocada",
    subtitle: "Palabras relacionadas",
    objective: "Establecer diferentes relaciones entre las palabras",
    standard:
      "Identifica la palabra que no mantiene relación con las demás de entre tres dadas.",
    exercises: [
      e("pe-1", "La palabra equivocada", ["gato", "perro", "mesa"], "mesa", "Nombra las tres imágenes y pregunta cuál no es animal."),
      e("pe-2", "La palabra equivocada", ["pato", "vaca", "queso"], "queso", "Dos son animales y uno no."),
      e("pe-3", "La palabra equivocada", ["copa", "lapiz", "flor"], "flor", "Dos los hace el ser humano y uno no."),
      e("pe-4", "La palabra equivocada", ["pan", "queso", "gato"], "gato", "Dos se comen y uno no."),
      e("pe-5", "La palabra equivocada", ["mariposa", "flor", "mesa"], "mesa", "Dos están en la naturaleza y uno no."),
      e("pe-6", "La palabra equivocada", ["luna", "sol", "pato"], "pato", "Dos están en el cielo y uno no."),
    ],
  },
  {
    id: "para-que-sirven",
    blockId: "vocabulario",
    title: "¿Para qué sirve?",
    subtitle: "Definición por el uso",
    objective: "Establecer relaciones entre las palabras según la función de uso",
    standard: "Identifica palabras siguiendo el criterio función de uso.",
    exercises: [
      e("pu-1", "Para beber", ["copa", "pan", "mesa"], "copa", "Pregunta: ¿con qué bebemos agua?"),
      e("pu-2", "Para escribir", ["lapiz", "queso", "globo"], "lapiz", "Pregunta: ¿qué usamos para dibujar?"),
      e("pu-3", "Para dormir", ["cama", "gato", "flor"], "cama", "Pregunta: ¿dónde dormimos?"),
      e("pu-4", "Para comer", ["pan", "copa", "lapiz"], "pan", "Pregunta: ¿cuál de estos se come?"),
      e("pu-5", "Para jugar", ["pelota", "queso", "cama"], "pelota", "Pregunta: ¿con qué jugamos?"),
      e("pu-6", "Para regalar", ["regalo", "pan", "perro"], "regalo", "Pregunta: ¿qué damos en un cumpleaños?"),
    ],
  },
  {
    id: "palabras-amigas",
    blockId: "vocabulario",
    title: "Palabras amigas",
    subtitle: "Relaciones temáticas",
    objective: "Establecer relaciones entre las palabras siguiendo el criterio relación temática",
    standard:
      "Establece relaciones entre las palabras siguiendo el criterio relación temática.",
    exercises: [
      e("pa-1", "Va con la mariposa", ["flor", "queso", "mesa"], "flor", "La mariposa vuela cerca de las flores."),
      e("pa-2", "Va con la cama", ["casa", "pan", "perro"], "casa", "La cama está en la casa."),
      e("pa-3", "Va con el queso", ["pan", "flor", "globo"], "pan", "El pan y el queso se comen juntos."),
      e("pa-4", "Va con el sol", ["luna", "queso", "perro"], "luna", "El sol y la luna están en el cielo."),
      e("pa-5", "Va con el perro", ["gato", "mesa", "pan"], "gato", "El perro y el gato son animales domesticados."),
      e("pa-6", "Va con el regalo", ["globo", "cama", "queso"], "globo", "El globo y el regalo aparecen en las fiestas."),
    ],
  },
];

const comprension: PreleoActivity[] = [
  {
    id: "juego-del-detective",
    blockId: "comprension",
    title: "El juego del detective",
    subtitle: "Inferencias lógicas",
    objective: "Comprender una imagen y/o mensaje mediante la construcción de inferencias lógicas",
    standard:
      "Observa el conjunto de la imagen atentamente. Identifica las pistas dadas en la imagen. Responde correctamente a la pregunta mediante una inferencia lógica.",
    exercises: [
      e("jd-1", "En el plato hay…", ["pan", "gato", "mesa"], "pan", "Lee la frase en voz alta y deja que elija."),
      e("jd-2", "El perro duerme en…", ["cama", "pan", "flor"], "cama", "Pide que justifique su respuesta."),
      e("jd-3", "La mariposa vuela cerca de…", ["flor", "queso", "mesa"], "flor", "Relaciona la acción de volar con la flor."),
      e("jd-4", "Brilla en el cielo…", ["sol", "pan", "gato"], "sol", "Pregunta qué objeto brilla durante el día."),
      e("jd-5", "Se ve de noche…", ["luna", "queso", "perro"], "luna", "Pregunta qué se ve cuando oscurece."),
      e("jd-6", "Para jugar al aire libre…", ["globo", "cama", "queso"], "globo", "Relaciona la pista con el objeto adecuado."),
    ],
  },
  {
    id: "leon-fisgon",
    blockId: "comprension",
    title: "El león fisgón",
    subtitle: "Pistas en la frase",
    objective: "Detectar pistas y responder mediante inferencias lógicas",
    standard:
      "Escucha con atención la frase enunciada. Identifica las pistas dadas en la imagen. Responde correctamente a la pregunta mediante una inferencia lógica.",
    exercises: [
      e("lf-1", "El león mira el queso", ["queso", "gato", "mesa"], "queso", "Repite la frase antes de elegir."),
      e("lf-2", "El león mira la pelota", ["pelota", "pan", "flor"], "pelota", "Destaca la palabra pelota."),
      e("lf-3", "El león mira la luna", ["luna", "queso", "perro"], "luna", "Pide que señale la pista de la frase."),
      e("lf-4", "El león mira el regalo", ["regalo", "cama", "gato"], "regalo", "Repite: mira el regalo."),
      e("lf-5", "El león mira la flor", ["flor", "pan", "globo"], "flor", "Pregunta qué está mirando."),
      e("lf-6", "El león mira la copa", ["copa", "vaca", "lapiz"], "copa", "Escucha de nuevo la frase si hace falta."),
    ],
  },
];

const fluidez: PreleoActivity[] = [
  {
    id: "fluidez-4-anos",
    blockId: "fluidez",
    title: "Fluidez 4 años",
    subtitle: "Denominación fluida",
    objective:
      "Conseguir una denominación fluida de imágenes sin paradas excesivas ni titubeos en el nombrado",
    standard:
      "Denomina imágenes siguiendo un ritmo fluido, mostrando un acceso fácil a la verbalización de la palabra.",
    exercises: [
      e("fl-1", "Di: MARIPOSA", ["mariposa", "mesa", "perro"], "mariposa", "Pide que diga la palabra sin titubear."),
      e("fl-2", "Di: REGALO", ["regalo", "perro", "pan"], "regalo", "Repite la palabra a un ritmo natural."),
      e("fl-3", "Di: HELADO", ["helado", "queso", "cama"], "helado", "Pide una denominación clara y fluida."),
      e("fl-4", "Di: PELOTA", ["pelota", "pan", "flor"], "pelota", "Observa articulación, ritmo y volumen."),
      e("fl-5", "Di: MARIPOSA", ["mariposa", "gato", "globo"], "mariposa", "Segunda tirada de la misma palabra."),
      e("fl-6", "Di: REGALO", ["regalo", "vaca", "casa"], "regalo", "Segunda tirada de la misma palabra."),
    ],
  },
];

export const preleoActivities: PreleoActivity[] = [
  ...conciencia,
  ...vocabulario,
  ...comprension,
  ...fluidez,
];

export const preleoBlocks: PreleoBlock[] = [
  {
    id: "conciencia",
    title: "Conciencia fonológica",
    subtitle: "Sílabas: identificación, conteo, manipulación y tónica",
    activities: conciencia,
  },
  {
    id: "vocabulario",
    title: "Vocabulario",
    subtitle: "Categorías, funciones y relaciones semánticas",
    activities: vocabulario,
  },
  {
    id: "comprension",
    title: "Comprensión",
    subtitle: "Inferencias lógicas a partir de pistas",
    activities: comprension,
  },
  {
    id: "fluidez",
    title: "Fluidez",
    subtitle: "Denominación fluida de imágenes",
    activities: fluidez,
  },
];

export function getPreleoActivity(id: string): PreleoActivity | undefined {
  return preleoActivities.find((activity) => activity.id === id);
}
