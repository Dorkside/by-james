import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDailyNewsPrompt } from './news-prompt.js';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mock news content for testing
const MOCK_NEWS = `[
  ["Angular 17.2.0 Released", "The latest version includes improved hydration support and smaller bundle sizes, offering up to 30% faster initial load times for large applications.", "https://blog.angular.io/angular-v17-2-0-is-now-available-3c8d82fb875"],
  ["TypeScript 5.4 Introduces New Error Handling", "The new 'useUnknownInCatchVariables' compiler option allows more type-safe error handling in catch blocks, improving code reliability.", "https://devblogs.microsoft.com/typescript/announcing-typescript-5-4/"],
  ["EU AI Act Formally Adopted", "The world's first comprehensive legal framework for artificial intelligence establishes tiered regulations based on risk levels, affecting how developers must design and deploy AI systems.", "https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence"],
  ["Lemonade Expands AI Insurance Platform", "The insurtech company has expanded its AI-powered insurance platform to include pet health insurance in five new states, bringing its total coverage to 37 states.", "https://www.lemonade.com/blog/lemonade-pet-expands-to-five-new-states/"],
  ["US Copyright Office Issues AI Guidance", "New guidance clarifies that works created solely by AI without human creative input are not eligible for copyright protection, impacting content creators and developers.", "https://copyright.gov/ai/ai-policy.pdf"]
]`;

// Format date for filename and frontmatter
const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Create test news file
async function createTestNewsFile(jsonContent) {
  try {
    const date = new Date();
    const formattedDate = formatDate(date);
    
    // Create frontmatter with special flags for tech news
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
    
    // Create filename with date prefix and TEST prefix
    const filename = `TEST-${formattedDate}-tech-industry-update.md`;
    
    // Save to tech-news directory instead of articles
    const filePath = path.join(__dirname, '..', 'content', 'tech-news', filename);
    
    // Write to file
    fs.writeFileSync(filePath, frontmatter);
    console.log(`Test tech news file created: ${filename}`);
    
    return filename;
  } catch (error) {
    console.error('Error creating test news file:', error);
    throw error;
  }
}

// Main function
async function generateTestNews() {
  try {
    console.log('Starting test news generation...');
    
    // Display the prompt that would be used
    const prompt = generateDailyNewsPrompt();
    console.log('Prompt that would be used:');
    console.log('-----------------------------------');
    console.log(prompt);
    console.log('-----------------------------------');
    
    console.log('API parameters that would be used:');
    console.log('-----------------------------------');
    console.log('model: sonar-deep-research');
    console.log('max_tokens: 2000');
    console.log('temperature: 0.1 (Lower temperature for more factual, deterministic responses)');
    console.log('top_p: 0.9 (Slightly constrained sampling for more focused responses)');
    console.log('presence_penalty: 0.1 (Slight penalty to avoid repetition)');
    console.log('frequency_penalty: 0.1 (Slight penalty to encourage diverse vocabulary)');
    console.log('search_options: { enable_search: true, include_citations: true }');
    console.log('-----------------------------------');
    
    // Create test news file using mock content
    console.log('Creating test news file...');
    const filename = await createTestNewsFile(MOCK_NEWS);
    
    console.log(`Test tech news generation complete: ${filename}`);
    console.log('This is a test file and will not be committed to the repository.');
    console.log('You can manually delete it after reviewing.');
  } catch (error) {
    console.error('Test news generation failed:', error);
    process.exit(1);
  }
}

// Run the main function
generateTestNews(); 