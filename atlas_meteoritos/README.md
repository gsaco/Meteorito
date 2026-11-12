# Meteoritos · Atlas de meteoritos

Una aplicación completa en esta carpeta: mapa de relieve inspirado en Windy, animaciones por masa y línea de tiempo inspirada en Tremor. Incluye los datos de la tarea, el código y las pruebas. No necesita claves de API.

## Abrir

En Mac, abre **INICIAR.command**. También puedes usar una terminal dentro de esta carpeta:

```sh
npm ci
npm run dev
```

Abre **http://127.0.0.1:5173/**. Requiere Node.js 22.12 o posterior. Si el puerto ya está ocupado, Vite indica otro puerto disponible.

## Qué puedes hacer

- Buscar un meteorito por nombre o identificador en los 45.716 registros.
- Ver nombre, clase, año, masa y estado **Fell / Found**; seleccionar puntos directamente.
- Filtrar por estado, masa mínima y clasificación.
- Explorar masa, tipo de registro y densidad; alternar relieve y satélite.
- Viajar a Perú, al mundo o a la Antártida; alternar mapa plano y globo.
- Reproducir años a tres velocidades, arrastrar el selector o escribir el año y pulsar Enter. Elegir un año aislado o el acumulado hasta ese año.
- Abrir la tabla, buscar dentro de los resultados y exportarlos a CSV.
- Pulsos intensos activos por defecto, con tres anillos luminosos. Puedes apagarlos con «Pulsos» o con el botón de destellos en móvil. Los movimientos de cámara y paneles respetan la preferencia de movimiento reducido del dispositivo.

En móvil, «Explorar» abre los filtros y el botón de destellos controla los pulsos. Los cuadros de información y tabla se cierran con Escape o su botón de cierre.

## Lectura correcta de los datos

La copia de la tarea tiene **45.716 registros**: 45.715 terrestres y Meridiani Planum, en Marte. **32.186** tienen coordenadas terrestres utilizables. Los registros sin ubicación y los (0, 0) no se colocan artificialmente en el mapa. La tabla puede incluirlos; la búsqueda también permite consultar el registro marciano.

**Fell** significa caída observada; **Found**, hallazgo. En Found, el año no es la fecha de caída. La cronología válida abarca **860–2013**. «Sin año» permite incluir los registros sin año válido, pero estos no participan en el histograma ni en la reproducción de eventos. No es información en tiempo real.

La masa se conserva en **gramos** y se presenta en g, kg o t. Se distinguen cero y ausencia de datos. Tamaño, amplitud y duración del pulso aumentan con `log10(1 + masa)`: los puntos pequeños siguen siendo visibles sin dejar que Hoba, de 60 t, oculte el mapa.

Las caídas observadas tienen un destello y anillos; los hallazgos, anillos suaves. Los trazos son simbólicos. No representan dirección, velocidad, energía de impacto ni una fecha más precisa que el año. Se animan hasta 120 puntos simultáneamente; el resto permanece en las capas estáticas. El meteorito seleccionado también puede pulsar si está incluido en los filtros.

El mapa plano usa Mercator, que no cubre los extremos polares. Los **1.423 registros** más allá de ±85,051129° se representan en el globo desde sus coordenadas originales, con una capa específica que evita el recorte interno de las teselas. La densidad está disponible en la vista plana y cuenta registros, sin ponderarlos por masa. En el globo se usan puntos individuales.

Los conteos «con ubicación» corresponden a todos los registros geolocalizables que cumplen los filtros, no solo a los que caben en la pantalla. La distribución también refleja dónde se buscan y conservan meteoritos; no mide el riesgo de impactos.

## Archivos principales

| Archivo | Función |
| --- | --- |
| `src/App.jsx` | Estado de la aplicación, búsqueda, filtros y ficha |
| `src/MeteoriteMap.jsx` | Conexión entre los controles y el mapa |
| `src/mapStyle.js` | Cartografía, colores y capas |
| `src/particles.js` | Pulsos y destellos sobre las coordenadas |
| `src/polarPoints.js` | Ubicaciones polares sin recortar ni mover |
| `src/Timeline.jsx` | Histograma y controles temporales |
| `src/Dialogs.jsx` | Explicación de datos, tabla y exportación |
| `src/data.js` | Filtros, unidades y cálculos compartidos |
| `src/styles.css` | Diseño adaptable a escritorio y móvil |
| `public/datos/` | CSV auditado, diccionario y JSON de la aplicación |
| `scripts/preparar_datos.py` | Conversión reproducible de CSV a JSON, sin imputaciones |
| `tests/` | Pruebas de datos y de la interfaz |
| `verificacion/` | Capturas y resultados de las comprobaciones |

Se usan React, MapLibre GL JS, Motion y Canvas. CSS es propio y no necesita Tailwind. Las fuentes DM Sans y Manrope están incluidas junto con sus licencias.

## Comprobaciones y entrega

```sh
npm test
npm run build
```

Para repetir la prueba automática de navegación, con `npm run dev` activo en otra terminal:

```sh
npx playwright install chromium
npm run test:ui
```

La prueba revisa filtros combinados, Hoba y Carancas, ausencia de coordenadas, Marte, año 860, reproducción y pausa, exportación, polos, capas, móvil, movimiento reducido y funcionamiento sin proveedores externos. Genera `verificacion/pruebas-interfaz.json` y capturas.

`npm run build` deja la versión compilada en **dist/**. Puedes comprobarla con `npm run preview`. No abras `index.html` directamente con doble clic: la aplicación necesita un servidor HTTP para cargar los datos.

La versión compilada ya está incluida. Para abrirla en otro equipo sin instalar dependencias de JavaScript, basta con Python 3, desde esta carpeta:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Después abre **http://127.0.0.1:8000/**. Una demostración grabada está en `verificacion/demo.webm`.

El CSV, los países de respaldo, los rótulos cartográficos y las fuentes de la interfaz son locales. El relieve y las imágenes satelitales se solicitan por internet; si falla la conexión externa, siguen disponibles los países locales y el catálogo. La publicación en GitHub Pages se realiza automáticamente al subir cambios de esta carpeta a `main`.

Para volver a convertir el CSV incluido: `python3 scripts/preparar_datos.py`. No hacen falta paquetes adicionales de Python. Para mantener el código formateado: `npm run format`.

Las fuentes de datos, referencias de diseño y la búsqueda de animaciones están documentadas en **REFERENCIAS.md**.

## GitHub Pages

Sitio: https://gsaco.github.io/Meteorito/

El flujo `.github/workflows/deploy-pages.yml` instala las dependencias, comprueba los datos, compila la aplicación y publica únicamente `dist/`. En GitHub, Settings → Pages debe usar **GitHub Actions**. El repositorio puede permanecer privado; la web publicada es pública.
