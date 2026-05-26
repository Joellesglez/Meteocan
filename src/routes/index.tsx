import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getForecast, getMarine } from "@/lib/weather.functions";
import { LOCATIONS, type Location } from "@/lib/locations";
import { Search, MapPin, Wind, Droplets, Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Video, ExternalLink, Waves, Thermometer, Compass, Timer, Moon } from "lucide-react";
import { TideChart } from "@/components/TideChart";

export const Route = createFileRoute("/")({
  component: Index,
});

const ISLANDS = ["Todas", "Tenerife", "Gran Canaria", "Lanzarote", "Fuerteventura", "La Palma", "La Gomera", "El Hierro", "La Graciosa"];

function pictoToIcon(code: number) {
  if (!code) return { Icon: Sun, label: "Despejado" };
  if (code <= 2) return { Icon: Sun, label: "Soleado" };
  if (code <= 5) return { Icon: Cloud, label: "Parcialmente nuboso" };
  if (code <= 8) return { Icon: Cloud, label: "Nuboso" };
  if (code <= 14) return { Icon: CloudRain, label: "Lluvia" };
  if (code <= 17) return { Icon: CloudLightning, label: "Tormenta" };
  if (code <= 22) return { Icon: CloudSnow, label: "Nieve" };
  return { Icon: Cloud, label: "Variable" };
}

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function degToCardinal(deg: number) {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
  return dirs[Math.round(deg / 22.5) % 16];
}

