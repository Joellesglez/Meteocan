export type Location = {
  id: string;
  name: string;
  island: string;
  lat: number;
  lon: number;
  type: "island" | "municipality";
  webcam?: { url: string; provider: string };
};

// Curated public webcams (Skyline Webcams & municipality streams)
const WEBCAMS = {
  candelaria: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/santa-cruz-de-tenerife/candelaria.html", provider: "Skyline Webcams" },
  santaCruzTfe: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/santa-cruz-de-tenerife/santa-cruz-de-tenerife.html", provider: "Skyline Webcams" },
  losCristianos: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/santa-cruz-de-tenerife/arona.html", provider: "Skyline Webcams" },
  puertoCruz: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/santa-cruz-de-tenerife/puerto-de-la-cruz.html", provider: "Skyline Webcams" },
  laPalmaSC: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/santa-cruz-de-la-palma/santa-cruz-de-la-palma.html", provider: "Skyline Webcams" },
  laspalmasGC: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/las-palmas/las-palmas-de-gran-canaria.html", provider: "Skyline Webcams" },
  maspalomas: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/las-palmas/maspalomas.html", provider: "Skyline Webcams" },
  puertoMogan: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/las-palmas/puerto-de-mogan.html", provider: "Skyline Webcams" },
  corralejo: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/las-palmas/corralejo.html", provider: "Skyline Webcams" },
  playaIngles: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/las-palmas/playa-del-ingles.html", provider: "Skyline Webcams" },
  arrecife: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/las-palmas/arrecife.html", provider: "Skyline Webcams" },
  valverde: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/santa-cruz-de-tenerife/valverde.html", provider: "Skyline Webcams" },
  teide: { url: "https://www.skylinewebcams.com/es/webcam/espana/islas-canarias/santa-cruz-de-tenerife/teide.html", provider: "Skyline Webcams" },
};

