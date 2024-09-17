import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Trackula',
  description: 'Documentation for Trackula, your ultimate tracking solution',

  head: [
    ['link', { rel: 'icon', href: '/icon.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap' }],
  ],

  appearance: 'dark', // FIXME: remove after refactor light mode

  themeConfig: {
    logo: '/logo-small.png',

    nav: [
      { text: 'Guide', link: '/what-is-trackula' },
      { text: 'Examples', link: '/examples' },
    ],

    sidebar: [
      { text: 'Introduction', collapsed: false, items: [
        { text: 'What is Trackula?', link: '/what-is-trackula' },
        { text: 'Getting Started', link: '/getting-started' },
      ] },

      { text: 'Reference', collapsed: false, items: [
        { text: 'trackula', link: '/reference/trackula' },
      ] },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kabarchonok/trackula' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Ivan Bulakhov',
    },
  },
})
