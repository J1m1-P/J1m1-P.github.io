import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({

  // base: "/J1m1-P.github.io/",
  base: "/",

  plugins: [
    react(), 
    tailwindcss(), 
  ],
})
