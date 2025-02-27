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
    
    Format your response as a JSON array of arrays, where each inner array contains exactly three elements:
    1. The title of the news item (as a string)
    2. The content/description of the news item (as a string)
    3. The source URL for the news item (as a string)
    
    Example format:
    [
      ["Angular 17.2 Released", "The latest version includes improved hydration support and smaller bundle sizes, offering up to 30% faster initial load times for large applications.", "https://blog.angular.io/angular-v17-2-0-is-now-available-3c8d82fb875"],
      ["EU AI Act Formally Adopted", "The world's first comprehensive legal framework for artificial intelligence establishes tiered regulations based on risk levels, affecting how developers must design and deploy AI systems.", "https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence"],
      // ... and so on
    ]
    
    Do not include any introductory or concluding text - just the JSON array.
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