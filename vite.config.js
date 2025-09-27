import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~hooks': path.resolve(__dirname, './src/hooks'),
      '~assets': path.resolve(__dirname, './src/assets'),
      '~components': path.resolve(__dirname, './src/components'),
      '~utils': path.resolve(__dirname, './src/utils'),
      '~services': path.resolve(__dirname, './src/services'),
      '~helpers': path.resolve(__dirname, './src/helpers'),
      '~pages': path.resolve(__dirname, './src/pages'),
      '~contexts': path.resolve(__dirname, './src/contexts'),
    },
  },
})
