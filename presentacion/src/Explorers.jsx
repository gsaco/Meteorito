import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { fuerzaMasa } from "./datos";

export function Enter({ children, delay = 0, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function Tokens({ line }) {
  if (/^\s*(#|\/\/)/.test(line))
    return <span className="token-comment">{line}</span>;
  return line
    .split(
      /("[^"]*"|'[^']*'|\b(?:def|return|const|Math|useMemo|requestAnimationFrame)\b|\b\d[\d._]*\b)/g,
    )
    .map((s, i) => (
      <span
        key={i}
        className={
          /^["']/.test(s)
            ? "token-string"
            : /^\d/.test(s)
              ? "token-number"
              : /^(def|return|const|Math|useMemo|requestAnimationFrame)$/.test(
                    s,
                  )
                ? "token-keyword"
                : ""
        }
      >
        {s}
      </span>
    ));
}
export function Code({ code, focus = null, language = "Python" }) {
  return (
    <div className="code-window">
      <div className="code-caption">
        <span>{language}</span>
        <span>LECTURA DEL CÓDIGO</span>
      </div>
      <pre>
        <code>
          {code.split("\n").map((line, i) => (
            <span
              key={i}
              className={`code-line ${focus?.includes(i) ? "is-focused" : ""} ${focus && !focus.includes(i) ? "is-muted" : ""}`}
            >
              <em>{String(i + 1).padStart(2, "0")}</em>
              <Tokens line={line || " "} />
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function Comparison() {
  const [type, setType] = useState("Found");
  const found = type === "Found";
  return (
    <div className={`comparison ${found ? "found" : "fell"}`}>
      <div className="comparison-copy">
        <p className="big-question">
          ¿Qué nos dice
          <br />
          un meteorito
          <br />
          <em>registrado?</em>
        </p>
        <p className="support">
          Geografía, tiempo y masa en un catálogo histórico.
        </p>
      </div>
      <div className="comparison-evidence">
        <div className="segmented" aria-label="Tipo de registro">
          {["Found", "Fell"].map((t) => (
            <button
              key={t}
              aria-pressed={type === t}
              onClick={() => setType(t)}
            >
              {t}
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <strong className="comparison-number">
              {found ? "44 608" : "1 107"}
            </strong>
            <h3>{found ? "Encontrados" : "Vistos caer"}</h3>
            <p>
              {found
                ? "Recuperados después de su caída. El año puede corresponder al hallazgo."
                : "La caída fue observada. Son una pequeña parte del catálogo terrestre."}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="proportion" aria-label="97,6 % Found y 2,4 % Fell">
          <span />
          <span />
        </div>
        <div className="proportion-label">
          <span>97,6 % Found</span>
          <span>2,4 % Fell</span>
        </div>
      </div>
    </div>
  );
}

const processNotes = [
  [
    "Lectura y estructura",
    "read_csv carga los archivos; head, info y describe revisan el catálogo. El diccionario define las variables."
  ],
  [
    "Una llave, una tabla",
    "id es único. El diccionario y la cartografía son auxiliares: no corresponde inventar un merge. Se verifica la conservación de filas."
  ],
  [
    "Reglas explícitas",
    "Se revisan tipos, faltantes, duplicados, textos y años. No se imputan valores; cada pregunta utiliza su muestra válida."
  ],
  [
    "Reestructurar para analizar",
    "groupby resume grupos; pivot_table organiza décadas; melt convierte P9 a formato largo y se verifica su reconstrucción."
  ],
  [
    "Diez preguntas verificables",
    "pandas calcula las estadísticas. Matplotlib produce las figuras; Cartopy añade las proyecciones cartográficas."
  ],
  [
    "Interpretación y entrega",
    "Los hallazgos se explican en lenguaje sencillo, con límites de cobertura y selección. Se entregan informe, notebook, CSV, Excel y capturas."
  ]
];
const architectureNotes = [
  [
    "Un documento editable",
    "El archivo .qmd reúne las 22 láminas, las notas del expositor y la configuración de la presentación.",
  ],
  [
    "Navegación para exponer",
    "Flechas para avanzar, Esc para la vista general y S para abrir las notas del expositor.",
  ],
  [
    "Interacción con estado",
    "Los filtros actualizan los datos visibles. Los componentes se activan al entrar y detienen sus animaciones al salir.",
  ],
  [
    "Dos superficies de dibujo",
    "SVG conserva gráficos nítidos e interactivos. Canvas dibuja miles de puntos y ondas en un solo lienzo.",
  ],
];
export function Process({ spec, architecture }) {
  const [step, setStep] = useState(0);
  const notes = architecture ? architectureNotes : processNotes;
  return (
    <div className={`process ${architecture ? "architecture" : "workflow"}`}>
      <div className="process-track">
        {spec.items.map(([title, body], i) => (
          <button
            key={title}
            onClick={() => setStep(i)}
            aria-pressed={step === i}
          >
            <span className="step-index">0{i + 1}</span>
            <h3>{title.replace(/^\d+ · /, "")}</h3>
            <p>{body}</p>
            <span className="step-line" />
          </button>
        ))}
      </div>
      <div className="process-detail">
        <div key={step} className="process-description">
          <span className="micro">ETAPA 0{step + 1}</span>
          <h3>{notes[step][0]}</h3>
          <p>{notes[step][1]}</p>
        </div>
        <Code
          code={spec.code}
          language={architecture ? "React / JavaScript" : "Python"}
        />
      </div>
    </div>
  );
}

export function CodeExplorer({ spec, index }) {
  const [selection, setSelection] = useState(null);
  const ranges =
    index === 3
      ? [[0], [2], [4, 5]]
      : index === 5
        ? [[0], [1, 2, 3, 4], [1, 5]]
        : [[0, 1, 2], [3], [5]];
  return (
    <div className="code-layout">
      <Code
        code={spec.code}
        focus={selection === null ? null : ranges[selection]}
        language={index === 18 ? "JavaScript" : "Python"}
      />
      <div className="code-annotations">
        <span className="micro">EXPLORA LA IMPLEMENTACIÓN</span>
        {spec.items.map(([title, body], i) => (
          <button
            key={title}
            onClick={() => setSelection(selection === i ? null : i)}
            aria-pressed={selection === i}
          >
            <span className="annotation-num">0{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function MassLab() {
  const [exponent, setExponent] = useState(3);
  const mass = Math.round(10 ** exponent),
    force = fuerzaMasa(mass),
    radius = 2.2 + 6.2 * force;
  return (
    <div className="mass-lab">
      <label>
        Prueba la escala{" "}
        <input
          aria-label="Masa del ejemplo"
          type="range"
          min="0"
          max={Math.log10(60000000)}
          step=".01"
          value={exponent}
          onChange={(e) => setExponent(+e.target.value)}
        />
      </label>
      <div>
        <span>Masa catalogada</span>
        <strong>{new Intl.NumberFormat("es-PE").format(mass)} g</strong>
      </div>
      <div>
        <span>Fuerza normalizada</span>
        <strong>{force.toFixed(3)}</strong>
      </div>
      <div>
        <span>Radio simbólico</span>
        <strong>{radius.toFixed(2)} px</strong>
      </div>
      <svg
        width="90"
        height="70"
        viewBox="0 0 90 70"
        role="img"
        aria-label={`Radio simbólico: ${radius.toFixed(2)} píxeles`}
      >
        <circle cx="45" cy="35" r={radius} fill="#f4bd70" />
        <circle cx="45" cy="35" r={radius * 3} fill="none" stroke="#f4bd7070" />
      </svg>
    </div>
  );
}
