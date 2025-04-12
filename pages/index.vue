<template>
  <div class="home-page">
    <div class="max-w-5xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main content -->
        <div class="flex-1">
          <div v-if="pending" class="text-center py-8">
            <p>Loading articles...</p>
          </div>
          <div v-else-if="error" class="text-center py-8 text-red-500">
            <p>Error loading articles: {{ error.message }}</p>
          </div>
          <div v-else-if="!articles || articles.length === 0" class="text-center py-8">
            <p>No articles found.</p>
          </div>
          <div v-else class="space-y-8">
            <div v-for="article in articles" :key="article._path" class="article-card pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <NuxtLink :to="article._path">
                <h2 class="text-2xl font-bold text-accent-green hover:text-accent-green/80 dark:text-accent-green-dark dark:hover:text-accent-green-dark/80 transition-colors">{{ article.title }}</h2>
              </NuxtLink>
              <div class="text-primary-500 dark:text-primary-400 mt-1 mb-3">{{ formatDate(article.date) }}</div>
              <p class="text-primary-700 dark:text-primary-100 mb-4">{{ article.description }}</p>
              <div class="flex flex-wrap gap-2 mb-3">
                <span v-for="tag in article.tags" :key="tag" class="px-2 py-1 bg-accent-green/10 dark:bg-accent-green-dark/10 text-sm rounded text-primary-700 dark:text-primary-200">
                  {{ tag }}
                </span>
              </div>
              <NuxtLink :to="article._path" class="text-accent-green hover:text-accent-green/80 dark:text-accent-green-dark dark:hover:text-accent-green-dark/80 hover:underline text-sm inline-block">
                Read more
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- Sidebar -->
        <!-- <div class="lg:w-80 shrink-0">
          <TechNewsSidebar />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// Fetch articles using useAsyncData and queryContent
const { data: articles, pending, error } = await useAsyncData('articles', () => 
  queryContent('articles')
    .sort({ date: -1 })
    .limit(10)
    .find()
);

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
</script>