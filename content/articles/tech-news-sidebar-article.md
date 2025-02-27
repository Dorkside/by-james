---
title: "Automating a Tech News Sidebar with Perplexity AI"
description: "How I built a fully automated daily tech news feed using GitHub Actions and the Perplexity AI API."
date: "2025-03-01"
tags: ["ai", "automation", "perplexity", "github-actions", "javascript"]
---

# Automating a Tech News Sidebar with Perplexity AI

![Tech News Automation](https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)

Keeping a blog fresh with daily tech news is great in theory—until you realize how unsustainable it is to manually curate updates every single day. I wanted a way to deliver relevant industry news to my readers without adding another task to my plate.

The solution? A fully automated system that pulls in fresh tech news every day, formats it neatly, and updates my blog—all without me lifting a finger. Here’s how I built it using Perplexity AI and GitHub Actions.

## The Problem

I write about web development, insurtech, and software legislation. It’d be great to highlight breaking news in these areas, but:

- I don’t have time to research and summarize news every day.
- I need something structured and reliable, not a random AI-generated dump.
- It should fit neatly into my existing blog system with zero manual effort.

I needed a way to **automate** the entire process while maintaining quality.

## The Solution: Perplexity AI + GitHub Actions

After testing different approaches, I landed on a setup that combines:

- **Perplexity AI**: Handles news research and content generation.
- **GitHub Actions**: Runs a scheduled workflow to fetch, process, and commit new updates daily.
- **A structured JSON schema**: Ensures consistency and reliability.

This setup now powers my **automated tech news sidebar**.

## Architecture Breakdown

The system consists of three key pieces:

1. **GitHub Actions workflow**: Runs every night to trigger the news update.
2. **Node.js script**: Calls the Perplexity API, formats the response, and creates a Markdown file.
3. **Perplexity AI integration**: Fetches structured, high-quality news content.

### GitHub Actions Workflow

The workflow is set up to run at **3 AM UTC every day**. It fetches fresh news, commits the result to my repo, and triggers a site rebuild.

```yaml
name: Daily Tech News Update

on:
  schedule:
    - cron: '0 3 * * *'
  workflow_dispatch:  # Allows manual triggering if needed

jobs:
  fetch-news:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Generate news content
        run: node scripts/fetch-news.js
        env:
          PERPLEXITY_API_KEY: ${{ secrets.PERPLEXITY_API_KEY }}

      - name: Commit changes
        run: |
          git config --global user.name "GitHub Actions"
          git config --global user.email "actions@github.com"
          git add .
          git commit -m "Automated Tech News Update"
          git push
```

## Fetching News with Perplexity AI

The real magic happens in the Perplexity API request. I use their **sonar-deep-research** model, which can dig into real-time news sources and produce well-structured reports.

### Crafting the Right Prompt

AI output is only as good as the prompt. Here’s what I ask Perplexity to do:

```javascript
export function generateDailyNewsPrompt() {
  const today = new Date().toISOString().split('T')[0];

  return `
    You are an expert tech industry analyst specializing in web development, insurtech, and software legislation.

    Fetch the 5 most important tech news stories from ${today} in the following categories:
    - JavaScript/TypeScript Web Development
    - Insurtech
    - Software Development Legislation

    Guidelines:
    - Select only **the most relevant, impactful news**.
    - Provide **a clear title and concise summary**.
    - Include **a reputable source URL**.
    - Categorize each item appropriately.
  `;
}
```

### Enforcing Structure with JSON Schema

To ensure the response is always usable, I enforce a structured format using JSON Schema:

```javascript
const newsItemSchema = {
  type: "object",
  properties: {
    news_items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          source_url: { type: "string" },
          category: { type: "string", enum: ["JS/TS Web Development", "Insurtech", "Software Development Legislation"] }
        },
        required: ["title", "description", "source_url", "category"]
      },
      minItems: 5,
      maxItems: 5
    }
  }
};
```

This guarantees I always get **exactly** five news items, formatted correctly.

## The Result

This system now delivers fresh **daily** tech news to my blog, completely automated.

### Benefits:
✔ **Zero manual effort**—news updates run automatically.  
✔ **Always relevant**—Perplexity AI ensures high-quality curation.  
✔ **Consistently formatted**—structured JSON schema keeps things tidy.  
✔ **Live links to sources**—readers can dive deeper into topics.

## Key Takeaways

- **Prompt engineering is everything**—a good prompt = good AI output.  
- **Structured responses matter**—JSON Schema keeps things predictable.  
- **GitHub Actions unlocks powerful automation**—from scheduled tasks to content updates.  

## Want to Try It?

1. Get a **Perplexity API key**.
2. Set up a **GitHub Actions workflow**.
3. Write a **Node.js script** to fetch, format, and commit content.
4. Store the API key as a **GitHub secret**.
5. Customize for your needs.

The full source code is available in my [GitHub repo](https://github.com/Dorkside/by-james).

---

Got ideas for other AI-powered automations? Let me know in the comments! 🚀

