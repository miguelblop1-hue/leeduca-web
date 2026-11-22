import type { Exercise } from "./types";

export const exercisesByAge: Record<string, Exercise[]> = {
  "3": [
    {
      id: "3-pho-1",
      area: "phonological",
      type: "choice",
      es: {
        prompt: "¿Qué palabra rima con «gato»?",
        teacherNote: "Di las palabras en voz alta y enfatiza el sonido final.",
        stimulus: { label: "gato", visual: "🐱" },
        options: [
          { value: "pato", label: "pato", visual: "🦆" },
          { value: "mesa", label: "mesa", visual: "🪑" },
          { value: "sol", label: "sol", visual: "☀️" },
        ],
        correct: "pato",
        feedback: "«Gato» y «pato» terminan con el mismo sonido.",
      },
      en: {
        prompt: 'Which word rhymes with "cat"?',
        teacherNote: "Say the words aloud and emphasize the ending sound.",
        stimulus: { label: "cat", visual: "🐱" },
        options: [
          { value: "hat", label: "hat", visual: "🎩" },
          { value: "table", label: "table", visual: "🪑" },
          { value: "sun", label: "sun", visual: "☀️" },
        ],
        correct: "hat",
        feedback: '"Cat" and "hat" end with the same sound.',
      },
    },
    {
      id: "3-pho-2",
      area: "phonological",
      type: "choice",
      es: {
        prompt: "¿Cuántas palmadas (sílabas) tiene la palabra «mesa»?",
        teacherNote: "Acompaña con palmadas: me-sa.",
        stimulus: { label: "mesa", visual: "🪑" },
        options: ["1", "2", "3"],
        correct: "2",
        feedback: "Me-sa tiene 2 sílabas.",
      },
      en: {
        prompt: 'How many claps (syllables) are in "ta-ble"?',
        teacherNote: "Clap along: ta-ble.",
        stimulus: { label: "table", visual: "🪑" },
        options: ["1", "2", "3"],
        correct: "2",
        feedback: "Ta-ble has 2 syllables.",
      },
    },
    {
      id: "3-pho-3",
      area: "phonological",
      type: "choice",
      es: {
        prompt: "¿Qué palabra rima con «luna»?",
        teacherNote: "Puedes cantar o repetir las palabras para notar la rima.",
        stimulus: { label: "luna", visual: "🌙" },
        options: [
          { value: "cuna", label: "cuna", visual: "🛏️" },
          { value: "pan", label: "pan", visual: "🍞" },
          { value: "flor", label: "flor", visual: "🌸" },
        ],
        correct: "cuna",
        feedback: "«Luna» y «cuna» suenan parecido al final.",
      },
      en: {
        prompt: 'Which word rhymes with "moon"?',
        teacherNote: "Repeat the words to notice the rhyme.",
        stimulus: { label: "moon", visual: "🌙" },
        options: [
          { value: "spoon", label: "spoon", visual: "🥄" },
          { value: "bread", label: "bread", visual: "🍞" },
          { value: "flower", label: "flower", visual: "🌸" },
        ],
        correct: "spoon",
        feedback: '"Moon" and "spoon" sound alike at the end.',
      },
    },
    {
      id: "3-voc-1",
      area: "vocabulary",
      type: "choice",
      es: {
        prompt: "¿Cuál es un animal?",
        teacherNote: "Pide que nombre el dibujo elegido.",
        options: [
          { value: "🐶 perro", label: "perro", visual: "🐶" },
          { value: "🚗 coche", label: "coche", visual: "🚗" },
          { value: "🍎 manzana", label: "manzana", visual: "🍎" },
        ],
        correct: "🐶 perro",
      },
      en: {
        prompt: "Which one is an animal?",
        teacherNote: "Ask the child to name the chosen picture.",
        options: [
          { value: "🐶 dog", label: "dog", visual: "🐶" },
          { value: "🚗 car", label: "car", visual: "🚗" },
          { value: "🍎 apple", label: "apple", visual: "🍎" },
        ],
        correct: "🐶 dog",
      },
    },
    {
      id: "3-voc-2",
      area: "vocabulary",
      type: "choice",
      es: {
        prompt: "¿Qué usamos para beber agua?",
        teacherNote: "Amplía con preguntas: ¿cuándo lo usamos?",
        options: [
          { value: "🥛 vaso", label: "vaso", visual: "🥛" },
          { value: "👟 zapato", label: "zapato", visual: "👟" },
          { value: "📘 libro", label: "libro", visual: "📘" },
        ],
        correct: "🥛 vaso",
      },
      en: {
        prompt: "What do we use to drink water?",
        teacherNote: "Extend with questions: when do we use it?",
        options: [
          { value: "🥛 cup", label: "cup", visual: "🥛" },
          { value: "👟 shoe", label: "shoe", visual: "👟" },
          { value: "📘 book", label: "book", visual: "📘" },
        ],
        correct: "🥛 cup",
      },
    },
    {
      id: "3-com-1",
      area: "comprehension",
      type: "choice",
      es: {
        prompt:
          "Escucha: «Ana tiene una manzana roja». ¿De qué color es la manzana?",
        teacherNote: "Lee la frase en voz alta y deja que responda.",
        options: [
          { value: "Roja", label: "Roja", visual: "🟥" },
          { value: "Azul", label: "Azul", visual: "🟦" },
          { value: "Verde", label: "Verde", visual: "🟩" },
        ],
        correct: "Roja",
      },
      en: {
        prompt:
          'Listen: "Ana has a red apple." What color is the apple?',
        teacherNote: "Read the sentence aloud and let the child answer.",
        options: [
          { value: "Red", label: "Red", visual: "🟥" },
          { value: "Blue", label: "Blue", visual: "🟦" },
          { value: "Green", label: "Green", visual: "🟩" },
        ],
        correct: "Red",
      },
    },
    {
      id: "3-com-2",
      area: "comprehension",
      type: "choice",
      es: {
        prompt:
          "Escucha: «El perro duerme en su cama». ¿Dónde duerme el perro?",
        teacherNote: "Si hace falta, repite la frase una vez.",
        options: [
          { value: "En su cama", label: "En su cama", visual: "🛏️" },
          { value: "En el parque", label: "En el parque", visual: "🌳" },
          { value: "En el coche", label: "En el coche", visual: "🚗" },
        ],
        correct: "En su cama",
      },
      en: {
        prompt:
          'Listen: "The dog sleeps in its bed." Where does the dog sleep?',
        teacherNote: "Repeat the sentence once if needed.",
        options: [
          { value: "In its bed", label: "In its bed", visual: "🛏️" },
          { value: "In the park", label: "In the park", visual: "🌳" },
          { value: "In the car", label: "In the car", visual: "🚗" },
        ],
        correct: "In its bed",
      },
    },
    {
      id: "3-mem-1",
      area: "memory",
      type: "memory",
      es: {
        prompt: "Mira la secuencia, recuérdala y elige el orden correcto.",
        teacherNote: "Muestra la secuencia unos segundos y luego escóndela.",
        sequence: ["🐱", "🐶"],
        options: ["🐱 🐶", "🐶 🐱", "🐱 🐱"],
        correct: "🐱 🐶",
      },
      en: {
        prompt: "Look at the sequence, remember it, and choose the correct order.",
        teacherNote: "Show the sequence for a few seconds, then hide it.",
        sequence: ["🐱", "🐶"],
        options: ["🐱 🐶", "🐶 🐱", "🐱 🐱"],
        correct: "🐱 🐶",
      },
    },
    {
      id: "3-mem-2",
      area: "memory",
      type: "memory",
      es: {
        prompt: "Recuerda esta secuencia y elige el orden correcto.",
        teacherNote: "Pide que la repita en voz alta antes de responder.",
        sequence: ["🍎", "🍌", "🍇"],
        options: ["🍎 🍌 🍇", "🍌 🍎 🍇", "🍇 🍌 🍎"],
        correct: "🍎 🍌 🍇",
      },
      en: {
        prompt: "Remember this sequence and choose the correct order.",
        teacherNote: "Ask the child to repeat it aloud before answering.",
        sequence: ["🍎", "🍌", "🍇"],
        options: ["🍎 🍌 🍇", "🍌 🍎 🍇", "🍇 🍌 🍎"],
        correct: "🍎 🍌 🍇",
      },
    },
    {
      id: "3-mor-1",
      area: "morphosyntax",
      type: "choice",
      es: {
        prompt: "Completa la frase: «El perro ___ grande».",
        teacherNote: "Lee la frase completa con cada opción si es necesario.",
        options: ["es", "son", "ser"],
        correct: "es",
      },
      en: {
        prompt: 'Complete the sentence: "The dog ___ big."',
        teacherNote: "Read the full sentence with each option if needed.",
        options: ["is", "are", "be"],
        correct: "is",
      },
    },
    {
      id: "3-mor-2",
      area: "morphosyntax",
      type: "choice",
      es: {
        prompt: "Completa: «Mamá tiene ___ pelota».",
        teacherNote: "Señala que hablamos de una sola pelota.",
        options: ["una", "unos", "mucho"],
        correct: "una",
      },
      en: {
        prompt: 'Complete: "Mom has ___ ball."',
        teacherNote: "Point out that we are talking about one ball.",
        options: ["a", "many", "two"],
        correct: "a",
      },
    },
    {
      id: "3-alp-1",
      area: "alphabetic",
      type: "choice",
      es: {
        prompt: "¿Cuál de estos es un nombre escrito (palabra)?",
        teacherNote: "Comenta que las letras juntas forman palabras que se leen.",
        options: [
          { value: "CASA", label: "CASA", visual: "🔤" },
          { value: "🏠", label: "casa (dibujo)", visual: "🏠" },
          { value: "🔵", label: "forma", visual: "🔵" },
        ],
        correct: "CASA",
        feedback: "CASA está formada por letras y se puede leer.",
      },
      en: {
        prompt: "Which one is a written word?",
        teacherNote: "Explain that letters together form words we can read.",
        options: [
          { value: "HOME", label: "HOME", visual: "🔤" },
          { value: "🏠", label: "house (picture)", visual: "🏠" },
          { value: "🔵", label: "shape", visual: "🔵" },
        ],
        correct: "HOME",
        feedback: "HOME is made of letters and can be read.",
      },
    },
  ],
  "4": [
    {
      id: "4-pho-1",
      area: "phonological",
      type: "choice",
      es: {
        prompt: "¿Cuántas sílabas tiene la palabra «mariposa»?",
        teacherNote: "Palmadas: ma-ri-po-sa.",
        stimulus: { label: "mariposa", visual: "🦋" },
        options: ["2", "3", "4"],
        correct: "4",
      },
      en: {
        prompt: 'How many syllables are in "but-ter-fly"?',
        teacherNote: "Clap: but-ter-fly.",
        stimulus: { label: "butterfly", visual: "🦋" },
        options: ["2", "3", "4"],
        correct: "3",
      },
    },
    {
      id: "4-pho-2",
      area: "phonological",
      type: "choice",
      es: {
        prompt: "¿Qué palabra empieza por el mismo sonido que «sol»?",
        teacherNote: "Alarga el sonido inicial: sss-ol, sss-apo.",
        stimulus: { label: "sol", visual: "☀️" },
        options: [
          { value: "sapo", label: "sapo", visual: "🐸" },
          { value: "luna", label: "luna", visual: "🌙" },
          { value: "mesa", label: "mesa", visual: "🪑" },
        ],
        correct: "sapo",
      },
      en: {
        prompt: 'Which word starts with the same sound as "sun"?',
        teacherNote: "Stretch the initial sound: sss-un, sss-ock.",
        stimulus: { label: "sun", visual: "☀️" },
        options: [
          { value: "sock", label: "sock", visual: "🧦" },
          { value: "moon", label: "moon", visual: "🌙" },
          { value: "table", label: "table", visual: "🪑" },
        ],
        correct: "sock",
      },
    },
    {
      id: "4-pho-3",
      area: "phonological",
      type: "choice",
      es: {
        prompt: "¿Qué palabra rima con «camión»?",
        teacherNote: "Busca el final que suena igual.",
        stimulus: { label: "camión", visual: "🚚" },
        options: [
          { value: "avión", label: "avión", visual: "✈️" },
          { value: "casa", label: "casa", visual: "🏠" },
          { value: "perro", label: "perro", visual: "🐶" },
        ],
        correct: "avión",
      },
      en: {
        prompt: 'Which word rhymes with "light"?',
        teacherNote: "Listen for the same ending sound.",
        stimulus: { label: "light", visual: "💡" },
        options: [
          { value: "kite", label: "kite", visual: "🪁" },
          { value: "house", label: "house", visual: "🏠" },
          { value: "dog", label: "dog", visual: "🐶" },
        ],
        correct: "kite",
      },
    },
    {
      id: "4-voc-1",
      area: "vocabulary",
      type: "choice",
      es: {
        prompt: "¿Cuál de estos es una fruta?",
        teacherNote: "Puedes preguntar por más frutas que conozca.",
        options: [
          { value: "🍐 pera", label: "pera", visual: "🍐" },
          { value: "🥕 zanahoria", label: "zanahoria", visual: "🥕" },
          { value: "🧀 queso", label: "queso", visual: "🧀" },
        ],
        correct: "🍐 pera",
      },
      en: {
        prompt: "Which one is a fruit?",
        teacherNote: "Ask for other fruits the child knows.",
        options: [
          { value: "🍐 pear", label: "pear", visual: "🍐" },
          { value: "🥕 carrot", label: "carrot", visual: "🥕" },
          { value: "🧀 cheese", label: "cheese", visual: "🧀" },
        ],
        correct: "🍐 pear",
      },
    },
    {
      id: "4-voc-2",
      area: "vocabulary",
      type: "choice",
      es: {
        prompt: "¿Qué palabra es lo contrario de «grande»?",
        teacherNote: "Da ejemplos con objetos del aula si ayuda.",
        options: [
          { value: "pequeño", label: "pequeño", visual: "🐜" },
          { value: "alto", label: "alto", visual: "🦒" },
          { value: "rápido", label: "rápido", visual: "🐇" },
        ],
        correct: "pequeño",
      },
      en: {
        prompt: 'Which word is the opposite of "big"?',
        teacherNote: "Use classroom objects as examples if helpful.",
        options: [
          { value: "small", label: "small", visual: "🐜" },
          { value: "tall", label: "tall", visual: "🦒" },
          { value: "fast", label: "fast", visual: "🐇" },
        ],
        correct: "small",
      },
    },
    {
      id: "4-com-1",
      area: "comprehension",
      type: "choice",
      es: {
        prompt:
          "Escucha: «Luis se puso las botas porque llovía. Luego salió a saltar en los charcos». ¿Por qué se puso las botas Luis?",
        teacherNote: "Lee despacio y repite si es necesario.",
        options: [
          { value: "Porque llovía", label: "Porque llovía", visual: "🌧️" },
          { value: "Porque hacía sol", label: "Porque hacía sol", visual: "☀️" },
          { value: "Porque tenía sueño", label: "Porque tenía sueño", visual: "😴" },
        ],
        correct: "Porque llovía",
      },
      en: {
        prompt:
          'Listen: "Luis put on boots because it was raining. Then he went to jump in puddles." Why did Luis put on boots?',
        teacherNote: "Read slowly and repeat if needed.",
        options: [
          { value: "Because it was raining", label: "Because it was raining", visual: "🌧️" },
          { value: "Because it was sunny", label: "Because it was sunny", visual: "☀️" },
          { value: "Because he was sleepy", label: "Because he was sleepy", visual: "😴" },
        ],
        correct: "Because it was raining",
      },
    },
    {
      id: "4-com-2",
      area: "comprehension",
      type: "choice",
      es: {
        prompt:
          "Escucha: «Marta guardó el libro en la mochila y se fue al colegio». ¿Qué guardó Marta en la mochila?",
        teacherNote: "Pide que repita la información importante.",
        options: [
          { value: "El libro", label: "El libro", visual: "📘" },
          { value: "La merienda", label: "La merienda", visual: "🍎" },
          { value: "El juguete", label: "El juguete", visual: "🧸" },
        ],
        correct: "El libro",
      },
      en: {
        prompt:
          'Listen: "Marta put the book in her backpack and went to school." What did Marta put in her backpack?',
        teacherNote: "Ask the child to repeat the key information.",
        options: [
          { value: "The book", label: "The book", visual: "📘" },
          { value: "The snack", label: "The snack", visual: "🍎" },
          { value: "The toy", label: "The toy", visual: "🧸" },
        ],
        correct: "The book",
      },
    },
    {
      id: "4-mem-1",
      area: "memory",
      type: "memory",
      es: {
        prompt: "Recuerda la secuencia y elige el orden correcto.",
        teacherNote: "Aumenta el tiempo de muestra si lo necesita.",
        sequence: ["🐶", "🐱", "🐰"],
        options: ["🐶 🐱 🐰", "🐱 🐶 🐰", "🐶 🐰 🐱"],
        correct: "🐶 🐱 🐰",
      },
      en: {
        prompt: "Remember the sequence and choose the correct order.",
        teacherNote: "Give more viewing time if needed.",
        sequence: ["🐶", "🐱", "🐰"],
        options: ["🐶 🐱 🐰", "🐱 🐶 🐰", "🐶 🐰 🐱"],
        correct: "🐶 🐱 🐰",
      },
    },
    {
      id: "4-mem-2",
      area: "memory",
      type: "memory",
      es: {
        prompt: "Mira y recuerda esta secuencia de palabras/objetos.",
        teacherNote: "Pídele que la repita en voz alta antes de elegir.",
        sequence: ["☀️", "🌧️", "🌈", "⭐"],
        options: ["☀️ 🌧️ 🌈 ⭐", "☀️ 🌈 🌧️ ⭐", "🌧️ ☀️ 🌈 ⭐"],
        correct: "☀️ 🌧️ 🌈 ⭐",
      },
      en: {
        prompt: "Look at and remember this sequence.",
        teacherNote: "Ask the child to repeat it aloud before choosing.",
        sequence: ["☀️", "🌧️", "🌈", "⭐"],
        options: ["☀️ 🌧️ 🌈 ⭐", "☀️ 🌈 🌧️ ⭐", "🌧️ ☀️ 🌈 ⭐"],
        correct: "☀️ 🌧️ 🌈 ⭐",
      },
    },
    {
      id: "4-mor-1",
      area: "morphosyntax",
      type: "choice",
      es: {
        prompt: "Completa: «Los niños ___ en el parque».",
        teacherNote: "Fíjate en el plural: los niños.",
        options: ["juegan", "juega", "jugando"],
        correct: "juegan",
      },
      en: {
        prompt: 'Complete: "The children ___ in the park."',
        teacherNote: "Notice the plural: the children.",
        options: ["play", "plays", "playing"],
        correct: "play",
      },
    },
    {
      id: "4-mor-2",
      area: "morphosyntax",
      type: "choice",
      es: {
        prompt: "Elige la frase correcta.",
        teacherNote: "Lee las tres opciones en voz alta.",
        options: [
          "La niña come una manzana.",
          "La niña comer una manzana.",
          "Niña la come manzana.",
        ],
        correct: "La niña come una manzana.",
      },
      en: {
        prompt: "Choose the correct sentence.",
        teacherNote: "Read all three options aloud.",
        options: [
          "The girl eats an apple.",
          "The girl eating an apple.",
          "Girl the eats apple.",
        ],
        correct: "The girl eats an apple.",
      },
    },
    {
      id: "4-alp-1",
      area: "alphabetic",
      type: "choice",
      es: {
        prompt: "¿Qué palabra empieza por la letra «M»?",
        teacherNote: "Di el sonido /m/ y relaciona con la letra.",
        options: [
          { value: "mesa", label: "mesa", visual: "🪑" },
          { value: "sol", label: "sol", visual: "☀️" },
          { value: "luna", label: "luna", visual: "🌙" },
        ],
        correct: "mesa",
      },
      en: {
        prompt: 'Which word starts with the letter "M"?',
        teacherNote: "Say the /m/ sound and connect it to the letter.",
        options: [
          { value: "moon", label: "moon", visual: "🌙" },
          { value: "sun", label: "sun", visual: "☀️" },
          { value: "tree", label: "tree", visual: "🌳" },
        ],
        correct: "moon",
      },
    },
  ],
  "5": [
    {
      id: "5-pho-1",
      area: "phonological",
      type: "choice",
      es: {
        prompt: "¿Qué palabra empieza por el mismo sonido que «foca»?",
        teacherNote: "Trabaja el fonema inicial /f/.",
        stimulus: { label: "foca", visual: "🦭" },
        options: [
          { value: "faro", label: "faro", visual: "🗼" },
          { value: "mesa", label: "mesa", visual: "🪑" },
          { value: "lobo", label: "lobo", visual: "🐺" },
        ],
        correct: "faro",
      },
      en: {
        prompt: 'Which word starts with the same sound as "fish"?',
        teacherNote: "Focus on the initial /f/ sound.",
        stimulus: { label: "fish", visual: "🐟" },
        options: [
          { value: "fan", label: "fan", visual: "🪭" },
          { value: "moon", label: "moon", visual: "🌙" },
          { value: "lion", label: "lion", visual: "🦁" },
        ],
        correct: "fan",
      },
    },
    {
      id: "5-pho-2",
      area: "phonological",
      type: "choice",
      es: {
        prompt: "¿Qué palabra termina por el mismo sonido que «pan»?",
        teacherNote: "Fíjate en el sonido final /n/.",
        stimulus: { label: "pan", visual: "🍞" },
        options: [
          { value: "tren", label: "tren", visual: "🚆" },
          { value: "pato", label: "pato", visual: "🦆" },
          { value: "mesa", label: "mesa", visual: "🪑" },
        ],
        correct: "tren",
      },
      en: {
        prompt: 'Which word ends with the same sound as "sun"?',
        teacherNote: "Focus on the final /n/ sound.",
        stimulus: { label: "sun", visual: "☀️" },
        options: [
          { value: "rain", label: "rain", visual: "🌧️" },
          { value: "cat", label: "cat", visual: "🐱" },
          { value: "table", label: "table", visual: "🪑" },
        ],
        correct: "rain",
      },
    },
    {
      id: "5-pho-3",
      area: "phonological",
      type: "choice",
      es: {
        prompt: "Si a «sol» le quitamos el sonido /s/, ¿qué queda?",
        teacherNote: "Actividad fonémica inicial con apoyo oral: sss-ol → ol.",
        stimulus: { label: "sol", visual: "☀️" },
        options: ["ol", "so", "sal"],
        correct: "ol",
        feedback: "Al quitar /s/ de «sol», queda «ol».",
      },
      en: {
        prompt: 'If we take away the /b/ sound from "bat", what is left?',
        teacherNote: "Early phoneme task with oral support: b-at → at.",
        stimulus: { label: "bat", visual: "🦇" },
        options: ["at", "ba", "bet"],
        correct: "at",
        feedback: 'Taking /b/ from "bat" leaves "at".',
      },
    },
    {
      id: "5-voc-1",
      area: "vocabulary",
      type: "choice",
      es: {
        prompt: "¿Qué palabra significa lo mismo que «contento»?",
        teacherNote: "Comenta situaciones en las que nos sentimos así.",
        options: [
          { value: "feliz", label: "feliz", visual: "😊" },
          { value: "enfadado", label: "enfadado", visual: "😠" },
          { value: "cansado", label: "cansado", visual: "😴" },
        ],
        correct: "feliz",
      },
      en: {
        prompt: 'Which word means the same as "happy"?',
        teacherNote: "Talk about situations when we feel that way.",
        options: [
          { value: "glad", label: "glad", visual: "😊" },
          { value: "angry", label: "angry", visual: "😠" },
          { value: "tired", label: "tired", visual: "😴" },
        ],
        correct: "glad",
      },
    },
    {
      id: "5-voc-2",
      area: "vocabulary",
      type: "choice",
      es: {
        prompt: "¿Cuál de estos es un medio de transporte?",
        teacherNote: "Amplía con otros ejemplos que conozca.",
        options: [
          { value: "🚌 autobús", label: "autobús", visual: "🚌" },
          { value: "🍞 pan", label: "pan", visual: "🍞" },
          { value: "🌳 árbol", label: "árbol", visual: "🌳" },
        ],
        correct: "🚌 autobús",
      },
      en: {
        prompt: "Which one is a means of transport?",
        teacherNote: "Extend with other examples the child knows.",
        options: [
          { value: "🚌 bus", label: "bus", visual: "🚌" },
          { value: "🍞 bread", label: "bread", visual: "🍞" },
          { value: "🌳 tree", label: "tree", visual: "🌳" },
        ],
        correct: "🚌 bus",
      },
    },
    {
      id: "5-com-1",
      area: "comprehension",
      type: "choice",
      es: {
        prompt:
          "Escucha: «Sofía llevó su paraguas al cole. Por la tarde, cuando salió, estaba lloviendo». ¿Por qué fue buena idea llevar paraguas?",
        teacherNote: "Trabaja una inferencia sencilla a partir de la situación.",
        options: [
          { value: "Porque luego llovió", label: "Porque luego llovió", visual: "🌧️" },
          { value: "Porque hacía mucho calor", label: "Porque hacía mucho calor", visual: "☀️" },
          { value: "Porque iba a dormir", label: "Porque iba a dormir", visual: "😴" },
        ],
        correct: "Porque luego llovió",
      },
      en: {
        prompt:
          'Listen: "Sofia took her umbrella to school. In the afternoon, when she left, it was raining." Why was it a good idea to take an umbrella?',
        teacherNote: "Work on a simple inference from the situation.",
        options: [
          { value: "Because it rained later", label: "Because it rained later", visual: "🌧️" },
          { value: "Because it was very hot", label: "Because it was very hot", visual: "☀️" },
          { value: "Because she was going to sleep", label: "Because she was going to sleep", visual: "😴" },
        ],
        correct: "Because it rained later",
      },
    },
    {
      id: "5-com-2",
      area: "comprehension",
      type: "choice",
      es: {
        prompt:
          "Escucha: «Primero, Pablo se lavó las manos. Después, se sentó a comer». ¿Qué hizo Pablo primero?",
        teacherNote: "Refuerza la secuencia temporal: primero/después.",
        options: [
          { value: "Lavarse las manos", label: "Lavarse las manos", visual: "🧼" },
          { value: "Sentarse a comer", label: "Sentarse a comer", visual: "🍽️" },
          { value: "Ir al parque", label: "Ir al parque", visual: "🌳" },
        ],
        correct: "Lavarse las manos",
      },
      en: {
        prompt:
          'Listen: "First, Pablo washed his hands. Then, he sat down to eat." What did Pablo do first?',
        teacherNote: "Reinforce time sequence: first/then.",
        options: [
          { value: "Wash his hands", label: "Wash his hands", visual: "🧼" },
          { value: "Sit down to eat", label: "Sit down to eat", visual: "🍽️" },
          { value: "Go to the park", label: "Go to the park", visual: "🌳" },
        ],
        correct: "Wash his hands",
      },
    },
    {
      id: "5-mem-1",
      area: "memory",
      type: "memory",
      es: {
        prompt: "Recuerda la secuencia y elige el orden correcto.",
        teacherNote: "Puedes pedir que nombre cada elemento en orden.",
        sequence: ["🔴", "🔵", "🟢", "🟡"],
        options: ["🔴 🔵 🟢 🟡", "🔴 🟢 🔵 🟡", "🔵 🔴 🟢 🟡"],
        correct: "🔴 🔵 🟢 🟡",
      },
      en: {
        prompt: "Remember the sequence and choose the correct order.",
        teacherNote: "Ask the child to name each item in order.",
        sequence: ["🔴", "🔵", "🟢", "🟡"],
        options: ["🔴 🔵 🟢 🟡", "🔴 🟢 🔵 🟡", "🔵 🔴 🟢 🟡"],
        correct: "🔴 🔵 🟢 🟡",
      },
    },
    {
      id: "5-mor-1",
      area: "morphosyntax",
      type: "choice",
      es: {
        prompt: "Elige la frase mejor ordenada.",
        teacherNote: "Comenta el orden sujeto-verbo-complemento.",
        options: [
          "Mañana iremos al parque.",
          "Mañana al parque iremos nosotros ir.",
          "Parque iremos mañana al.",
        ],
        correct: "Mañana iremos al parque.",
      },
      en: {
        prompt: "Choose the best ordered sentence.",
        teacherNote: "Discuss subject-verb-complement order.",
        options: [
          "Tomorrow we will go to the park.",
          "Tomorrow park go we will.",
          "Park tomorrow we go to will.",
        ],
        correct: "Tomorrow we will go to the park.",
      },
    },
    {
      id: "5-mor-2",
      area: "morphosyntax",
      type: "choice",
      es: {
        prompt: "Completa: «Ayer, María ___ un dibujo».",
        teacherNote: "Trabaja el tiempo pasado (ayer).",
        options: ["hizo", "hace", "hará"],
        correct: "hizo",
      },
      en: {
        prompt: 'Complete: "Yesterday, Maria ___ a picture."',
        teacherNote: "Work on past time (yesterday).",
        options: ["drew", "draws", "will draw"],
        correct: "drew",
      },
    },
    {
      id: "5-alp-1",
      area: "alphabetic",
      type: "choice",
      es: {
        prompt: "¿Por qué letra empieza la palabra «luna»?",
        teacherNote: "Señala el sonido y la letra inicial.",
        stimulus: { label: "luna", visual: "🌙" },
        options: ["L", "N", "S"],
        correct: "L",
      },
      en: {
        prompt: 'Which letter does the word "moon" start with?',
        teacherNote: "Point out the initial sound and letter.",
        stimulus: { label: "moon", visual: "🌙" },
        options: ["M", "N", "S"],
        correct: "M",
      },
    },
    {
      id: "5-alp-2",
      area: "alphabetic",
      type: "choice",
      es: {
        prompt: "¿Qué palabra se puede leer con estas letras: «P-E-L-O-T-A»?",
        teacherNote: "Une los sonidos/letras para formar la palabra.",
        options: [
          { value: "pelota", label: "pelota", visual: "⚽" },
          { value: "paloma", label: "paloma", visual: "🕊️" },
          { value: "perro", label: "perro", visual: "🐶" },
        ],
        correct: "pelota",
      },
      en: {
        prompt: 'Which word can you read from these letters: "B-A-L-L"?',
        teacherNote: "Blend the letters/sounds to form the word.",
        options: [
          { value: "ball", label: "ball", visual: "⚽" },
          { value: "bell", label: "bell", visual: "🔔" },
          { value: "bull", label: "bull", visual: "🐂" },
        ],
        correct: "ball",
      },
    },
  ],
};
