// Ejecutar con el servidor activo: npm run test:ui
// La primera vez: npx playwright install chromium
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'verificacion');
const { records } = JSON.parse(
  await fs.readFile(path.join(root, 'public/datos/meteoritos.json'), 'utf8'),
);
const browser = await chromium.launch({ headless: true });
const report = { date: new Date().toISOString(), checks: [], errors: [], screenshots: [] };
const page = await browser.newPage({
  viewport: { width: 1440, height: 960 },
  deviceScaleFactor: 1,
});
page.on('pageerror', (error) => report.errors.push(error.message));
const check = (name, details) => {
  report.checks.push({ name, status: 'passed', ...details });
  console.log(`✓ ${name}`);
};
const ready = async (p) => {
  await p.goto(process.env.ATLAS_URL || 'http://127.0.0.1:5173/');
  await p.waitForFunction(() => window.__meteoritosMap?.isStyleLoaded(), { timeout: 45000 });
  await p.evaluate(() => document.fonts.ready);
};
const screenshot = async (name, p = page) => {
  await p.screenshot({ path: path.join(output, name) });
  report.screenshots.push(name);
};
const count = async () =>
  Number((await page.getByTestId('mapped-count').innerText()).replaceAll(',', ''));
const setYear = async (year) => {
  await page.getByLabel('Año del registro', { exact: true }).fill(String(year));
  await page.getByLabel('Año del registro', { exact: true }).press('Enter');
};
const search = async (record) => {
  await page
    .getByRole('combobox', { name: 'Buscar meteorito por nombre o ID' })
    .fill(String(record.id));
  await page.getByRole('option').filter({ hasText: record.name }).first().click();
  await page.waitForTimeout(2100);
};

