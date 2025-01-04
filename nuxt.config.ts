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
        lang: 'en',
        dir: 'ltr'
      },
      title: 'James Martin - Software Development Insights',
      titleTemplate: '%s | James Martin',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'Personal blog sharing software development insights, experiences, and practical solutions from building production systems.' },
        { name: 'author', content: 'James Martin' },
        { name: 'theme-color', content: '#4a5944' },
        { name: 'msapplication-TileColor', content: '#4a5944' },
        { name: 'msapplication-config', content: '/images/browserconfig.xml' },
        
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'James Martin' },
        { property: 'og:title', content: 'James Martin - Software Development Insights' },
        { property: 'og:description', content: 'Personal blog sharing software development insights, experiences, and practical solutions from building production systems.' },
        { property: 'og:image', content: 'https://james-martin.dev/images/og-image.jpg' },
        { property: 'og:url', content: 'https://james-martin.dev' },
        { property: 'og:locale', content: 'en_US' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@Dorkside' },
        { name: 'twitter:creator', content: '@Dorkside' },
        { name: 'twitter:title', content: 'James Martin - Software Development Insights' },
        { name: 'twitter:description', content: 'Personal blog sharing software development insights, experiences, and practical solutions from building production systems.' },
        { name: 'twitter:image', content: 'https://james-martin.dev/images/og-image.jpg' },
        
        // Additional SEO
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'keywords', content: 'software development, web development, programming, javascript, typescript, vue, nuxt, software engineering' }
      ],
      link: [
        // Favicons
        { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/images/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/images/android-chrome-512x512.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '/images/safari-pinned-tab.svg', color: '#4a5944' },
        
        // Other links
        { rel: 'canonical', href: 'https://james-martin.dev' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'RSS', href: '/feed.xml' },
        
        // Fonts
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap' }
      ]
    }
  },
  content: {
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      },
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