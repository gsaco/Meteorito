import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { createHash } from "node:crypto";
const root = fileURLToPath(new URL("../", import.meta.url));
const quarto =
  process.env.QUARTO_PATH ||
  [
    "quarto",
    "/Applications/RStudio.app/Contents/Resources/app/quarto/bin/quarto",
  ].find((p) => {
    try {
      execFileSync(p, ["--version"], { stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  });
if (!quarto)
  throw Error("Instala Quarto o indica la ruta del ejecutable en QUARTO_PATH.");
execFileSync("python3", [path.join(root, "scripts/preparar_quarto.py")], {
  cwd: root,
  stdio: "inherit",
});
// Content fingerprints prevent the browser from reusing a previous edition.
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex").slice(0, 12);
const assetHash = createHash("sha256");
for (const file of fs.readdirSync(path.join(root, "assets")).sort()) {
  const fullPath = path.join(root, "assets", file);
  if (fs.statSync(fullPath).isFile()) assetHash.update(fs.readFileSync(fullPath));
}
process.env.METEORITOS_ASSET_VERSION = assetHash.digest("hex").slice(0, 12);
await (await import("vite")).build({ configFile: path.join(root, "vite.config.js") });
const bundle = path.join(root, "widgets/meteoritos.js");
const bundleName = `meteoritos-${hash(fs.readFileSync(bundle))}.js`;
fs.renameSync(bundle, path.join(root, "widgets", bundleName));
fs.writeFileSync(path.join(root, "widgets.html"), `<script type="module" src="widgets/${bundleName}"></script>\n`);
execFileSync(quarto, ["render", "meteoritos.qmd"], {
  cwd: root,
  stdio: "inherit",
});
const htmlPath = path.join(root, "index.html");
const cssVersion = hash(fs.readFileSync(path.join(root, "theme.css")));
fs.writeFileSync(htmlPath, fs.readFileSync(htmlPath, "utf8").replace('href="theme.css"', `href="theme.css?v=${cssVersion}"`));
