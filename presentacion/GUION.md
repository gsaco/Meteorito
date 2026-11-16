# Guion de exposición · Quarto y React

Duración: 20–25 minutos.

## 1. METEORITOS

Presentar el proyecto del curso Herramientas de Programación con Python. Duración prevista: 20–25 minutos. Los datos corresponden a la copia histórica entregada, no a una descarga actualizada. Integrantes: Richard Michel Altamirano Galvez, Gabriel Andreas Saco Alvarado y Fina Rosmery Pretil Pocomucha. La portada usa una proyección ortográfica D3 con las 32 186 coordenadas utilizables, incluyendo registros sin año. El giro se puede pausar o controlar arrastrando. Fuente cartográfica: Natural Earth. Docente: Uwe Rojas.

## 2. Encontrados y vistos caer

Explicar por qué separar Found y Fell cambia la interpretación. El catálogo documenta recuperaciones y observaciones, no una tasa mundial de impactos. Fuente: informe, sección 2; NASA, Meteors & Meteorites Facts, https://science.nasa.gov/solar-system/meteors-meteorites/facts/

## 3. La unidad de análisis es un registro

El registro Meridiani Planum corresponde a Marte y se excluye solo de la muestra terrestre. No equiparar cada registro con un impacto independiente. Fuente: CSV original y Excel, Calidad. TidyTuesday https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-06-11

## 4. La limpieza conserva la trazabilidad

Código pedagógico simplificado de las reglas efectivas del notebook. La base preparada conserva las 45 716 filas. Las muestras se filtran por pregunta. No se imputan coordenadas ni masas. Fuente: notebook y hoja Calidad.

## 5. Flujo de trabajo del proyecto

El proyecto tiene una sola tabla de observaciones. El diccionario y Natural Earth son recursos auxiliares. Por ello, el requisito condicional de tres merges no aplica. Los cálculos alimentan el notebook, el informe y el atlas. Seguir las seis etapas de la consigna. Unión: no aplica a una única tabla de observaciones; comprobar id y conservación de filas. P9 ahora incluye melt, exportación larga y reconstrucción verificada.

## 6. Funciones pequeñas, resultados verificables

Explicar parámetros, retorno y reutilización. No es una transcripción literal de la función más completa del notebook. Se utilizan cinco funciones principales y rutinas cartográficas. Fuente: anexo B y notebook.

## 7. P1 · La cobertura geográfica es desigual

Fuente: hoja P1_tipo_y_mapa. Mapa Equal Earth con Cartopy y Natural Earth. La densidad refleja observación y recuperación, además de disponibilidad de coordenadas. https://www.naturalearthdata.com/; https://cartopy.readthedocs.io/

## 8. P2 · La Antártida concentra los hallazgos

La conservación, exposición y búsqueda organizada ayudan a interpretar la concentración. El catálogo no permite atribuir causalmente cuánto aporta cada mecanismo. Fuente: P2_antartida_conteos; Tollenaar et al. (2022), https://doi.org/10.1126/sciadv.abj8138

## 9. P3 · El crecimiento describe registros

Fuente: hoja P3_decadas. El gráfico conserva Found y Fell separados. Los 60 registros anteriores a 1800 permanecen en Excel. No interpretar la serie como frecuencia anual de impactos.

## 10. P4 · L6 es la clase más frecuente

Fuente: hoja P4_clases. Los códigos se conservan tal como aparecen en la fuente. El patrón depende de clasificación, preservación y muestreo. Tipos: ASU, https://meteorites.asu.edu/meteorite-types

## 11. P5 · La masa tiene una cola muy larga

Fuente: P5_histograma y P5_estadisticas. Son 40 intervalos. La transformación permite observar varios órdenes de magnitud sin sumar constantes ni reemplazar ceros.

## 12. P6 · Las masas típicas difieren

Fuente: P6_masa_por_tipo. Los cuartiles y la mediana describen diferencias entre tipos. La lámina conserva el diagrama de caja del análisis, incluidos los valores atípicos. Sesgos de observación y recuperación impiden interpretar la diferencia como efecto causal.

## 13. P7 · Hoba encabeza el ranking

Fuente: P7_mayores_masas y P5_estadisticas. El gráfico usa toneladas. Cada entrada puede referirse a material recuperado y no necesariamente a un único fragmento.

## 14. P8 · Año y masa tienen poca asociación

Fuente: P8_asociacion. Spearman mide asociación monótona. La lámina muestra las nubes de puntos completas, con masa logarítmica. No sustenta causalidad ni ausencia de toda relación posible.

## 15. P9 · La composición cambia entre décadas

Fuente: P9_clases_pct. Cada columna suma 100 %. No son porcentajes del catálogo total. Una mayor participación puede responder a campañas, clasificación y lugares de recuperación.

## 16. P10 · Tres registros corresponden al Perú

Fuente: P10_peru_candidatos. La frontera 1:110 millones excluía erróneamente Carancas. Se conserva esa comprobación para auditoría y se usa 1:10 millones junto con ASU. Daule corresponde a Ecuador. https://meteorites.asu.edu/news/carancas