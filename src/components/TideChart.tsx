import { useMemo } from "react";
import { computeTideSeries, type TideExtremum } from "@/lib/tides";

type Props = { lat: number; lon: number };

const HOURS = 72; // 3 días

export function TideChart({ lat, lon }: Props) {
  const { series, extrema, dayMarks, range } = useMemo(() => {
    const start = new Date();
    start.setMinutes(0, 0, 0);
    const startMs = start.getTime();
    const { series, extrema } = computeTideSeries({
      lat,
      lon,
      startMs,
      hours: HOURS,
      stepMinutes: 15,
    });
    const min = Math.min(...series.map((p) => p.h));
    const max = Math.max(...series.map((p) => p.h));
    const dayMarks: { t: number; label: string }[] = [];
    const d = new Date(startMs);
    d.setHours(0, 0, 0, 0);
    for (let i = 0; i <= 3; i++) {
      const t = d.getTime() + i * 86_400_000;
      if (t >= startMs && t <= startMs + HOURS * 3_600_000) {
        dayMarks.push({
          t,
          label: new Date(t).toLocaleDateString("es-ES", { weekday: "short", day: "numeric" }),
        });
      }
    }
    return { series, extrema, dayMarks, range: { min, max } };
  }, [lat, lon]);

  const W = 800;
  const H = 220;
  const PAD = { l: 36, r: 12, t: 18, b: 28 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const startMs = series[0].t;
  const endMs = series[series.length - 1].t;
  const xScale = (t: number) => PAD.l + ((t - startMs) / (endMs - startMs)) * innerW;
  const yScale = (h: number) =>
    PAD.t + innerH - ((h - range.min) / (range.max - range.min || 1)) * innerH;

  const pathD = series
    .map((p, i) => `${i === 0 ? "M" : "L"}${xScale(p.t).toFixed(1)},${yScale(p.h).toFixed(1)}`)
    .join(" ");
  const areaD = `${pathD} L${xScale(endMs).toFixed(1)},${PAD.t + innerH} L${xScale(startMs).toFixed(1)},${PAD.t + innerH} Z`;

  const now = Date.now();

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="none">
        <defs>
          <linearGradient id="tideArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.52 0.14 220)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(0.52 0.14 220)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* day separators */}
        {dayMarks.map((m) => (
          <g key={m.t}>
            <line
              x1={xScale(m.t)}
              x2={xScale(m.t)}
              y1={PAD.t}
              y2={PAD.t + innerH}
              stroke="oklch(0.9 0.02 220)"
              strokeDasharray="3 4"
            />
            <text
              x={xScale(m.t) + 4}
              y={H - 8}
              fontSize="11"
              fill="oklch(0.48 0.03 240)"
              className="font-medium"
            >
              {m.label}
            </text>
          </g>
        ))}

        {/* baseline */}
        <line
          x1={PAD.l}
          x2={W - PAD.r}
          y1={yScale(0)}
          y2={yScale(0)}
          stroke="oklch(0.9 0.02 220)"
        />
        <text x={4} y={yScale(0) + 4} fontSize="10" fill="oklch(0.48 0.03 240)">
          0 m
        </text>
        <text x={4} y={yScale(range.max) + 4} fontSize="10" fill="oklch(0.48 0.03 240)">
          {range.max.toFixed(1)} m
        </text>
        <text x={4} y={yScale(range.min) + 4} fontSize="10" fill="oklch(0.48 0.03 240)">
          {range.min.toFixed(1)} m
        </text>

        {/* tide curve */}
        <path d={areaD} fill="url(#tideArea)" />
        <path d={pathD} fill="none" stroke="oklch(0.42 0.13 225)" strokeWidth="2" />

        {/* now line */}
        {now >= startMs && now <= endMs && (
          <g>
            <line
              x1={xScale(now)}
              x2={xScale(now)}
              y1={PAD.t}
              y2={PAD.t + innerH}
              stroke="oklch(0.7 0.2 40)"
              strokeWidth="1.5"
            />
            <text
              x={xScale(now) + 4}
              y={PAD.t + 12}
              fontSize="11"
              fill="oklch(0.7 0.2 40)"
              className="font-semibold"
            >
              Ahora
            </text>
          </g>
        )}

        {/* extrema */}
        {extrema.map((e, i) => (
          <g key={i}>
            <circle
              cx={xScale(e.t)}
              cy={yScale(e.h)}
              r="4"
              fill={e.type === "high" ? "oklch(0.7 0.2 40)" : "oklch(0.42 0.13 225)"}
            />
            <text
              x={xScale(e.t)}
              y={e.type === "high" ? yScale(e.h) - 10 : yScale(e.h) + 16}
              fontSize="10"
              textAnchor="middle"
              fill="oklch(0.22 0.05 240)"
              className="font-semibold"
            >
              {new Date(e.t).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
            </text>
          </g>
        ))}
      </svg>

      <ExtremaTable extrema={extrema} startMs={startMs} />
    </div>
  );
}

function ExtremaTable({ extrema, startMs }: { extrema: TideExtremum[]; startMs: number }) {
  // Group by day for the next 3 days
  const days: Record<string, TideExtremum[]> = {};
  for (const e of extrema) {
    const d = new Date(e.t);
    const key = d.toISOString().slice(0, 10);
    (days[key] ||= []).push(e);
  }
  const keys = Object.keys(days).slice(0, 3);

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
      {keys.map((k) => {
        const d = new Date(k);
        const isToday = k === new Date(startMs).toISOString().slice(0, 10);
        return (
          <div key={k} className="rounded-xl bg-secondary/60 p-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              {isToday ? "Hoy" : d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "short" })}
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {days[k].map((e, i) => (
                <li key={i} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        e.type === "high" ? "bg-[oklch(0.7_0.2_40)]" : "bg-[oklch(0.42_0.13_225)]"
                      }`}
                    />
                    <span className="font-medium">{e.type === "high" ? "Pleamar" : "Bajamar"}</span>
                  </span>
                  <span className="tabular-nums">
                    {new Date(e.t).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                    <span className="ml-2 text-muted-foreground text-xs">{e.h >= 0 ? "+" : ""}{e.h.toFixed(2)} m</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
