import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDailyNewsPrompt } from './news-prompt.js';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// Ensure the tech-news directory exists
const techNewsDir = path.join(__dirname, '..', 'content', 'tech-news');
if (!fs.existsSync(techNewsDir)) {
  console.log(`Creating directory: ${techNewsDir}`);
  fs.mkdirSync(techNewsDir, { recursive: true });
}

// Check if API key is set
if (!PERPLEXITY_API_KEY) {
  console.error('Error: PERPLEXITY_API_KEY environment variable is not set');
  process.exit(1);
}

// Log API key length and format (without revealing the key)
console.log(`API key length: ${PERPLEXITY_API_KEY.length} characters`);
if (PERPLEXITY_API_KEY.startsWith('pplx-')) {
  console.log('API key has the expected prefix format');
} else {
  console.warn('Warning: API key does not start with the expected prefix "pplx-"');
}

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

// Format date for filename and frontmatter
const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Make request to Perplexity API for daily news
async function queryPerplexityForNews() {
  // Get the prompt for daily news
  const prompt = generateDailyNewsPrompt();

  try {
    console.log('Querying Perplexity API for daily news...');
    
    // Define the JSON schema for structured output
    const newsItemSchema = {
      type: "object",
      properties: {
        news_items: {
          type: "array",
          description: "Array of news items",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "The title of the news item"
              },
              description: {
                type: "string",
                description: "A brief 1-2 sentence description of the news item"
              },
              source_url: {
                type: "string",
                description: "The source URL for the news item from a reputable source"
              },
              category: {
                type: "string",
                enum: ["JS/TS Web Development", "Insurtech", "Software Development Legislation"],
                description: "The category of the news item"
              }
            },
            required: ["title", "description", "source_url", "category"]
          },
          minItems: 5,
          maxItems: 5
        }
      },
      required: ["news_items"]
    };
    
    // Create the request body with structured output parameters
    const requestBody = {
      model: "sonar-medium-online",
      messages: [
        {
          role: "system",
          content: "You are an expert tech industry analyst with deep knowledge of web development, insurtech, and software legislation."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.1,
      response_format: {
        type: "json_object",
        schema: newsItemSchema
      }
    };
    
    console.log('Using API request parameters:', JSON.stringify({
      ...requestBody,
      response_format: {
        type: "json_object",
        schema: "Schema included but not shown in logs for brevity"
      }
    }, null, 2));
    
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error querying Perplexity API:', error);
    throw error;
  }
}

// Create news file
async function createNewsFile(jsonContent) {
  try {
    const date = new Date();
    const formattedDate = formatDate(date);
    
    // Parse the JSON content
    let newsData;
    try {
      // If it's a string, parse it; if it's already an object, use it directly
      newsData = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent;
      console.log(`Successfully parsed news data with ${newsData.news_items?.length || 0} items`);
    } catch (parseError) {
      console.error('Error parsing JSON content:', parseError);
      console.error('Raw content:', jsonContent);
      throw new Error('Failed to parse news content as JSON');
    }
    
    // Validate the structure
    if (!newsData.news_items || !Array.isArray(newsData.news_items) || newsData.news_items.length === 0) {
      throw new Error('Invalid news data structure: missing or empty news_items array');
    }
    
    // Create frontmatter with special flags for tech news and include the JSON content
    const frontmatter = `---
title: "Tech Industry Update: ${formattedDate}"
description: "Daily news roundup covering the most important tech developments."
date: ${formattedDate}
tags: ["news", "web-development", "insurtech", "legislation", "daily-update"]
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
    
    // Create filename with date prefix
    const filename = `${formattedDate}-tech-industry-update.md`;
    
    // Get the full path to the tech-news directory
    const techNewsDir = path.join(__dirname, '..', 'content', 'tech-news');
    
    // Double-check that the directory exists
    if (!fs.existsSync(techNewsDir)) {
      console.log(`Tech news directory doesn't exist, creating it: ${techNewsDir}`);
      fs.mkdirSync(techNewsDir, { recursive: true });
    }
    
    // Save to tech-news directory
    const filePath = path.join(techNewsDir, filename);
    
    console.log(`Writing news file to: ${filePath}`);
    
    // Write to file
    fs.writeFileSync(filePath, frontmatter);
    console.log(`Daily tech news update created: ${filename}`);
    
    return filename;
  } catch (error) {
    console.error('Error creating news file:', error);
    console.error(`Current directory: ${process.cwd()}`);
    console.error(`__dirname: ${__dirname}`);
    
    // List content directory to help debug
    try {
      const contentDir = path.join(__dirname, '..', 'content');
      if (fs.existsSync(contentDir)) {
        console.log(`Content directory exists at: ${contentDir}`);
        console.log('Content directory contents:');
        console.log(fs.readdirSync(contentDir));
      } else {
        console.error(`Content directory does not exist at: ${contentDir}`);
      }
    } catch (listError) {
      console.error('Error listing content directory:', listError);
    }
    
    throw error;
  }
}

// Main function
async function generateDailyNews() {
  try {
    console.log('Starting daily news generation...');
    console.log(`Current working directory: ${process.cwd()}`);
    
    // Check if content directory exists
    const contentDir = path.join(__dirname, '..', 'content');
    if (!fs.existsSync(contentDir)) {
      console.log(`Content directory doesn't exist, creating it: ${contentDir}`);
      fs.mkdirSync(contentDir, { recursive: true });
    }
    
    // Check if tech-news directory exists
    const techNewsDir = path.join(contentDir, 'tech-news');
    if (!fs.existsSync(techNewsDir)) {
      console.log(`Tech news directory doesn't exist, creating it: ${techNewsDir}`);
      fs.mkdirSync(techNewsDir, { recursive: true });
    }
    
    // Query Perplexity API
    const newsContent = await queryPerplexityForNews();
    
    // Create news file
    console.log('Creating news file...');
    const filename = await createNewsFile(newsContent);
    
    console.log(`Daily news generation complete: ${filename}`);
  } catch (error) {
    console.error('Daily news generation failed:', error);
    process.exit(1);
  }
}

// Run the main function
generateDailyNews(); 