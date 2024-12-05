import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VITE_IP } from "../server/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: VITE_IP, // Reemplaza con tu IP local
    port: "5173", // Cambia el puerto si es necesario
  },
});
