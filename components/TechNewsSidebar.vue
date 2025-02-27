<template>
  <div class="tech-news-sidebar">
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
      <div class="mb-3 text-sm text-primary-700 dark:text-primary-200 border-b border-accent-green/20 dark:border-accent-green-dark/20 pb-2">
        {{ formatDate(latestNews.date) }}
      </div>
      
      <ul class="space-y-4 text-sm">
        <li v-for="(item, index) in newsItems" :key="index" class="pb-3 last:pb-0 border-b border-accent-green/10 dark:border-accent-green-dark/10 last:border-0">
          <h3 class="font-semibold text-accent-green dark:text-accent-green-dark mb-1">{{ item[0] }}</h3>
          <p class="text-primary-700 dark:text-primary-100 mb-1">{{ item[1] }}</p>
          <a 
            v-if="item[2]" 
            :href="item[2]" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-xs text-accent-green/80 hover:text-accent-green dark:text-accent-green-dark/80 dark:hover:text-accent-green-dark hover:underline inline-flex items-center"
          >
            <span>Source</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </li>
      </ul>
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

// Parse the newsItems from the frontmatter
const newsItems = computed(() => {
  if (!latestNews.value || !latestNews.value.newsItems) return [];
  
  try {
    // If it's already an array, use it directly
    if (Array.isArray(latestNews.value.newsItems)) {
      return latestNews.value.newsItems;
    }
    
    // Otherwise, try to parse it as JSON
    return JSON.parse(latestNews.value.newsItems);
  } catch (e) {
    console.error('Error parsing news items:', e);
    return [];
  }
});

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