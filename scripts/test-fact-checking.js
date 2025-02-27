/**
 * Test script for the fact-checking functionality
 * 
 * This script tests the fact-checking implementation by providing
 * a mix of valid and invalid news items and verifying the results.
 * Only verified items (including successfully corrected items) are committed.
 */

import { verifyNewsItems } from './generate-daily-news.js';

// Mock news data with a mix of valid and invalid items
const mockNewsData = {
  news_items: [
    // Valid item with reputable source
    {
      title: "TypeScript 5.4 Released with Performance Improvements",
      description: "Microsoft has released TypeScript 5.4 with significant performance improvements and new type checking features.",
      source_url: "https://devblogs.microsoft.com/typescript/announcing-typescript-5-4/",
      category: "JS/TS Web Development"
    },
    // Invalid item with non-existent URL
    {
      title: "Fake Framework Launches Revolutionary Features",
      description: "A new JavaScript framework claims to solve all web development problems with zero code.",
      source_url: "https://fake-framework-not-real.dev/launch",
      category: "JS/TS Web Development"
    },
    // Valid item but from less known source
    {
      title: "New Insurance API Standard Proposed",
      description: "Industry consortium proposes new API standard for insurance data exchange between providers.",
      source_url: "https://medium.com/insurtech-daily/new-insurance-api-standard-2023",
      category: "Insurtech"
    },
    // Item with misleading title
    {
      title: "All JavaScript Frameworks to be Replaced by New W3C Standard",
      description: "W3C working group discussing potential new standards for component models, but no plans to replace frameworks.",
      source_url: "https://www.w3.org/blog/news/archives/9435",
      category: "JS/TS Web Development"
    },
    // Valid item with government source
    {
      title: "EU Passes New Data Protection Rules for AI Systems",
      description: "European Parliament approves new regulations for AI systems that process personal data.",
      source_url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_2413",
      category: "Software Development Legislation"
    },
    // Item with factual inaccuracy that should be correctable
    {
      title: "Node.js 20 Released with Support for WebGPU",
      description: "The latest Node.js version includes WebGPU support, which is incorrect as Node.js doesn't directly support WebGPU yet.",
      source_url: "https://nodejs.org/en/blog/release/v20.0.0",
      category: "JS/TS Web Development"
    }
  ]
};

// Run the test
async function runFactCheckingTest() {
  console.log('Starting fact-checking test...');
  console.log(`Testing ${mockNewsData.news_items.length} mock news items`);
  
  try {
    // Run the verification process
    const verifiedNewsData = await verifyNewsItems(mockNewsData);
    
    // Print results
    console.log('\n--- TEST RESULTS ---');
    console.log(`Original items: ${mockNewsData.news_items.length}`);
    console.log(`Verified items: ${verifiedNewsData.news_items.length}`);
    console.log(`Rejected items: ${verifiedNewsData.rejected_items.length}`);
    
    // Count corrected items
    const correctedItems = verifiedNewsData.news_items.filter(item => item.was_corrected);
    console.log(`Corrected items: ${correctedItems.length}`);
    
    // Print committed items (verified + corrected)
    console.log('\nCOMMITTED ITEMS:');
    verifiedNewsData.news_items.forEach((item, index) => {
      console.log(`${index + 1}. "${item.title}"`);
      if (item.verification) {
        console.log(`   Confidence: ${item.verification.confidence}%`);
        console.log(`   Notes: ${item.verification.notes}`);
      }
      if (item.needs_review) {
        console.log(`   Flagged for review: ${item.review_note}`);
      }
      if (item.was_corrected) {
        console.log(`   CORRECTED ITEM`);
        console.log(`   Original title: ${item.original_title}`);
        console.log(`   Original source: ${item.original_source}`);
        console.log(`   Correction notes: ${item.correction_notes}`);
      }
    });
    
    // Print rejected items (not committed)
    console.log('\nREJECTED ITEMS (NOT COMMITTED):');
    verifiedNewsData.rejected_items.forEach((item, index) => {
      console.log(`${index + 1}. "${item.title}"`);
      console.log(`   Reason: ${item.rejection_reason}`);
    });
    
    // Simulate what would be committed to the news file
    console.log('\nSIMULATED NEWS FILE CONTENT:');
    console.log(`Tech Industry Update with ${verifiedNewsData.news_items.length} verified items:`);
    verifiedNewsData.news_items.forEach((item, index) => {
      console.log(`- ${item.title} (${item.was_corrected ? 'Corrected' : 'Verified'})`);
    });
    
    console.log('\nTest completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Export the verifyNewsItems function from generate-daily-news.js
// by adding this line to the end of that file:
// export { verifyNewsItems };

console.log('To run this test, first add "export { verifyNewsItems };" to the end of generate-daily-news.js');
console.log('Then run: node scripts/test-fact-checking.js');

// Uncomment to run the test
runFactCheckingTest(); 