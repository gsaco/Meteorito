import { massScale, massColor } from './data';

// Un solo lienzo, como máximo 120 pulsos simultáneos. No hay un nodo DOM por registro.
// El trazo es simbólico: el catálogo no informa trayectoria, velocidad ni energía.
export function createParticlePainter(map, canvas, getState) {
  const ctx = canvas.getContext('2d');
  let frame,
    width = 0,
    height = 0,
    elapsed = 0,
    previous = performance.now();
  let lastRecords,
    candidates = [];
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  function draw(now) {
    const state = getState();
    const dt = Math.min(now - previous, 60);
    previous = now;
    ctx.clearRect(0, 0, width, height);
    if (!state.enabled || document.hidden) {
      frame = requestAnimationFrame(draw);
      return;
    }
    elapsed += dt;
    if (state.records !== lastRecords) {
      lastRecords = state.records;
      // Muestreo determinista solo para efectos; TODOS los registros siguen en las capas del mapa.
      const all = state.records.filter((r) => r.year === state.year);
      const stride = Math.max(1, Math.ceil(all.length / 119));
      candidates = all.filter((_, i) => i % stride === 0).slice(0, 119);
    }
    const events = state.selected?.mappable
      ? [...candidates.filter((r) => r.id !== state.selected.id), state.selected]
      : candidates;
    const center = map.getCenter();
    const radians = Math.PI / 180;
    for (const record of events) {
      if (!state.globe && Math.abs(record.lat) > 85.051129) continue;
      if (state.globe && map.getZoom() < 5) {
        const dot =
          Math.sin(center.lat * radians) * Math.sin(record.lat * radians) +
          Math.cos(center.lat * radians) *
            Math.cos(record.lat * radians) *
            Math.cos((record.lon - center.lng) * radians);
        if (dot < 0.06) continue;
      }
      const p = map.project([record.lon, record.lat]);
      if (
        !Number.isFinite(p.x) ||
        !Number.isFinite(p.y) ||
        p.x < -100 ||
        p.x > width + 100 ||
        p.y < -100 ||
        p.y > height + 100
      )
        continue;
      const strength = massScale(record.mass);
      const duration = 2800 + strength * 1600;
      const phase = ((elapsed + record.id * 47) % duration) / duration;
      const selected = state.selected?.id === record.id;
      const radius = 28 + strength * 64 + (selected ? 22 : 0);
      const fell = record.fall === 'Fell';
      const color = selected
        ? '#fff1bc'
        : state.view === 'status'
          ? fell
            ? '#7de2dd'
            : '#f5c874'
          : massColor(record.mass);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      // Tres ondas luminosas, con desvanecimiento continuo y sin parpadeos bruscos.
      for (let ring = 0; ring < 3; ring++) {
        const progress = (phase + ring / 3) % 1;
        const opacity = (1 - progress) ** 1.3 * (fell ? 0.95 : 0.75);
        const waveRadius = 6 + radius * progress;
        // Una corona ancha y tenue ilumina el contorno definido de cada onda.
        ctx.globalAlpha = opacity * 0.18;
        ctx.lineWidth = selected ? 9 : 7;
        ctx.beginPath();
        ctx.arc(0, 0, waveRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = opacity;
        ctx.lineWidth = (selected ? 3 : 2) * (1 - progress * 0.45);
        ctx.beginPath();
        ctx.arc(0, 0, waveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
      const breath = 0.5 + 0.5 * Math.sin(phase * Math.PI * 2);
      const glowRadius = 24 + strength * 24 + (selected ? 12 : 0);
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
      glow.addColorStop(0, color);
      glow.addColorStop(0.25, color);
      glow.addColorStop(1, 'transparent');
      ctx.globalAlpha = 0.28 + 0.3 * breath;
      ctx.fillStyle = glow;
      ctx.fillRect(-glowRadius, -glowRadius, glowRadius * 2, glowRadius * 2);
      ctx.globalAlpha = 0.8 + 0.2 * breath;
      ctx.fillStyle = '#fff9e6';
      ctx.beginPath();
      ctx.arc(0, 0, 2.8 + strength * 2.2 + breath, 0, Math.PI * 2);
      ctx.fill();
      // Solo Fell tiene una estela; Found mantiene las ondas de hallazgo.
      if (fell && phase < 0.3) {
        const approach = 1 - phase / 0.3;
        const length = 42 + strength * 64;
        ctx.globalAlpha = Math.sin((phase / 0.3) * Math.PI) * 0.95;
        const tail = ctx.createLinearGradient(length * approach, -length * approach, 0, 0);
        tail.addColorStop(0, 'transparent');
        tail.addColorStop(1, color);
        ctx.strokeStyle = tail;
        ctx.lineWidth = 2 + strength * 2;
        ctx.beginPath();
        ctx.moveTo(length * approach, -length * approach);
        ctx.lineTo(0, 0);
        ctx.stroke();
      }
      ctx.restore();
    }
    frame = requestAnimationFrame(draw);
  }
  frame = requestAnimationFrame(draw);
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    ctx.clearRect(0, 0, width, height);
  };
}
