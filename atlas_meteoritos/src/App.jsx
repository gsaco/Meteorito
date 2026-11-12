import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Compass,
  Database,
  Expand,
  Globe2,
  Info,
  Layers,
  LocateFixed,
  Map,
  MapPin,
  Plus,
  Minus,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import MeteoriteMap from './MeteoriteMap';
import Timeline from './Timeline';
import { AboutDialog, RecordsDialog } from './Dialogs';
import {
  DEFAULT_FILTERS,
  coordinates,
  formatMass,
  histogram,
  matchesFilters,
  matchesTime,
  number,
  selectRecords,
} from './data';

const PRESETS = [
  { name: 'Mundo', center: [-22, -8], zoom: 1.7 },
  { name: 'Perú', center: [-74, -10], zoom: 4.3 },
  { name: 'Antártida', center: [20, -82], zoom: -0.8, globe: true },
];

function SearchBox({ records, onSelect }) {
  const [query, setQuery] = useState(''),
    [open, setOpen] = useState(false),
    [active, setActive] = useState(0);
  const ref = useRef(null);
  const results = useMemo(() => {
    const text = query.trim().toLocaleLowerCase();
    if (!text) return [];
    return records
      .filter((r) => r.name.toLocaleLowerCase().includes(text) || String(r.id) === text)
      .sort(
        (a, b) =>
          Number(b.name.toLocaleLowerCase().startsWith(text)) -
          Number(a.name.toLocaleLowerCase().startsWith(text)),
      )
      .slice(0, 8);
  }, [query, records]);
  const select = (record) => {
    onSelect(record);
    setQuery('');
    setOpen(false);
  };
  useEffect(() => {
    const close = (event) => {
      if (!ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  return (
    <div ref={ref} className="search-box glass">
      <Search size={18} />
      <input
        type="search"
        placeholder="Busca un meteorito…"
        aria-label="Buscar meteorito por nombre o ID"
        value={query}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open && !!query}
        aria-controls="search-results"
        aria-activedescendant={open && results[active] ? `result-${results[active].id}` : undefined}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive(Math.min(active + 1, results.length - 1));
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive(Math.max(active - 1, 0));
          }
          if (e.key === 'Enter' && results[active]) select(results[active]);
        }}
      />
      <span className="search-hint">nombre / ID</span>
      {open && query && (
        <div
          id="search-results"
          className="search-results"
          role="listbox"
          aria-label="Resultados de todo el catálogo"
        >
          <div className="search-caption">EN TODO EL CATÁLOGO</div>
          {results.map((r, i) => (
            <button
              key={r.id}
              id={`result-${r.id}`}
              role="option"
              aria-selected={active === i}
              className={active === i ? 'highlighted' : ''}
              onClick={() => select(r)}
            >
              <span className={`status-dot ${r.fall.toLowerCase()}`} />
              <span>
                <strong>{r.name}</strong>
                <small>
                  {r.year ?? 'Sin año'} · {formatMass(r.mass)}
                  {!r.terrestrial ? ' · Marte' : !r.mappable ? ' · sin ubicación' : ''}
                </small>
              </span>
              <ArrowUpRight size={15} />
            </button>
          ))}
          {!results.length && (
            <p className="empty-state">No encontramos ese nombre. Prueba «Hoba» o «Carancas».</p>
          )}
        </div>
      )}
    </div>
  );
}

