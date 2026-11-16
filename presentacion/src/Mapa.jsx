import { useEffect, useRef, useMemo, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { filtrar, proyectar, fuerzaMasa, formatoMasa, numero } from "./datos";

export default function Mapa({ records = [], world, compact = false }) {
  const [year, setYear] = useState(2013),
    [type, setType] = useState("all"),
    [mass, setMass] = useState(0),
    [playing, setPlaying] = useState(false),
    [selected, setSelected] = useState(null),
    [waves, setWaves] = useState(true);
  const reduced = useReducedMotion(),
    canvas = useRef(null),
    hitPoints = useRef([]);
  const visible = useMemo(
    () => filtrar(records, year, type, mass),
    [records, year, type, mass],
  );
  const paths = useMemo(
    () =>
      world?.features.flatMap((f) => {
        const polygons =
          f.geometry.type === "MultiPolygon"
            ? f.geometry.coordinates
            : [f.geometry.coordinates];
        return polygons.map((p) =>
          p
            .map(
              (r) =>
                r
                  .map(
                    ([x, y], i) =>
                      `${i ? "L" : "M"}${proyectar(x, y, 1000, 500).join(",")}`,
                  )
                  .join("") + "Z",
            )
            .join(""),
        );
      }) || [],
    [world],
  );
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(
      () =>
        setYear((y) => {
          if (y >= 2013) {
            setPlaying(false);
            return 2013;
          }
          return y + 1;
        }),
      120,
    );
    return () => clearInterval(t);
  }, [playing]);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    let frame,
      dead = false;
    const ctx = el.getContext("2d");
    function setup() {
      const w = el.clientWidth,
        h = el.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cache = document.createElement("canvas");
      cache.width = el.width;
      cache.height = el.height;
      const c = cache.getContext("2d");
      c.scale(dpr, dpr);
      const points = visible.map((r) => {
        const [x, y] = proyectar(r.lon, r.lat, w, h);
        return { r, x, y };
      });
      hitPoints.current = points;
      points.forEach(({ r, x, y }) => {
        c.fillStyle = r.fall === "Fell" ? "#f4bd70" : "#7de2dd";
        c.globalAlpha = r.fall === "Fell" ? 0.95 : 0.4;
        c.beginPath();
        c.arc(x, y, 1.2 + fuerzaMasa(r.mass) * 1.8, 0, Math.PI * 2);
        c.fill();
      });
      const falls = points.filter((p) => p.r.fall === "Fell");
      const active = falls
        .filter((_, i) => i % Math.max(1, Math.floor(falls.length / 35)) === 0)
        .slice(0, 35);
      const draw = (time) => {
        if (dead) return;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(cache, 0, 0, w, h);
        if (waves && !reduced)
          active.forEach(({ r, x, y }) => {
            const p = ((time + r.id * 43) % 2800) / 2800;
            ctx.beginPath();
            ctx.arc(
              x,
              y,
              3 + p * (10 + 28 * fuerzaMasa(r.mass)),
              0,
              Math.PI * 2,
            );
            ctx.strokeStyle = `rgba(244,189,112,${0.65 * (1 - p)})`;
            ctx.lineWidth = 1.6;
            ctx.stroke();
          });
        if (selected) {
          const p = points.find((p) => p.r.id === selected.id);
          if (p) {
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        if (waves && !reduced) frame = requestAnimationFrame(draw);
      };
      cancelAnimationFrame(frame);
      draw(performance.now());
    }
    const ro = new ResizeObserver(setup);
    ro.observe(el);
    setup();
    return () => {
      dead = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [visible, waves, reduced, selected]);
  function pick(e) {
    const b = e.currentTarget.getBoundingClientRect(),
      x = ((e.clientX - b.left) * e.currentTarget.clientWidth) / b.width,
      y = ((e.clientY - b.top) * e.currentTarget.clientHeight) / b.height;
    let best = null,
      d = 20;
    for (const p of hitPoints.current) {
      const n = Math.hypot(p.x - x, p.y - y);
      if (n < d) {
        best = p.r;
        d = n;
      }
    }
    setSelected(best);
  }
  return (
    <div className={`map-demo ${compact ? "compact" : ""}`}>
      <div className="map-surface">
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {paths.map((p, i) => (
            <path key={i} d={p} />
          ))}
        </svg>
        <canvas
          ref={canvas}
          onClick={pick}
          aria-label="Mapa de meteoritos con coordenadas reales"
        />
        <div className="map-count">
          <strong>{numero.format(visible.length)}</strong>
          <span>registros mapeables hasta {year}</span>
        </div>
        {selected && (
          <div className="record">
            <button aria-label="Cerrar ficha" onClick={() => setSelected(null)}>
              ×
            </button>
            <strong>{selected.name}</strong>
            <span>
              {selected.year} · {selected.fall} · {formatoMasa(selected.mass)}
            </span>
          </div>
        )}
        <div className="map-legend">
          <span>● Found</span>
          <span>● Fell</span>
        </div>
      </div>
      {!compact && (
        <div className="map-controls">
          <div className="filters">
            <label>
              Tipo
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setSelected(null);
                }}
              >
                <option value="all">Todos</option>
                <option value="Found">Found · encontrados</option>
                <option value="Fell">Fell · vistos caer</option>
              </select>
            </label>
            <label>
              Masa mínima
              <select
                value={mass}
                onChange={(e) => {
                  setMass(Number(e.target.value));
                  setSelected(null);
                }}
              >
                <option value="0">Todas las masas</option>
                <option value="1000">1 kg</option>
                <option value="1000000">1 t</option>
              </select>
            </label>
            <label className="switch">
              <input
                type="checkbox"
                checked={waves}
                onChange={(e) => setWaves(e.target.checked)}
              />
              Pulsos
            </label>
            <button
              onClick={() => {
                setYear(2007);
                setType("Fell");
                setMass(0);
                setSelected(records.find((r) => r.name === "Carancas"));
              }}
            >
              Carancas
            </button>
          </div>
          <div className="time-control">
            <button
              aria-label={playing ? "Pausar años" : "Reproducir años"}
              onClick={() => {
                if (year === 2013) setYear(1800);
                setPlaying(!playing);
              }}
            >
              {playing ? <Pause /> : <Play />}
            </button>
            <span>1800</span>
            <input
              aria-label="Año máximo"
              type="range"
              min="1800"
              max="2013"
              value={year}
              onChange={(e) => {
                setYear(+e.target.value);
                setSelected(null);
              }}
            />
            <strong>{year}</strong>
          </div>
          <p>
            Acumulado por año catalogado. Sin registros de año desconocido. Las
            ondas son simbólicas. Cartografía: Natural Earth.
          </p>
        </div>
      )}
    </div>
  );
}
