import { useEffect, useRef, useState } from 'react';
import { Map, Popup, setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';
import { addMeteoriteLayers, colorExpression, mapStyle } from './mapStyle';
import { createParticlePainter } from './particles';
import { formatMass, mapFilter, toGeoJSON } from './data';
import { createPolarPoints, isPolar } from './polarPoints';

setWorkerUrl(workerUrl);

export default function MeteoriteMap({
  records,
  visibleRecords,
  filters,
  year,
  mode,
  includeUnknown,
  selected,
  onSelect,
  view,
  basemap,
  globe,
  animations,
  onMapReady,
  onBasemapError,
}) {
  const container = useRef(null),
    canvas = useRef(null),
    mapRef = useRef(null);
  const polarCanvas = useRef(null),
    polarPainter = useRef(null);
  const latest = useRef({});
  const [ready, setReady] = useState(false);
  latest.current = {
    records: visibleRecords,
    year,
    selected,
    enabled: animations,
    view,
    globe,
    onSelect,
    onMapReady,
    onBasemapError,
  };

  useEffect(() => {
    const map = new Map({
      container: container.current,
      style: mapStyle(),
      center: [-22, -8],
      zoom: window.innerWidth < 700 ? 1 : 1.7,
      minZoom: 0.8,
      maxZoom: 12,
      renderWorldCopies: false,
      attributionControl: { compact: true },
      canvasContextAttributes: { antialias: true },
      fadeDuration: 180,
      pitchWithRotate: false,
      dragRotate: false,
    });
    mapRef.current = map;
    const lookup = new globalThis.Map(records.map((r) => [r.id, r]));
    let stopParticles;
    const popup = new Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 14,
      className: 'map-tooltip',
    });
    map.on('load', () => {
      addMeteoriteLayers(map, toGeoJSON(records.filter((record) => !isPolar(record))));
      polarPainter.current = createPolarPoints(map, polarCanvas.current, () => latest.current);
      stopParticles = createParticlePainter(map, canvas.current, () => latest.current);
      setReady(true);
      latest.current.onMapReady(map);
      if (import.meta.env.DEV) {
        window.__meteoritosMap = map;
        window.__meteoritosPolar = polarPainter.current;
      }
      map.on('click', 'meteorite-hits', (event) => {
        const feature = event.features?.sort((a, b) => b.properties.mass - a.properties.mass)[0];
        if (feature) latest.current.onSelect(lookup.get(Number(feature.properties.id)), false);
      });
      map.on('mousemove', 'meteorite-hits', (event) => {
        map.getCanvas().style.cursor = 'pointer';
        const record = lookup.get(Number(event.features?.[0]?.properties.id));
        if (!record) return;
        const content = document.createElement('div');
        const title = document.createElement('strong');
        title.textContent = record.name;
        const detail = document.createElement('span');
        detail.textContent = `${record.year ?? 'Sin año'} · ${formatMass(record.mass)} · ${record.fall}`;
        content.append(title, detail);
        popup.setLngLat([record.lon, record.lat]).setDOMContent(content).addTo(map);
      });
      map.on('mouseleave', 'meteorite-hits', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
      map.on('movestart', () => popup.remove());
    });
    map.on('error', (event) => {
      // El mapa local de países sigue disponible si falla un proveedor de teselas.
      if (event.sourceId === 'relief' || event.sourceId === 'satellite')
        latest.current.onBasemapError(true);
      else if (import.meta.env.DEV)
        console.warn('Cartografía:', event.error?.message || event.message);
    });
    return () => {
      stopParticles?.();
      polarPainter.current?.destroy();
      popup.remove();
      map.remove();
      if (import.meta.env.DEV) {
        delete window.__meteoritosMap;
        delete window.__meteoritosPolar;
      }
    };
  }, [records]);

  useEffect(() => {
    if (!ready) return;
    const map = mapRef.current,
      filter = mapFilter(filters, year, mode, includeUnknown);
    for (const layer of ['meteorite-points', 'meteorite-glow', 'meteorite-hits', 'density'])
      map.setFilter(layer, filter);
    map.setPaintProperty('meteorite-points', 'circle-color', colorExpression(view));
    map.setPaintProperty('meteorite-glow', 'circle-color', colorExpression(view));
    map.setLayoutProperty('density', 'visibility', view === 'density' ? 'visible' : 'none');
    map.setPaintProperty('meteorite-points', 'circle-opacity', view === 'density' ? 0.3 : 0.85);
    map.setLayoutProperty('meteorite-glow', 'visibility', view === 'density' ? 'none' : 'visible');
  }, [ready, filters, year, mode, includeUnknown, view]);

  useEffect(() => {
    if (!ready) return;
    mapRef.current.setLayoutProperty(
      'relief',
      'visibility',
      basemap === 'relief' ? 'visible' : 'none',
    );
    mapRef.current.setLayoutProperty(
      'satellite',
      'visibility',
      basemap === 'satellite' ? 'visible' : 'none',
    );
    mapRef.current.setPaintProperty('land-tint', 'fill-opacity', basemap === 'relief' ? 0.2 : 0);
  }, [ready, basemap]);

  useEffect(() => {
    if (ready) {
      mapRef.current.setProjection({ type: globe ? 'globe' : 'mercator' });
      mapRef.current.setMinZoom(globe ? -1.5 : 0.8);
    }
  }, [ready, globe]);

  useEffect(() => {
    if (!ready) return;
    // Un registro fuera de filtros conserva su ficha, pero no se dibuja en el mapa.
    const included = selected && visibleRecords.some((r) => r.id === selected.id);
    mapRef.current
      .getSource('selection')
      .setData(toGeoJSON(included && !isPolar(selected) ? [selected] : []));
    polarPainter.current?.draw();
  }, [ready, selected, visibleRecords]);

  return (
    <div className="map-shell" aria-label="Mapa interactivo de meteoritos">
      <div ref={container} className="map-container" />
      <canvas ref={polarCanvas} className="particle-canvas" aria-hidden="true" />
      <canvas ref={canvas} className="particle-canvas" aria-hidden="true" />
      <div className="map-vignette" aria-hidden="true" />
      {!ready && (
        <div className="map-loading">
          <span className="loading-orbit" />
          Preparando el atlas…
        </div>
      )}
    </div>
  );
}
