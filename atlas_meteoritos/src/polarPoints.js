import { massColor, pointRadius } from './data';

export const MERCATOR_LIMIT = 85.051129;
export const isPolar = (record) => Math.abs(record.lat) > MERCATOR_LIMIT;

// Las teselas GeoJSON recortan latitudes en Mercator incluso sobre un globo.
// Estos 1.423 puntos se proyectan DIRECTAMENTE desde sus coordenadas originales.
// Se dibujan todos, sin muestreo ni desplazamientos; el lienzo solo cambia con el mapa.
export function createPolarPoints(map, canvas, getState) {
  const context = canvas.getContext('2d');
  let width = 0,
    height = 0,
    hitPoints = [],
    lastRecords,
    records = [];
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  };
  function draw() {
    const state = getState();
    context.clearRect(0, 0, width, height);
    hitPoints = [];
    if (!state.globe) return;
    if (lastRecords !== state.records) {
      lastRecords = state.records;
      records = state.records.filter(isPolar);
    }
    const center = map.getCenter(),
      radians = Math.PI / 180;
    for (const record of records) {
      const facing =
        Math.sin(center.lat * radians) * Math.sin(record.lat * radians) +
        Math.cos(center.lat * radians) *
          Math.cos(record.lat * radians) *
          Math.cos((record.lon - center.lng) * radians);
      if (facing <= 0.08 && map.getZoom() < 5) continue;
      const point = map.project([record.lon, record.lat]);
      if (
        !Number.isFinite(point.x) ||
        !Number.isFinite(point.y) ||
        point.x < -15 ||
        point.y < -15 ||
        point.x > width + 15 ||
        point.y > height + 15
      )
        continue;
      const radius = pointRadius(record.mass) * Math.max(0.4, Math.min(1, (map.getZoom() + 4) / 8));
      context.fillStyle =
        state.view === 'status'
          ? record.fall === 'Fell'
            ? '#7de2dd'
            : '#f5c874'
          : massColor(record.mass);
      context.globalAlpha = 0.86;
      context.beginPath();
      context.arc(point.x, point.y, radius, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = '#173a3c';
      context.lineWidth = 0.4;
      context.stroke();
      if (state.selected?.id === record.id) {
        context.strokeStyle = '#fff1bc';
        context.lineWidth = 1.5;
        context.globalAlpha = 1;
        context.beginPath();
        context.arc(point.x, point.y, 13, 0, Math.PI * 2);
        context.stroke();
      }
      hitPoints.push({ record, x: point.x, y: point.y, radius });
    }
    context.globalAlpha = 1;
  }
  const pick = (point) => {
    let closest = null,
      distance = Infinity;
    for (const hit of hitPoints) {
      const d = Math.hypot(point.x - hit.x, point.y - hit.y);
      if (d <= Math.max(6, hit.radius) && d < distance) {
        closest = hit.record;
        distance = d;
      }
    }
    return closest;
  };
  const click = (event) => {
    const record = pick(event.point);
    if (record) getState().onSelect(record, false);
  };
  let hoveringPolar = false;
  const move = (event) => {
    if (pick(event.point)) {
      map.getCanvas().style.cursor = 'pointer';
      hoveringPolar = true;
    } else if (hoveringPolar) {
      map.getCanvas().style.cursor = '';
      hoveringPolar = false;
    }
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  map.on('render', draw);
  map.on('click', click);
  map.on('mousemove', move);
  resize();
  return {
    draw,
    points: () => hitPoints,
    destroy: () => {
      observer.disconnect();
      map.off('render', draw);
      map.off('click', click);
      map.off('mousemove', move);
    },
  };
}
