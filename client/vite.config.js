import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VITE_IP } from "./config.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "172.23.160.1", // Reemplaza con tu IP local
    port: "5173", // Cambia el puerto si es necesario
  },
});
