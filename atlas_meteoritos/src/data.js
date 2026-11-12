// Las unidades internas son gramos. null significa dato ausente, nunca cero.
export const DEFAULT_FILTERS = { fall: 'all', minMass: 0, meteoriteClass: 'all' };
export const number = new Intl.NumberFormat('es-PE');

export function formatMass(grams) {
  if (grams == null) return 'Sin dato';
  const value = grams >= 1e6 ? grams / 1e6 : grams >= 1000 ? grams / 1000 : grams;
  const unit = grams >= 1e6 ? 't' : grams >= 1000 ? 'kg' : 'g';
  return `${new Intl.NumberFormat('es-PE', { maximumFractionDigits: 2 }).format(value)} ${unit}`;
}

export function massScale(mass) {
  return mass > 0 ? Math.min(1, Math.log10(1 + mass) / Math.log10(60000001)) : 0;
}

export function pointRadius(mass) {
  return mass == null ? 2.1 : 2.2 + 6.2 * massScale(mass);
}

export function massColor(mass) {
  if (mass == null) return '#c5d1d5';
  if (mass < 100) return '#7de2dd';
  if (mass < 10000) return '#adf1b2';
  if (mass < 1e6) return '#f5c874';
  return '#ff8561';
}

export function matchesFilters(record, filters) {
  return (
    (filters.fall === 'all' || record.fall === filters.fall) &&
    (filters.minMass === 0 || (record.mass != null && record.mass >= filters.minMass)) &&
    (filters.meteoriteClass === 'all' || record.class === filters.meteoriteClass)
  );
}

export function matchesTime(record, year, mode, includeUnknown) {
  if (record.year == null) return includeUnknown;
  return mode === 'cumulative' ? record.year <= year : record.year === year;
}

export function selectRecords(records, filters, year, mode, includeUnknown) {
  return records.filter(
    (r) =>
      r.terrestrial && matchesFilters(r, filters) && matchesTime(r, year, mode, includeUnknown),
  );
}

export function histogram(records, filters) {
  const counts = new Map();
  for (const r of records) {
    if (!r.mappable || r.year == null || !matchesFilters(r, filters)) continue;
    counts.set(r.year, (counts.get(r.year) || 0) + 1);
  }
  return counts;
}

export function toGeoJSON(records) {
  return {
    type: 'FeatureCollection',
    features: records
      .filter((r) => r.mappable)
      .map((r) => ({
        type: 'Feature',
        id: r.id,
        geometry: { type: 'Point', coordinates: [r.lon, r.lat] },
        properties: {
          id: r.id,
          name: r.name,
          class: r.class,
          mass: r.mass ?? -1,
          fall: r.fall,
          year: r.year ?? -1,
          radius: pointRadius(r.mass),
          color: massColor(r.mass),
        },
      })),
  };
}

// La misma lógica de filtros se aplica a la tabla y a las capas del mapa.
export function mapFilter(filters, year, mode, includeUnknown) {
  const time = [mode === 'cumulative' ? '<=' : '==', ['get', 'year'], year];
  const knownTime = ['all', ['>=', ['get', 'year'], 0], time];
  const conditions = [
    'all',
    includeUnknown ? ['any', ['==', ['get', 'year'], -1], knownTime] : knownTime,
  ];
  if (filters.fall !== 'all') conditions.push(['==', ['get', 'fall'], filters.fall]);
  if (filters.minMass > 0) conditions.push(['>=', ['get', 'mass'], filters.minMass]);
  if (filters.meteoriteClass !== 'all')
    conditions.push(['==', ['get', 'class'], filters.meteoriteClass]);
  return conditions;
}

export function coordinates(record) {
  if (!record.mappable)
    return record.terrestrial ? 'Sin ubicación utilizable' : 'Marte · fuera del mapa terrestre';
  const lat = `${Math.abs(record.lat).toFixed(4)}° ${record.lat < 0 ? 'S' : 'N'}`;
  const lon = `${Math.abs(record.lon).toFixed(4)}° ${record.lon < 0 ? 'O' : 'E'}`;
  return `${lat}  ·  ${lon}`;
}

export function csvText(records) {
  const columns = ['id', 'name', 'class', 'mass', 'fall', 'year', 'lat', 'lon', 'mappable'];
  const cell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  return (
    '\uFEFF' +
    [columns.join(','), ...records.map((r) => columns.map((c) => cell(r[c])).join(','))].join(
      '\r\n',
    )
  );
}
