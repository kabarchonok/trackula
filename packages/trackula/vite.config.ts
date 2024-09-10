import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import packageJson from './package.json'

export default defineConfig({
  build: {
    sourcemap: true,
    minify: false,

    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: packageJson.name,
      formats: ['es', 'cjs'],
    },
  },

  plugins: [
    dts({ rollupTypes: true, tsconfigPath: './tsconfig.json' }),
  ],
})
