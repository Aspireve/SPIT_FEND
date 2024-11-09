import path from "path"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Listen on all network interfaces (not just localhost)
    port: 5173,        // Port you're running the app on (default for Vite)
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
