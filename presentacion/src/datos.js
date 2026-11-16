// Funciones puras: las pruebas no necesitan el navegador.
export const numero = new Intl.NumberFormat("es-PE");
export const formatoMasa = (g) =>
  g == null
    ? "Sin dato"
    : g >= 1e6
      ? `${numero.format(g / 1e6)} t`
      : g >= 1000
        ? `${numero.format(g / 1000)} kg`
        : `${numero.format(g)} g`;
export function fuerzaMasa(masa) {
  return masa > 0
    ? Math.min(1, Math.log10(1 + masa) / Math.log10(60000001))
    : 0;
}
export function filtrar(registros, año, tipo = "all", masa = 0) {
  return registros.filter(
    (r) =>
      r.terrestrial &&
      r.mappable &&
      r.year != null &&
      r.year <= año &&
      (tipo === "all" || r.fall === tipo) &&
      (masa === 0 || (r.mass != null && r.mass >= masa)),
  );
}
// Proyección cilíndrica equidistante. Conserva ambos polos y coordenadas reales.
export const proyectar = (lon, lat, w, h) => [
  ((lon + 180) / 360) * w,
  ((90 - lat) / 180) * h,
];
