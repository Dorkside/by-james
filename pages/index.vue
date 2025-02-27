<template>
  <div class="home-page">
    <div class="max-w-5xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main content -->
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-6">Latest Articles</h1>
          
          <div v-if="pending" class="text-center py-8">
            <p>Loading articles...</p>
          </div>
          <div v-else-if="error" class="text-center py-8 text-red-500">
            <p>Error loading articles: {{ error.message }}</p>
          </div>
          <div v-else-if="!articles || articles.length === 0" class="text-center py-8">
            <p>No articles found.</p>
          </div>
          <div v-else class="space-y-12">
            <div v-for="article in articles" :key="article._path" class="article-card">
              <NuxtLink :to="article._path">
                <h2 class="text-2xl font-bold hover:text-blue-600 transition-colors">{{ article.title }}</h2>
              </NuxtLink>
              <div class="text-gray-500 mt-1 mb-3">{{ formatDate(article.date) }}</div>
              <p class="text-gray-700 dark:text-gray-300 mb-4">{{ article.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in article.tags" :key="tag" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded">
                  {{ tag }}
                </span>
              </div>
              <NuxtLink :to="article._path" class="text-blue-600 hover:underline mt-4 inline-block">
                Read more
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- Sidebar -->
        <div class="lg:w-80 shrink-0">
          <TechNewsSidebar />
          
          <div class="mt-8">
            <NuxtLink to="/tech-news" class="text-blue-600 hover:underline">
              View all tech news updates &rarr;
            </NuxtLink>
          </div>
        </div>
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