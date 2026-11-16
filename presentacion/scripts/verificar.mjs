import { chromium } from "playwright";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
await fs.mkdir("verificacion", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1600, height: 1000 },
  reducedMotion: "reduce",
});
const errors = [],
  requests = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.route("**/*", (r) => {
  const url = r.request().url();
  if (!url.startsWith("http://127.0.0.1:5182")) {
    requests.push(url);
    return r.abort();
  }
  return r.continue();
});
await page.goto("http://127.0.0.1:5182/");
await page.waitForFunction(
  () => window.__meteoritosReady && document.querySelector(".cover h1"),
);
await page.evaluate(() => document.fonts.ready);
assert.equal(await page.evaluate(() => Reveal.getTotalSlides()), 16);
// Verify the new React interactions against visible state and the data scale.
await page.waitForSelector(".globe-wrap canvas");
assert.equal(
  await page
    .locator(".cover h1")
    .evaluate((el) => getComputedStyle(el).fontFamily.includes("Space")),
  true,
);
await page.evaluate(() => Reveal.slide(1));
await page.waitForSelector('section.present .slide[data-active="true"]');
await page.getByRole("button", { name: "Fell", exact: true }).click();
await page.waitForTimeout(250);
assert.equal(
  await page.locator("section.present .comparison-number").innerText(),
  "1 107",
);
await page.getByRole("button", { name: "Found", exact: true }).click();
await page.waitForTimeout(250);
assert.equal(
  await page.locator("section.present .comparison-number").innerText(),
  "44 608",
);
await page.evaluate(() => Reveal.slide(4));
await page.waitForSelector('section.present .slide[data-active="true"]');
await page.locator("section.present .process-track button").nth(2).click();
assert(
  (
    await page.locator("section.present .process-description").innerText()
  ).includes("Reglas explícitas"),
);
await page.evaluate(() => Reveal.slide(3));
await page.waitForSelector('section.present .slide[data-active="true"]');
await page.locator("section.present .code-annotations button").nth(1).click();
assert(
  (await page.locator("section.present .is-focused").innerText()).includes(
    "mass",
  ),
);
await page.locator("section.present .chapter-nav button").first().click();
assert.equal(await page.evaluate(() => Reveal.getIndices().h), 0);
const layouts = [];
for (let i = 0; i < 16; i++) {
  await page.evaluate((i) => Reveal.slide(i), i);
  await page.waitForSelector('section.present .slide[data-active="true"]');
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `verificacion/slide-${String(i + 1).padStart(2, "0")}.png`,
  });
  const bad = await page.locator("section.present .slide").evaluate((el) =>
    [...el.querySelectorAll("h1,h2,h3,pre,.finding,.metrics,.footnote")]
      .filter((e) => {
        const a = e.getBoundingClientRect(),
          b = el.getBoundingClientRect();
        return (
          e.scrollWidth > e.clientWidth + 5 ||
          e.scrollHeight > e.clientHeight + 7 ||
          a.bottom > b.bottom + 2 ||
          a.right > b.right + 2
        );
      })
      .map((e) => e.className || e.tagName),
  );
  if (bad.length) layouts.push({ slide: i + 1, bad });
}
await page.evaluate(() => Reveal.slide(14));
await page.waitForSelector('section.present .slide[data-active="true"]');
await page.locator("section.present .data-chart g[tabindex]").nth(2).focus();
assert(
  (await page.locator("section.present .chart-tip").innerText()).includes("%"),
);
await page.evaluate(() => Reveal.slide(0));
await page.waitForSelector('section.present .slide[data-active="true"]');
await page.keyboard.press("Escape");
assert(await page.evaluate(() => Reveal.isOverview()));
await page.keyboard.press("Escape");
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
await page.screenshot({ path: "verificacion/mobile.png" });
assert(
  await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
);
await fs.writeFile(
  "verificacion/pruebas.json",
  JSON.stringify(
    {
      slides: 16,
      errors,
      requests,
      layouts,
      mobile: true,
    },
    null,
    2,
  ),
);
assert.deepEqual(errors, []);
assert.deepEqual(requests, []);
assert.deepEqual(layouts, []);
await browser.close();
console.log(
  "Quarto: 16 diapositivas, gráficos, navegación y funcionamiento local verificados.",
);
