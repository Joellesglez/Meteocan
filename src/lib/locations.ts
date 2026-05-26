export type Location = {
  id: string;
  name: string;
  island: string;
  lat: number;
  lon: number;
  type: "island" | "municipality";
  coastal?: boolean;
  webcam?: { url: string; provider: string };
};

const WC = (slug: string) => ({
  url: `https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/${slug}.html`,
  provider: "Skyline Webcams",
});

export const LOCATIONS: Location[] = [
  // ----- Islas -----
  { id: "tenerife", name: "Tenerife", island: "Tenerife", lat: 28.2916, lon: -16.6291, type: "island", coastal: true },
  { id: "gran-canaria", name: "Gran Canaria", island: "Gran Canaria", lat: 27.9202, lon: -15.5474, type: "island", coastal: true },
  { id: "lanzarote", name: "Lanzarote", island: "Lanzarote", lat: 29.0469, lon: -13.5899, type: "island", coastal: true },
  { id: "fuerteventura", name: "Fuerteventura", island: "Fuerteventura", lat: 28.3587, lon: -14.0537, type: "island", coastal: true },
  { id: "la-palma", name: "La Palma", island: "La Palma", lat: 28.6835, lon: -17.7642, type: "island", coastal: true },
  { id: "la-gomera", name: "La Gomera", island: "La Gomera", lat: 28.0916, lon: -17.1133, type: "island", coastal: true },
  { id: "el-hierro", name: "El Hierro", island: "El Hierro", lat: 27.7394, lon: -18.0331, type: "island", coastal: true },
  { id: "la-graciosa", name: "La Graciosa", island: "La Graciosa", lat: 29.2356, lon: -13.5039, type: "island", coastal: true },

  // ----- Tenerife (31 municipios) -----
  { id: "santa-cruz-tfe", name: "Santa Cruz de Tenerife", island: "Tenerife", lat: 28.4636, lon: -16.2518, type: "municipality", coastal: true, webcam: WC("santa-cruz-de-tenerife/santa-cruz-de-tenerife") },
  { id: "la-laguna", name: "San Cristóbal de La Laguna", island: "Tenerife", lat: 28.4853, lon: -16.3197, type: "municipality" },
  { id: "candelaria", name: "Candelaria", island: "Tenerife", lat: 28.3525, lon: -16.3711, type: "municipality", coastal: true, webcam: WC("santa-cruz-de-tenerife/candelaria") },
  { id: "puerto-cruz", name: "Puerto de la Cruz", island: "Tenerife", lat: 28.4136, lon: -16.5453, type: "municipality", coastal: true, webcam: WC("santa-cruz-de-tenerife/puerto-de-la-cruz") },
  { id: "arona", name: "Arona (Los Cristianos)", island: "Tenerife", lat: 28.0997, lon: -16.6800, type: "municipality", coastal: true, webcam: WC("santa-cruz-de-tenerife/arona") },
  { id: "adeje", name: "Adeje (Costa Adeje)", island: "Tenerife", lat: 28.1227, lon: -16.7260, type: "municipality", coastal: true },
  { id: "los-gigantes", name: "Los Gigantes (Santiago del Teide)", island: "Tenerife", lat: 28.2477, lon: -16.8419, type: "municipality", coastal: true },
  { id: "garachico", name: "Garachico", island: "Tenerife", lat: 28.3736, lon: -16.7619, type: "municipality", coastal: true },
  { id: "icod", name: "Icod de los Vinos", island: "Tenerife", lat: 28.3697, lon: -16.7144, type: "municipality", coastal: true },
  { id: "guimar", name: "Güímar", island: "Tenerife", lat: 28.3197, lon: -16.4078, type: "municipality", coastal: true },
  { id: "teide", name: "Pico del Teide", island: "Tenerife", lat: 28.2724, lon: -16.6425, type: "municipality", webcam: WC("santa-cruz-de-tenerife/teide") },
  { id: "el-medano", name: "El Médano (Granadilla)", island: "Tenerife", lat: 28.0469, lon: -16.5375, type: "municipality", coastal: true },
  { id: "granadilla", name: "Granadilla de Abona", island: "Tenerife", lat: 28.1175, lon: -16.5781, type: "municipality" },
  { id: "san-miguel", name: "San Miguel de Abona", island: "Tenerife", lat: 28.0850, lon: -16.6172, type: "municipality" },
  { id: "vilaflor", name: "Vilaflor de Chasna", island: "Tenerife", lat: 28.1572, lon: -16.6353, type: "municipality" },
  { id: "arico", name: "Arico", island: "Tenerife", lat: 28.1714, lon: -16.4900, type: "municipality", coastal: true },
  { id: "fasnia", name: "Fasnia", island: "Tenerife", lat: 28.2369, lon: -16.4361, type: "municipality", coastal: true },
  { id: "arafo", name: "Arafo", island: "Tenerife", lat: 28.3392, lon: -16.4233, type: "municipality" },
  { id: "el-rosario", name: "El Rosario", island: "Tenerife", lat: 28.4083, lon: -16.3417, type: "municipality", coastal: true },
  { id: "el-sauzal", name: "El Sauzal", island: "Tenerife", lat: 28.4775, lon: -16.4233, type: "municipality", coastal: true },
  { id: "tacoronte", name: "Tacoronte", island: "Tenerife", lat: 28.4756, lon: -16.4083, type: "municipality", coastal: true },
  { id: "la-matanza", name: "La Matanza de Acentejo", island: "Tenerife", lat: 28.4503, lon: -16.4500, type: "municipality", coastal: true },
  { id: "la-victoria", name: "La Victoria de Acentejo", island: "Tenerife", lat: 28.4111, lon: -16.4661, type: "municipality", coastal: true },
  { id: "santa-ursula", name: "Santa Úrsula", island: "Tenerife", lat: 28.4192, lon: -16.4922, type: "municipality", coastal: true },
  { id: "la-orotava", name: "La Orotava", island: "Tenerife", lat: 28.3897, lon: -16.5247, type: "municipality" },
  { id: "los-realejos", name: "Los Realejos", island: "Tenerife", lat: 28.3733, lon: -16.5811, type: "municipality", coastal: true },
  { id: "san-juan-rambla", name: "San Juan de la Rambla", island: "Tenerife", lat: 28.3850, lon: -16.6225, type: "municipality", coastal: true },
  { id: "la-guancha", name: "La Guancha", island: "Tenerife", lat: 28.3667, lon: -16.6553, type: "municipality", coastal: true },
  { id: "el-tanque", name: "El Tanque", island: "Tenerife", lat: 28.3503, lon: -16.7956, type: "municipality" },
  { id: "los-silos", name: "Los Silos", island: "Tenerife", lat: 28.3725, lon: -16.8169, type: "municipality", coastal: true },
  { id: "buenavista", name: "Buenavista del Norte", island: "Tenerife", lat: 28.3725, lon: -16.8556, type: "municipality", coastal: true },
  { id: "guia-isora", name: "Guía de Isora", island: "Tenerife", lat: 28.2125, lon: -16.7872, type: "municipality", coastal: true },
  { id: "tegueste", name: "Tegueste", island: "Tenerife", lat: 28.5247, lon: -16.3361, type: "municipality" },

  // ----- Gran Canaria (21 municipios) -----
  { id: "lpgc", name: "Las Palmas de Gran Canaria", island: "Gran Canaria", lat: 28.1235, lon: -15.4366, type: "municipality", coastal: true, webcam: WC("las-palmas/las-palmas-de-gran-canaria") },
  { id: "maspalomas", name: "Maspalomas", island: "Gran Canaria", lat: 27.7606, lon: -15.5860, type: "municipality", coastal: true, webcam: WC("las-palmas/maspalomas") },
  { id: "playa-ingles", name: "Playa del Inglés", island: "Gran Canaria", lat: 27.7546, lon: -15.5719, type: "municipality", coastal: true, webcam: WC("las-palmas/playa-del-ingles") },
  { id: "puerto-mogan", name: "Puerto de Mogán", island: "Gran Canaria", lat: 27.8156, lon: -15.7644, type: "municipality", coastal: true, webcam: WC("las-palmas/puerto-de-mogan") },
  { id: "mogan", name: "Mogán", island: "Gran Canaria", lat: 27.8829, lon: -15.7236, type: "municipality" },
  { id: "san-bartolome", name: "San Bartolomé de Tirajana", island: "Gran Canaria", lat: 27.9244, lon: -15.5728, type: "municipality", coastal: true },
  { id: "telde", name: "Telde", island: "Gran Canaria", lat: 27.9923, lon: -15.4197, type: "municipality", coastal: true },
  { id: "agaete", name: "Agaete", island: "Gran Canaria", lat: 28.1014, lon: -15.6997, type: "municipality", coastal: true },
  { id: "teror", name: "Teror", island: "Gran Canaria", lat: 28.0608, lon: -15.5469, type: "municipality" },
  { id: "arucas", name: "Arucas", island: "Gran Canaria", lat: 28.1197, lon: -15.5236, type: "municipality", coastal: true },
  { id: "galdar", name: "Gáldar", island: "Gran Canaria", lat: 28.1467, lon: -15.6531, type: "municipality", coastal: true },
  { id: "santa-maria-guia", name: "Santa María de Guía", island: "Gran Canaria", lat: 28.1419, lon: -15.6356, type: "municipality", coastal: true },
  { id: "moya", name: "Moya", island: "Gran Canaria", lat: 28.1100, lon: -15.5828, type: "municipality" },
  { id: "firgas", name: "Firgas", island: "Gran Canaria", lat: 28.1100, lon: -15.5644, type: "municipality" },
  { id: "valleseco", name: "Valleseco", island: "Gran Canaria", lat: 28.0481, lon: -15.5708, type: "municipality" },
  { id: "vega-san-mateo", name: "Vega de San Mateo", island: "Gran Canaria", lat: 28.0136, lon: -15.5325, type: "municipality" },
  { id: "santa-brigida", name: "Santa Brígida", island: "Gran Canaria", lat: 28.0392, lon: -15.4994, type: "municipality" },
  { id: "ingenio", name: "Ingenio", island: "Gran Canaria", lat: 27.9217, lon: -15.4444, type: "municipality" },
  { id: "aguimes", name: "Agüimes", island: "Gran Canaria", lat: 27.9011, lon: -15.4517, type: "municipality", coastal: true },
  { id: "santa-lucia", name: "Santa Lucía de Tirajana", island: "Gran Canaria", lat: 27.9114, lon: -15.5417, type: "municipality" },
  { id: "tejeda", name: "Tejeda", island: "Gran Canaria", lat: 27.9942, lon: -15.6128, type: "municipality" },
  { id: "artenara", name: "Artenara", island: "Gran Canaria", lat: 28.0231, lon: -15.6442, type: "municipality" },
  { id: "valsequillo", name: "Valsequillo", island: "Gran Canaria", lat: 27.9897, lon: -15.4886, type: "municipality" },

  // ----- Lanzarote (7 municipios) -----
  { id: "arrecife", name: "Arrecife", island: "Lanzarote", lat: 28.9636, lon: -13.5478, type: "municipality", coastal: true, webcam: WC("las-palmas/arrecife") },
  { id: "playa-blanca", name: "Playa Blanca (Yaiza)", island: "Lanzarote", lat: 28.8625, lon: -13.8267, type: "municipality", coastal: true },
  { id: "yaiza", name: "Yaiza", island: "Lanzarote", lat: 28.9525, lon: -13.7700, type: "municipality", coastal: true },
  { id: "puerto-carmen", name: "Puerto del Carmen (Tías)", island: "Lanzarote", lat: 28.9217, lon: -13.6647, type: "municipality", coastal: true },
  { id: "tias", name: "Tías", island: "Lanzarote", lat: 28.9614, lon: -13.6478, type: "municipality" },
  { id: "costa-teguise", name: "Costa Teguise", island: "Lanzarote", lat: 28.9933, lon: -13.5006, type: "municipality", coastal: true },
  { id: "teguise", name: "Teguise", island: "Lanzarote", lat: 29.0608, lon: -13.5639, type: "municipality" },
  { id: "haria", name: "Haría", island: "Lanzarote", lat: 29.1469, lon: -13.4956, type: "municipality", coastal: true },
  { id: "san-bartolome-lz", name: "San Bartolomé", island: "Lanzarote", lat: 28.9858, lon: -13.6131, type: "municipality" },
  { id: "tinajo", name: "Tinajo", island: "Lanzarote", lat: 29.0633, lon: -13.6750, type: "municipality", coastal: true },
  { id: "timanfaya", name: "Parque Nacional de Timanfaya", island: "Lanzarote", lat: 29.0017, lon: -13.7286, type: "municipality" },

  // ----- Fuerteventura (6 municipios) -----
  { id: "puerto-rosario", name: "Puerto del Rosario", island: "Fuerteventura", lat: 28.5004, lon: -13.8627, type: "municipality", coastal: true },
  { id: "corralejo", name: "Corralejo (La Oliva)", island: "Fuerteventura", lat: 28.7400, lon: -13.8669, type: "municipality", coastal: true, webcam: WC("las-palmas/corralejo") },
  { id: "la-oliva", name: "La Oliva", island: "Fuerteventura", lat: 28.6086, lon: -13.9322, type: "municipality" },
  { id: "el-cotillo", name: "El Cotillo", island: "Fuerteventura", lat: 28.6814, lon: -14.0114, type: "municipality", coastal: true },
  { id: "morro-jable", name: "Morro Jable (Pájara)", island: "Fuerteventura", lat: 28.0506, lon: -14.3528, type: "municipality", coastal: true },
  { id: "pajara", name: "Pájara", island: "Fuerteventura", lat: 28.3528, lon: -14.1083, type: "municipality" },
  { id: "costa-calma", name: "Costa Calma", island: "Fuerteventura", lat: 28.1611, lon: -14.2300, type: "municipality", coastal: true },
  { id: "caleta-fuste", name: "Caleta de Fuste (Antigua)", island: "Fuerteventura", lat: 28.3886, lon: -13.8628, type: "municipality", coastal: true },
  { id: "antigua", name: "Antigua", island: "Fuerteventura", lat: 28.4225, lon: -13.9344, type: "municipality" },
  { id: "betancuria", name: "Betancuria", island: "Fuerteventura", lat: 28.4233, lon: -14.0589, type: "municipality" },
  { id: "tuineje", name: "Tuineje", island: "Fuerteventura", lat: 28.3219, lon: -14.0414, type: "municipality" },
  { id: "gran-tarajal", name: "Gran Tarajal", island: "Fuerteventura", lat: 28.2056, lon: -14.0228, type: "municipality", coastal: true },

  // ----- La Palma (14 municipios) -----
  { id: "santa-cruz-palma", name: "Santa Cruz de La Palma", island: "La Palma", lat: 28.6835, lon: -17.7642, type: "municipality", coastal: true, webcam: WC("santa-cruz-de-la-palma/santa-cruz-de-la-palma") },
  { id: "los-llanos", name: "Los Llanos de Aridane", island: "La Palma", lat: 28.6586, lon: -17.9181, type: "municipality" },
  { id: "el-paso", name: "El Paso", island: "La Palma", lat: 28.6539, lon: -17.8703, type: "municipality" },
  { id: "tazacorte", name: "Tazacorte", island: "La Palma", lat: 28.6453, lon: -17.9367, type: "municipality", coastal: true },
  { id: "fuencaliente", name: "Fuencaliente", island: "La Palma", lat: 28.4878, lon: -17.8453, type: "municipality", coastal: true },
  { id: "brena-alta", name: "Breña Alta", island: "La Palma", lat: 28.6469, lon: -17.8108, type: "municipality" },
  { id: "brena-baja", name: "Breña Baja", island: "La Palma", lat: 28.6256, lon: -17.7806, type: "municipality", coastal: true },
  { id: "mazo", name: "Villa de Mazo", island: "La Palma", lat: 28.6044, lon: -17.7842, type: "municipality", coastal: true },
  { id: "barlovento", name: "Barlovento", island: "La Palma", lat: 28.8275, lon: -17.8003, type: "municipality", coastal: true },
  { id: "garafia", name: "Garafía", island: "La Palma", lat: 28.8311, lon: -17.9311, type: "municipality", coastal: true },
  { id: "puntagorda", name: "Puntagorda", island: "La Palma", lat: 28.7556, lon: -17.9911, type: "municipality", coastal: true },
  { id: "tijarafe", name: "Tijarafe", island: "La Palma", lat: 28.7150, lon: -17.9633, type: "municipality", coastal: true },
  { id: "puntallana", name: "Puntallana", island: "La Palma", lat: 28.7458, lon: -17.7414, type: "municipality", coastal: true },
  { id: "san-andres-sauces", name: "San Andrés y Sauces", island: "La Palma", lat: 28.7997, lon: -17.7644, type: "municipality", coastal: true },
  { id: "roque-muchachos", name: "Roque de los Muchachos", island: "La Palma", lat: 28.7547, lon: -17.8847, type: "municipality" },

  // ----- La Gomera (6 municipios) -----
  { id: "san-sebastian", name: "San Sebastián de La Gomera", island: "La Gomera", lat: 28.0916, lon: -17.1133, type: "municipality", coastal: true },
  { id: "valle-gran-rey", name: "Valle Gran Rey", island: "La Gomera", lat: 28.1011, lon: -17.3358, type: "municipality", coastal: true },
  { id: "vallehermoso", name: "Vallehermoso", island: "La Gomera", lat: 28.1786, lon: -17.2658, type: "municipality", coastal: true },
  { id: "hermigua", name: "Hermigua", island: "La Gomera", lat: 28.1681, lon: -17.1936, type: "municipality", coastal: true },
  { id: "agulo", name: "Agulo", island: "La Gomera", lat: 28.1856, lon: -17.1953, type: "municipality", coastal: true },
  { id: "alajero", name: "Alajeró", island: "La Gomera", lat: 28.0758, lon: -17.2419, type: "municipality", coastal: true },
  { id: "garajonay", name: "Parque Nacional de Garajonay", island: "La Gomera", lat: 28.1192, lon: -17.2375, type: "municipality" },

  // ----- El Hierro (3 municipios) -----
  { id: "valverde", name: "Valverde", island: "El Hierro", lat: 27.8081, lon: -17.9156, type: "municipality", coastal: true, webcam: WC("santa-cruz-de-tenerife/valverde") },
  { id: "frontera", name: "Frontera", island: "El Hierro", lat: 27.7547, lon: -18.0103, type: "municipality", coastal: true },
  { id: "pinar", name: "El Pinar", island: "El Hierro", lat: 27.7156, lon: -17.9886, type: "municipality", coastal: true },
  { id: "la-restinga", name: "La Restinga", island: "El Hierro", lat: 27.6428, lon: -17.9758, type: "municipality", coastal: true },

  // ----- La Graciosa -----
  { id: "caleta-sebo", name: "Caleta de Sebo", island: "La Graciosa", lat: 29.2308, lon: -13.5036, type: "municipality", coastal: true },
];
