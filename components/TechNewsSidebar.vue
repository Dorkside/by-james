<template>
  <div class="tech-news-sidebar">
    <h2 class="text-xl font-bold mb-4 text-accent-green dark:text-accent-green-dark">Latest Tech News</h2>
    <div v-if="loading" class="text-center py-4">
      <p>Loading tech news...</p>
    </div>
    <div v-else-if="error" class="text-center py-4 text-red-500">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="!latestNews" class="text-center py-4">
      <p>No tech news available.</p>
    </div>
    <div v-else class="tech-news-content">
      <div class="mb-2 text-sm text-primary-700 dark:text-primary-200">
        {{ formatDate(latestNews.date) }}
      </div>
      
      <div v-for="(section, index) in parsedSections" :key="index" class="mb-4">
        <h3 class="font-semibold text-md mb-2 text-accent-green dark:text-accent-green-dark">{{ section.title }}</h3>
        <ul class="list-disc list-inside space-y-2 text-sm text-primary-700 dark:text-primary-100">
          <li v-for="(item, itemIndex) in section.items" :key="itemIndex" v-html="formatBulletPoint(item)"></li>
        </ul>
      </div>
      
      <div class="mt-4 text-right">
        <NuxtLink :to="`/tech-news/${latestNews._path.split('/').pop()}`" class="text-sm text-accent-green hover:text-accent-green/80 dark:text-accent-green-dark dark:hover:text-accent-green-dark/80 hover:underline">
          Read full update
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: techNews, pending: loading, error } = await useAsyncData('techNewsSidebar', () => 
  queryContent('tech-news')
    .where({ sidebar: true })
    .sort({ date: -1 })
    .limit(1)
    .find()
);

const latestNews = computed(() => techNews.value?.[0] || null);

const parsedSections = computed(() => {
  if (!latestNews.value || !latestNews.value.body) return [];
  
  const content = latestNews.value.body.children;
  const sections = [];
  let currentSection = null;
  
  for (const node of content) {
    // Find h2 headings (section titles)
    if (node.tag === 'h2') {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        title: node.children[0].value,
        items: []
      };
    } 
    // Find lists (bullet points)
    else if (node.tag === 'ul' && currentSection) {
      for (const listItem of node.children) {
        if (listItem.tag === 'li') {
          // Extract the text content from the list item
          const itemText = extractTextFromNode(listItem);
          currentSection.items.push(itemText);
        }
      }
    }
  }
  
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return sections;
});

// Helper function to extract text from a node
function extractTextFromNode(node) {
  if (!node.children) return '';
  
  return node.children.map(child => {
    if (child.type === 'text') {
      return child.value;
    } else if (child.children) {
      return extractTextFromNode(child);
    }
    return '';
  }).join('');
}

// Format bullet points to highlight bold text
function formatBulletPoint(text) {
  // Replace **text** with <strong>text</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-accent-green dark:text-accent-green-dark">$1</strong>');
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
</script>

<style scoped>
.tech-news-sidebar {
  @apply bg-accent-green/20 p-4 rounded-lg border border-accent-green/20 shadow-sm;
}

@media (prefers-color-scheme: dark) {
  .tech-news-sidebar {
    @apply bg-accent-green-dark/20 border-accent-green-dark/20;
  }
}
</style> 