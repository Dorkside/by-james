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
- ✅ Automated fact-checking for tech news content

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

# LinkedIn Tech News Automation

This repository contains a system for automatically posting tech news articles to a LinkedIn Company Page using LinkedIn's API.

## Project Overview

The LinkedIn Tech News Automation system automatically detects when new articles are published on your website and posts them to a dedicated LinkedIn Company Page. This allows you to maintain a consistent social media presence without manual effort, while keeping your personal LinkedIn profile separate from automated content.

## Repository Structure

- `linkedin-tech-news-automation-plan.md`: Comprehensive implementation plan
- `docs/`: Documentation for the project
  - `setup-guide.md`: Step-by-step setup instructions
  - `api-reference.md`: LinkedIn API reference documentation
  - `troubleshooting.md`: Common issues and solutions
- `scripts/`: Implementation scripts
  - `linkedin-poster.js`: Main script for posting to LinkedIn
  - `content-detector.js`: Script for detecting new content
  - `token-manager.js`: Script for managing OAuth tokens
  - `generate-daily-news.js`: Script for generating fact-checked tech news
  - `news-prompt.js`: Prompt template for generating news content
  - `test-fact-checking.js`: Test script for the fact-checking system

## Fact-Checking System

The tech news automation includes a robust fact-checking system to ensure all published content is accurate and reliable:

### Fact-Checking Features

- **URL Validation**: Verifies that all source URLs are valid and accessible
- **Source Reputation Check**: Validates that sources come from reputable domains
- **Content Verification**: Uses AI to cross-check news items against multiple sources
- **Confidence Scoring**: Assigns confidence scores to each verified news item
- **Rejection Logging**: Maintains logs of rejected news items with reasons
- **Transparency**: Includes verification metadata in published content
- **Auto-Correction**: Attempts to correct rejected news items by finding better sources or fixing inaccuracies

### How It Works

1. News items are generated using the Perplexity API with strict factual accuracy requirements
2. Each item undergoes a three-step verification process:
   - URL validation to ensure links are accessible
   - Domain reputation check against a curated list of trusted sources
   - Cross-reference verification using AI to confirm factual accuracy
3. Items that pass verification are approved for publication
4. Items that fail verification go through an auto-correction process:
   - The system identifies what needs to be fixed (URL, title, description)
   - It attempts to find better sources or correct inaccurate information
   - Corrected items are re-verified to ensure they now meet standards
5. Successfully corrected items are approved for publication alongside verified items
6. Items that cannot be corrected are rejected and not published
7. Only verified and successfully corrected items are committed to the final news file
8. All published content includes verification and correction metadata for transparency

### Testing the Fact-Checking System

```bash
# Run the fact-checking test script
node scripts/test-fact-checking.js
```

## Getting Started

1. Review the implementation plan in `linkedin-tech-news-automation-plan.md`
2. Follow the setup guide in `docs/setup-guide.md`
3. Configure the scripts according to your needs
4. Set up the automation using cron jobs or your preferred scheduling system

## Prerequisites

- LinkedIn Company Page with admin access
- LinkedIn Developer Application with appropriate permissions
- Node.js environment for running the automation scripts
- Content source with new articles (website, blog, etc.)

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/linkedin-tech-news-automation.git

# Install dependencies
cd linkedin-tech-news-automation
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials
```

## Configuration

Edit the `.env` file with your LinkedIn API credentials and other configuration options:

```
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=your_redirect_uri
LINKEDIN_COMPANY_ID=your_company_id
CONTENT_SOURCE_URL=your_content_source_url
```

## Usage

### Manual Posting

```bash
# Post the latest article to LinkedIn
node scripts/linkedin-poster.js --latest

# Post a specific article to LinkedIn
node scripts/linkedin-poster.js --url https://example.com/your-article
```

### Automated Posting

Set up a cron job to run the posting script automatically:

```bash
# Example cron job (runs daily at 10:00 AM)
0 10 * * * cd /path/to/linkedin-tech-news-automation && node scripts/linkedin-poster.js --latest
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- LinkedIn for providing the API
- Contributors to this project