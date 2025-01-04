// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    '@nuxtjs/color-mode',
    '@nuxt/image'
  ],
  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpeg'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'by James - Software Development Insights',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal blog sharing software development insights, experiences, and projects.' },
        { name: 'theme-color', content: '#4a5944' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'by James - Software Development Insights' },
        { property: 'og:description', content: 'Personal blog sharing software development insights, experiences, and projects.' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  content: {
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      },
      // Configure to use NuxtImg for markdown images
      tags: {
        img: 'NuxtImg'
      }
    },
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  },
  sitemap: {
    siteUrl: 'https://james-martin.dev'
  },
  robots: {
    sitemap: 'https://james-martin.dev/sitemap.xml'
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  }
})