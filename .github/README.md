# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automating various tasks in the repository.

## Available Workflows

### Daily Tech News Generation

The `daily-tech-news.yml` workflow automatically generates daily tech news updates using the Perplexity API and commits them to the repository.

#### How It Works

1. The workflow runs daily at 2 AM UTC
2. It queries the Perplexity API for the latest tech news in specific categories:
   - JS/TS Web Development
   - Insurtech
   - Software Development Legislation
3. It formats the response into a Markdown article
4. It commits the new article to the repository

#### Setup Requirements

To use this workflow, you need to:

1. Obtain a Perplexity API key
2. Add it as a repository secret named `PERPLEXITY_API_KEY`

For detailed setup instructions, see [scripts/README.md](../scripts/README.md).

#### Manual Triggering

You can manually trigger this workflow from the GitHub Actions tab in the repository.

## Troubleshooting

If a workflow fails, check the GitHub Actions logs for error messages. Common issues include:

- Missing or invalid secrets
- API rate limits or timeouts
- Network connectivity issues

## Adding New Workflows

When adding new workflows, please follow these guidelines:

1. Use descriptive names for workflow files
2. Include comments explaining what the workflow does
3. Document any required secrets or environment variables
4. Set appropriate timeout values to prevent hung workflows
5. Update this README with information about the new workflow 