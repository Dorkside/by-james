# LinkedIn Tech News Automation

This document outlines how to set up and use the LinkedIn automation feature for automatically posting new blog articles to a LinkedIn Company Page.

## Overview

The LinkedIn automation feature detects when new articles are published on your dev blog and automatically posts them to a dedicated LinkedIn Company Page. This allows you to maintain a consistent social media presence without manual effort, while keeping your personal LinkedIn profile separate from automated content.

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
4. Store the token securely for future use

## Implementation Details

### Integration with Nuxt Content

The automation system integrates with Nuxt Content to detect when new articles are published:

1. When a new article is published in `/content/articles/`
2. The system formats the article data for LinkedIn
3. It posts the article to your LinkedIn Company Page using the LinkedIn API

### Scripts

The LinkedIn automation feature consists of the following scripts:

#### `scripts/linkedin/auth.js`

Handles the OAuth 2.0 authentication flow with LinkedIn.

#### `scripts/linkedin/post-article.js`

Posts an article to LinkedIn. Usage:

```bash
# Post the latest article
node scripts/linkedin/post-article.js

# Post a specific article
node scripts/linkedin/post-article.js --slug=your-article-slug
```

#### `scripts/linkedin/token-manager.js`

Manages LinkedIn access tokens, including refreshing them before they expire.

### Automated Posting

To set up automated posting, add a hook to your content publishing workflow:

```javascript
// Example hook in your Nuxt app
export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()
  
  nuxtApp.hook('content:file:afterParse', (file) => {
    if (file._path?.startsWith('/articles/') && file._draft === false) {
      // Post to LinkedIn if it's a published article
      const { postToLinkedIn } = useLinkedIn()
      postToLinkedIn(file)
    }
  })
})
```

## API Reference

### LinkedIn Posts API

The main endpoint used for posting content:

```
POST https://api.linkedin.com/rest/posts
```

Example payload:

```json
{
  "author": "urn:li:organization:YOUR_COMPANY_ID",
  "commentary": "New article: Article Title",
  "visibility": "PUBLIC",
  "distribution": {
    "feedDistribution": "MAIN_FEED"
  },
  "content": {
    "contentEntities": [{
      "entityLocation": "https://your-blog.com/articles/article-slug",
      "thumbnails": [{
        "resolvedUrl": "https://your-blog.com/images/article-thumbnail.jpg"
      }]
    }],
    "title": "Article Title",
    "description": "Article description or excerpt"
  }
}
```

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

1. **Posting Frequency**: Limit to 1-3 posts per day to avoid overwhelming your audience
2. **Content Quality**: Only post high-quality, relevant articles
3. **Engagement**: Regularly check and respond to comments on your LinkedIn posts
4. **Analytics**: Review LinkedIn analytics to understand what content performs best

## Resources

- [LinkedIn Company Pages Documentation](https://business.linkedin.com/marketing-solutions/linkedin-pages)
- [LinkedIn API Documentation](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api)
- [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
- [OAuth 2.0 Documentation](https://oauth.net/2/)
- [LinkedIn Professional Community Policies](https://www.linkedin.com/legal/professional-community-policies) 