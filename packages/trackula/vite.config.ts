import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import packageJson from './package.json'

export default defineConfig((command) => {
  const isProd = command.mode === 'production'

  return {
    build: {
      sourcemap: !isProd,
      minify: 'esbuild',

      lib: {
        entry: resolve(__dirname, './index.ts'),
        name: packageJson.name,
        formats: ['es', 'cjs'],
      },
    },

    esbuild: {
      // remove console.debug() in prod
      pure: isProd ? ['console.debug'] : [],
    },

    plugins: [
      dts({ rollupTypes: true, tsconfigPath: './tsconfig.json' }),
    ],
  }
})