try {
  await ready(page);
  assert.equal(await count(), 32186);
  assert.equal(await page.locator('.detail-panel h2').innerText(), 'Carancas');
  assert.match(await page.locator('.detail-metrics').innerText(), /2007/);
  assert.match(await page.locator('.detail-metrics').innerText(), /342 g/);
  const nativeCount = await page.evaluate(
    async () => (await window.__meteoritosMap.getSource('meteorites').getData()).features.length,
  );
  assert.equal(nativeCount, 30763);
  check('Catálogo inicial: 32.186 ubicaciones, ficha Carancas y separación correcta de polos');
  await screenshot('final-escritorio.png');

  const animationBefore = await page
    .locator('canvas')
    .last()
    .evaluate((canvas) => canvas.toDataURL());
  await page.waitForTimeout(350);
  const animationAfter = await page
    .locator('canvas')
    .last()
    .evaluate((canvas) => canvas.toDataURL());
  assert.notEqual(animationBefore, animationAfter);
  check('Los pulsos cambian entre fotogramas');

  const hobaPoint = await page.evaluate(() =>
    window.__meteoritosMap.project([17.91667, -19.58333]),
  );
  await page.mouse.click(hobaPoint.x, hobaPoint.y);
  await page.waitForTimeout(350);
  assert.equal(await page.locator('.detail-panel h2').innerText(), 'Hoba');
  check('Un punto del mapa abre la ficha correcta');

  await page.getByRole('button', { name: 'Fell', exact: true }).click();
  assert.equal(await count(), 1096);
  await page.getByLabel('Masa mínima', { exact: true }).fill('2');
  let expected = records.filter((r) => r.mappable && r.fall === 'Fell' && r.mass >= 1000).length;
  assert.equal(await count(), expected);
  await page.getByRole('button', { name: 'Solo este año', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Sin año', exact: true }).uncheck();
  await setYear(2007);
  expected = records.filter(
    (r) => r.mappable && r.fall === 'Fell' && r.mass >= 1000 && r.year === 2007,
  ).length;
  assert.equal(await count(), expected);
  check('Filtros combinados Fell, masa mínima de 1 kg y año 2007', { count: expected });

  await page.getByRole('button', { name: 'Explorar registros', exact: true }).click();
  const tableCount = records.filter(
    (r) => r.terrestrial && r.fall === 'Fell' && r.mass >= 1000 && r.year === 2007,
  ).length;
  assert.equal(await page.locator('tbody tr').count(), Math.min(50, tableCount));
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar CSV', exact: true }).click();
  const download = await downloadPromise;
  const downloaded = await fs.readFile(await download.path(), 'utf8');
  assert.equal(downloaded.split('\r\n').length - 1, tableCount);
  assert.ok(downloaded.includes('mass'));
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog').count(), 0);
  check('Tabla y exportación CSV respetan filtros; Escape cierra el diálogo', {
    exported: tableCount,
  });

  await page.getByRole('button', { name: 'Restablecer', exact: true }).click();
  await search(records.find((r) => r.name === 'Hoba'));
  assert.match(await page.locator('.detail-metrics').innerText(), /60 t/);
  assert.match(await page.locator('.detail-metrics').innerText(), /1920/);
  assert.match(await page.locator('.detail-panel').innerText(), /HALLAZGO/);
  check('Búsqueda: Hoba conserva 60 t, 1920 y Found');

  const missing = records.find((r) => r.terrestrial && !r.mappable && r.year != null);
  await search(missing);
  assert.match(await page.locator('.detail-location').innerText(), /Sin ubicación utilizable/);
  await search(records.find((r) => r.id === 32789));
  assert.match(await page.locator('.detail-panel').innerText(), /Marte/);
  assert.equal(
    await page.evaluate(
      async () => (await __meteoritosMap.getSource('selection').getData()).features.length,
    ),
    0,
  );
  check('Registros sin coordenadas y Meridiani Planum nunca se sitúan en la Tierra');

  await page.getByRole('button', { name: 'Solo este año', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Sin año', exact: true }).uncheck();
  await setYear(860);
  assert.equal(await count(), records.filter((r) => r.mappable && r.year === 860).length);
  assert.equal(await page.getByLabel('Periodo de la línea de tiempo').inputValue(), '860');
  check('El primer año histórico, 860, es accesible y exacto');

  await page.getByRole('button', { name: 'Restablecer', exact: true }).click();
  await page.getByLabel('Periodo de la línea de tiempo').selectOption('1900');
  await page.getByRole('button', { name: 'Reproducir línea de tiempo', exact: true }).click();
  await page.waitForTimeout(1600);
  assert.ok(
    Number(await page.getByLabel('Año del registro', { exact: true }).inputValue()) >= 1901,
  );
  await page.getByRole('button', { name: 'Pausar línea de tiempo', exact: true }).click();
  const paused = await page.getByLabel('Año del registro', { exact: true }).inputValue();
  await page.waitForTimeout(900);
  assert.equal(await page.getByLabel('Año del registro', { exact: true }).inputValue(), paused);
  check('La reproducción avanza y la pausa detiene el año');

  await page.getByRole('button', { name: 'Restablecer', exact: true }).click();
  await page.getByRole('button', { name: 'Cerrar ficha', exact: true }).click();
  await page.getByRole('button', { name: 'Antártida', exact: true }).click();
  await page.waitForTimeout(2500);
  const polar = await page.evaluate(() => ({
    count: __meteoritosPolar.points().length,
    allOriginal: __meteoritosPolar
      .points()
      .every(
        (point) =>
          Math.abs(point.record.lat) > 85.051129 &&
          Math.abs(point.x - __meteoritosMap.project([point.record.lon, point.record.lat]).x) <
            0.01,
      ),
  }));
  assert.equal(polar.count, 1423);
  assert.ok(polar.allOriginal);
  assert.ok(await page.getByRole('button', { name: 'Densidad', exact: true }).isDisabled());
  await screenshot('final-antartida.png');
  const clickable = await page.evaluate(() =>
    __meteoritosPolar.points().find((point) => {
      const element = document.elementFromPoint(point.x, point.y);
      return element?.classList.contains('maplibregl-canvas');
    }),
  );
  assert.ok(clickable);
  await page.mouse.click(clickable.x, clickable.y);
  await page.waitForTimeout(250);
  assert.ok(await page.locator('.detail-panel').isVisible());
  check('Los 1.423 puntos polares conservan posición y se pueden seleccionar');

  await page.getByRole('button', { name: 'Mundo', exact: true }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Densidad', exact: true }).click();
  assert.equal(
    await page.evaluate(() => __meteoritosMap.getLayoutProperty('density', 'visibility')),
    'visible',
  );
  await page.getByRole('button', { name: 'Cerrar ficha', exact: true }).click();
  await page.waitForTimeout(300);
  await screenshot('final-densidad.png');
  await page.getByRole('button', { name: 'Satélite', exact: true }).click();
  assert.equal(
    await page.evaluate(() => __meteoritosMap.getLayoutProperty('satellite', 'visibility')),
    'visible',
  );
  await page.getByRole('button', { name: 'Relieve', exact: true }).click();
  await page.getByRole('button', { name: 'Masa', exact: true }).click();
  check('Capas de masa, densidad, relieve y satélite responden a sus controles');

  await search(records.find((r) => r.name === 'Carancas'));
  await page.getByRole('button', { name: 'Perú', exact: true }).click();
  await page.waitForTimeout(2200);
  await screenshot('final-peru.png');
  await page.getByRole('button', { name: 'Explorar registros', exact: true }).click();
  await page.getByLabel('Buscar en la tabla').fill('Carancas');
  assert.equal(await page.locator('tbody tr').count(), 1);
  await screenshot('final-tabla.png');
  await page.keyboard.press('Escape');

  await page.setViewportSize({ width: 1366, height: 768 });
  await page.getByRole('button', { name: 'Mundo', exact: true }).click();
  await page.waitForTimeout(2000);
  await screenshot('final-portatil.png');
  const detailBounds = await page.locator('.detail-panel').boundingBox();
  const layersBounds = await page.locator('.layers-panel').boundingBox();
  assert.ok(detailBounds.y + detailBounds.height + 8 <= layersBounds.y);
  assert.ok(
    await page
      .locator('.explore-panel')
      .evaluate((panel) => panel.scrollHeight <= panel.clientHeight + 1),
  );
  check('En portátil, los paneles no se superponen y los controles caben completos');
  assert.ok(
    await page.getByRole('button', { name: 'Explorar registros', exact: true }).isVisible(),
  );

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  mobile.on('pageerror', (error) => report.errors.push(error.message));
  await ready(mobile);
  await screenshot('final-movil.png', mobile);
  assert.ok(await mobile.getByRole('button', { name: 'Mostrar u ocultar filtros' }).isVisible());
  await mobile.getByRole('button', { name: 'Mostrar u ocultar filtros' }).click();
  await mobile.getByRole('button', { name: 'Fell', exact: true }).click();
  assert.equal((await mobile.getByTestId('mapped-count').innerText()).replaceAll(',', ''), '1096');
  await mobile.getByRole('button', { name: 'Cerrar filtros', exact: true }).click();
  const horizontalOverflow = await mobile.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  assert.equal(horizontalOverflow, false);
  await mobile.getByRole('button', { name: 'Desactivar pulsos', exact: true }).click();
  assert.ok(await mobile.getByRole('button', { name: 'Activar pulsos', exact: true }).isVisible());
  check('Versión móvil: sin desbordamiento horizontal, filtros operativos y ficha visible');
  await mobile.close();

  const reduced = await browser.newPage({
    reducedMotion: 'reduce',
    viewport: { width: 1440, height: 960 },
  });
  await ready(reduced);
  const pulseToggle = reduced.getByRole('button', { name: 'Pulsos', exact: true });
  assert.equal(await pulseToggle.getAttribute('aria-pressed'), 'true');
  assert.ok(await pulseToggle.isEnabled());
  await pulseToggle.click();
  await reduced.waitForTimeout(100);
  const before = await reduced
    .locator('canvas')
    .last()
    .evaluate((canvas) => canvas.toDataURL());
  await reduced.waitForTimeout(400);
  assert.equal(
    await reduced
      .locator('canvas')
      .last()
      .evaluate((canvas) => canvas.toDataURL()),
    before,
  );
  check('Pulsos activos por defecto y apagado manual, también con movimiento reducido');
  await reduced.close();

  const offline = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await offline.route('**/*', (route) =>
    new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort(),
  );
  await ready(offline);
  assert.equal(
    (await offline.getByTestId('mapped-count').innerText()).replaceAll(',', ''),
    '32186',
  );
  assert.ok(await offline.locator('.network-note').isVisible());
  await screenshot('final-sin-teselas.png', offline);
  check('Sin servicios externos: países locales y catálogo siguen funcionando');
  await offline.close();

  assert.deepEqual(report.errors, []);
  check('Sin excepciones de JavaScript durante la prueba');
  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.failure = error.stack;
  await page.screenshot({ path: path.join(output, 'error-prueba.png') });
  throw error;
} finally {
  await fs.writeFile(path.join(output, 'pruebas-interfaz.json'), JSON.stringify(report, null, 2));
  await browser.close();
}
