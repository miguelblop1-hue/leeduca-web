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
      author: "Valerius Geng",
      license: "CC BY 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Abyssinian_-_studio_(cropped).jpg",
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
      author: "fro3enfire",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2_Months_Old_Rottweiler_Puppy.jpg",
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
      author: "Thomas Holbein",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:4_Glask%C3%A4seScheibe.jpg",
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
      author: "Derek Ramsey (Ram-Man), Chanticleer Garden",
      license: "CC BY-SA 3.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Iris_cultivar_(2005-0606-A)_isolated_on_white.jpg",
    },
  },
  mariposa: {
    id: "mariposa",
    word: "mariposa",
    syllables: ["ma", "ri", "po", "sa"],
    image: "/media/real-objects/mariposa.jpg",
    category: "animal",
    credit: {
      author: "Macieklew",
      license: "CC BY 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Butterflies_feeding.jpg",
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
      author: "PataDePerra",
      license: "CC BY 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:La_luna_vista_desde_CDMX.jpg",
    },
  },
  pelota: {
    id: "pelota",
    word: "pelota",
    syllables: ["pe", "lo", "ta"],
    image: "/media/real-objects/pelota.jpg",
    category: "object",
    credit: {
      author: "Evgeny Negin",
      license: "CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:American_football.jpg",
    },
  },
  sol: {
    id: "sol",
    word: "sol",
    syllables: ["sol"],
    image: "/media/real-objects/sol.jpg",
    category: "nature",
    credit: {
      author: "Ranjima np",
      license: "CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:A_sun_set_view.jpg",
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
