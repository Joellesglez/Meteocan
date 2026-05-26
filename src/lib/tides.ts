// Approximate tide model for the Canary Islands using principal harmonic
// constituents (M2 semidiurnal lunar + S2 semidiurnal solar). Anchored so the
// spring/neap cycle matches the lunar synodic month. Longitude correction
// shifts the wave westward at Earth's rotation rate. Output is in meters
// around mean sea level — use only as a visual reference.
//
// For official high/low tide times in Spain, consult Puertos del Estado.

const M2_PERIOD_H = 12.4206; // hours
const S2_PERIOD_H = 12.0;

// Reference: 2000-01-06 18:14 UTC — a known new moon (sun & moon aligned at
// Greenwich meridian). Anchors the M2+S2 phase so spring tides recur ~14 days
// after each new and full moon, which matches Canarias reality within ~1h.
const EPOCH_MS = Date.UTC(2000, 0, 6, 18, 14, 0);

export type TidePoint = { t: number; h: number };
export type TideExtremum = { t: number; h: number; type: "high" | "low" };

export function computeTideSeries(opts: {
  lat: number;
  lon: number;
  startMs: number;
  hours: number;
  stepMinutes?: number;
}): { series: TidePoint[]; extrema: TideExtremum[] } {
  const { lon, startMs, hours } = opts;
  const stepMin = opts.stepMinutes ?? 15;
  const steps = Math.ceil((hours * 60) / stepMin) + 1;

  // Longitude correction: lunar wave travels westward at ~15°/h, so a point
  // at longitude `lon` reaches the same phase `lon/15` hours later than
  // Greenwich. (Lon west is negative → time advances earlier in our formula.)
  const lonHourShift = lon / 15;

  // Amplitudes (m) — representative of Canarias open-ocean tide range ~2-3 m.
  const A_M2 = 0.85;
  const A_S2 = 0.32;

  const series: TidePoint[] = [];
  for (let i = 0; i < steps; i++) {
    const t = startMs + i * stepMin * 60_000;
    const hoursSinceEpoch = (t - EPOCH_MS) / 3_600_000 - lonHourShift;
    const m2 = A_M2 * Math.cos((2 * Math.PI * hoursSinceEpoch) / M2_PERIOD_H);
    const s2 = A_S2 * Math.cos((2 * Math.PI * hoursSinceEpoch) / S2_PERIOD_H);
    series.push({ t, h: m2 + s2 });
  }

  // Detect local extrema (high = pleamar, low = bajamar)
  const extrema: TideExtremum[] = [];
  for (let i = 1; i < series.length - 1; i++) {
    const a = series[i - 1].h;
    const b = series[i].h;
    const c = series[i + 1].h;
    if (b > a && b > c) extrema.push({ t: series[i].t, h: b, type: "high" });
    else if (b < a && b < c) extrema.push({ t: series[i].t, h: b, type: "low" });
  }
  return { series, extrema };
}
