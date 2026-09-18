import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: [
      { find: /^@\/assets\/banner\/(.*)/, replacement: path.resolve(__dirname, "src/assets/Banner/$1") },
      { find: /^@\/assets\/Banner\/(.*)/, replacement: path.resolve(__dirname, "src/assets/Banner/$1") },
      { find: /^@\/assets\/images\/(.*)/, replacement: path.resolve(__dirname, "src/assets/Images/$1") },
      { find: /^@\/assets\/Images\/(.*)/, replacement: path.resolve(__dirname, "src/assets/Images/$1") },
      { find: /^@\/assets\/services\/(.*)/, replacement: path.resolve(__dirname, "src/assets/Services/$1") },
      { find: /^@\/assets\/Services\/(.*)/, replacement: path.resolve(__dirname, "src/assets/Services/$1") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
  server: {
    port: 8080,
    host: "::",
  },
});

