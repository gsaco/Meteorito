import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  DEFAULT_FILTERS,
  csvText,
  formatMass,
  histogram,
  massScale,
  pointRadius,
  selectRecords,
  toGeoJSON,
} from '../src/data.js';

const { metadata, records } = JSON.parse(
  fs.readFileSync(new URL('../public/datos/meteoritos.json', import.meta.url), 'utf8'),
);

test('la conversión conserva el catálogo auditado y sus identificadores únicos', () => {
  assert.equal(records.length, 45716);
  assert.equal(new Set(records.map((r) => r.id)).size, 45716);
  assert.equal(records.filter((r) => r.terrestrial).length, 45715);
  assert.equal(records.filter((r) => r.mappable).length, 32186);
  assert.equal(metadata.polar, 1423);
});

test('el mapa conserva coordenadas originales y excluye Marte, (0,0) y ausencias', () => {
  const features = toGeoJSON(records).features;
  assert.equal(features.length, 32186);
  assert.ok(!features.some((f) => f.id === 32789));
  for (const feature of features) {
    const [lon, lat] = feature.geometry.coordinates;
    assert.ok(Number.isFinite(lon) && Number.isFinite(lat));
    assert.ok(Math.abs(lat) <= 90 && Math.abs(lon) <= 180);
    assert.ok(lon !== 0 || lat !== 0);
  }
  assert.equal(
    features.filter((f) => Math.abs(f.geometry.coordinates[1]) > 85.051129).length,
    1423,
  );
});

test('Carancas y Hoba conservan año, masa, estado y ubicación', () => {
  const carancas = records.find((r) => r.id === 45817);
  assert.deepEqual(
    [carancas.name, carancas.year, carancas.mass, carancas.fall, carancas.lat, carancas.lon],
    ['Carancas', 2007, 342, 'Fell', -16.66444, -69.04389],
  );
  const hoba = records.find((r) => r.name === 'Hoba');
  assert.deepEqual([hoba.year, hoba.mass, hoba.fall], [1920, 60000000, 'Found']);
  assert.equal(formatMass(hoba.mass), '60 t');
});

test('la cronología incluye 860 y no trata años inválidos o ausentes como años reales', () => {
  assert.equal(metadata.minYear, 860);
  assert.equal(metadata.maxYear, 2013);
  assert.ok(records.some((r) => r.year === 860));
  assert.ok(!records.some((r) => r.year > 2013));
  const earliest = selectRecords(records, DEFAULT_FILTERS, 860, 'year', false);
  assert.ok(earliest.length > 0 && earliest.every((r) => r.year === 860));
  const known = selectRecords(records, DEFAULT_FILTERS, 2013, 'cumulative', false);
  assert.equal(known.length, 45423);
});

test('los mismos filtros respetan masas nulas, fechas y clasificación', () => {
  const result = selectRecords(
    records,
    { fall: 'Fell', minMass: 1000, meteoriteClass: 'all' },
    2007,
    'year',
    false,
  );
  assert.ok(result.length > 0);
  assert.ok(result.every((r) => r.fall === 'Fell' && r.mass >= 1000 && r.year === 2007));
  assert.ok(!result.some((r) => r.id === 45817));
  const all = selectRecords(records, DEFAULT_FILTERS, 2013, 'cumulative', true);
  assert.equal(all.length, 45715);
  assert.equal(all.filter((r) => r.fall === 'Fell').length, 1107);
  const classified = selectRecords(
    records,
    { ...DEFAULT_FILTERS, meteoriteClass: 'H4-5' },
    2013,
    'cumulative',
    true,
  );
  assert.ok(classified.some((r) => r.id === 45817));
  assert.ok(classified.every((r) => r.class === 'H4-5'));
});

test('el histograma cuenta solo registros con ubicación y año válido, con los filtros activos', () => {
  for (const filters of [DEFAULT_FILTERS, { ...DEFAULT_FILTERS, fall: 'Fell', minMass: 1000 }]) {
    const counts = histogram(records, filters);
    const expected = selectRecords(records, filters, 2013, 'cumulative', false).filter(
      (r) => r.mappable,
    );
    assert.equal(
      [...counts.values()].reduce((a, b) => a + b, 0),
      expected.length,
    );
    assert.equal(counts.get(2007) || 0, expected.filter((r) => r.year === 2007).length);
  }
});

test('masa cero y masa ausente permanecen diferentes y el tamaño crece sin desbordarse', () => {
  assert.ok(records.some((r) => r.mass === 0));
  assert.ok(records.some((r) => r.mass == null));
  assert.equal(formatMass(0), '0 g');
  assert.equal(formatMass(null), 'Sin dato');
  const masses = [0, 1, 100, 1000, 1e6, 6e7];
  for (let i = 1; i < masses.length; i++)
    assert.ok(pointRadius(masses[i]) > pointRadius(masses[i - 1]));
  for (const r of records)
    assert.ok(Number.isFinite(pointRadius(r.mass)) && pointRadius(r.mass) <= 8.4);
  assert.equal(massScale(60000000), 1);
});

test('la exportación mantiene gramos, comillas y campos ausentes', () => {
  const csv = csvText([
    {
      id: 1,
      name: 'Nombre, "prueba"',
      class: 'H5',
      mass: null,
      fall: 'Found',
      year: null,
      lat: null,
      lon: null,
      mappable: false,
    },
  ]);
  assert.ok(csv.includes('"Nombre, ""prueba"""'));
  assert.ok(csv.includes('"H5","","Found","","","","false"'));
});
