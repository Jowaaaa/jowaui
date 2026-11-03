import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/example/",
  build: {
    outDir: "build/client",
  },
  plugins: [tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
});
