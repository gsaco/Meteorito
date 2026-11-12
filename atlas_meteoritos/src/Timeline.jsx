import { useEffect, useMemo, useState } from 'react';
import { Pause, Play, ChevronDown, Sparkles } from 'lucide-react';
import { number } from './data';

export default function Timeline({
  minYear,
  maxYear,
  year,
  setYear,
  counts,
  playing,
  setPlaying,
  speed,
  setSpeed,
  mode,
  setMode,
  includeUnknown,
  setIncludeUnknown,
  animations,
  setAnimations,
  startYear,
  setStartYear,
}) {
  const [yearDraft, setYearDraft] = useState(String(year));
  useEffect(() => setYearDraft(String(year)), [year]);
  const bins = useMemo(() => {
    const span = maxYear - startYear + 1;
    const width = Math.max(1, Math.ceil(span / 180));
    const result = [];
    for (let begin = startYear; begin <= maxYear; begin += width) {
      let total = 0;
      for (let y = begin; y < Math.min(begin + width, maxYear + 1); y++)
        total += counts.get(y) || 0;
      result.push({ begin, end: Math.min(begin + width - 1, maxYear), count: total });
    }
    return result;
  }, [counts, startYear, maxYear]);
  const maximum = Math.max(1, ...bins.map((bin) => bin.count));
  const progress = Math.max(0, ((year - startYear) / (maxYear - startYear)) * 100);
  const updateYear = (value) => {
    setPlaying(false);
    setYear(Math.max(minYear, Math.min(maxYear, Number(value))));
  };
  const commitYear = () => {
    const value = yearDraft.trim() ? Math.max(minYear, Math.min(maxYear, Number(yearDraft))) : year;
    if (!Number.isFinite(value)) {
      setYearDraft(String(year));
      return;
    }
    updateYear(Math.round(value));
    setYearDraft(String(Math.round(value)));
    if (value < startYear) setStartYear(minYear);
  };
  const markers = [
    startYear,
    ...[1000, 1500, 1800, 1900, 1925, 1950, 1975, 2000].filter(
      (y) =>
        y > startYear + (maxYear - startYear) * 0.1 && y < maxYear - (maxYear - startYear) * 0.1,
    ),
    maxYear,
  ];
  const ticks = markers.filter(
    (_, i) => markers.length < 8 || i % 2 === 0 || i === markers.length - 1,
  );

  return (
    <section className="timeline glass" aria-label="Línea de tiempo">
      <div className="timeline-top">
        <div className="timeline-title">
          <span className="live-dot" />
          <span>UN VIAJE EN EL TIEMPO</span>
          <span className="timeline-subtitle">
            {bins[0]?.end !== bins[0]?.begin ? 'Registros agrupados' : 'Registros por año'} · con
            ubicación
          </span>
        </div>
        <div className="timeline-options">
          <label className="unknown-option">
            <input
              type="checkbox"
              checked={includeUnknown}
              onChange={(e) => setIncludeUnknown(e.target.checked)}
            />{' '}
            Sin año
          </label>
          <button
            className={`text-button effects-button ${animations ? 'active' : ''}`}
            aria-pressed={animations}
            onClick={() => setAnimations(!animations)}
            title="Activar o desactivar pulsos"
          >
            <Sparkles size={14} />
            <span>Pulsos</span>
          </button>
          <div className="segmented compact" aria-label="Modo temporal">
            <button
              className={mode === 'cumulative' ? 'active' : ''}
              aria-pressed={mode === 'cumulative'}
              onClick={() => setMode('cumulative')}
            >
              Acumulado
            </button>
            <button
              className={mode === 'year' ? 'active' : ''}
              aria-pressed={mode === 'year'}
              onClick={() => setMode('year')}
            >
              Solo este año
            </button>
          </div>
        </div>
      </div>
      <div className="timeline-main">
        <button
          className={`play-button ${playing ? 'playing' : ''}`}
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? 'Pausar línea de tiempo' : 'Reproducir línea de tiempo'}
        >
          {playing ? (
            <Pause size={21} fill="currentColor" />
          ) : (
            <Play size={21} fill="currentColor" />
          )}
        </button>
        <div className="year-readout">
          <label htmlFor="current-year">AÑO DEL REGISTRO</label>
          <input
            id="current-year"
            aria-label="Año del registro"
            type="number"
            min={minYear}
            max={maxYear}
            value={yearDraft}
            onChange={(e) => setYearDraft(e.target.value)}
            onBlur={commitYear}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
          <span>{number.format(counts.get(year) || 0)} con ubicación</span>
        </div>
        <div className="chart-wrap">
          <div className="histogram" aria-hidden="true">
            {bins.map((bin) => (
              <div
                key={bin.begin}
                className={`histogram-slot ${bin.begin <= year ? 'past' : ''} ${year >= bin.begin && year <= bin.end ? 'current' : ''}`}
              >
                <div
                  className="histogram-bar"
                  style={{ height: bin.count ? `${Math.max(3, (bin.count / maximum) * 100)}%` : 0 }}
                />
              </div>
            ))}
          </div>
          <div className="timeline-track">
            <div style={{ width: `${progress}%` }} />
            <span style={{ left: `${progress}%` }} />
          </div>
          <input
            className="year-slider"
            type="range"
            min={startYear}
            max={maxYear}
            value={Math.max(startYear, year)}
            step="1"
            onChange={(e) => updateYear(e.target.value)}
            aria-label="Deslizar año"
            aria-valuetext={`${year}, ${counts.get(year) || 0} registros con ubicación`}
          />
          <div className="year-ticks">
            {ticks.map((t) => (
              <span key={t} style={{ left: `${((t - startYear) / (maxYear - startYear)) * 100}%` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="timeline-range">
          <label className="select-wrap">
            <select
              aria-label="Periodo de la línea de tiempo"
              value={startYear}
              onChange={(e) => {
                const value = Number(e.target.value);
                setStartYear(value);
                if (year < value) setYear(value);
              }}
            >
              <option value={1900}>1900 — {maxYear}</option>
              <option value={1800}>1800 — {maxYear}</option>
              <option value={minYear}>
                {minYear} — {maxYear}
              </option>
            </select>
            <ChevronDown size={12} />
          </label>
          <button
            className="speed-button"
            onClick={() => setSpeed(speed === 1 ? 4 : speed === 4 ? 8 : 1)}
            aria-label={`Velocidad ${speed}x; cambiar velocidad`}
          >
            {speed}× <span>velocidad</span>
          </button>
        </div>
      </div>
      <div className="timeline-foot">
        <span>Fell: caída observada · Found: hallazgo</span>
        <span>El año de un hallazgo no indica cuándo cayó.</span>
      </div>
    </section>
  );
}
