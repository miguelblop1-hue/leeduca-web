import {
  VISUAL_IDS,
  type PreleoVisual,
  type VisualId,
} from "./types";

export const visualCatalog: Record<VisualId, PreleoVisual> = {
  copa: {
    id: "copa",
    word: "copa",
    syllables: ["co", "pa"],
    image: "/media/real-objects/copa.jpg",
    category: "object",
    credit: {
      author: "Paolo Neo",
      license: "Dominio público",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Glass_wine_white_background.jpg",
    },
  },
  lapiz: {
    id: "lapiz",
    word: "lápiz",
    syllables: ["la", "piz"],
    image: "/media/real-objects/lapiz.jpg",
    category: "object",
    credit: {
      author: "999real",
      license: "CC0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Yellow_Faber_Castell_2B_pencil_side_no_logo.jpg",
    },
  },
  casa: {
    id: "casa",
    word: "casa",
    syllables: ["ca", "sa"],
    image: "/media/real-objects/casa.jpg",
    category: "object",
    credit: {
      author: "Victuallers",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:1_The_Loan,_Lauder.jpg",
    },
  },
  cama: {
    id: "cama",
    word: "cama",
    syllables: ["ca", "ma"],
    image: "/media/real-objects/cama.jpg",
    category: "object",
    credit: {
      author: "Eifel07",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Altes_Schlafzimmer.JPG",
    },
  },
  gato: {
    id: "gato",
    word: "gato",
    syllables: ["ga", "to"],
    image: "/media/real-objects/gato.jpg",
    category: "animal",
    credit: {
      author: "Desaix83, d'après le travail de Heikki Siltala",
      license: "CC BY 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Angora_Turc_Fond_Blanc.jpg",
    },
  },
  pato: {
    id: "pato",
    word: "pato",
    syllables: ["pa", "to"],
    image: "/media/real-objects/pato.jpg",
    category: "animal",
    credit: {
      author: "Kapa65",
      license: "CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Duck-293474_white_background.jpg",
    },
  },
  perro: {
    id: "perro",
    word: "perro",
    syllables: ["pe", "rro"],
    image: "/media/real-objects/perro.jpg",
    category: "animal",
    credit: {
      author: "George Hodan",
      license: "CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Puppy_Dog_on_White.jpg",
    },
  },
  mesa: {
    id: "mesa",
    word: "mesa",
    syllables: ["me", "sa"],
    image: "/media/real-objects/mesa.jpg",
    category: "object",
    credit: {
      author: "User:JossDude",
      license: "Dominio público",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Coffee_table_on_a_white_background.jpg",
    },
  },
  queso: {
    id: "queso",
    word: "queso",
    syllables: ["que", "so"],
    image: "/media/real-objects/queso.jpg",
    category: "food",
    credit: {
      author: "Paulmcdonald",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Parmesan_Cheese_Wheel_-_Whole_Foods.JPG",
    },
  },
  vaca: {
    id: "vaca",
    word: "vaca",
    syllables: ["va", "ca"],
    image: "/media/real-objects/vaca.jpg",
    category: "animal",
    credit: {
      author: "Michael Barera",
      license: "CC BY-SA 4.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:2022_Wisconsin_State_Fair_53_(cow_at_Dairy_Lane).jpg",
    },
  },
  pan: {
    id: "pan",
    word: "pan",
    syllables: ["pan"],
    image: "/media/real-objects/pan.jpg",
    category: "food",
    credit: {
      author: "Judgefloro",
      license: "Dominio público",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:0727jfToasted_breadfvf.jpg",
    },
  },
  flor: {
    id: "flor",
    word: "flor",
    syllables: ["flor"],
    image: "/media/real-objects/flor.jpg",
    category: "nature",
    credit: {
      author: "Asmara lesta",
      license: "CC BY 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bunga_Red_Rose.jpg",
    },
  },
  mariposa: {
    id: "mariposa",
    word: "mariposa",
    syllables: ["ma", "ri", "po", "sa"],
    image: "/media/real-objects/mariposa.jpg",
    category: "animal",
    credit: {
      author: "ByB",
      license: "CC BY 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:PapillonFlambeCevennes.jpg",
    },
  },
  regalo: {
    id: "regalo",
    word: "regalo",
    syllables: ["re", "ga", "lo"],
    image: "/media/real-objects/regalo.jpg",
    category: "object",
    credit: {
      author: "Shixart1985",
      license: "CC BY 2.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Brown_gift_box_with_red_ribbon_and_bow.jpg",
    },
  },
  globo: {
    id: "globo",
    word: "globo",
    syllables: ["glo", "bo"],
    image: "/media/real-objects/globo.jpg",
    category: "object",
    credit: {
      author: "emma marie andersson",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2016_65_balloon_(27242065630).jpg",
    },
  },
  helado: {
    id: "helado",
    word: "helado",
    syllables: ["he", "la", "do"],
    image: "/media/real-objects/helado.jpg",
    category: "food",
    credit: {
      author: "Jessica Rossi from Philadelphia",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cherry_ice_cream_cone.jpg",
    },
  },
  luna: {
    id: "luna",
    word: "luna",
    syllables: ["lu", "na"],
    image: "/media/real-objects/luna.jpg",
    category: "nature",
    credit: {
      author: "KaanaveniSaikiran",
      license: "CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Moon_in_night_with_blackground.jpg",
    },
  },
  pelota: {
    id: "pelota",
    word: "pelota",
    syllables: ["pe", "lo", "ta"],
    image: "/media/real-objects/pelota.jpg",
    category: "object",
    credit: {
      author: "bluesbby from Mountain View, USA",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Just_a_soccer_ball_(34782492153).jpg",
    },
  },
  sol: {
    id: "sol",
    word: "sol",
    syllables: ["sol"],
    image: "/media/real-objects/sol.jpg",
    category: "nature",
    credit: {
      author: "Moataz EL-Sharaky",
      license: "CC BY 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hands_Holding_the_Sun.jpg",
    },
  },
};

export const visualList = VISUAL_IDS.map((id) => visualCatalog[id]);

export const sceneCatalog = {
  "scene-01": "/media/scenes/scene-01.jpg",
  "scene-02": "/media/scenes/scene-02.jpg",
  "scene-03": "/media/scenes/scene-03.jpg",
} as const;

export type SceneId = keyof typeof sceneCatalog;

export function isVisualId(value: unknown): value is VisualId {
  return typeof value === "string" && (VISUAL_IDS as readonly string[]).includes(value);
}
