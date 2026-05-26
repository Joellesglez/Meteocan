import { createServerFn } from "@tanstack/react-start";
import { fetchMeteoblue } from "./weather.server";

export const getForecast = createServerFn({ method: "GET" })
  .inputValidator((data: { lat: number; lon: number }) => data)
  .handler(async ({ data }) => {
    return await fetchMeteoblue(data.lat, data.lon);
  });

export const getMarine = createServerFn({ method: "GET" })
  .inputValidator((data: { lat: number; lon: number }) => data)
  .handler(async ({ data }) => {
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${data.lat}&longitude=${data.lon}&daily=wave_height_max,wave_direction_dominant,wave_period_max,sea_surface_temperature_max,sea_surface_temperature_min&hourly=sea_surface_temperature,wave_height&timezone=Atlantic%2FCanary&forecast_days=7`;
    try {
      const res = await fetch(url);
      if (!res.ok) return { available: false as const };
      const json = await res.json();
      return { available: true as const, ...json };
    } catch {
      return { available: false as const };
    }
  });
