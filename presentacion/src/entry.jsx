import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Slide, { ChapterNav } from "./Slide";
import { MotionConfig } from "motion/react";
import content from "./contenido.json";

// Reveal controla la navegación. React mantiene solamente el estado del contenido.
let dataset;
function loadData() {
  return (dataset ??= Promise.all(
    ["meteoritos.json", "paises_110m.geojson"].map((f) =>
      fetch(`assets/${f}`).then((r) => {
        if (!r.ok) throw new Error(f);
        return r.json();
      }),
    ),
  ));
}
function Island({ index, active }) {
  const [data, setData] = useState([]),
    [world, setWorld] = useState(null),
    [error, setError] = useState(false);
  useEffect(() => {
    if (![0, 17].includes(index) || !active) return;
    let cancelled = false;
    loadData()
      .then(([d, w]) => {
        if (!cancelled) {
          setData(d.records);
          setWorld(w);
        }
      })
      .catch(() => setError(true));
    return () => {
      cancelled = true;
    };
  }, [index, active]);
  // Desmontar el mapa detiene requestAnimationFrame y el avance de años fuera de la demo.
  if (index === 17 && !active)
    return (
      <div className="slide demo">
        <h2>Demostración con datos reales</h2>
        <p>Filtros temporales y de masa sobre las coordenadas del catálogo.</p>
      </div>
    );
  return (
    <MotionConfig reducedMotion="user">
      <div
        data-active={active}
        className={`slide ${content.slides[index].kind} slide-${index + 1}`}
      >
        <ChapterNav index={index} />
        <Slide
          key={active ? "active" : "idle"}
          s={content.slides[index]}
          index={index}
          data={data}
          world={world}
          error={error}
          active={active}
        />
        <div className="slide-number">
          {String(index + 1).padStart(2, "0")}
          <span>/ {content.slides.length}</span>
        </div>
      </div>
    </MotionConfig>
  );
}
const islands = [];
function refresh() {
  const current = window.Reveal?.getCurrentSlide();
  for (const { node, root, index } of islands) {
    const active = node.closest("section") === current;
    root.render(<Island index={index} active={active} />);
  }
}
function init() {
  if (!window.Reveal) {
    setTimeout(init, 50);
    return;
  }
  document.querySelectorAll("[data-react-slide]").forEach((node) => {
    islands.push({
      node,
      root: createRoot(node),
      index: Number(node.dataset.reactSlide),
    });
  });
  Reveal.on("ready", refresh);
  Reveal.on("slidechanged", refresh);
  refresh();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches)
    Reveal.configure({ transition: "none", backgroundTransition: "none" });
  // No avanzar la presentación al usar las flechas en filtros o selectores.
  document.addEventListener(
    "keydown",
    (e) => {
      if (
        ["INPUT", "SELECT"].includes(e.target.tagName) ||
        (e.target.tagName === "BUTTON" && [" ", "Enter"].includes(e.key))
      )
        e.stopPropagation();
    },
    true,
  );
  window.__meteoritosReady = true;
}
init();
