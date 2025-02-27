# LinkedIn Tech News Automation

This document outlines how to set up and use the LinkedIn automation feature for automatically posting tech news articles to a LinkedIn Company Page when they are generated.

## Overview

The LinkedIn automation feature integrates with the existing tech news generation workflow to automatically post new tech news articles to a dedicated LinkedIn Company Page. This allows you to maintain a consistent social media presence without manual effort, while keeping your personal LinkedIn profile separate from automated content.

## Setup Guide

### 1. LinkedIn Company Page Setup

1. Go to LinkedIn and select "Create a Company Page+"
2. Choose "Small business" as the page type
3. Use a professional company name that reflects your tech news focus
4. Upload a professional logo and cover image
5. Write a clear "About" section explaining the purpose of this page
6. Select relevant industry categories (Technology, Media, etc.)
7. Complete all available profile sections for better discoverability

### 2. LinkedIn Developer Application Setup

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Create a new application with an appropriate name
3. Add app description explaining its purpose
4. Configure OAuth 2.0 settings:
   - Add redirect URLs (e.g., `http://localhost:3000/auth/callback`)
   - Request the following permissions:
     - `r_organization_social` (to read company page data)
     - `w_organization_social` (to create posts on company pages)
5. Generate and securely store client ID and client secret

### 3. Environment Configuration

Add the following variables to your `.env` file:

```
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=your_redirect_uri
LINKEDIN_COMPANY_ID=your_company_id
LINKEDIN_TOKEN_REFRESH_INTERVAL=50 # days
POST_TO_LINKEDIN=true # Set to false to disable LinkedIn posting
```

### 4. Authentication Setup

Run the authentication script to obtain your initial access token:

```bash
node scripts/linkedin/auth.js
```

This will:
1. Open a browser window to authenticate with LinkedIn
2. Redirect back to your application with an authorization code
3. Exchange the code for an access token
4. Store the token securely in `.linkedin/token.json`

## Integration with Tech News Generation

The LinkedIn automation is integrated with the existing tech news generation workflow:

1. When a new tech news article is generated via `scripts/generate-daily-news.js`
2. The system extracts metadata from the article (title, description, URL)
3. It formats the data for LinkedIn and posts it to your Company Page
4. The process is fully automated through GitHub Actions

### GitHub Actions Integration

The LinkedIn posting is integrated into the existing GitHub Actions workflow for tech news generation:

```yaml
# Example workflow addition
- name: Post to LinkedIn
  if: success() && env.POST_TO_LINKEDIN == 'true'
  run: node scripts/linkedin/post-article.js --latest
  env:
    LINKEDIN_CLIENT_ID: ${{ secrets.LINKEDIN_CLIENT_ID }}
    LINKEDIN_CLIENT_SECRET: ${{ secrets.LINKEDIN_CLIENT_SECRET }}
    LINKEDIN_COMPANY_ID: ${{ secrets.LINKEDIN_COMPANY_ID }}
```

A separate GitHub Action is scheduled to refresh the LinkedIn token before it expires:

```yaml
name: Refresh LinkedIn Token
on:
  schedule:
    - cron: '0 0 */50 * *'  # Run every 50 days
jobs:
  refresh-token:
    runs-on: ubuntu-latest
    steps:
      # ... setup steps
      - name: Refresh LinkedIn Token
        run: node scripts/linkedin/token-manager.js --refresh
        env:
          LINKEDIN_CLIENT_ID: ${{ secrets.LINKEDIN_CLIENT_ID }}
          LINKEDIN_CLIENT_SECRET: ${{ secrets.LINKEDIN_CLIENT_SECRET }}
```

## Manual Usage

### Posting the Latest Tech News Article

To manually post the most recent tech news article:

```bash
node scripts/linkedin/post-article.js --latest
```

### Posting a Specific Article

To post a specific tech news article by slug:

```bash
node scripts/linkedin/post-article.js --slug=2025-02-27-tech-industry-update
```

### Refreshing the Token

To manually refresh the LinkedIn access token:

```bash
node scripts/linkedin/token-manager.js --refresh
```

## Implementation Details

### LinkedIn Composable

The `useLinkedIn` composable provides a convenient way to interact with LinkedIn from within your Nuxt application:

```typescript
// Example usage in a component or page
const { postToLinkedIn, getLinkedInStats } = useLinkedIn();

// Post the current article to LinkedIn
const article = {
  title: 'Tech Industry Update',
  description: 'Daily news roundup covering the most important tech developments.',
  slug: '2025-02-27-tech-industry-update'
};

await postToLinkedIn(article);
```

### Scripts

The LinkedIn automation feature consists of the following scripts:

#### `scripts/linkedin/auth.js`

Handles the OAuth 2.0 authentication flow with LinkedIn.

#### `scripts/linkedin/post-article.js`

Posts an article to LinkedIn, extracting metadata from the tech news article.

#### `scripts/linkedin/token-manager.js`

Manages LinkedIn access tokens, including refreshing them before they expire.

## Troubleshooting

### Common Issues

#### Token Expiration

LinkedIn access tokens expire after 60 days. If you encounter authentication errors:

1. Check if your token has expired
2. Run the authentication script again to obtain a new token:
   ```bash
   node scripts/linkedin/auth.js
   ```

#### Rate Limiting

LinkedIn API has rate limits. If you encounter rate limit errors:

1. Reduce the frequency of your posts
2. Implement exponential backoff in your posting logic

#### Post Formatting Issues

If your posts don't appear correctly on LinkedIn:

1. Check the thumbnail image dimensions (recommended: 1200x627 pixels)
2. Ensure your article title and description are properly formatted
3. Verify that the article URL is accessible

## Best Practices

1. **Posting Frequency**: The system is configured to post only when new tech news articles are generated
2. **Content Quality**: Ensure your tech news articles have accurate metadata (title, description)
3. **Engagement**: Regularly check and respond to comments on your LinkedIn posts
4. **Analytics**: Review LinkedIn analytics to understand what content performs best

## Resources

- [LinkedIn Company Pages Documentation](https://business.linkedin.com/marketing-solutions/linkedin-pages)
- [LinkedIn API Documentation](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api)
- [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
- [OAuth 2.0 Documentation](https://oauth.net/2/)
- [LinkedIn Professional Community Policies](https://www.linkedin.com/legal/professional-community-policies)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions) 