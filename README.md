# by James - Personal Dev Blog

A minimalist, typography-focused developer blog built with Nuxt 3, featuring dark mode support and a clean design for sharing development insights and projects.

## Features

- 🎨 Minimalist, typography-first design
- 🌓 Dark mode with system preference detection
- ⚡️ Built with Nuxt 3 and Vue.js
- 📝 Markdown-based content using Nuxt Content
- 🎯 SEO optimized
- 📱 Fully responsive
- 🎨 Tailwind CSS for styling
- 🔍 Syntax highlighting for code blocks
- 🤖 Robots.txt and sitemap generation

## Tech Stack

- [Nuxt 3](https://nuxt.com) - The Vue.js Framework
- [Nuxt Content](https://content.nuxtjs.org) - Content management
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Inter](https://fonts.google.com/specimen/Inter) - Sans-serif font
- [Newsreader](https://fonts.google.com/specimen/Newsreader) - Serif font
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - Monospace font

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/by-james.git
cd by-james
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The site will be available at `http://localhost:3000`

### Building for Production

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Content Structure

- `/content/articles/` - Blog posts
- `/content/portfolio/` - Project showcases

### Adding Content

Create new `.md` files in the respective directories with the following frontmatter:

\`\`\`yaml
---
title: Your Title
description: Brief description
date: YYYY-MM-DD
tags: [tag1, tag2]
---

Your content here...
\`\`\`

## Development

### File Structure

- `app.vue` - Main app component
- `components/` - Vue components
- `composables/` - Vue composables (including dark mode)
- `content/` - Markdown content
- `pages/` - Route pages
- `public/` - Static assets
- `tailwind.config.ts` - Tailwind configuration

## License

MIT License - feel free to use this project as a template for your own blog.

## Author

James Martin - [james-martin.dev](https://james-martin.dev)
