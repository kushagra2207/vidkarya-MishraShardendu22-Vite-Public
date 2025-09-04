import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // UI libraries
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'mui-vendor';
            }
            // Icons
            if (id.includes('react-icons')) {
              return 'icons-vendor';
            }
            // Analytics
            if (id.includes('@vercel') || id.includes('react-ga4')) {
              return 'analytics-vendor';
            }
            // Other large libraries
            if (id.includes('axios') || id.includes('firebase')) {
              return 'utility-vendor';
            }
            if (id.includes('tinymce')) {
              return 'editor-vendor';
            }
            // Everything else goes to vendor
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase limit to 1000kB
    target: 'esnext',
    minify: 'esbuild'
  }
})
