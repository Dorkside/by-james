import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDailyNewsPrompt } from './news-prompt.js';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Format date for filename and frontmatter
const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Create test news content
function createTestNewsContent() {
  // Sample news items in the new structured format
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

// Create test news file
async function createTestNewsFile() {
  try {
    const date = new Date();
    const formattedDate = formatDate(date);
    
    // Get test content
    const jsonContent = createTestNewsContent();
    
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
    
    // Create test news file
    await createTestNewsFile();
    
    console.log('Test news generation complete!');
  } catch (error) {
    console.error('Test news generation failed:', error);
    process.exit(1);
  }
}

// Run the test function
testDailyNews(); 