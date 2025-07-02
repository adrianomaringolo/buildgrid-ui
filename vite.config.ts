import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { globSync } from "glob";
import { peerDependencies, dependencies } from "./package.json";

const external = [
  ...Object.keys(peerDependencies),
  ...Object.keys(dependencies),
];

export default defineConfig({
  plugins: [react(), dts({ outDir: "dist" })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "c8",
      reporter: ["text", "lcov"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external,
      input: Object.fromEntries(
        globSync("src/**/*.{ts,tsx}").map((file) => [
          path.relative(
            "src",
            file.slice(0, file.length - path.extname(file).length)
          ),
          file,
        ])
      ),
      output: {
        format: "es",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});