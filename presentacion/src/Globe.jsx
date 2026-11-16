import { useEffect, useMemo, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";

// Proyección ortográfica: solo se dibuja el hemisferio visible.
export default function Globe({ records, world }) {
  const canvas = useRef(null);
  const rotation = useRef(65);
  const drag = useRef(null);
  const redraw = useRef(() => {});
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const points = useMemo(
    () =>
      records
        .filter((r) => r.terrestrial && r.mappable)
        .map((r) => {
          const lat = (r.lat * Math.PI) / 180,
            lon = (r.lon * Math.PI) / 180;
          return {
            x: Math.cos(lat) * Math.cos(lon),
            y: Math.cos(lat) * Math.sin(lon),
            z: Math.sin(lat),
            fell: r.fall === "Fell",
            id: r.id,
          };
        }),
    [records],
  );
  useEffect(() => {
    const el = canvas.current;
    if (!el || !world) return;
    const ctx = el.getContext("2d"),
      size = 800,
      radius = 343;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    el.width = size * dpr;
    el.height = size * dpr;
    ctx.scale(dpr, dpr);
    const projection = geoOrthographic().translate([400, 400]).scale(radius);
    const path = geoPath(projection, ctx),
      grid = geoGraticule10();
    let frame,
      last = 0;
    function draw(t) {
      if (!paused && !reduced) frame = requestAnimationFrame(draw);
      if (!paused && !reduced && t - last < 33) return;
      const dt = Math.min(80, t - last);
      last = t;
      if (!paused && !reduced && !drag.current) rotation.current += dt * 0.002;
      projection.rotate([rotation.current, 16]);
      ctx.clearRect(0, 0, size, size);
      const ocean = ctx.createRadialGradient(290, 220, 20, 400, 400, radius);
      ocean.addColorStop(0, "#163a44");
      ocean.addColorStop(1, "#071a23");
      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.fillStyle = ocean;
      ctx.fill();
      ctx.strokeStyle = "#31575c";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.beginPath();
      path(grid);
      ctx.strokeStyle = "#7de2dd12";
      ctx.stroke();
      ctx.beginPath();
      path(world);
      ctx.fillStyle = "#244a4b";
      ctx.fill();
      ctx.strokeStyle = "#67928a66";
      ctx.lineWidth = 0.6;
      ctx.stroke();
      const a = (rotation.current * Math.PI) / 180,
        b = (16 * Math.PI) / 180;
      const ca = Math.cos(a),
        sa = Math.sin(a),
        cb = Math.cos(b),
        sb = Math.sin(b);
      // La misma rotación esférica que la proyección de D3, precalculada por punto.
      for (const p of points) {
        const x = p.x * ca - p.y * sa,
          y = p.x * sa + p.y * ca;
        const front = x * cb - p.z * sb;
        if (front < 0) continue;
        const px = 400 + radius * y,
          py = 400 - radius * (p.z * cb + x * sb);
        ctx.fillStyle = p.fell ? "#f4bd70" : "#7de2dd";
        ctx.globalAlpha = p.fell ? 0.95 : 0.38;
        ctx.beginPath();
        ctx.arc(px, py, p.fell ? 1.9 : 1.1, 0, 2 * Math.PI);
        ctx.fill();
        if (p.fell && p.id % 47 === 0 && !paused && !reduced) {
          const phase = ((t + p.id * 19) % 2800) / 2800;
          ctx.beginPath();
          ctx.arc(px, py, 3 + phase * 19, 0, 2 * Math.PI);
          ctx.globalAlpha = 0.7 * (1 - phase);
          ctx.strokeStyle = "#f4bd70";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }
    redraw.current = () => draw(performance.now());
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      redraw.current = () => {};
    };
  }, [world, points, paused, reduced]);
  return (
    <div className="globe-wrap">
      <canvas
        ref={canvas}
        aria-label="Globo de 32 186 registros terrestres con coordenadas utilizables. Arrastra para girar."
        onPointerDown={(e) => {
          drag.current = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (drag.current !== null) {
            rotation.current += (e.clientX - drag.current) * 0.28;
            drag.current = e.clientX;
            if (paused || reduced) redraw.current();
          }
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      />
      <div className="globe-caption">
        <span>
          <i /> Found <i className="gold" /> Fell
        </span>
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Girar globo" : "Pausar globo"}
        >
          {paused ? <Play size={15} /> : <Pause size={15} />}{" "}
          {paused ? "Girar" : "Pausar"}
        </button>
      </div>
    </div>
  );
}
