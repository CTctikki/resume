import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000
  },
  resolve: {
    dedupe: ["react", "react-dom"]
  },
  optimizeDeps: {
    exclude: ["pdfjs-dist"]
  },
  ssr: {
    noExternal: ["pdfjs-dist"]
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: true
  },
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: "src",
      router: {
        routesDirectory: "routes"
      }
    }),
    viteReact()
  ]
});
