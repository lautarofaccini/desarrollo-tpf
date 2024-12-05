import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

// Carga el archivo .env
dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: process.env.VITE_HOST || "localhost", // Usa el valor de .env o un valor predeterminado
    port: process.env.VITE_PORT || 5173, // Usa el valor de .env o un valor predeterminado
  },
});
