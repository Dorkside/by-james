---
title: "Building an Automated Tech News Sidebar with Perplexity AI"
description: "How I implemented an automated daily tech news feature using GitHub Actions and the Perplexity AI API"
date: "2025-03-01"
tags: ["ai", "automation", "perplexity", "github-actions", "javascript"]
---

# Building an Automated Tech News Sidebar with Perplexity AI

![Tech News Automation](https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)

Have you ever wanted to keep your blog visitors updated with the latest tech news without manually curating content every day? In this article, I'll walk you through how I built an automated tech news sidebar for my dev blog using the Perplexity AI API and GitHub Actions.

## The Challenge

As a developer who blogs about web development, insurtech, and software legislation, I wanted to provide my readers with fresh, relevant tech news daily. But manually researching and writing news updates every day wasn't sustainable. I needed a solution that would:

1. Generate high-quality tech news content automatically
2. Run on a consistent schedule without my intervention
3. Produce structured, well-formatted content
4. Integrate seamlessly with my existing blog infrastructure

## Enter Perplexity AI and GitHub Actions

After exploring various options, I settled on a powerful combination: the Perplexity AI API for content generation and GitHub Actions for automation. This approach allowed me to create a fully automated pipeline that generates and publishes daily tech news updates.

## The Architecture

The solution consists of three main components:

1. **GitHub Actions Workflow**: Runs daily to trigger the news generation process
2. **Node.js Scripts**: Handle the API communication and content formatting
3. **Perplexity AI Integration**: Generates the actual news content

Let's dive into each component.

## Setting Up the GitHub Actions Workflow

The workflow runs on a daily schedule and handles the entire process from API communication to committing the generated content:

```yaml
name: Daily Tech News Generation

on:
  schedule:
    # Run at 3 AM UTC every day
    - cron: '0 3 * * *'
  workflow_dispatch:  # Allow manual triggering

jobs:
  generate-tech-news:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    
    steps:
      # Checkout code, setup Node.js, etc.
      
      - name: Generate daily tech news
        run: node scripts/generate-daily-news.js
        env:
          PERPLEXITY_API_KEY: ${{ secrets.PERPLEXITY_API_KEY }}
          
      - name: Commit changes
        # Git configuration and commit steps
```

The workflow also includes steps for validating the API key, ensuring directories exist, and triggering a Netlify build after committing the new content.

## Leveraging the Perplexity AI API

The heart of this solution is the Perplexity AI integration. I chose Perplexity's `sonar-deep-research` model because of its ability to research current events and provide detailed, accurate information.

### Crafting the Perfect Prompt

Prompt engineering is crucial for getting high-quality results from AI models. I created a specialized prompt that:

1. Establishes the AI as an expert tech analyst
2. Specifies exactly what kind of news to look for
3. Provides clear instructions on format and content requirements
4. Requests specific categories of tech news

Here's a simplified version of the prompt:

```javascript
export function generateDailyNewsPrompt() {
  const today = new Date().toISOString().split('T')[0];
  
  return `
    You are an expert tech industry analyst with expertise in web development, insurtech, and software legislation.
    
    Research and provide the 5 most important and breaking tech news items from ${today} across these areas:
    
    - JS/TS Web Development
    - Insurtech
    - Software Development Legislation
    
    Instructions:
    - Select only the 5 most interesting/breaking news items
    - Each news item should have a clear title and brief description
    - Include specific details where relevant
    - Include a source URL from a reputable source
    - Assign each news item to one of the three categories
  `;
}
```

### Enforcing Structure with JSON Schema

One of the most powerful techniques I implemented was using JSON schema to enforce structured output from the AI. This ensures that the response always follows a consistent format:

```javascript
const requestBody = {
  model: "sonar-deep-research",
  messages: [
    {
      role: "system",
      content: "You are an expert tech industry analyst..."
    },
    {
      role: "user",
      content: prompt
    }
  ],
  temperature: 0.1,
  response_format: {
    type: "json_schema",
    json_schema: {
      schema: newsItemSchema
    }
  }
};
```

The schema defines exactly what fields each news item should have:

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
          category: { 
            type: "string",
            enum: ["JS/TS Web Development", "Insurtech", "Software Development Legislation"]
          }
        },
        required: ["title", "description", "source_url", "category"]
      },
      minItems: 5,
      maxItems: 5
    }
  }
};
```

This approach guarantees that I always get exactly 5 news items with all the required fields, making the integration with my blog seamless.

## From AI Response to Blog Content

Once the AI generates the news content, the script processes it and creates a Markdown file with frontmatter:

```javascript
const frontmatter = `---
title: "Tech Industry Update: ${formattedDate}"
description: "Daily news roundup covering the most important tech developments."
date: ${formattedDate}
tags: ["news", "web-development", "insurtech", "legislation"]
type: "tech-news"
sidebar: true
newsItems: ${JSON.stringify(newsData.news_items)}
---

# Tech Industry Update: ${formattedDate}

${newsData.news_items.map(item => `
## ${item.title}
${item.description}

**Category:** ${item.category}  
**Source:** [Read more](${item.source_url})
`).join('\n')}
`;
```

The `sidebar: true` flag in the frontmatter tells my blog's component system that this content should appear in the sidebar.

## Handling Edge Cases and Errors

No automated system is complete without robust error handling. My implementation includes:

1. API key validation before making requests
2. Response parsing with fallback mechanisms
3. JSON structure validation
4. Detailed logging for troubleshooting

For example, the script checks if the API response contains a `<think>` section (which some AI models include) and extracts only the JSON part:

```javascript
if (typeof content === 'string') {
  const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    contentToParse = jsonMatch[1];
  } else if (content.includes('<think>')) {
    const thinkEndPos = content.indexOf('</think>');
    if (thinkEndPos !== -1) {
      contentToParse = content.substring(thinkEndPos + 9).trim();
    }
  }
}
```

## Results and Benefits

After implementing this system, my blog now features a daily-updated tech news sidebar that:

1. Provides readers with fresh, relevant content every day
2. Requires zero manual effort to maintain
3. Covers diverse tech topics across web development, insurtech, and legislation
4. Includes source links for readers who want to learn more
5. Maintains consistent formatting and structure

The entire process runs automatically through GitHub Actions, and the content is committed directly to my repository, triggering a rebuild of my blog with the latest news.

## Lessons Learned

Building this automated news system taught me several valuable lessons:

1. **Prompt engineering is crucial**: The quality of AI-generated content depends heavily on how well you craft your prompts.
2. **Structured output is a game-changer**: Using JSON schema to enforce structure makes integration much more reliable.
3. **Error handling is essential**: AI APIs can sometimes return unexpected formats, so robust error handling is necessary.
4. **GitHub Actions is powerful**: The ability to run scheduled tasks and commit changes automatically opens up many possibilities.

## Try It Yourself

Want to implement something similar for your own blog? Here are the key steps:

1. Sign up for a Perplexity API key
2. Create a GitHub Actions workflow that runs on a schedule
3. Implement scripts to handle the API communication and content formatting
4. Store your API key securely as a GitHub secret
5. Customize the prompt and schema for your specific needs
6. Integrate the generated content into your blog's frontend

The complete code is available in my GitHub repository, so feel free to adapt it for your own projects!

## Conclusion

By combining the power of AI with automation tools like GitHub Actions, we can create sophisticated content generation systems that run without human intervention. This tech news sidebar is just one example of what's possible when we leverage these technologies creatively.

What automated features would you like to add to your blog? Let me know in the comments below! 