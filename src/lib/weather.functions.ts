import { createServerFn } from "@tanstack/react-start";
import { fetchMeteoblue } from "./weather.server";

export const getForecast = createServerFn({ method: "GET" })
  .inputValidator((data: { lat: number; lon: number }) => data)
  .handler(async ({ data }) => {
    return await fetchMeteoblue(data.lat, data.lon);
  });
