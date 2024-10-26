import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nom-du-depot/' // Remplacez 'nom-du-depot' par le nom exact de votre dépôt GitHub
})