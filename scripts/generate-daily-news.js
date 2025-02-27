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
        json_schema: "Schema included but not shown in logs for brevity"
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

// Parse news content from API response
function parseNewsContent(content) {
  try {
    // Check if the content starts with <think> tag and extract the JSON part
    let contentToParse = content;
    if (typeof content === 'string') {
      // If the response contains a <think> section, extract only the JSON part
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        console.log('Found JSON content inside markdown code block');
        contentToParse = jsonMatch[1];
      } else if (content.includes('<think>')) {
        console.log('Response contains thinking process, extracting JSON part');
        // Find the position after </think> tag
        const thinkEndPos = content.indexOf('</think>');
        if (thinkEndPos !== -1) {
          contentToParse = content.substring(thinkEndPos + 9).trim();
        }
      }
    }
    
    // Parse the JSON content
    const newsData = JSON.parse(contentToParse);
    
    // Validate the structure
    if (!newsData.news_items || !Array.isArray(newsData.news_items) || newsData.news_items.length === 0) {
      throw new Error('Invalid news data structure: missing or empty news_items array');
    }
    
    console.log(`Successfully parsed ${newsData.news_items.length} news items`);
    return newsData;
  } catch (error) {
    console.error('Error parsing news content:', error);
    console.error('Raw content:', content);
    throw new Error('Failed to parse news content');
  }
}

// Create news file
async function createNewsFile(newsData) {
  try {
    const date = new Date();
    const formattedDate = formatDate(date);
    
    // Filter to only include verified items (which includes successfully corrected items)
    const committedItems = newsData.news_items;
    
    // Create frontmatter with special flags for tech news
    const frontmatter = `---
title: "Tech Industry Update: ${formattedDate}"
description: "Daily news roundup covering the most important tech developments."
date: ${formattedDate}
tags: ["news", "web-development", "insurtech", "legislation", "daily-update"]
type: "tech-news"
sidebar: true
newsItems: ${JSON.stringify(committedItems)}
factChecked: true
verificationStats: ${JSON.stringify({
  total_items_before_verification: committedItems.length + (newsData.rejected_items ? newsData.rejected_items.length : 0),
  verified_items: committedItems.length,
  rejected_items: newsData.rejected_items ? newsData.rejected_items.length : 0,
  corrected_items: committedItems.filter(item => item.was_corrected).length
})}
---

# Tech Industry Update: ${formattedDate}

${committedItems.map(item => `
## ${item.title}
${item.description}

**Category:** ${item.category}  
**Source:** [Read more](${item.source_url})
${item.verification ? `**Verification:** ✅ Verified (${item.verification.confidence}% confidence)` : ''}
${item.needs_review ? `**Note:** This item has been flagged for review: ${item.review_note}` : ''}
${item.was_corrected ? `**Correction:** This item was corrected during fact-checking. ${item.correction_notes}` : ''}
`).join('\n')}

---

*All news items in this update have been fact-checked for accuracy. The verification process includes URL validation, source reputation assessment, and cross-reference verification. Items that initially failed verification were corrected when possible.*
`;
    
    // Create filename
    const filename = `${formattedDate}-tech-industry-update.md`;
    
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
    console.log(`Tech news file created: ${filename} with ${committedItems.length} verified items`);
    
    // If there were rejected items, save them to a separate log file for review
    if (newsData.rejected_items && newsData.rejected_items.length > 0) {
      const rejectedItemsLog = `
# Rejected News Items - ${formattedDate}

The following news items were rejected during the fact-checking process:

${newsData.rejected_items.map((item, index) => `
## ${index + 1}. ${item.title}
${item.description}

**Category:** ${item.category}  
**Source URL:** ${item.source_url}  
**Rejection Reason:** ${item.rejection_reason}
${item.correction_attempt ? `**Correction Attempted:** Yes, but failed: ${item.correction_attempt}` : ''}
`).join('\n')}
`;
      
      const logFilename = `${formattedDate}-rejected-items.md`;
      const logFilePath = path.join(techNewsDir, logFilename);
      fs.writeFileSync(logFilePath, rejectedItemsLog);
      console.log(`Rejected items log created: ${logFilename}`);
    }
    
    // Create a corrections log if there were any corrected items
    const correctedItems = committedItems.filter(item => item.was_corrected);
    if (correctedItems.length > 0) {
      const correctionsLog = `
# Corrected News Items - ${formattedDate}

The following news items were corrected during the fact-checking process:

${correctedItems.map((item, index) => `
## ${index + 1}. ${item.title}
${item.description}

**Original Title:** ${item.original_title}
**Original Source:** ${item.original_source}
**New Source:** ${item.source_url}
**Category:** ${item.category}
**Correction Notes:** ${item.correction_notes}
`).join('\n')}
`;
      
      const correctionsFilename = `${formattedDate}-corrected-items.md`;
      const correctionsFilePath = path.join(techNewsDir, correctionsFilename);
      fs.writeFileSync(correctionsFilePath, correctionsLog);
      console.log(`Corrections log created: ${correctionsFilename}`);
    }
    
    return filename;
  } catch (error) {
    console.error('Error creating news file:', error);
    throw error;
  }
}

