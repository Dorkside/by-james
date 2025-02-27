# LinkedIn Tech News Automation Implementation Plan

## Overview

This document outlines the plan for integrating LinkedIn automation into the existing dev blog project. The system will automatically post new tech news articles to a LinkedIn Company Page when they are generated or published, leveraging the existing tech news generation workflow.

## 1. LinkedIn Company Page Setup

### Create Dedicated LinkedIn Company Page
- Go to LinkedIn and select "Create a Company Page+"
- Choose the appropriate page type (likely "Small business")
- Use a professional company name that reflects your tech news focus
- Upload a professional logo and cover image related to tech news
- Write a clear "About" section explaining the purpose of this page
- Select relevant industry categories (Technology, Media, etc.)

### Page Optimization
- Add a website link to your main blog (james-martin.dev)
- Include relevant specialties related to your tech focus areas
- Create a compelling tagline that explains the page's purpose
- Include information about posting frequency and content types
- Complete all available profile sections for better discoverability

## 2. LinkedIn Developer Application Setup

### Create LinkedIn Developer App
- Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
- Create a new application with an appropriate name
- Add app description explaining its purpose
- Configure OAuth 2.0 settings

### Request Necessary Permissions
- Request "r_organization_social" permission (to read company page data)
- Request "w_organization_social" permission (to create posts on company pages)
- Ensure you have admin access to the Company Page you created

### Configure Authentication
- Set up redirect URLs for your application
- Generate and securely store client ID and client secret
- Document the authentication flow for future reference

## 3. Project Integration

### Update Dependencies
- Add required dependencies to package.json:
  ```json
  "dependencies": {
    // existing dependencies
    "axios": "^1.6.0",
    "open": "^9.1.0"
  }
  ```
- Run `npm install` to install the new dependencies

### Environment Configuration
- Add LinkedIn variables to your existing `.env` file:
  ```
  LINKEDIN_CLIENT_ID=your_client_id
  LINKEDIN_CLIENT_SECRET=your_client_secret
  LINKEDIN_REDIRECT_URI=your_redirect_uri
  LINKEDIN_COMPANY_ID=your_company_id
  LINKEDIN_TOKEN_REFRESH_INTERVAL=50 # days
  ```
- Update `.gitignore` to ensure LinkedIn tokens are not committed

### Create LinkedIn Composable
- Create `composables/useLinkedIn.ts` to encapsulate LinkedIn functionality
- Implement token management and posting logic
- Make it compatible with Nuxt 3's composable pattern

## 4. Implementation Details

### Scripts Organization
- Create the following scripts in `scripts/linkedin/`:
  - `auth.js`: Handles OAuth 2.0 authentication flow
  - `token-manager.js`: Manages token refresh
  - `post-article.js`: Posts articles to LinkedIn

### Integration with Tech News Generation
- Modify `scripts/generate-daily-news.js` to include LinkedIn posting
- Add a step to post newly generated tech news articles to LinkedIn
- Example integration:
  ```javascript
  // At the end of the generate-daily-news.js script
  if (process.env.POST_TO_LINKEDIN === 'true') {
    const { postArticleToLinkedIn } = require('./linkedin/post-article');
    await postArticleToLinkedIn(newArticlePath);
  }
  ```

### GitHub Actions Integration
- Update the GitHub Actions workflow for tech news generation
- Add LinkedIn posting step after successful content generation
- Add LinkedIn secrets to GitHub repository
- Example workflow addition:
  ```yaml
  - name: Post to LinkedIn
    if: success()
    run: node scripts/linkedin/post-article.js --latest
    env:
      LINKEDIN_CLIENT_ID: ${{ secrets.LINKEDIN_CLIENT_ID }}
      LINKEDIN_CLIENT_SECRET: ${{ secrets.LINKEDIN_CLIENT_SECRET }}
      LINKEDIN_COMPANY_ID: ${{ secrets.LINKEDIN_COMPANY_ID }}
  ```

