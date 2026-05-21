import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/lib/index.ts",
    styles: "src/lib/styles/index.css",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
});
