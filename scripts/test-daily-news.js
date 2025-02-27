import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDailyNewsPrompt } from './news-prompt.js';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mock news content for testing
const MOCK_NEWS = `# Tech Industry Update: 2025-02-27

## JS/TS Web Development

- **Angular 17.2.0** has been released with improved hydration support and smaller bundle sizes, offering up to 30% faster initial load times for large applications. (Angular Blog)
- **TypeScript 5.4** introduces a new 'useUnknownInCatchVariables' compiler option, allowing more type-safe error handling in catch blocks. (TypeScript Blog)
- **Next.js 14.1.0** adds built-in support for partial prerendering, enabling hybrid static/dynamic rendering at the component level rather than just the page level. (Vercel Blog)
- **Deno 2.0** has been announced with 100% Node.js compatibility, aiming to provide a seamless migration path for existing Node.js applications. (Deno Blog)
- **Svelte 5** preview has been released with "runes," a new reactive primitive system that replaces the compiler-based reactivity in previous versions. (Svelte Blog)

## Insurtech

- **Lemonade** has expanded its AI-powered insurance platform to include pet health insurance in five new states, bringing its total coverage to 37 states. (Insurance Journal)
- **Tractable** secured $65 million in Series E funding to expand its AI-based damage assessment technology for auto and property insurance claims. (TechCrunch)
- **Root Insurance** reported a 24% year-over-year growth in premium revenue, attributing the increase to its machine learning-based driver scoring system. (Business Wire)
- **The NAIC** (National Association of Insurance Commissioners) has published new guidelines for insurers using AI in underwriting, requiring greater transparency in algorithmic decision-making. (NAIC Press Release)
- **Hippo Insurance** has launched a new IoT home monitoring system that offers premium discounts of up to 20% for homeowners who install the devices. (Insurance Business Magazine)

## Software Development Legislation

- **The EU AI Act** has been formally adopted, establishing the world's first comprehensive legal framework for artificial intelligence with tiered regulations based on risk levels. (European Commission)
- **California's SB 1001** goes into effect next month, requiring companies to disclose when users are interacting with AI systems rather than humans. (California Legislative Information)
- **The US Copyright Office** has issued new guidance on AI-generated works, clarifying that works created solely by AI without human creative input are not eligible for copyright protection. (US Copyright Office)
- **Japan's Digital Agency** has announced a regulatory sandbox for blockchain-based smart contracts, allowing companies to test applications with temporary exemptions from certain financial regulations. (Japan Times)
- **The UK's Online Safety Bill** has been amended to include specific provisions for AI content moderation, requiring platforms to clearly label AI-generated content. (UK Parliament)`;

// Format date for filename and frontmatter
const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Create test news file
async function createTestNewsFile(markdownContent) {
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
    
    // Create filename with date prefix and TEST prefix
    const filename = `TEST-${formattedDate}-tech-industry-update.md`;
    
    // Save to tech-news directory instead of articles
    const filePath = path.join(__dirname, '..', 'content', 'tech-news', filename);
    
    // Write to file
    fs.writeFileSync(filePath, fullContent);
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