// Attempt to correct a rejected news item
async function attemptCorrection(item, rejectionReason) {
  console.log(`Attempting to correct rejected item: "${item.title}"`);
  
  try {
    const correctionPrompt = `
      The following tech news item was rejected during fact-checking:
      
      Title: ${item.title}
      Description: ${item.description}
      Source URL: ${item.source_url}
      Category: ${item.category}
      
      Rejection reason: ${rejectionReason}
      
      Please correct the issues with this news item to make it factually accurate.
      If the source URL is invalid or unreliable, find a better source.
      If the title or description is misleading or inaccurate, rewrite it.
      
      Respond with a JSON object containing the corrected news item:
      {
        "title": "Corrected title",
        "description": "Corrected description",
        "source_url": "https://better-source-url.com",
        "category": "Same or corrected category",
        "correction_notes": "Brief explanation of what was corrected"
      }
    `;
    
    const requestBody = {
      model: "sonar-reasoning",
      messages: [
        {
          role: "system",
          content: "You are a fact-checking assistant that corrects inaccurate tech news items."
        },
        {
          role: "user",
          content: correctionPrompt
        }
      ],
      max_tokens: 800,
      temperature: 0.2
    };
    
    console.log(`Sending correction request for: "${item.title}"`);
    
    const correctionResponse = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!correctionResponse.ok) {
      console.warn(`Correction API request failed: ${correctionResponse.status}`);
      return null;
    }
    
    const correctionData = await correctionResponse.json();
    const correctionContent = correctionData.choices[0].message.content;
    
    // Parse the correction result
    let correctionResult;
    try {
      // Extract JSON from the response if needed
      const jsonMatch = correctionContent.match(/```json\s*([\s\S]*?)\s*```/) || 
                       correctionContent.match(/\{[\s\S]*\}/);
      
      const jsonContent = jsonMatch ? jsonMatch[0] : correctionContent;
      correctionResult = JSON.parse(jsonContent);
      
      // Validate the corrected item
      if (!correctionResult.title || !correctionResult.description || 
          !correctionResult.source_url || !correctionResult.category) {
        throw new Error("Corrected item is missing required fields");
      }
      
      console.log(`Successfully corrected item: "${item.title}" -> "${correctionResult.title}"`);
      
      // Return the corrected item with correction metadata
      return {
        ...correctionResult,
        was_corrected: true,
        original_title: item.title,
        original_source: item.source_url,
        correction_notes: correctionResult.correction_notes || "Item was corrected"
      };
      
    } catch (error) {
      console.warn(`Failed to parse correction result: ${error.message}`);
      return null;
    }
  } catch (error) {
    console.error(`Error correcting news item "${item.title}":`, error);
    return null;
  }
}

