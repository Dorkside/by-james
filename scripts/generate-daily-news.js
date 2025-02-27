import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDailyNewsPrompt } from './news-prompt.js';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
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
    
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'sonar-deep-research',
        messages: [
          {
            role: 'system',
            content: 'You are an expert tech industry analyst with deep knowledge of web development, insurtech, and software legislation.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.1,         // Lower temperature for more factual, deterministic responses
        top_p: 0.9,               // Slightly constrained sampling for more focused responses
        presence_penalty: 0.1,    // Slight penalty to avoid repetition
        frequency_penalty: 0.1,   // Slight penalty to encourage diverse vocabulary
        search_options: {
          enable_search: true,    // Explicitly enable search for research
          include_citations: true // Include citations in the search results
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
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