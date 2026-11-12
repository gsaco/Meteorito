import { useEffect, useRef, useState } from 'react';
import { X, ArrowDownToLine, ChevronLeft, ChevronRight, Search, ExternalLink } from 'lucide-react';
import { coordinates, csvText, formatMass, number } from './data';

function Dialog({ title, onClose, children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.showModal();
    return () => ref.current?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-label={title}
    >
      <div className="dialog-content">
        <header>
          <div>
            <span className="eyebrow">METEORITOS / ATLAS</span>
            <h2>{title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Cerrar ventana">
            <X size={20} />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}

export function AboutDialog({ metadata, onClose }) {
  return (
    <Dialog title="Cada punto tiene una historia." onClose={onClose} className="about-dialog">
      <p className="dialog-lead">
        Un catálogo de piedras que llegaron del espacio. Explora sus ubicaciones, sus masas y el
        momento en que entraron en nuestra historia.
      </p>
      <div className="about-grid">
        <article>
          <span className="status-dot fell" />
          <h3>Fell · Caída observada</h3>
          <p>
            Se observó la caída. El pulso incluye un destello simbólico; no reconstruye la
            trayectoria.
          </p>
        </article>
        <article>
          <span className="status-dot found" />
          <h3>Found · Hallazgo</h3>
          <p>
            Se encontró el meteorito después. El año corresponde al registro del hallazgo, no a la
            caída.
          </p>
        </article>
      </div>
      <h3>Cómo leer el mapa</h3>
      <p>
        El tamaño del punto y la amplitud y duración del pulso crecen con el logaritmo de la masa.
        La masa es la masa catalogada en gramos: no mide la energía del impacto. Los registros sin
        masa aparecen en gris.
      </p>
      <p>
        Los pulsos marcan registros del año seleccionado y el meteorito seleccionado. Se muestran
        hasta 120 efectos a la vez para mantener una animación fluida; los demás puntos siguen en el
        mapa. Los intervalos y trazos son ilustrativos.
      </p>
      <p>
        La capa de densidad representa concentración relativa de registros con ubicación y los
        filtros activos, sin ponderación por masa. Está disponible en la vista plana; el globo
        muestra puntos individuales. La búsqueda muestra resultados de todo el catálogo; la tabla
        respeta los filtros.
      </p>
      <h3>Datos y límites</h3>
      <p>
        {number.format(metadata.total)} registros en el archivo de la tarea;{' '}
        {number.format(metadata.mappable)} con coordenadas terrestres utilizables. Los valores
        ausentes y las coordenadas (0, 0) no se sitúan en el mapa. Meridiani Planum está en Marte y
        solo aparece en la búsqueda.
      </p>
      <p>
        La vista plana no muestra los extremos polares. Cambia a «Globo» para explorar los{' '}
        {number.format(metadata.polar)} registros situados más allá de ±85,0511°. No se han movido
        sus coordenadas.
      </p>
      <p>
        Los registros sin año válido pueden incluirse con «Sin año», pero no participan en la
        reproducción histórica. El catálogo abarca {metadata.minYear}–{metadata.maxYear}; no se
        actualiza en vivo. Las diferencias entre regiones reflejan también búsqueda, conservación y
        documentación.
      </p>
      <div className="about-sources">
        <a href="https://data.nasa.gov/dataset/meteorite-landings" target="_blank" rel="noreferrer">
          NASA · Meteorite Landings <ExternalLink size={13} />
        </a>
        <a href="https://www.lpi.usra.edu/meteor/metbull.php" target="_blank" rel="noreferrer">
          Meteoritical Bulletin <ExternalLink size={13} />
        </a>
      </div>
      <p className="fine-print">
        Diseño original inspirado en la cartografía de Windy y la navegación temporal de Tremor.
        Cartografía: Esri y Natural Earth. El relieve y las imágenes satelitales requieren internet;
        los datos están incluidos en esta carpeta.
      </p>
    </Dialog>
  );
}

export function RecordsDialog({ records, onClose, onSelect, year, mode }) {
  const [query, setQuery] = useState(''),
    [page, setPage] = useState(0);
  const matches = records.filter((r) =>
    `${r.name} ${r.id} ${r.class}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  const pages = Math.max(1, Math.ceil(matches.length / 50));
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([csvText(matches)], { type: 'text/csv;charset=utf-8;' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = `meteoritos_${mode}_${year}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <Dialog title="Explora los registros" onClose={onClose} className="records-dialog">
      <div className="records-toolbar">
        <label className="table-search">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Buscar en los resultados…"
            aria-label="Buscar en la tabla"
          />
        </label>
        <button className="outline-button" onClick={download}>
          <ArrowDownToLine size={16} /> Exportar CSV
        </button>
      </div>
      <p className="table-caption">
        {number.format(matches.length)} registros terrestres · filtros actuales ·{' '}
        {mode === 'cumulative' ? 'hasta' : 'año'} {year}. Las masas están en gramos en el archivo
        exportado.
      </p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Nombre / clase</th>
              <th>Año</th>
              <th>Masa</th>
              <th>Registro</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {matches.slice(page * 50, (page + 1) * 50).map((r) => (
              <tr key={r.id}>
                <td>
                  <button
                    className="record-link"
                    onClick={() => {
                      onSelect(r);
                      onClose();
                    }}
                  >
                    {r.name}
                  </button>
                  <small>
                    {r.class} · #{r.id}
                  </small>
                </td>
                <td>{r.year ?? 'Sin año'}</td>
                <td>{formatMass(r.mass)}</td>
                <td>
                  <span className={`status-dot ${r.fall.toLowerCase()}`} />
                  {r.fall}
                </td>
                <td className="coordinates-cell">{coordinates(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!matches.length && (
          <p className="empty-state">Ningún registro coincide con esta búsqueda.</p>
        )}
      </div>
      <footer className="pagination">
        <span>
          {number.format(matches.filter((r) => r.mappable).length)} con ubicación utilizable
        </span>
        <div>
          <button
            className="icon-button"
            aria-label="Página anterior"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft size={18} />
          </button>
          <span>
            {page + 1} / {pages}
          </span>
          <button
            className="icon-button"
            aria-label="Página siguiente"
            disabled={page + 1 >= pages}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </Dialog>
  );
}