function Index() {
  const [query, setQuery] = useState("");
  const [island, setIsland] = useState("Todas");
  const [selected, setSelected] = useState<Location>(LOCATIONS[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LOCATIONS.filter((l) => {
      if (island !== "Todas" && l.island !== island) return false;
      if (!q) return true;
      return l.name.toLowerCase().includes(q) || l.island.toLowerCase().includes(q);
    });
  }, [query, island]);

  const fetchForecast = useServerFn(getForecast);
  const fetchMarine = useServerFn(getMarine);

  const { data, isLoading, error } = useQuery({
    queryKey: ["forecast", selected.lat, selected.lon],
    queryFn: () => fetchForecast({ data: { lat: selected.lat, lon: selected.lon } }),
    staleTime: 1000 * 60 * 15,
  });

  const { data: marine } = useQuery({
    queryKey: ["marine", selected.lat, selected.lon, selected.coastal],
    queryFn: () => fetchMarine({ data: { lat: selected.lat, lon: selected.lon } }),
    staleTime: 1000 * 60 * 30,
    enabled: !!selected.coastal,
  });

  const days = data?.data_day;
  const marineDays = marine?.available ? marine.daily : null;

  return (
    <main className="min-h-screen">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-sky opacity-90" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-12 text-primary-foreground">
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] opacity-90">
            <MapPin className="w-4 h-4" /> Islas Canarias
          </div>
          <h1 className="mt-3 text-5xl md:text-6xl font-bold leading-tight">
            El tiempo en las<br />
            <span className="text-accent">ocho islas afortunadas</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">
            Pronóstico de 7 días, isla por isla, municipio por municipio. Mar, oleaje y webcams en directo.
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="glass shadow-soft rounded-2xl p-4 flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-background border border-border">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar isla, municipio o zona…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ISLANDS.map((i) => (
              <button
                key={i}
                onClick={() => setIsland(i)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  island === i
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {(query || island !== "Todas") && (
          <div className="mt-4 glass rounded-2xl p-2 max-h-72 overflow-y-auto shadow-card">
            {filtered.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">Sin resultados.</p>
            ) : (
              filtered.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setSelected(l);
                    setQuery("");
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-secondary flex items-center justify-between gap-3"
                >
                  <span>
                    <span className="font-medium">{l.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{l.island}</span>
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    {l.coastal && <Waves className="w-4 h-4 text-primary/60" />}
                    {l.webcam && <Video className="w-4 h-4 text-accent" />}
                  </span>
                </button>
              ))
            )}
          </div>
        )}

        <p className="mt-2 text-xs text-muted-foreground px-1">
          {LOCATIONS.filter((l) => l.type === "municipality").length} municipios y zonas · {LOCATIONS.filter((l) => l.webcam).length} webcams en directo
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-10 pb-20">
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-3xl gradient-ocean text-primary-foreground p-8 shadow-card relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative">
              <p className="text-sm uppercase tracking-widest opacity-80">{selected.island}</p>
              <h2 className="mt-1 text-4xl font-bold">{selected.name}</h2>
              {isLoading && <p className="mt-8 opacity-70">Cargando pronóstico…</p>}
              {error && <p className="mt-8 text-destructive-foreground">No se pudo cargar el tiempo.</p>}
              {days && (
                <div className="mt-8 flex items-end gap-8 flex-wrap">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-7xl font-bold">{Math.round(days.temperature_max[0])}°</span>
                      <span className="text-2xl opacity-70">/ {Math.round(days.temperature_min[0])}°</span>
                    </div>
                    <p className="mt-1 text-lg opacity-90">{pictoToIcon(days.pictocode?.[0]).label}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm opacity-90">
                    <Stat icon={Wind} label="Viento" value={`${Math.round(days.windspeed_mean?.[0] ?? 0)} m/s`} />
                    <Stat icon={Droplets} label="Lluvia" value={`${days.precipitation[0].toFixed(1)} mm`} />
                    <Stat icon={Cloud} label="Nubes" value={`${Math.round(days.totalcloudcover_mean?.[0] ?? 0)}%`} />
                    <Stat icon={Sun} label="Fiabilidad" value={`${days.predictability[0]}%`} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-card shadow-card p-6 flex flex-col">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Video className="w-4 h-4 text-accent" /> Webcam en directo
            </div>
            {selected.webcam ? (
              <div className="mt-4 flex-1 flex flex-col">
                <div className="aspect-video rounded-2xl gradient-ember relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-ocean-deep/30" />
                  <Video className="relative w-12 h-12 text-primary-foreground" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Cámara pública de {selected.name} vía {selected.webcam.provider}.
                </p>
                <a
                  href={selected.webcam.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-ember text-primary-foreground font-medium text-sm hover:opacity-90 transition"
                >
                  Ver en directo <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground flex-1">
                Aún no tenemos una webcam pública para esta ubicación. Prueba con Candelaria, Maspalomas, Corralejo, Arrecife, Sta. Cruz de La Palma o Puerto de la Cruz.
              </p>
            )}
          </div>
        </div>

        {/* Mar y oleaje */}
        {selected.coastal && marineDays && (
          <div className="mt-5 rounded-3xl bg-card shadow-card p-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Waves className="w-5 h-5 text-primary" /> Mar y oleaje
              </h3>
              <span className="text-xs text-muted-foreground">Próximos 7 días · Atlántico</span>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <SeaStat
                icon={Thermometer}
                label="Temp. del mar hoy"
                value={`${marineDays.sea_surface_temperature_max[0].toFixed(1)}°C`}
                hint={`Mín ${marineDays.sea_surface_temperature_min[0].toFixed(1)}°C`}
              />
              <SeaStat
                icon={Waves}
                label="Altura ola máx."
                value={`${marineDays.wave_height_max[0].toFixed(2)} m`}
                hint={waveLabel(marineDays.wave_height_max[0])}
              />
              <SeaStat
                icon={Timer}
                label="Periodo"
                value={`${marineDays.wave_period_max[0].toFixed(1)} s`}
                hint="Entre crestas"
              />
              <SeaStat
                icon={Compass}
                label="Dirección"
                value={degToCardinal(marineDays.wave_direction_dominant[0])}
                hint={`${Math.round(marineDays.wave_direction_dominant[0])}°`}
              />
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="text-left font-medium py-2">Día</th>
                    <th className="text-right font-medium">Mar (°C)</th>
                    <th className="text-right font-medium">Ola máx.</th>
                    <th className="text-right font-medium">Periodo</th>
                    <th className="text-right font-medium">Dir.</th>
                  </tr>
                </thead>
                <tbody>
                  {marineDays.time.map((t: string, i: number) => {
                    const d = new Date(t);
                    return (
                      <tr key={t} className="border-t border-border/60">
                        <td className="py-2">
                          {i === 0 ? "Hoy" : DAYS[d.getDay()]}{" "}
                          <span className="text-muted-foreground text-xs">{d.getDate()}/{d.getMonth() + 1}</span>
                        </td>
                        <td className="text-right">{marineDays.sea_surface_temperature_max[i].toFixed(1)}°</td>
                        <td className="text-right">{marineDays.wave_height_max[i].toFixed(2)} m</td>
                        <td className="text-right">{marineDays.wave_period_max[i].toFixed(1)} s</td>
                        <td className="text-right">{degToCardinal(marineDays.wave_direction_dominant[i])}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Para horarios exactos de marea alta/baja consulta el aviso oficial de <a className="underline hover:text-primary" target="_blank" rel="noopener noreferrer" href="https://www.puertos.es/es-es/oceanografia/Paginas/portus.aspx">Puertos del Estado · PORTUS</a>.
            </p>
          </div>
        )}

        <h3 className="mt-12 mb-4 text-2xl font-bold">Próximos 7 días</h3>
        {days ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {days.time.map((t: string, i: number) => {
              const d = new Date(t);
              const { Icon, label } = pictoToIcon(days.pictocode?.[i]);
              return (
                <div key={t} className="rounded-2xl bg-card shadow-card p-4 text-center hover:-translate-y-1 transition-transform">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {i === 0 ? "Hoy" : DAYS[d.getDay()]}
                  </p>
                  <p className="text-xs text-muted-foreground/70">{d.getDate()}/{d.getMonth() + 1}</p>
                  <Icon className="mx-auto my-3 w-10 h-10 text-primary" strokeWidth={1.5} />
                  <p className="text-sm font-medium">{label}</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="text-lg font-bold">{Math.round(days.temperature_max[i])}°</span>
                    <span className="text-sm text-muted-foreground">{Math.round(days.temperature_min[i])}°</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {days.precipitation[i] > 0 ? `${days.precipitation[i].toFixed(1)} mm` : "Sin lluvia"}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-card shadow-card h-44 animate-pulse" />
            ))}
          </div>
        )}

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          Datos meteorológicos por <a className="underline hover:text-primary" href="https://www.meteoblue.com" target="_blank" rel="noopener noreferrer">meteoblue</a> · Mar y oleaje por <a className="underline hover:text-primary" href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">Open-Meteo Marine</a> · Webcams cortesía de sus proveedores.
        </footer>
      </section>
    </main>
  );
}

function waveLabel(h: number) {
  if (h < 0.5) return "Mar rizada";
  if (h < 1.25) return "Marejadilla";
  if (h < 2.5) return "Marejada";
  if (h < 4) return "Fuerte marejada";
  return "Mar gruesa";
}

function Stat({ icon: Icon, label, value }: { icon: typeof Wind; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 opacity-70" />
      <span>
        <span className="opacity-70">{label}: </span>
        <span className="font-semibold">{value}</span>
      </span>
    </div>
  );
}

function SeaStat({ icon: Icon, label, value, hint }: { icon: typeof Waves; label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
        <Icon className="w-4 h-4" /> {label}
      </div>
      <p className="mt-1.5 text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
