# Automated Tech News Generation

This directory contains scripts for automatically generating daily tech news updates using the Perplexity API.

## How It Works

The system uses GitHub Actions to run a daily job that:

1. Queries the Perplexity API for the latest tech news in specific categories
2. Formats the response into a Markdown article
3. Commits the new article to the repository

## Setup Instructions

### 1. Perplexity API Key

You need to obtain a Perplexity API key:

1. Sign up at [Perplexity AI](https://www.perplexity.ai/)
2. Navigate to your account settings to generate an API key

### 2. GitHub Repository Secret

Add your Perplexity API key as a GitHub repository secret:

1. Go to your repository on GitHub
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Name: `PERPLEXITY_API_KEY`
5. Value: Your Perplexity API key
6. Click "Add secret"

## Manual Triggering

You can manually trigger the tech news generation workflow:

1. Go to your repository on GitHub
2. Navigate to Actions > Daily Tech News Generation
3. Click "Run workflow"

## Troubleshooting

If the workflow fails, check the GitHub Actions logs for error messages. Common issues include:

- Invalid or expired API key
- API rate limits
- Network connectivity issues

## Notes on API Usage

- The Perplexity API may have rate limits or usage quotas
- The script is configured to use the `llama-3-sonar-large-32k-online` model
- Each news generation uses approximately 2000 tokens

## Customizing the News Format

To modify the news topics or format, edit the `generateDailyNewsPrompt` function in `scripts/news-prompt.js`. 