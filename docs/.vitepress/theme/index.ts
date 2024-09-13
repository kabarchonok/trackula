import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import PreviewBlock from './components/PreviewBlock.vue'
import Layout from './Layout.vue'

import './index.css'

export default {
  extends: DefaultTheme,

  Layout,

  enhanceApp({ app }) {
    app.component('PreviewBlock', PreviewBlock)
  },
} satisfies Theme