### Token Refresh Automation
- Create a separate GitHub Action to refresh LinkedIn tokens
- Schedule it to run every 50 days (before the 60-day expiration)
- Example workflow:
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

## 5. Technical Implementation

### Authentication System
- Implement OAuth 2.0 flow to obtain access tokens
- Store tokens securely in `.linkedin/token.json`
- Create a token refresh mechanism
- Implement error handling for authentication failures

### Content Formatting
- Extract metadata from tech news articles:
  - Title from frontmatter
  - Description from frontmatter
  - URL based on site URL and article slug
  - Generate thumbnail URL from article content or use default
- Format the data for LinkedIn API

### Posting System
- Develop a function to format article data for LinkedIn posts:
  ```javascript
  function formatLinkedInPost(article) {
    return {
      author: `urn:li:organization:${process.env.LINKEDIN_COMPANY_ID}`,
      commentary: `New tech news update: ${article.title}`,
      visibility: "PUBLIC",
      distribution: {
        feedDistribution: "MAIN_FEED"
      },
      content: {
        contentEntities: [{
          entityLocation: `${process.env.NUXT_PUBLIC_SITE_URL}/tech-news/${article.slug}`,
          thumbnails: [{
            resolvedUrl: article.thumbnail || `${process.env.NUXT_PUBLIC_SITE_URL}/images/tech-news-default.jpg`
          }]
        }],
        title: article.title,
        description: article.description
      }
    };
  }
  ```
- Implement API calls to LinkedIn Posts API
- Add logging for successful posts and errors

## 6. Testing and Monitoring

### Testing Plan
- Test authentication flow and token refresh
- Verify post formatting and appearance on LinkedIn
- Test integration with tech news generation
- Perform end-to-end testing of the entire workflow

### Monitoring System
- Add logging to LinkedIn scripts
- Integrate with existing monitoring
- Set up alerts for critical failures
- Monitor LinkedIn API response codes

## 7. Analytics and Optimization

### Engagement Tracking
- Utilize LinkedIn's built-in Company Page analytics
- Track additional post performance metrics
- Correlate with website traffic from LinkedIn

### Content Optimization
- Analyze which types of tech news perform best on LinkedIn
- Adjust posting strategy based on engagement data
- Refine post formatting and commentary style

## 8. Documentation

### Update Project Documentation
- Move this plan to `docs/linkedin-automation-plan.md`
- Create `docs/linkedin-automation.md` with setup and usage instructions
- Update main README.md to mention LinkedIn automation feature
- Document the integration with tech news generation

### Script Documentation
- Add detailed comments to all LinkedIn scripts
- Create a README.md in the `scripts/linkedin/` directory
- Document environment variables and configuration options

## 9. Maintenance Plan

### Regular System Checks
- Weekly verification that the automation is functioning correctly
- Monthly review of LinkedIn API changes or updates
- Quarterly security audit of authentication mechanisms

### Content Review
- Periodic review of posted content quality and relevance
- Adjustment of content categories based on audience engagement
- Review Company Page analytics to identify trends and opportunities

## Timeline for Implementation

1. **Day 1**: LinkedIn Company Page setup and Developer Application creation
2. **Day 2**: Project integration (dependencies, environment, composable)
3. **Day 3**: Script implementation (auth, token-manager, post-article)
4. **Day 4**: Integration with tech news generation and GitHub Actions
5. **Day 5**: Testing and documentation
6. **Ongoing**: Monitoring, analytics, and optimization

## Resources

- [LinkedIn Company Pages Documentation](https://business.linkedin.com/marketing-solutions/linkedin-pages)
- [LinkedIn API Documentation](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api)
- [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
- [OAuth 2.0 Documentation](https://oauth.net/2/)
- [LinkedIn Professional Community Policies](https://www.linkedin.com/legal/professional-community-policies)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions) 