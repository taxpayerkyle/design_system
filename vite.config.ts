import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// GitHub Pages serves project sites under /<repo>/, so build assets need that base.
// Dev server stays at root so `npm run dev` works normally.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/design_system/" : "/",
  plugins: [react()],
}));
