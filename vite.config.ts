import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // Allow access from any IP address
    port: 5173, // Change this if you want a different port
    allowedHosts: [
      'cc69-41-89-220-5.ngrok-free.app', // Add your ngrok URL here
    ],
  },
})