function Atlas({ metadata, records }) {
  const reducedMotion = useReducedMotion();
  const [year, setYear] = useState(metadata.maxYear),
    [startYear, setStartYear] = useState(1900);
  const [filters, setFilters] = useState(DEFAULT_FILTERS),
    [mode, setMode] = useState('cumulative');
  const [includeUnknown, setIncludeUnknown] = useState(true),
    [playing, setPlaying] = useState(false),
    [speed, setSpeed] = useState(1);
  const [animations, setAnimations] = useState(true),
    [view, setView] = useState('mass'),
    [basemap, setBasemap] = useState('relief');
  const [globe, setGlobe] = useState(false),
    [selected, setSelected] = useState(() => records.find((r) => r.name === 'Carancas'));
  const [dialog, setDialog] = useState(null),
    [filtersOpen, setFiltersOpen] = useState(false),
    [preset, setPreset] = useState('Mundo');
  const [toast, setToast] = useState(''),
    [basemapError, setBasemapError] = useState(false),
    [mapReady, setMapReady] = useState(false);
  const map = useRef(null);
  const visibleRecords = useMemo(
    () => selectRecords(records, filters, year, mode, includeUnknown),
    [records, filters, year, mode, includeUnknown],
  );
  const mapped = useMemo(() => visibleRecords.filter((r) => r.mappable), [visibleRecords]);
  const counts = useMemo(() => histogram(records, filters), [records, filters]);
  const fellCount = useMemo(() => mapped.filter((r) => r.fall === 'Fell').length, [mapped]);
  const classes = useMemo(
    () => [...new Set(records.filter((r) => r.terrestrial).map((r) => r.class))].sort(),
    [records],
  );
  const selectedVisible = selected && visibleRecords.some((r) => r.id === selected.id);
  const massOptions = [0, 100, 1000, 10000, 100000, 1000000];
  const massStep = Math.max(0, massOptions.indexOf(filters.minMass));
  const filterChanged =
    filters.fall !== 'all' || filters.minMass > 0 || filters.meteoriteClass !== 'all';
  const setFilter = (key, value) => setFilters((previous) => ({ ...previous, [key]: value }));

  useEffect(() => {
    if (globe && view === 'density') setView('mass');
  }, [globe, view]);
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setYear((current) => {
        if (current >= metadata.maxYear) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 650 / speed);
    return () => clearInterval(timer);
  }, [playing, speed, metadata.maxYear]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 4200);
    return () => clearTimeout(timer);
  }, [toast]);

  const togglePlaying = (value) => {
    if (value && year >= metadata.maxYear) setYear(startYear);
    setPlaying(value);
  };
  const reset = () => {
    setFilters(DEFAULT_FILTERS);
    setMode('cumulative');
    setYear(metadata.maxYear);
    setIncludeUnknown(true);
    setPlaying(false);
  };
  const selectRecord = (record, fly = true) => {
    if (!record) return;
    setSelected(record);
    setFiltersOpen(false);
    if (
      fly &&
      record.terrestrial &&
      (!matchesFilters(record, filters) || !matchesTime(record, year, mode, includeUnknown))
    ) {
      setFilters(DEFAULT_FILTERS);
      setMode('cumulative');
      setYear(metadata.maxYear);
      setIncludeUnknown(true);
      setPlaying(false);
      setToast('Filtros ajustados para mostrar el meteorito seleccionado.');
    }
    if (fly && record.mappable && map.current) {
      if (Math.abs(record.lat) > 85.051129) {
        setGlobe(true);
        map.current.setProjection({ type: 'globe' });
        map.current.setMinZoom(-1.5);
      }
      map.current.flyTo({
        center: [record.lon, record.lat],
        zoom: Math.abs(record.lat) > 85 ? 0.4 : 5,
        duration: reducedMotion ? 0 : 1800,
        essential: false,
      });
      setPreset('');
    }
  };
  const navigate = (destination) => {
    setPreset(destination.name);
    setGlobe(!!destination.globe);
    map.current?.setProjection({ type: destination.globe ? 'globe' : 'mercator' });
    map.current?.setMinZoom(destination.globe ? -1.5 : 0.8);
    map.current?.flyTo({
      center: destination.center,
      zoom: destination.zoom,
      bearing: 0,
      pitch: 0,
      duration: reducedMotion ? 0 : 1500,
    });
    setFiltersOpen(false);
  };
  const showYear = () => {
    if (selected.year == null) return;
    setFilters(DEFAULT_FILTERS);
    setMode('year');
    setYear(selected.year);
    setIncludeUnknown(false);
    setPlaying(false);
    if (selected.year < startYear) setStartYear(metadata.minYear);
  };
  const fullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setToast('Puedes ampliar el mapa con el modo de pantalla completa de tu navegador.');
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="atlas">
        <MeteoriteMap
          records={records}
          visibleRecords={mapped}
          filters={filters}
          year={year}
          mode={mode}
          includeUnknown={includeUnknown}
          selected={selectedVisible ? selected : null}
          onSelect={selectRecord}
          view={view}
          basemap={basemap}
          globe={globe}
          animations={animations}
          onMapReady={(value) => {
            map.current = value;
            setMapReady(true);
          }}
          onBasemapError={setBasemapError}
        />
        <header className="topbar">
          <a
            className="brand"
            href="#"
            aria-label="Meteoritos, volver a la vista inicial"
            onClick={(e) => {
              e.preventDefault();
              reset();
              navigate(PRESETS[0]);
            }}
          >
            <img src="./recursos/meteoritos.svg" width="42" height="42" alt="" />
            <span>
              <strong>
                METEORITOS<span className="brand-period">.</span>
              </strong>
              <small>ATLAS DE METEORITOS</small>
            </span>
          </a>
          <SearchBox records={records} onSelect={selectRecord} />
          <div className="header-actions">
            <span className="catalog-tag">
              <span />
              CATÁLOGO {metadata.minYear}—{metadata.maxYear}
            </span>
            <button
              className="icon-button glass"
              onClick={() => setDialog('about')}
              aria-label="Acerca del atlas"
            >
              <Info size={19} />
            </button>
            <button
              className="icon-button glass fullscreen-button"
              onClick={fullscreen}
              aria-label="Pantalla completa"
            >
              <Expand size={18} />
            </button>
          </div>
        </header>

        <button
          className={`mobile-filter-toggle glass ${filtersOpen ? 'active' : ''}`}
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
          aria-label="Mostrar u ocultar filtros"
        >
          <SlidersHorizontal size={17} /> Explorar{' '}
          {filterChanged && <span className="filter-indicator" />}
        </button>
        <aside
          className={`explore-panel glass ${filtersOpen ? 'mobile-open' : ''}`}
          aria-label="Filtros y resumen"
        >
          <div className="panel-heading">
            <span className="eyebrow">FRAGMENTOS DEL COSMOS</span>
            <button
              className="icon-button mobile-close"
              onClick={() => setFiltersOpen(false)}
              aria-label="Cerrar filtros"
            >
              <X size={18} />
            </button>
          </div>
          <h1>
            Huellas de
            <br />
            otro mundo<span>.</span>
          </h1>
          <p className="intro">Miles de viajes. Un mismo destino.</p>
          <div className="main-stat">
            <strong data-testid="mapped-count">{number.format(mapped.length)}</strong>
            <span>registros con ubicación</span>
          </div>
          <div className="stat-pair">
            <div>
              <span className="status-dot fell" />
              <strong>{number.format(fellCount)}</strong>
              <small>caídas observadas</small>
            </div>
            <div>
              <span className="status-dot found" />
              <strong>{number.format(mapped.length - fellCount)}</strong>
              <small>hallazgos</small>
            </div>
          </div>
          <div className="panel-divider" />
          <div className="filter-label">
            <span>TIPO DE REGISTRO</span>
            <Info size={12}>
              <title>Fell: caída observada. Found: meteorito encontrado después.</title>
            </Info>
          </div>
          <div className="segmented filter-segment" aria-label="Tipo de registro">
            {[
              ['all', 'Todos'],
              ['Fell', 'Fell'],
              ['Found', 'Found'],
            ].map(([value, label]) => (
              <button
                key={value}
                className={filters.fall === value ? 'active' : ''}
                aria-pressed={filters.fall === value}
                onClick={() => setFilter('fall', value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="filter-label mass-label">
            <label htmlFor="mass-filter">MASA MÍNIMA</label>
            <strong>{filters.minMass ? formatMass(filters.minMass) : 'Cualquiera'}</strong>
          </div>
          <input
            id="mass-filter"
            className="mass-slider"
            aria-label="Masa mínima"
            aria-valuetext={
              filters.minMass
                ? formatMass(filters.minMass)
                : 'Cualquier masa, incluidos datos ausentes'
            }
            type="range"
            min="0"
            max="5"
            step="1"
            value={massStep}
            style={{ '--range-progress': `${(massStep / 5) * 100}%` }}
            onChange={(e) => setFilter('minMass', massOptions[Number(e.target.value)])}
          />
          <div className="mass-ticks">
            {['Todas', '100 g', '1 kg', '10 kg', '100 kg', '1 t'].map((label, index) => (
              <span key={label} style={{ left: `${index * 20}%` }}>
                {label}
              </span>
            ))}
          </div>
          <details className="advanced-filters">
            <summary>
              Clasificación <ChevronDown size={12} />
            </summary>
            <div className="select-wrap class-select">
              <select
                id="class-filter"
                aria-label="Clasificación del meteorito"
                value={filters.meteoriteClass}
                onChange={(e) => setFilter('meteoriteClass', e.target.value)}
              >
                <option value="all">Todas las clases</option>
                {classes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} />
            </div>
          </details>
          <div className="panel-divider" />
          <div className="filter-label">
            <span>IR A UN LUGAR</span>
            <Compass size={13} />
          </div>
          <div className="places">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                className={preset === p.name ? 'active' : ''}
                onClick={() => navigate(p)}
                disabled={!mapReady}
              >
                {p.name}
              </button>
            ))}
          </div>
          <button className="browse-button" onClick={() => setDialog('records')}>
            <Database size={16} />
            <span>Explorar registros</span>
            <ArrowUpRight size={16} />
          </button>
          <div className="panel-footer">
            <span>{number.format(visibleRecords.length - mapped.length)} sin ubicación</span>
            <button onClick={reset} title="Restablecer todos los filtros">
              <RotateCcw size={12} /> Restablecer
            </button>
          </div>
        </aside>

        <div className="map-tools">
          <div className="zoom-tools glass">
            <button
              aria-label="Acercar mapa"
              onClick={() => map.current?.zoomIn({ duration: reducedMotion ? 0 : 300 })}
            >
              <Plus size={19} />
            </button>
            <button
              aria-label="Alejar mapa"
              onClick={() => map.current?.zoomOut({ duration: reducedMotion ? 0 : 300 })}
            >
              <Minus size={19} />
            </button>
          </div>
          <button
            className={`icon-button glass ${globe ? 'active' : ''}`}
            aria-label={globe ? 'Cambiar a mapa plano' : 'Cambiar a globo'}
            aria-pressed={globe}
            onClick={() => setGlobe(!globe)}
            title={globe ? 'Mapa plano' : 'Globo · incluye los polos'}
          >
            {globe ? <Map size={19} /> : <Globe2 size={19} />}
          </button>
          <button
            className="icon-button glass"
            onClick={() => navigate(PRESETS[0])}
            aria-label="Volver al mundo"
          >
            <LocateFixed size={19} />
          </button>
          <button
            className={`icon-button glass mobile-effects ${animations ? 'active' : ''}`}
            aria-label={animations ? 'Desactivar pulsos' : 'Activar pulsos'}
            aria-pressed={animations}
            onClick={() => setAnimations(!animations)}
          >
            <Sparkles size={17} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.aside
              key={selected.id}
              className="detail-panel glass"
              aria-label="Ficha del meteorito"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="detail-top">
                <span className="eyebrow">UN FRAGMENTO, UNA HISTORIA</span>
                <button
                  className="icon-button"
                  onClick={() => setSelected(null)}
                  aria-label="Cerrar ficha"
                >
                  <X size={17} />
                </button>
              </div>
              <div className="detail-identity">
                <div className="meteorite-mark" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <i />
                </div>
                <span className={`status-badge ${selected.fall.toLowerCase()}`}>
                  <span className={`status-dot ${selected.fall.toLowerCase()}`} />
                  {selected.fall === 'Fell' ? 'CAÍDA OBSERVADA' : 'HALLAZGO'}
                </span>
              </div>
              <h2>{selected.name}</h2>
              <p className="detail-class">
                {selected.class}
                <span> · </span> #{selected.id}
              </p>
              <div className="detail-metrics">
                <div>
                  <span>AÑO</span>
                  <strong>{selected.year ?? '—'}</strong>
                </div>
                <div>
                  <span>MASA CATALOGADA</span>
                  <strong>{formatMass(selected.mass)}</strong>
                </div>
              </div>
              <div className="detail-location">
                <MapPin size={15} />
                <span>{coordinates(selected)}</span>
              </div>
              {selected.terrestrial && !selectedVisible && (
                <p className="detail-notice">
                  Este registro queda fuera de los filtros actuales.{' '}
                  <button onClick={reset}>Mostrarlo</button>
                </p>
              )}
              {!selected.terrestrial && (
                <p className="detail-notice">
                  Este meteorito fue identificado en Marte. No se sitúa en el mapa de la Tierra.
                </p>
              )}
              {selected.fall === 'Found' && (
                <p className="detail-note">Año del hallazgo; la fecha de caída no se conoce.</p>
              )}
              {selected.year == null && (
                <p className="detail-note">Sin año válido en la base preparada.</p>
              )}
              <div className="detail-actions">
                {selected.mappable && (
                  <button className="text-button" onClick={() => selectRecord(selected)}>
                    <LocateFixed size={14} /> Localizar
                  </button>
                )}
                {selected.year != null && selected.terrestrial && (
                  <button className="text-button" onClick={showYear}>
                    Ver su año <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <section className="layers-panel glass" aria-label="Capas del mapa">
          <div className="layer-title">
            <Layers size={15} />
            <span>ELIGE QUÉ EXPLORAR</span>
          </div>
          <div className="layer-choices">
            {[
              ['mass', 'Masa'],
              ['status', 'Registro'],
              ['density', 'Densidad'],
            ].map(([value, label]) => (
              <button
                key={value}
                className={view === value ? 'active' : ''}
                onClick={() => setView(value)}
                disabled={globe && value === 'density'}
                title={
                  globe && value === 'density'
                    ? 'La densidad está disponible en la vista plana'
                    : label
                }
                aria-pressed={view === value}
              >
                <span className={`layer-preview ${value}`} />
                {label}
                {view === value && <Check size={12} />}
              </button>
            ))}
          </div>
          <div className="basemap-switch">
            <button
              className={basemap === 'relief' ? 'active' : ''}
              onClick={() => {
                setBasemap('relief');
                setBasemapError(false);
              }}
            >
              Relieve
            </button>
            <span>/</span>
            <button
              className={basemap === 'satellite' ? 'active' : ''}
              onClick={() => {
                setBasemap('satellite');
                setBasemapError(false);
              }}
            >
              Satélite
            </button>
            <span className="projection-label">{globe ? 'GLOBO' : 'MAPA'}</span>
          </div>
        </section>

        <div className={`map-legend glass ${view}`} aria-label="Leyenda del mapa">
          {view === 'mass' && (
            <>
              <span className="legend-title">MASA · ESCALA LOGARÍTMICA</span>
              <div className="mass-legend">
                {[
                  [3, '#7de2dd', '< 100 g'],
                  [5, '#adf1b2', '100 g–10 kg'],
                  [7, '#f5c874', '10 kg–1 t'],
                  [9, '#ff8561', '≥ 1 t'],
                ].map(([size, color, label]) => (
                  <span key={label}>
                    <i style={{ width: size * 2, height: size * 2, background: color }} />
                    {label}
                  </span>
                ))}
                <span>
                  <i className="unknown-mass" />
                  Sin dato
                </span>
              </div>
            </>
          )}
          {view === 'status' && (
            <>
              <span className="legend-title">TIPO DE REGISTRO</span>
              <div className="status-legend">
                <span>
                  <i className="status-dot fell" />
                  Fell · caída observada
                </span>
                <span>
                  <i className="status-dot found" />
                  Found · hallazgo
                </span>
              </div>
            </>
          )}
          {view === 'density' && (
            <>
              <span className="legend-title">CONCENTRACIÓN RELATIVA DE REGISTROS</span>
              <div className="density-gradient" />
              <div className="density-labels">
                <span>Menor</span>
                <span>Mayor</span>
              </div>
            </>
          )}
        </div>
        {!mapped.length && (
          <div className="map-empty glass">
            <Sparkles size={24} />
            <strong>No hay puntos con estos filtros.</strong>
            <span>Prueba otro año, una masa menor o todos los registros.</span>
            <button className="outline-button" onClick={reset}>
              Restablecer filtros
            </button>
          </div>
        )}
        <div className="map-note">
          <span>NASA / METEORITICAL SOCIETY</span>
        </div>
        {basemapError && (
          <div className="network-note glass">
            Parte del relieve no pudo cargarse. Los países y los meteoritos siguen disponibles.
          </div>
        )}
        <AnimatePresence>
          {toast && (
            <motion.div
              className="toast glass"
              role="status"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Check size={15} />
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        <Timeline
          minYear={metadata.minYear}
          maxYear={metadata.maxYear}
          year={year}
          setYear={setYear}
          counts={counts}
          playing={playing}
          setPlaying={togglePlaying}
          speed={speed}
          setSpeed={setSpeed}
          mode={mode}
          setMode={setMode}
          includeUnknown={includeUnknown}
          setIncludeUnknown={setIncludeUnknown}
          animations={animations}
          setAnimations={setAnimations}
          startYear={startYear}
          setStartYear={setStartYear}
        />
        {dialog === 'about' && <AboutDialog metadata={metadata} onClose={() => setDialog(null)} />}
        {dialog === 'records' && (
          <RecordsDialog
            records={visibleRecords}
            year={year}
            mode={mode}
            onClose={() => setDialog(null)}
            onSelect={selectRecord}
          />
        )}
      </main>
    </MotionConfig>
  );
}

export default function App() {
  const [data, setData] = useState(null),
    [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch('./datos/meteoritos.json', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Datos no disponibles');
        return response.json();
      })
      .then(setData)
      .catch((error) => {
        if (error.name !== 'AbortError') setError(true);
      });
    return () => controller.abort();
  }, []);
  if (error)
    return (
      <div className="app-loading">
        <h1>No pudimos cargar el catálogo.</h1>
        <p>
          Comprueba que la carpeta de datos esté incluida y abre la aplicación desde el servidor
          local.
        </p>
        <button className="outline-button" onClick={() => location.reload()}>
          Volver a intentar
        </button>
      </div>
    );
  if (!data)
    return (
      <div className="app-loading">
        <img src="./recursos/meteoritos.svg" width="60" alt="" />
        <h1>METEORITOS.</h1>
        <span className="loading-orbit" />
        <p>Preparando miles de historias…</p>
      </div>
    );
  return <Atlas {...data} />;
}
