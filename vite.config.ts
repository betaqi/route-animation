/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
// import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      'vue-starport': path.resolve(__dirname, './core/index.ts')
    },
  },
  plugins: [
    Vue(),
    // VueDevTools(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      importMode(filepath, options) {
        // console.log('====================filepath==================================')
        // console.log(filepath)
        // console.log('====================filepath end==================================')
        // console.log('====================options==================================')
        // console.log(options)
        // console.log('====================options end==================================')
        return 'sync'
      }
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
  server: {
    host: '0.0.0.0'
  }
})
