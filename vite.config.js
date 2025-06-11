import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const outDir = "Y:/Reports/scorecard-metrics";

// https://vite.dev/config/
export default defineConfig({
  build: { copyPublicDir: true, emptyOutDir: true, outDir },
  plugins: [react()],
  base: "",
});
