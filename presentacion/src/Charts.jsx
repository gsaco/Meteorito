import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
const teal = "#7de2dd",
  gold = "#f4bd70",
  muted = "#a5b9b8";
const fmt = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 });
const W = 880,
  H = 490;
function Frame({ children, label }) {
  return (
    <svg
      className="data-chart"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  );
}
function Grid({ max, x = 185, y = 40, w = 620, h = 390, ticks = 4 }) {
  return Array.from({ length: ticks + 1 }, (_, i) => {
    const a = x + (w * i) / ticks;
    return (
      <g key={i}>
        <line x1={a} x2={a} y1={y} y2={y + h} stroke="#35525b" />
        <text
          x={a}
          y={y + h + 28}
          textAnchor="middle"
          fill={muted}
          fontSize="15"
        >
          {fmt.format((max * i) / ticks)}
        </text>
      </g>
    );
  });
}
function Bars({ rows, ranking }) {
  const [hover, setHover] = useState(null),
    reduce = useReducedMotion();
  const values = rows.slice(0, 10).map((r) => ({
    label: ranking ? r.name : r.class,
    value: ranking ? r.masa_t : r.registros,
    color: ranking && r.tipo_registro === "Visto caer" ? gold : teal,
  }));
  const max = ranking ? 60 : 10000;
  return (
    <Frame
      label={
        ranking
          ? "Diez mayores masas catalogadas, en toneladas"
          : "Diez clases más frecuentes, en registros"
      }
    >
      <Grid max={max} />
      {values.map((r, i) => (
        <g
          key={r.label}
          tabIndex="0"
          role="img"
          aria-label={`${r.label}: ${fmt.format(r.value)}`}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(i)}
          onBlur={() => setHover(null)}
        >
          <text
            x="172"
            y={65 + i * 37}
            textAnchor="end"
            fill={hover === i ? "#fff" : muted}
            fontSize="17"
          >
            {r.label}
          </text>
          <motion.rect
            x="185"
            y={46 + i * 37}
            height="26"
            rx="3"
            fill={r.color}
            opacity={hover === null || hover === i ? 1 : 0.35}
            initial={{ width: reduce ? (r.value / max) * 620 : 0 }}
            animate={{ width: (r.value / max) * 620 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : i * 0.035,
            }}
          />
          <text
            x={195 + (r.value / max) * 620}
            y={65 + i * 37}
            fill="#eef3ed"
            fontSize="16"
          >
            {fmt.format(r.value)}
          </text>
          <title>
            {r.label}: {fmt.format(r.value)}
          </title>
        </g>
      ))}
      <text x="500" y="483" textAnchor="middle" fill={muted} fontSize="16">
        {ranking ? "Masa catalogada (toneladas)" : "Número de registros"}
      </text>
    </Frame>
  );
}
function Lines({ rows }) {
  const reduce = useReducedMotion();
  rows = rows.filter((r) => r.decada >= 1800);
  const x = (i) => 66 + (i / (rows.length - 1)) * 755;
  return (
    <Frame label="Registros por década, con escalas separadas para Found y Fell">
      {["Encontrado", "Visto caer"].map((name, k) => {
        const top = k ? 270 : 38,
          max = k ? 100 : 20000,
          h = 145,
          y = (v) => top + h - (v / max) * h;
        const points = rows.map((r, i) => `${x(i)},${y(r[name])}`).join(" ");
        return (
          <g key={name}>
            <rect
              x={x(rows.length - 1) - 14}
              y={top}
              width="30"
              height={h}
              fill="#f4bd7018"
            />
            {[0, 0.5, 1].map((t) => (
              <g key={t}>
                <line
                  x1="66"
                  x2="830"
                  y1={y(t * max)}
                  y2={y(t * max)}
                  stroke="#35525b"
                />
                <text
                  x="54"
                  y={y(t * max) + 5}
                  textAnchor="end"
                  fontSize="15"
                  fill={muted}
                >
                  {fmt.format(t * max)}
                </text>
              </g>
            ))}
            <text x="66" y={top - 14} fontSize="17" fill={k ? gold : teal}>
              {name}
            </text>
            <polygon
              points={`${x(0)},${top + h} ${points} ${x(rows.length - 1)},${top + h}`}
              fill={k ? "#f4bd7012" : "#7de2dd12"}
            />
            <motion.polyline
              points={points}
              fill="none"
              stroke={k ? gold : teal}
              strokeWidth="3"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduce ? 0 : 1 }}
            />
            {rows.map(
              (r, i) =>
                i % 3 === 0 && (
                  <text
                    key={i}
                    x={x(i)}
                    y={top + h + 25}
                    fill={muted}
                    textAnchor="middle"
                    fontSize="15"
                  >
                    {r.decada}
                  </text>
                ),
            )}
            {rows.map((r, i) => (
              <circle
                key={i}
                cx={x(i)}
                cy={y(r[name])}
                r="4"
                fill={k ? gold : teal}
              >
                <title>
                  {r.decada}: {r[name]} {name}
                </title>
              </circle>
            ))}
          </g>
        );
      })}
      <text x="450" y="483" fill={muted} fontSize="16" textAnchor="middle">
        Década del año catalogado
      </text>
    </Frame>
  );
}
function Histogram({ rows }) {
  const reduce = useReducedMotion();
  const max = 5000,
    min = rows[0].log10_desde,
    end = rows.at(-1).log10_hasta;
  const x = (v) => 65 + ((v - min) / (end - min)) * 750,
    y = (v) => 410 - (v / max) * 350;
  return (
    <Frame label="Histograma de la masa positiva, logaritmo base diez en gramos">
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <line
            x1="65"
            x2="820"
            y1={y(t * max)}
            y2={y(t * max)}
            stroke="#35525b"
          />
          <text
            x="52"
            y={y(t * max) + 5}
            textAnchor="end"
            fill={muted}
            fontSize="15"
          >
            {fmt.format(max * t)}
          </text>
        </g>
      ))}
      {rows.map((r, i) => (
        <motion.rect
          key={i}
          x={x(r.log10_desde)}
          width={Math.max(1, x(r.log10_hasta) - x(r.log10_desde) - 1)}
          y={y(r.registros)}
          height={410 - y(r.registros)}
          fill={i > 9 && i < 17 ? teal : "#489c9f"}
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : i * 0.012 }}
        >
          <title>
            {r.log10_desde.toFixed(2)}–{r.log10_hasta.toFixed(2)}: {r.registros}{" "}
            registros
          </title>
        </motion.rect>
      ))}
      {[-2, 0, 2, 4, 6].map((t) => (
        <text
          key={t}
          x={x(t)}
          y="440"
          fill={muted}
          textAnchor="middle"
          fontSize="16"
        >
          {t}
        </text>
      ))}
      <line
        x1={x(Math.log10(32.695))}
        x2={x(Math.log10(32.695))}
        y1="35"
        y2="410"
        stroke={gold}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <text x={x(Math.log10(32.695)) + 12} y="32" fill={gold} fontSize="17">
        Mediana: 32,70 g
      </text>
      <text x="450" y="483" fill={muted} textAnchor="middle" fontSize="16">
        Logaritmo de la masa en gramos, log₁₀(g)
      </text>
    </Frame>
  );
}
function Heatmap({ rows }) {
  const [tip, setTip] = useState("Cada columna suma 100 %");
  const years = Object.keys(rows[0]).filter((k) => k !== "clase_grafico");
  return (
    <div className="heatmap-wrap">
      <Frame label="Composición porcentual de clases por década">
        <defs>
          <linearGradient id="scale">
            <stop stopColor="#15353f" />
            <stop offset="100%" stopColor={teal} />
          </linearGradient>
        </defs>
        {rows.map((r, i) => (
          <g key={r.clase_grafico}>
            <text
              x="95"
              y={53 + i * 40}
              textAnchor="end"
              fill={muted}
              fontSize="16"
            >
              {r.clase_grafico}
            </text>
            {years.map((yr, j) => {
              const v = r[yr];
              return (
                <g
                  key={yr}
                  tabIndex="0"
                  role="img"
                  aria-label={`${r.clase_grafico}, ${yr}: ${v.toFixed(1)} %`}
                  onMouseEnter={() =>
                    setTip(`${r.clase_grafico} · ${yr} · ${fmt.format(v)} %`)
                  }
                  onFocus={() =>
                    setTip(`${r.clase_grafico} · ${yr} · ${fmt.format(v)} %`)
                  }
                >
                  <rect
                    x={110 + j * 58}
                    y={27 + i * 40}
                    width="55"
                    height="37"
                    rx="2"
                    fill={`rgb(${21 + v * 1.04},${53 + v * 1.73},${63 + v * 1.58})`}
                  />
                  <text
                    x={137 + j * 58}
                    y={52 + i * 40}
                    textAnchor="middle"
                    fontSize="15"
                    fill={v > 50 ? "#102b36" : "#eef3ed"}
                  >
                    {v.toFixed(1)}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        {years.map((yr, j) => (
          <text
            key={yr}
            x={137 + j * 58}
            y="412"
            textAnchor="middle"
            fill={muted}
            fontSize="15"
          >
            {yr}
          </text>
        ))}
        <rect x="110" y="450" width="220" height="8" fill="url(#scale)" />
        <text x="110" y="480" fill={muted} fontSize="15">
          0 %
        </text>
        <text x="330" y="480" fill={muted} textAnchor="end" fontSize="15">
          100 %
        </text>
      </Frame>
      <div className="chart-tip" aria-live="polite">
        {tip}
      </div>
    </div>
  );
}
export default function Charts({ spec, tables }) {
  if (spec.chart === "clases") return <Bars rows={tables.P4_clases} />;
  if (spec.chart === "ranking")
    return <Bars rows={tables.P7_mayores_masas} ranking />;
  if (spec.chart === "decadas") return <Lines rows={tables.P3_decadas} />;
  if (spec.chart === "histograma")
    return <Histogram rows={tables.P5_histograma} />;
  if (spec.kind === "heatmap") return <Heatmap rows={tables.P9_clases_pct} />;
  return (
    <img
      className="source-chart"
      src={`assets/${spec.image}?v=${__ASSET_VERSION__}`}
      alt={spec.title}
    />
  );
}
