import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import PreviewBlock from './components/PreviewBlock.vue'
import './index.css'

export default {
  extends: DefaultTheme,

  Layout,

  enhanceApp({ app }) {
    app.component('PreviewBlock', PreviewBlock)
  },
} satisfies Theme