export const LOCATIONS: Location[] = [
  // Islas
  { id: "tenerife", name: "Tenerife", island: "Tenerife", lat: 28.2916, lon: -16.6291, type: "island" },
  { id: "gran-canaria", name: "Gran Canaria", island: "Gran Canaria", lat: 27.9202, lon: -15.5474, type: "island" },
  { id: "lanzarote", name: "Lanzarote", island: "Lanzarote", lat: 29.0469, lon: -13.5899, type: "island" },
  { id: "fuerteventura", name: "Fuerteventura", island: "Fuerteventura", lat: 28.3587, lon: -14.0537, type: "island" },
  { id: "la-palma", name: "La Palma", island: "La Palma", lat: 28.6835, lon: -17.7642, type: "island" },
  { id: "la-gomera", name: "La Gomera", island: "La Gomera", lat: 28.0916, lon: -17.1133, type: "island" },
  { id: "el-hierro", name: "El Hierro", island: "El Hierro", lat: 27.7394, lon: -18.0331, type: "island" },
  { id: "la-graciosa", name: "La Graciosa", island: "La Graciosa", lat: 29.2356, lon: -13.5039, type: "island" },

  // Tenerife
  { id: "santa-cruz-tfe", name: "Santa Cruz de Tenerife", island: "Tenerife", lat: 28.4636, lon: -16.2518, type: "municipality", webcam: WEBCAMS.santaCruzTfe },
  { id: "la-laguna", name: "San Cristóbal de La Laguna", island: "Tenerife", lat: 28.4853, lon: -16.3197, type: "municipality" },
  { id: "candelaria", name: "Candelaria", island: "Tenerife", lat: 28.3525, lon: -16.3711, type: "municipality", webcam: WEBCAMS.candelaria },
  { id: "puerto-cruz", name: "Puerto de la Cruz", island: "Tenerife", lat: 28.4136, lon: -16.5453, type: "municipality", webcam: WEBCAMS.puertoCruz },
  { id: "arona", name: "Arona (Los Cristianos)", island: "Tenerife", lat: 28.0997, lon: -16.6800, type: "municipality", webcam: WEBCAMS.losCristianos },
  { id: "adeje", name: "Adeje", island: "Tenerife", lat: 28.1227, lon: -16.7260, type: "municipality" },
  { id: "los-gigantes", name: "Los Gigantes (Santiago del Teide)", island: "Tenerife", lat: 28.2477, lon: -16.8419, type: "municipality" },
  { id: "garachico", name: "Garachico", island: "Tenerife", lat: 28.3736, lon: -16.7619, type: "municipality" },
  { id: "icod", name: "Icod de los Vinos", island: "Tenerife", lat: 28.3697, lon: -16.7144, type: "municipality" },
  { id: "guimar", name: "Güímar", island: "Tenerife", lat: 28.3197, lon: -16.4078, type: "municipality" },
  { id: "teide", name: "Pico del Teide", island: "Tenerife", lat: 28.2724, lon: -16.6425, type: "municipality", webcam: WEBCAMS.teide },

  // Gran Canaria
  { id: "lpgc", name: "Las Palmas de Gran Canaria", island: "Gran Canaria", lat: 28.1235, lon: -15.4366, type: "municipality", webcam: WEBCAMS.laspalmasGC },
  { id: "maspalomas", name: "Maspalomas", island: "Gran Canaria", lat: 27.7606, lon: -15.5860, type: "municipality", webcam: WEBCAMS.maspalomas },
  { id: "playa-ingles", name: "Playa del Inglés", island: "Gran Canaria", lat: 27.7546, lon: -15.5719, type: "municipality", webcam: WEBCAMS.playaIngles },
  { id: "puerto-mogan", name: "Puerto de Mogán", island: "Gran Canaria", lat: 27.8156, lon: -15.7644, type: "municipality", webcam: WEBCAMS.puertoMogan },
  { id: "telde", name: "Telde", island: "Gran Canaria", lat: 27.9923, lon: -15.4197, type: "municipality" },
  { id: "agaete", name: "Agaete", island: "Gran Canaria", lat: 28.1014, lon: -15.6997, type: "municipality" },
  { id: "teror", name: "Teror", island: "Gran Canaria", lat: 28.0608, lon: -15.5469, type: "municipality" },
  { id: "arucas", name: "Arucas", island: "Gran Canaria", lat: 28.1197, lon: -15.5236, type: "municipality" },

  // Lanzarote
  { id: "arrecife", name: "Arrecife", island: "Lanzarote", lat: 28.9636, lon: -13.5478, type: "municipality", webcam: WEBCAMS.arrecife },
  { id: "playa-blanca", name: "Playa Blanca (Yaiza)", island: "Lanzarote", lat: 28.8625, lon: -13.8267, type: "municipality" },
  { id: "puerto-carmen", name: "Puerto del Carmen (Tías)", island: "Lanzarote", lat: 28.9217, lon: -13.6647, type: "municipality" },
  { id: "costa-teguise", name: "Costa Teguise", island: "Lanzarote", lat: 28.9933, lon: -13.5006, type: "municipality" },
  { id: "teguise", name: "Teguise", island: "Lanzarote", lat: 29.0608, lon: -13.5639, type: "municipality" },
  { id: "haria", name: "Haría", island: "Lanzarote", lat: 29.1469, lon: -13.4956, type: "municipality" },

  // Fuerteventura
  { id: "puerto-rosario", name: "Puerto del Rosario", island: "Fuerteventura", lat: 28.5004, lon: -13.8627, type: "municipality" },
  { id: "corralejo", name: "Corralejo (La Oliva)", island: "Fuerteventura", lat: 28.7400, lon: -13.8669, type: "municipality", webcam: WEBCAMS.corralejo },
  { id: "morro-jable", name: "Morro Jable (Pájara)", island: "Fuerteventura", lat: 28.0506, lon: -14.3528, type: "municipality" },
  { id: "costa-calma", name: "Costa Calma", island: "Fuerteventura", lat: 28.1611, lon: -14.2300, type: "municipality" },
  { id: "caleta-fuste", name: "Caleta de Fuste (Antigua)", island: "Fuerteventura", lat: 28.3886, lon: -13.8628, type: "municipality" },
  { id: "betancuria", name: "Betancuria", island: "Fuerteventura", lat: 28.4233, lon: -14.0589, type: "municipality" },

  // La Palma
  { id: "santa-cruz-palma", name: "Santa Cruz de La Palma", island: "La Palma", lat: 28.6835, lon: -17.7642, type: "municipality", webcam: WEBCAMS.laPalmaSC },
  { id: "los-llanos", name: "Los Llanos de Aridane", island: "La Palma", lat: 28.6586, lon: -17.9181, type: "municipality" },
  { id: "el-paso", name: "El Paso", island: "La Palma", lat: 28.6539, lon: -17.8703, type: "municipality" },
  { id: "tazacorte", name: "Tazacorte", island: "La Palma", lat: 28.6453, lon: -17.9367, type: "municipality" },
  { id: "fuencaliente", name: "Fuencaliente", island: "La Palma", lat: 28.4878, lon: -17.8453, type: "municipality" },

  // La Gomera
  { id: "san-sebastian", name: "San Sebastián de La Gomera", island: "La Gomera", lat: 28.0916, lon: -17.1133, type: "municipality" },
  { id: "valle-gran-rey", name: "Valle Gran Rey", island: "La Gomera", lat: 28.1011, lon: -17.3358, type: "municipality" },
  { id: "vallehermoso", name: "Vallehermoso", island: "La Gomera", lat: 28.1786, lon: -17.2658, type: "municipality" },
  { id: "hermigua", name: "Hermigua", island: "La Gomera", lat: 28.1681, lon: -17.1936, type: "municipality" },

  // El Hierro
  { id: "valverde", name: "Valverde", island: "El Hierro", lat: 27.8081, lon: -17.9156, type: "municipality", webcam: WEBCAMS.valverde },
  { id: "frontera", name: "Frontera", island: "El Hierro", lat: 27.7547, lon: -18.0103, type: "municipality" },
  { id: "pinar", name: "El Pinar", island: "El Hierro", lat: 27.7156, lon: -17.9886, type: "municipality" },

  // La Graciosa
  { id: "caleta-sebo", name: "Caleta de Sebo", island: "La Graciosa", lat: 29.2308, lon: -13.5036, type: "municipality" },
];
