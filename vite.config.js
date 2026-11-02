import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import personalPhotoDimensions from './build/personalPhotoDimensions.js'

export default defineConfig({

  base: "/",

  plugins: [
    personalPhotoDimensions(),
    react(), 
    tailwindcss(), 
  ],
})
