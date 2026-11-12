# Referencias consultadas para Meteoritos

Revisión: 12 de noviembre de 2026. Esta aplicación interpreta tus datos; no copia el código, las marcas ni las capas meteorológicas de Windy.

## Diseño y animación

| Referencia | Qué se tomó como inspiración o se evaluó |
| --- | --- |
| [Windy](https://www.windy.com/) | Mapa como superficie principal, controles flotantes, capas y línea temporal inferior. Se sustituyeron los datos meteorológicos por el catálogo real de meteoritos. |
| [Tremor](https://tremorhq.com/) | Navegación histórica, ficha del evento, tamaño según magnitud y controles sobre el mapa. Aquí el tamaño depende de la masa catalogada. |
| [MapLibre: icono animado](https://maplibre.org/maplibre-gl-js/docs/examples/add-an-animated-icon-to-the-map/) | Integrar dibujo animado con un mapa. Se usa un lienzo compartido, sin crear miles de elementos de interfaz. |
| [MapLibre: ejemplos](https://maplibre.org/maplibre-gl-js/docs/examples/) | Capas geográficas, selección y proyección de globo. |
| [Vladimir Agafonkin: How I built a wind map with WebGL](https://medium.com/mapbox/how-i-built-a-wind-map-with-webgl-b63022b5537f) y [demo original](https://mapbox.github.io/webgl-wind/demo/) | Partículas, persistencia visual y separación entre datos y efectos. No se simulan vientos con datos de meteoritos. |
| [Codrops: Tropical Particles Rain Animation](https://tympanus.net/codrops/2021/03/17/tropical-particles-rain-animation-with-three-js/) | Referencia para destellos, trazos y luminosidad. La solución final usa Canvas para mantener el código acotado. |
| [Codrops: Interactive Particles](https://tympanus.net/Tutorials/InteractiveParticles/) | Referencia de suavidad y atención visual mediante partículas. |
| [Motion](https://motion.dev/docs) | Aparición y cierre de fichas, con transiciones breves. |
| [Motion: movimiento reducido](https://motion.dev/docs/react-use-reduced-motion) | Respeto por la preferencia del dispositivo en cámara y paneles. Por petición del usuario, los pulsos están activos por defecto y se pueden apagar manualmente. |
| [GSAP: ticker](https://gsap.com/docs/v3/GSAP/gsap.ticker/) | Alternativa evaluada. No se añadió otra biblioteca: Motion y requestAnimationFrame cubren lo necesario. |
| [OpenFreeMap](https://openfreemap.org/quick_start/) | Alternativa de cartografía evaluada; se eligió relieve físico para la vista principal. |

**Búsqueda en X.** Se buscaron referencias de mapas WebGL, partículas, Windy y MapLibre, incluyendo el trabajo de Vladimir Agafonkin y [su perfil público](https://x.com/mourner). El acceso directo devolvió HTTP 403 y no permitió verificar publicaciones. No se presentan esos mensajes como referencias vistas: se usaron el artículo y la demostración originales del autor, además de las páginas verificables anteriores.

## Datos y cartografía

- [NASA: Meteorite Landings](https://data.nasa.gov/dataset/meteorite-landings) y [Meteoritical Bulletin](https://www.lpi.usra.edu/meteor/metbull.php): procedencia del catálogo. La aplicación usa la copia preparada de la tarea, no reemplaza sus observaciones por una descarga reciente.
- [Esri: World Physical Map](https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer): relieve. El servicio consultado declara «US National Park Service» como fuente; su atribución aparece en el mapa.
- [Esri: World Imagery](https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer): base satelital, con atribución en el mapa.
- [Natural Earth](https://www.naturalearthdata.com/): países locales de respaldo. El archivo utilizado está en `public/recursos/paises.geojson`.
- [MapLibre Demotiles](https://github.com/maplibre/demotiles/tree/gh-pages/font) y [Noto Sans](https://github.com/google/fonts/tree/main/ofl/notosans): glifos cartográficos locales; licencia OFL incluida.
- [Google Fonts: DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans) y [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope): fuentes locales y licencias OFL incluidas.

## Iteración y verificación

Se revisó la primera versión en 1440 × 960 y 390 × 844. Se ajustaron contraste, tamaño de puntos, paneles, controles temporales y navegación móvil. Una revisión adicional en 1366 × 768 corrigió la proximidad entre la ficha y el selector de capas.

La revisión polar detectó que la teselación GeoJSON de MapLibre limita las latitudes a Mercator incluso sobre el globo. Se separaron los 1.423 registros afectados y se proyectan directamente desde sus coordenadas originales. La prueba comprueba que todos estén presentes y sean seleccionables. Los registros polares nunca se desplazan al paralelo límite.

Las capturas finales y los resultados están en `verificacion/`. Las imágenes de las primeras iteraciones se conservan en `verificacion/iteraciones/`.
