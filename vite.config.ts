import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const isPlayground = process.env.PLAYGROUND === 'true'

export default defineConfig({
  root: isPlayground ? 'playground' : '.',
  plugins: [vue()],
  server: {
    fs: {
      allow: ['..', '.', '../']
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'IncluLib',
      fileName: format => `inclulib.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        exports: 'named'
      }
    },
    cssCodeSplit: true
  }
})
