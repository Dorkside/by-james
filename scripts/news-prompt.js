/**
 * Daily tech news prompt template for Perplexity API
 * 
 * This file contains the prompt template used to generate daily tech news updates.
 * Modify this file to customize the news topics and format.
 */

/**
 * Generates a prompt for daily tech news bullet points
 * @returns {string} - The formatted prompt
 */
export function generateDailyNewsPrompt() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  return `
    You are an expert tech industry analyst with expertise in web development, insurtech, and software legislation.
    
    Research and provide the 5 most important and breaking tech news items from ${today} (or the most recent available if today's news isn't available yet) across these areas:
    
    - JS/TS Web Development (framework updates, new tools, significant releases)
    - Insurtech (new technologies, startups, funding rounds, regulatory changes)
    - Software Development Legislation (new laws, regulations, court decisions, policy changes)
    
    Instructions:
    - Select only the 5 most interesting/breaking news items across all categories combined
    - Each news item should have a clear, concise title and a brief 1-2 sentence description
    - Include specific names, versions, amounts, or figures where relevant
    - Focus only on factual, verifiable news (not opinions or predictions)
    - For each news item, include the most informative source URL from a reputable source
    - Prioritize official sources (company blogs, government sites) over secondary reporting
    - Ensure all information is accurate and from the most recent reliable sources
    - Verify that source URLs are valid and point directly to the relevant information
    - Assign each news item to one of the three categories mentioned above
    
    IMPORTANT FACTUAL ACCURACY REQUIREMENTS:
    - Only include news that can be verified from multiple reputable sources
    - Ensure all URLs point to legitimate news sources or official company/organization websites
    - Double-check that the URLs actually contain the information mentioned in your description
    - Do not fabricate or exaggerate news items - stick strictly to verifiable facts
    - If you're unsure about the accuracy of a news item, exclude it
    - Avoid using URLs from content aggregators or low-quality news sites
    - For each item, ensure the source URL directly supports the specific claim made
    
    Your response will be formatted according to a JSON schema with the following structure:
    {
      "news_items": [
        {
          "title": "Title of the news item",
          "description": "Brief description of the news item",
          "source_url": "https://example.com/source",
          "category": "JS/TS Web Development" // or "Insurtech" or "Software Development Legislation"
        },
        // ... 4 more items
      ]
    }
  `;
}

/**
 * Research topics for article generation
 * Add or modify topics as needed
 */
export const RESEARCH_TOPICS = [
  'Latest trends in web development',
  'Emerging JavaScript frameworks',
  'AI in software development',
  'DevOps best practices',
  'Software architecture patterns',
  'Frontend performance optimization',
  'Backend scalability strategies',
  'Developer productivity tools',
  'Code quality and testing strategies',
  'Open source contribution guides'
]; 