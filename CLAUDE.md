# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal developer blog and portfolio website built with Nuxt 3. The site is deployed to Netlify as a static site.

## Essential Commands

### Development
- `npm run dev` - Start development server (HOST=0.0.0.0)
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

### Content Generation
- `npm run og-image` - Generate Open Graph images

## Architecture Overview

### Tech Stack
- **Framework**: Nuxt 3 with Vue.js
- **Styling**: Tailwind CSS with Typography plugin
- **Content**: Nuxt Content module for Markdown-based content
- **Deployment**: Netlify static hosting with security headers

### Key Directories
- `/content/` - Markdown content files
  - `articles/` - Blog posts
  - `portfolio/` - Project showcases
- `/components/` - Vue components organized by feature
- `/scripts/` - Utility scripts
- `/pages/` - Route-based pages using file-based routing

### Content Structure
Markdown files use frontmatter:
```yaml
---
title: Title
description: Description
date: YYYY-MM-DD
tags: [tag1, tag2]
---
```

## Development Notes

- The site uses dark mode with system preference detection
- SEO is configured in `nuxt.config.ts` with comprehensive meta tags
- Security headers are configured in `netlify.toml`
- No formal testing framework is configured - testing is script-based
- Node.js 20+ is required