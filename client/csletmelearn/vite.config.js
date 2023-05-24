import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    postcss(),
  ],
  /*resolve: {
    alias: {
      'tailwindcss': "./node_modules/tailwindcss"
    }
  }*/
});
