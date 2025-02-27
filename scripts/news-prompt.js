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
    You are a tech industry analyst with expertise in web development, insurtech, and software legislation.
    
    Research and provide the most important news from ${today} (or the most recent available if today's news isn't available yet) on these specific topics:
    
    1. JS/TS Web Development: Focus on framework updates, new tools, significant releases, or emerging patterns
    2. Insurtech: Focus on new technologies, startups, funding rounds, or regulatory changes affecting insurance technology
    3. Software Development Legislation: Focus on new laws, regulations, court decisions, or policy changes affecting software developers
    
    For each category:
    - Provide exactly 5 bullet points
    - Each bullet point should be 1-2 sentences maximum
    - Include specific names, versions, amounts, or figures where relevant
    - Focus only on factual, verifiable news (not opinions or predictions)
    - Prioritize the most impactful developments
    - Include a source reference in parentheses at the end of each bullet point
    
    Format your response as a Markdown document with a # title and three ## subheadings for each category.
    The title should be "Tech Industry Update: [Today's Date]"
    
    Do not include any introductory or concluding text - just the title, subheadings, and bullet points.
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