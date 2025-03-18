import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      svgr(),
      visualizer({
        filename: './dist/stats.html',
        open: true
      })
    ],
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
    },
    base: './',
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, 'src')
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            lottie: ['lottie-react'],
            qubicLib: ['@qubic-lib/qubic-ts-library']
          }
        }
      }
    }
  }
})
