# Meteoritos · Quarto + React

Presentación de 16 diapositivas para una exposición de 20–25 minutos. Usa la paleta del atlas: azul petróleo, turquesa y dorado. La versión compilada funciona sin internet, con las fuentes, datos y cartografía dentro de esta carpeta.

## Abrir

Abrir `ABRIR_PRESENTACION.command` en Mac, o ejecutar `python3 abrir_presentacion.py`. Solo necesita Python 3. Mantener abierta la ventana de Terminal durante la exposición. No abrir `index.html` mediante doble clic: los datos requieren un servidor local.

- Flechas o espacio: avanzar y retroceder.
- Escape: vista general de las diapositivas.
- F: pantalla completa.
- S: vista del expositor con notas y cronómetro. Permitir la ventana emergente.
- Menú inferior izquierdo: acceso directo a las diapositivas.

La presentación funciona sin conexión.

## Qué hace cada herramienta

| Herramienta | Responsabilidad |
|---|---|
| Quarto | Compila `meteoritos.qmd` y organiza las láminas y notas. |
| Reveal.js | Navegación, escala de pantalla, menú y vista del expositor. |
| React | Componentes, filtros, estados e interacción. |
| Motion | Entrada de barras y trazado de líneas. |
| SVG | Gráficos vectoriales y cartografía local. |
| Canvas | Puntos y ondas animadas del mapa. |
| Python | Construye el documento Quarto desde el contenido y sirve la compilación local. El análisis original también usa Python. |
| CSS | Tipografías locales, composición, colores y transiciones. |

## Archivos principales

- `meteoritos.qmd`: las 16 láminas y las notas del expositor.
- `src/contenido.json`: textos, notas y tablas extraídas del Excel verificado.
- `src/Slide.jsx`: composición de cada tipo de lámina.
- `src/Charts.jsx`: barras, series temporales, histograma y mapa de calor, construidos con los valores del Excel.
- `src/Mapa.jsx`: mapa interactivo y animación.
- `src/datos.js`: funciones puras de selección, proyección y escala.
- `src/entry.jsx`: integra React con los eventos de Reveal. Desmonta el mapa cuando deja de estar visible.
- `theme.css`: estilo del documento.
- `GUION.md`: notas de exposición y fuentes.
- `widgets/`, `meteoritos_files/`, `assets/`, `index.html`: compilación lista para presentar.

Los mapas Cartopy, el diagrama de caja y la dispersión conservan las muestras del informe y se vuelven a dibujar con la paleta de la presentación. Las barras y líneas de React se animan al entrar en su lámina. Los valores del mapa de calor se pueden consultar con el cursor o el teclado. Los pulsos son simbólicos y no expresan velocidad, trayectoria ni energía.

El análisis geográfico general incluye 32 186 registros. Todas las masas internas permanecen en gramos.

## Editar y recompilar

Requisitos: Node.js 22.12 o posterior, Python 3 y Quarto. Esta entrega se compiló con Quarto 1.4.553, disponible en RStudio en el equipo de origen.

```sh
npm ci
npm run build
```

`npm run build` regenera el QMD desde `src/contenido.json`, compila React y ejecuta Quarto. Para cambios de contenido persistentes, editar ese JSON. Las notas también se pueden editar directamente en el QMD y luego usar `quarto render meteoritos.qmd`.

Para pruebas del navegador, iniciar desde esta carpeta `python3 -m http.server 5182 --bind 127.0.0.1` y, en otra terminal, ejecutar `npm run test:ui`. Instalar Chromium de Playwright si falta. Las pruebas bloquean solicitudes externas, revisan las 16 láminas, interacciones, teclado y vista móvil.

Documentación de las herramientas: [Quarto Reveal.js](https://quarto.org/docs/presentations/revealjs/), [eventos de Reveal.js](https://revealjs.com/events/). Las fuentes científicas y de datos figuran en las notas y en el informe original.

## Diseño interactivo · noviembre de 2026

Esta edición renueva la composición de la presentación en Quarto. Usa Space Grotesk para los títulos y cifras, DM Sans para lectura e IBM Plex Mono para código. Las fuentes se sirven localmente; las licencias están en `assets/licencias/`.

- Portada: globo ortográfico D3 con las coordenadas utilizables, giro automático, arrastre y pausa. Respeta la preferencia de movimiento reducido.
- Lámina 2: comparación interactiva Found/Fell y proporciones de la base terrestre.
- Lámina 5: etapas seleccionables con explicación de cada responsabilidad.
- Láminas 4 y 6: anotaciones que resaltan las líneas del ejemplo de código.
- Barra superior: navegación directa por capítulos; Quarto conserva vista general, notas y cronómetro.

`src/Globe.jsx` dibuja la proyección y los puntos reales. `src/Explorers.jsx` contiene las interacciones explicativas. Los gráficos estáticos se regeneran con la paleta oscura en `scripts/figuras_oscuras.py`; este paso opcional requiere Cartopy, Matplotlib, pandas y la cartografía local de `entrega_meteoritos`. Las cinco imágenes resultantes ya están incluidas y no necesitan Python para mostrarse.

Fuentes técnicas: [Quarto](https://quarto.org/docs/presentations/revealjs/) y [Motion para React](https://motion.dev/docs/react-animation).
