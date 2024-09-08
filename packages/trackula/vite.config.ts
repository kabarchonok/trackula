import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import packageJson from './package.json'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: packageJson.name,
      formats: ['es', 'cjs'],
    },
  },
})
