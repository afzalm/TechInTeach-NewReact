import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/", // Use '/' for root (techinteach.com) or '/blog/' for subdirectory (techinteach.com/blog)
  build: {
    // Use esbuild for minification (faster than Terser)
    minify: 'esbuild',
    // Enable source maps for production debugging
    sourcemap: true,
    // Optimize assets
    assetsInlineLimit: 4096, // 4kb
    // Enable CSS code splitting
    cssCodeSplit: true,
    css: {
      postcss: path.resolve(__dirname, "postcss.config.js"),
    },
  },
}));