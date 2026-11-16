import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
const dir = fileURLToPath(new URL(".", import.meta.url));
export default defineConfig({
  root: dir,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    __ASSET_VERSION__: JSON.stringify(process.env.METEORITOS_ASSET_VERSION || "dev"),
  },
  plugins: [react()],
  publicDir: false,
  base: "./",
  build: {
    outDir: "widgets",
    emptyOutDir: true,
    lib: {
      entry: dir + "src/entry.jsx",
      formats: ["es"],
      fileName: () => "meteoritos.js",
    },
    rollupOptions: { output: { assetFileNames: "[name][extname]" } },
  },
});
