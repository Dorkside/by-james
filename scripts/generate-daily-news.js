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
        model: 'llama-3-sonar-large-32k-online',
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
        max_tokens: 2000
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
async function createNewsFile(markdownContent) {
  try {
    const date = new Date();
    const formattedDate = formatDate(date);
    
    // Create frontmatter with special flags for tech news
    const frontmatter = `---
title: "Tech Industry Update: ${formattedDate}"
description: "Daily news roundup covering JS/TS web development, insurtech, and software development legislation."
date: ${formattedDate}
tags: ["news", "web-development", "insurtech", "legislation", "daily-update"]
type: "tech-news"
sidebar: true
---

`;

    // Combine frontmatter and content
    const fullContent = frontmatter + markdownContent;
    
    // Create filename with date prefix
    const filename = `${formattedDate}-tech-industry-update.md`;
    
    // Save to tech-news directory instead of articles
    const filePath = path.join(__dirname, '..', 'content', 'tech-news', filename);
    
    // Write to file
    fs.writeFileSync(filePath, fullContent);
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