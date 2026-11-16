import { ArrowRight, ExternalLink } from "lucide-react";
import content from "./contenido.json";
import Charts from "./Charts";
import Mapa from "./Mapa";
import Globe from "./Globe";
import { Enter, Comparison, Process, CodeExplorer, MassLab } from "./Explorers";

const ATLAS_URL = "https://gsaco.github.io/Meteorito/";

function AtlasLink({ className = "" }) {
  return (
    <a className={`atlas-open ${className}`} href={ATLAS_URL}
       target="_blank" rel="noopener noreferrer"
       aria-label="Abrir Meteoritos en una pestaña nueva">
      Abrir Meteoritos <ExternalLink size={17} aria-hidden="true" />
    </a>
  );
}

function AtlasQR() {
  return (
    <div className="atlas-access">
      <img src="assets/qr-meteoritos.svg" width="172" height="172"
           alt="Código QR para abrir https://gsaco.github.io/Meteorito/" />
      <div>
        <span className="micro">EXPLORA EL ATLAS</span>
        <p>Escanea con tu celular o abre la interfaz.</p>
        <AtlasLink />
      </div>
    </div>
  );
}

const authors = [
  "Richard Michel Altamirano Galvez",
  "Gabriel Andreas Saco Alvarado",
  "Fina Rosmery Pretil Pocomucha",
];
const chapters = [
  { label: "El catálogo", start: 0 },
  { label: "Método", start: 3 },
  { label: "Hallazgos", start: 6 },
];
export function ChapterNav({ index }) {
  const current = chapters.findLastIndex((c) => index >= c.start);
  return (
    <nav className="chapter-nav" aria-label="Secciones de la presentación">
      <span className="wordmark">M / METEORITOS</span>
      <div>
        {chapters.map((c, i) => (
          <button
            key={c.label}
            aria-current={i === current ? "step" : undefined}
            onClick={() => window.Reveal.slide(c.start)}
          >
            <span>0{i + 1}</span>
            {c.label}
          </button>
        ))}
        <AtlasLink className="atlas-nav-link" />
      </div>
    </nav>
  );
}
function Items({ items }) {
  return (
    <div className="items">
      {items?.map(([title, body], i) => (
        <Enter key={title} delay={i * 0.08}>
          <span className="item-index">0{i + 1}</span>
          <h3>{title}</h3>
          <p>{body}</p>
        </Enter>
      ))}
    </div>
  );
}
export default function Slide({ s, index, data, world, error, active }) {
  const figure = [
    "figure",
    "chart",
    "quartiles",
    "association",
    "heatmap",
  ].includes(s.kind);
  if (s.kind === "cover")
    return (
      <>
        <div className="cover-data">
          {active && !error && <Globe records={data} world={world} />}
        </div>
        <Enter className="cover-copy">
          <p className="eyebrow">UNIVERSIDAD DEL PACÍFICO · 2026–2</p>
          <h1>
            Meteoritos
            <span>
              Un catálogo.
              <br />
              Miles de historias.
            </span>
          </h1>
          <button className="begin" onClick={() => window.Reveal.next()}>
            Explorar el proyecto <ArrowRight size={22} />
          </button>
          <div className="authors">
            {authors.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
        </Enter>
        <footer className="cover-bottom">
          <span>Herramientas de Programación con Python · Docente: Uwe Rojas</span>
          <span>20–25 MIN · ARRASTRA EL GLOBO PARA GIRAR</span>
        </footer>
      </>
    );
  return (
    <>
      {s.kind !== "demo" && <Enter className="slide-heading">
        <p className="eyebrow">
          {figure
            ? `PREGUNTA ${String(index - 5).padStart(2, "0")} / 10`
            : index < 6
              ? "DATOS Y MÉTODO"
              : index < 20
                ? "DESARROLLO INTERACTIVO"
                : "SÍNTESIS"}
        </p>
        <h2>{s.title.replace(/^P\d+ · /, "")}</h2>
      </Enter>}
      {index === 1 ? (
        <Comparison />
      ) : figure ? (
        <div
          className={`result-layout ${s.kind === "figure" ? "cartography" : ""}`}
        >
          <Enter className="figure-wrap" delay={0.08}>
            <Charts spec={s} tables={content.tables} />
          </Enter>
          <Enter className="finding" delay={0.16}>
            <span className="micro">LECTURA DEL RESULTADO</span>
            <strong>{s.metric}</strong>
            <span className="metric-label">{s.label}</span>
            <p>{s.insight}</p>
            {index === content.slides.length - 1 && <AtlasQR />}
          </Enter>
        </div>
      ) : s.kind === "stats" ? (
        <>
          <div className="metrics">
            {s.metrics.map(([n, l], i) => (
              <Enter key={l} delay={i * 0.12}>
                <strong>{n}</strong>
                <span>{l}</span>
              </Enter>
            ))}
          </div>
          <div className="stats-detail">
            <p className="lead">{s.lead}</p>
            <Items items={s.items} />
          </div>
        </>
      ) : s.kind === "code" ? (
        <>
          <CodeExplorer spec={s} index={index} />
          {index === 18 && <MassLab />}
        </>
      ) : s.kind === "pipeline" ? (
        <Process spec={s} architecture={index === 16} />
      ) : s.kind === "demo" ? (
        <>
          {error ? (
            <p role="alert">
              No se pudieron cargar los datos. Recarga la página.
            </p>
          ) : (
            <Mapa records={data} world={world} />
          )}
          <a
            className="atlas-link"
            href="https://gsaco.github.io/Meteorito/"
            target="_blank"
            rel="noreferrer"
          >
            Abrir el atlas original <ExternalLink size={17} />
          </a>
        </>
      ) : (
        <div className={`text-content ${s.kind}`}>
          <Enter>
            <p className="lead">{s.lead}</p>
          </Enter>
          <Items items={s.items} />
        </div>
      )}
      {s.foot && s.kind !== "demo" && <p className="footnote">{s.foot}</p>}
    </>
  );
}
