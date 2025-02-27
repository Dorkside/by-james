import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDailyNewsPrompt } from './news-prompt.js';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

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
    
    // Create the request body with minimal required parameters
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
      temperature: 0.1
    };
    
    console.log('Using API request parameters:', JSON.stringify(requestBody, null, 2));
    
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
    
    // Create frontmatter with special flags for tech news and include the JSON content
    const frontmatter = `---
title: "Tech Industry Update: ${formattedDate}"
description: "Daily news roundup covering the most important tech developments."
date: ${formattedDate}
tags: ["news", "web-development", "insurtech", "legislation", "daily-update"]
type: "tech-news"
sidebar: true
newsItems: ${jsonContent}
---

# Tech Industry Update: ${formattedDate}
`;
    
    // Create filename with date prefix
    const filename = `${formattedDate}-tech-industry-update.md`;
    
    // Save to tech-news directory
    const filePath = path.join(__dirname, '..', 'content', 'tech-news', filename);
    
    // Write to file
    fs.writeFileSync(filePath, frontmatter);
    console.log(`Daily tech news update created: ${filename}`);
    
    return filename;
  } catch (error) {
    console.error('Error creating news file:', error);
    throw error;
  }
}

// Main function
async function generateDailyNews() {
  try {
    console.log('Starting daily news generation...');
    
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