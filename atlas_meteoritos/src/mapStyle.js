// El relieve es cartografía real; no se inventan campos de viento ni temperaturas.
export function mapStyle() {
  return {
    version: 8,
    glyphs: new URL('./recursos/glyphs/', window.location.href).href + '{fontstack}/{range}.pbf',
    sources: {
      countries: {
        type: 'geojson',
        data: './recursos/paises.geojson',
        attribution: 'Natural Earth',
      },
      relief: {
        type: 'raster',
        tileSize: 256,
        maxzoom: 8,
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
        ],
        attribution: 'Relieve © Esri · US National Park Service',
      },
      satellite: {
        type: 'raster',
        tileSize: 256,
        maxzoom: 18,
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        ],
        attribution: 'Imágenes © Esri · Maxar · Earthstar Geographics · GIS User Community',
      },
    },
    layers: [
      { id: 'ocean', type: 'background', paint: { 'background-color': '#173d55' } },
      {
        id: 'land-fallback',
        type: 'fill',
        source: 'countries',
        paint: { 'fill-color': '#35736b' },
      },
      {
        id: 'relief',
        type: 'raster',
        source: 'relief',
        paint: {
          'raster-opacity': 0.88,
          'raster-saturation': 0.18,
          'raster-brightness-max': 0.56,
          'raster-contrast': 0.2,
          'raster-fade-duration': 400,
        },
      },
      {
        id: 'satellite',
        type: 'raster',
        source: 'satellite',
        layout: { visibility: 'none' },
        paint: { 'raster-opacity': 0.9, 'raster-brightness-max': 0.85 },
      },
      {
        id: 'land-tint',
        type: 'fill',
        source: 'countries',
        paint: { 'fill-color': '#25836e', 'fill-opacity': 0.2 },
      },
      {
        id: 'borders',
        type: 'line',
        source: 'countries',
        paint: {
          'line-color': '#c4e0cf',
          'line-width': ['interpolate', ['linear'], ['zoom'], 0, 0.25, 5, 0.8],
          'line-opacity': 0.3,
        },
      },
      {
        id: 'country-names',
        type: 'symbol',
        source: 'countries',
        minzoom: 2.2,
        layout: {
          'text-field': ['get', 'nombre'],
          'text-font': ['Noto Sans Regular'],
          'text-size': ['interpolate', ['linear'], ['zoom'], 2, 10, 6, 13],
          'text-transform': 'uppercase',
          'text-letter-spacing': 0.12,
          'text-max-width': 9,
        },
        paint: {
          'text-color': '#d8e6df',
          'text-halo-color': '#183c45',
          'text-halo-width': 1.2,
          'text-opacity': 0.72,
        },
      },
    ],
  };
}

export const colorExpression = (view) =>
  view === 'status' ? ['match', ['get', 'fall'], 'Fell', '#7de2dd', '#f5c874'] : ['get', 'color'];

export function addMeteoriteLayers(map, data) {
  map.addSource('meteorites', { type: 'geojson', data, maxzoom: 10, buffer: 32 });
  map.addLayer({
    id: 'density',
    type: 'heatmap',
    source: 'meteorites',
    layout: { visibility: 'none' },
    paint: {
      'heatmap-weight': 1,
      'heatmap-intensity': 0.75,
      'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 1, 16, 6, 32],
      'heatmap-opacity': 0.8,
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(28,37,103,0)',
        0.12,
        '#4850a1',
        0.32,
        '#277eaa',
        0.52,
        '#38bb9b',
        0.75,
        '#b9df62',
        1,
        '#f4c66b',
      ],
    },
  });
  map.addLayer({
    id: 'meteorite-glow',
    type: 'circle',
    source: 'meteorites',
    paint: {
      'circle-radius': ['*', ['get', 'radius'], 2.2],
      'circle-color': ['get', 'color'],
      'circle-blur': 0.9,
      'circle-opacity': 0.12,
    },
  });
  map.addLayer({
    id: 'meteorite-points',
    type: 'circle',
    source: 'meteorites',
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        1,
        ['*', ['get', 'radius'], 0.36],
        5,
        ['*', ['get', 'radius'], 0.8],
        9,
        ['get', 'radius'],
      ],
      'circle-color': ['get', 'color'],
      'circle-opacity': 0.85,
      'circle-stroke-color': '#173a3c',
      'circle-stroke-width': 0.35,
      'circle-stroke-opacity': 0.5,
    },
  });
  map.addLayer({
    id: 'meteorite-hits',
    type: 'circle',
    source: 'meteorites',
    paint: {
      'circle-radius': ['max', 6, ['get', 'radius']],
      'circle-opacity': 0,
    },
  });
  map.addSource('selection', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
  });
  map.addLayer({
    id: 'selected-halo',
    type: 'circle',
    source: 'selection',
    paint: {
      'circle-radius': 13,
      'circle-color': '#f5c874',
      'circle-opacity': 0.12,
      'circle-stroke-color': '#fff5d6',
      'circle-stroke-width': 1.5,
    },
  });
  map.addLayer({
    id: 'selected-core',
    type: 'circle',
    source: 'selection',
    paint: {
      'circle-radius': 4.5,
      'circle-color': '#fff6d4',
    },
  });
}
