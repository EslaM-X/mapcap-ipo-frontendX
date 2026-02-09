/**
 * MapCap IPO - Vite Configuration v1.2
 * ---------------------------------------------------------
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: 
 * Optimized for Pi Browser deployment and MERN Stack integration.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  server: {
    // Port 5173 is standard, but we ensure it's fixed for Pi Sandbox testing
    port: 5173,
    strictPort: true,
    
    // Proxy configuration to bridge Frontend calls to Node.js Backend
    // This prevents CORS issues during the 'IPO Alpha' development phase.
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your MERN Engine URL
        changeOrigin: true,
        secure: false,
      }
    }
  },

  build: {
    // Optimizing the build for mobile performance (Page 8 requirement)
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Manual chunking to ensure fast initial load in Pi Browser
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios'],
        },
      },
    },
  },

  // Base public path - set to './' for flexible hosting (Vercel/GitHub/Custom)
  base: './',
})
