// Server-only weather fetcher using Open-Meteo (free, no API key).
// Docs: https://open-meteo.com/en/docs

const FULL_PARAMS =
  "temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,pressure_msl,cloud_cover";
const FULL_DAILY =
  "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,uv_index_max,sunrise,sunset,sunshine_duration";

function buildUrl(lat: number, lon: number, current: string, daily: string) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    timezone: "Atlantic/Canary",
    forecast_days: "7",
    current,
    daily,
    wind_speed_unit: "kmh",
    temperature_unit: "celsius",
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

async function fetchWithTimeout(url: string, ms = 8000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(id);
  }
}

export async function fetchOpenMeteo(lat: number, lon: number) {
  // Try the full request up to 3 times with small backoff.
  const fullUrl = buildUrl(lat, lon, FULL_PARAMS, FULL_DAILY);
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetchWithTimeout(fullUrl, 8000);
      if (res.ok) return await res.json();
      // 5xx: retry; 4xx: stop trying
      if (res.status < 500) break;
    } catch {
      // network/timeout -> retry
    }
    await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
  }

  // Fallback: minimal request (much more likely to succeed under load).
  const minimalUrl = buildUrl(
    lat,
    lon,
    "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m,is_day",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max"
  );
  const res = await fetchWithTimeout(minimalUrl, 8000);
  if (!res.ok) throw new Error(`Open-Meteo error: ${res.status}`);
  return await res.json();
}
