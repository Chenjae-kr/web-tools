import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/web-tools/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('echarts')) return 'echarts-vendor'
          if (id.includes('zod')) return 'schema-vendor'
          if (id.includes('papaparse')) return 'parser-vendor'
        },
      },
    },
  },
})