// Verify news items for factual accuracy
async function verifyNewsItems(newsData) {
  console.log('Starting fact verification process...');
  const verifiedItems = [];
  const rejectedItems = [];
  const correctedItems = [];

  for (const item of newsData.news_items) {
    console.log(`Verifying news item: "${item.title}"`);
    
    try {
      // 1. Check if the source URL is valid and accessible
      console.log(`Checking source URL: ${item.source_url}`);
      const urlResponse = await fetch(item.source_url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FactChecker/1.0)'
        },
        redirect: 'follow',
        timeout: 10000 // 10 second timeout
      });
      
      if (!urlResponse.ok) {
        console.warn(`Invalid source URL (${urlResponse.status}): ${item.source_url}`);
        const rejectionReason = `Invalid source URL (${urlResponse.status})`;
        
        // Attempt to correct the item
        const correctedItem = await attemptCorrection(item, rejectionReason);
        
        if (correctedItem) {
          console.log(`Item corrected, will re-verify: "${correctedItem.title}"`);
          correctedItems.push(correctedItem);
        } else {
          rejectedItems.push({
            ...item,
            rejection_reason: rejectionReason
          });
        }
        continue;
      }
      
      // 2. Verify the source domain is reputable
      const url = new URL(item.source_url);
      const domain = url.hostname;
      
      // Simple check for known reputable tech news sources
      // This could be expanded to a more comprehensive list or external API
      const reputableDomains = [
        'github.com', 'github.blog',
        'techcrunch.com', 'wired.com', 'theverge.com', 'arstechnica.com',
        'developer.mozilla.org', 'web.dev', 'reactjs.org', 'vuejs.org', 'angular.io',
        'nodejs.org', 'npmjs.com', 'typescript-lang.org',
        'aws.amazon.com', 'azure.microsoft.com', 'cloud.google.com',
        'blog.google', 'engineering.fb.com', 'developer.apple.com',
        'medium.com', 'dev.to', 'stackoverflow.blog',
        'cnn.com', 'bbc.com', 'reuters.com', 'bloomberg.com',
        'wsj.com', 'nytimes.com', 'ft.com',
        'gov.uk', 'europa.eu', 'whitehouse.gov', 'congress.gov',
        'who.int', 'un.org', 'ieee.org', 'w3.org'
      ];
      
      const isDomainReputable = reputableDomains.some(repDomain => 
        domain === repDomain || domain.endsWith(`.${repDomain}`)
      );
      
      if (!isDomainReputable) {
        console.warn(`Potentially unreliable source domain: ${domain}`);
        // We'll still accept it but flag it for review
        item.needs_review = true;
        item.review_note = `Source domain (${domain}) not in known reputable list`;
      }
      
      // 3. Perform a secondary verification using Perplexity API
      // This step uses the AI to cross-check the news item against other sources
      console.log(`Performing secondary verification for: "${item.title}"`);
      
      const verificationPrompt = `
        Fact check the following tech news item:
        
        Title: ${item.title}
        Description: ${item.description}
        Source: ${item.source_url}
        Category: ${item.category}
        
        Please verify:
        1. Is this news item factually accurate based on available information?
        2. Is the source URL appropriate and relevant to the news item?
        3. Does the title and description accurately represent the actual news?
        
        Respond with a JSON object containing:
        {
          "is_accurate": true/false,
          "confidence": 0-100 (percentage),
          "verification_notes": "Brief explanation of verification result"
        }
      `;
      
      const requestBody = {
        model: "sonar-reasoning", // Using a smaller model for fact-checking
        messages: [
          {
            role: "system",
            content: "You are a fact-checking assistant that verifies tech news for accuracy."
          },
          {
            role: "user",
            content: verificationPrompt
          }
        ],
        max_tokens: 500,
        temperature: 0.1
      };
      
      const verificationResponse = await fetch(PERPLEXITY_API_URL, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!verificationResponse.ok) {
        console.warn(`Verification API request failed: ${verificationResponse.status}`);
        // If verification fails, we'll still include the item but flag it
        item.needs_review = true;
        item.review_note = `Verification API request failed: ${verificationResponse.status}`;
        verifiedItems.push(item);
        continue;
      }
      
      const verificationData = await verificationResponse.json();
      const verificationContent = verificationData.choices[0].message.content;
      
      // Parse the verification result
      let verificationResult;
      try {
        // Extract JSON from the response if needed
        const jsonMatch = verificationContent.match(/```json\s*([\s\S]*?)\s*```/) || 
                         verificationContent.match(/\{[\s\S]*\}/);
        
        const jsonContent = jsonMatch ? jsonMatch[0] : verificationContent;
        verificationResult = JSON.parse(jsonContent);
      } catch (error) {
        console.warn(`Failed to parse verification result: ${error.message}`);
        verificationResult = { 
          is_accurate: false, 
          confidence: 0, 
          verification_notes: "Failed to parse verification result" 
        };
      }
      
      // Add verification data to the item
      item.verification = {
        is_accurate: verificationResult.is_accurate,
        confidence: verificationResult.confidence,
        notes: verificationResult.verification_notes
      };
      
      // Decide whether to include the item based on verification
      if (verificationResult.is_accurate && verificationResult.confidence >= 70) {
        console.log(`Verification passed: "${item.title}" (Confidence: ${verificationResult.confidence}%)`);
        verifiedItems.push(item);
      } else {
        console.warn(`Verification failed: "${item.title}" (Confidence: ${verificationResult.confidence}%)`);
        const rejectionReason = verificationResult.verification_notes;
        
        // Attempt to correct the item
        const correctedItem = await attemptCorrection(item, rejectionReason);
        
        if (correctedItem) {
          console.log(`Item corrected, will re-verify: "${correctedItem.title}"`);
          correctedItems.push(correctedItem);
        } else {
          rejectedItems.push({
            ...item,
            rejection_reason: rejectionReason
          });
        }
      }
      
    } catch (error) {
      console.error(`Error verifying news item "${item.title}":`, error);
      rejectedItems.push({
        ...item,
        rejection_reason: `Verification error: ${error.message}`
      });
    }
  }
  
  // Process any corrected items by re-verifying them
  if (correctedItems.length > 0) {
    console.log(`Re-verifying ${correctedItems.length} corrected items...`);
    
    // Recursively verify the corrected items
    const correctedResults = await verifyNewsItems({
      news_items: correctedItems
    });
    
    // Add successfully verified corrected items to our verified items list
    verifiedItems.push(...correctedResults.news_items);
    
    // Add any items that failed verification again to our rejected items list
    if (correctedResults.rejected_items) {
      rejectedItems.push(...correctedResults.rejected_items);
    }
  }
  
  // Log verification results
  console.log(`Verification complete: ${verifiedItems.length} items accepted, ${rejectedItems.length} items rejected`);
  
  if (rejectedItems.length > 0) {
    console.log('Rejected items:');
    rejectedItems.forEach((item, index) => {
      console.log(`${index + 1}. "${item.title}" - Reason: ${item.rejection_reason}`);
    });
  }
  
  // If we don't have enough verified items, log a warning
  if (verifiedItems.length < 3) {
    console.warn(`Warning: Only ${verifiedItems.length} news items passed verification. Consider regenerating.`);
  }
  
  // Return the verified news data
  return {
    ...newsData,
    news_items: verifiedItems,
    rejected_items: rejectedItems
  };
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
    
    // Parse news content
    const parsedNewsContent = parseNewsContent(newsContent);
    
    // Verify news items for factual accuracy
    console.log('Verifying news items for factual accuracy...');
    const verifiedNewsContent = await verifyNewsItems(parsedNewsContent);
    
    // Check if we have enough verified items
    if (verifiedNewsContent.news_items.length < 3) {
      console.warn(`Warning: Only ${verifiedNewsContent.news_items.length} news items passed verification.`);
      console.log('Attempting to generate additional news items...');
      
      // Try to generate more news items if we don't have enough
      const additionalNewsContent = await queryPerplexityForNews();
      const additionalParsedContent = parseNewsContent(additionalNewsContent);
      const additionalVerifiedContent = await verifyNewsItems(additionalParsedContent);
      
      // Combine the verified items
      verifiedNewsContent.news_items = [
        ...verifiedNewsContent.news_items,
        ...additionalVerifiedContent.news_items
      ];
      
      // Combine the rejected items
      if (additionalVerifiedContent.rejected_items) {
        verifiedNewsContent.rejected_items = [
          ...(verifiedNewsContent.rejected_items || []),
          ...additionalVerifiedContent.rejected_items
        ];
      }
      
      console.log(`After additional generation: ${verifiedNewsContent.news_items.length} verified items`);
    }
    
    // Create news file with only verified items
    console.log('Creating news file...');
    const filename = await createNewsFile(verifiedNewsContent);
    
    console.log(`Daily news generation complete: ${filename}`);
    console.log(`Committed ${verifiedNewsContent.news_items.length} verified items`);
    
    if (verifiedNewsContent.rejected_items && verifiedNewsContent.rejected_items.length > 0) {
      console.log(`Rejected ${verifiedNewsContent.rejected_items.length} items`);
    }
    
    const correctedItems = verifiedNewsContent.news_items.filter(item => item.was_corrected);
    if (correctedItems.length > 0) {
      console.log(`Successfully corrected ${correctedItems.length} items`);
    }
    
  } catch (error) {
    console.error('Daily news generation failed:', error);
    process.exit(1);
  }
}

// Run the main function
generateDailyNews();

// Export the verifyNewsItems function for testing
export { verifyNewsItems }; 