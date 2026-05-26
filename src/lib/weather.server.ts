// Server-only — API key never reaches the client bundle.
const METEOBLUE_KEY = "ZjXwcaMbf65JD3KE";

export async function fetchMeteoblue(lat: number, lon: number) {
  const url = `https://my.meteoblue.com/packages/basic-day_clouds-day?apikey=${METEOBLUE_KEY}&lat=${lat}&lon=${lon}&format=json&temperature=C&windspeed=ms-1&timeformat=Y-M-D`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Meteoblue API error: ${res.status}`);
  return await res.json();
}
