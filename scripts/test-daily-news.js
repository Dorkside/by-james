import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDailyNewsPrompt } from './news-prompt.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

// Check if API key is set
if (!PERPLEXITY_API_KEY) {
  console.error('Error: PERPLEXITY_API_KEY environment variable is not set');
  console.error('Please set it before running the test script:');
  console.error('  export PERPLEXITY_API_KEY=your-api-key');
  process.exit(1);
}

// Log API key length and format (without revealing the key)
console.log(`API key length: ${PERPLEXITY_API_KEY.length} characters`);
if (PERPLEXITY_API_KEY.startsWith('pplx-')) {
  console.log('API key has the expected prefix format');
} else {
  console.warn('Warning: API key does not start with the expected prefix "pplx-"');
}

// Format date for filename and frontmatter
const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Make request to Perplexity API for test news
async function queryPerplexityForTestNews() {
  // Get the prompt for daily news
  const prompt = generateDailyNewsPrompt();

  try {
    console.log('Querying Perplexity API for test news...');
    
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
      model: "sonar-deep-research",
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
        type: "json_schema",
        json_schema: {
          schema: newsItemSchema
        }
      }
    };
    
    console.log('Using API request parameters:', JSON.stringify({
      ...requestBody,
      response_format: {
        type: "json_schema",
        json_schema: {
          schema: "Schema included but not shown in logs for brevity"
        }
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

// Create test news file
async function createTestNewsFile(jsonContent) {
  try {
    const date = new Date();
    const formattedDate = formatDate(date);
    
    // Parse the JSON content
    let newsData;
    try {
      // Check if the content starts with <think> tag and extract the JSON part
      let contentToParse = jsonContent;
      if (typeof jsonContent === 'string') {
        // If the response contains a <think> section, extract only the JSON part
        const jsonMatch = jsonContent.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
          console.log('Found JSON content inside markdown code block');
          contentToParse = jsonMatch[1];
        } else if (jsonContent.includes('<think>')) {
          console.log('Response contains thinking process, extracting JSON part');
          // Find the position after </think> tag
          const thinkEndPos = jsonContent.indexOf('</think>');
          if (thinkEndPos !== -1) {
            contentToParse = jsonContent.substring(thinkEndPos + 9).trim();
          }
        }
      }
      
      // If it's a string, parse it; if it's already an object, use it directly
      newsData = typeof contentToParse === 'string' ? JSON.parse(contentToParse) : contentToParse;
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
    
    // Create frontmatter with special flags for tech news
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
    
    // Create filename with TEST prefix
    const filename = `TEST-${formattedDate}-tech-industry-update.md`;
    
    // Ensure the tech-news directory exists
    const techNewsDir = path.join(__dirname, '..', 'content', 'tech-news');
    if (!fs.existsSync(techNewsDir)) {
      console.log(`Creating directory: ${techNewsDir}`);
      fs.mkdirSync(techNewsDir, { recursive: true });
    }
    
    // Save to tech-news directory
    const filePath = path.join(techNewsDir, filename);
    
    // Write to file
    fs.writeFileSync(filePath, frontmatter);
    console.log(`Test tech news file created: ${filename}`);
    console.log('This is a test file and will not be committed. You can review it and delete it manually.');
    
    return filename;
  } catch (error) {
    console.error('Error creating test news file:', error);
    throw error;
  }
}

// Fallback to sample data if API fails
function createSampleNewsContent() {
  console.log('Using sample news data as fallback...');
  // Sample news items in the structured format
  const newsData = {
    news_items: [
      {
        title: "TypeScript 5.4 Released",
        description: "Microsoft has released TypeScript 5.4 with improved type inference and new utility types, enhancing developer productivity and type safety.",
        source_url: "https://devblogs.microsoft.com/typescript/announcing-typescript-5-4/",
        category: "JS/TS Web Development"
      },
      {
        title: "Next.js 14.1 Introduces Server Actions Improvements",
        description: "Vercel's latest Next.js update brings significant performance enhancements to Server Actions and improved developer experience with better error handling.",
        source_url: "https://nextjs.org/blog/next-14-1",
        category: "JS/TS Web Development"
      },
      {
        title: "Lemonade Expands AI Claims Processing Platform",
        description: "Insurtech leader Lemonade has expanded its AI claims processing system to handle home insurance claims, reducing settlement times by up to 30%.",
        source_url: "https://www.lemonade.com/blog/ai-jim-expansion",
        category: "Insurtech"
      },
      {
        title: "EU Digital Services Act Enforcement Begins",
        description: "The European Union has begun enforcing the Digital Services Act, requiring large online platforms to implement more rigorous content moderation and transparency measures.",
        source_url: "https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package",
        category: "Software Development Legislation"
      },
      {
        title: "Root Insurance Launches Developer API Platform",
        description: "Auto insurer Root has launched a new developer API platform allowing third-party developers to integrate insurance functionality directly into automotive and financial applications.",
        source_url: "https://www.rootinsurance.com/blog/announcing-root-developer-api",
        category: "Insurtech"
      }
    ]
  };
  
  return JSON.stringify(newsData);
}

// Main function
async function testDailyNews() {
  try {
    console.log('Generating test news...');
    
    // Display the prompt that would be used
    const prompt = generateDailyNewsPrompt();
    console.log('Prompt that would be used:');
    console.log('-----------------------------------');
    console.log(prompt);
    console.log('-----------------------------------');
    
    let newsContent;
    try {
      // Try to get news from the API
      newsContent = await queryPerplexityForTestNews();
      console.log('Successfully retrieved news from Perplexity API');
    } catch (apiError) {
      console.error('Failed to retrieve news from API, using sample data instead:', apiError);
      newsContent = createSampleNewsContent();
    }
    
    // Create test news file
    await createTestNewsFile(newsContent);
    
    console.log('Test news generation complete!');
  } catch (error) {
    console.error('Test news generation failed:', error);
    process.exit(1);
  }
}

// Run the test function
testDailyNews(); 