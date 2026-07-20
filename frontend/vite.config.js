import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Dès que ton code React fait une requête commençant par '/api'
      "/api": {
        target: "http://localhost:8000", // URL de ton backend Node.js
        changeOrigin: true, // Dupe le serveur sur l'origine du protocole
        secure: false, // Si jamais ton local est en http simple
      },
    },
  },
});
