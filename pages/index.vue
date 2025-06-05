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
          <div v-else class="space-y-12">
            <!-- Hero article (first one) -->
            <div v-if="articles.length > 0" class="relative group">
              <div class="absolute -inset-4 bg-gradient-to-r from-accent-green/20 via-accent-orange/20 to-accent-blue/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
              <article class="relative bg-primary-50/50 dark:bg-primary-900/50 backdrop-blur-sm rounded-xl p-8 border border-primary-200/50 dark:border-primary-800/50 transition-all duration-300 hover:shadow-lg">
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-xs font-medium px-3 py-1 bg-accent-green/20 text-accent-green dark:bg-accent-green-dark/20 dark:text-accent-green-dark rounded-full">Featured</span>
                  <time class="text-sm text-primary-600 dark:text-primary-400">{{ formatDate(articles[0].date) }}</time>
                </div>
                <NuxtLink :to="articles[0]._path" class="group/link">
                  <h1 class="text-3xl font-title font-medium mb-4 text-primary-900 dark:text-primary-50 group-hover/link:text-accent-green dark:group-hover/link:text-accent-green-dark transition-colors leading-tight">
                    {{ articles[0].title }}
                  </h1>
                </NuxtLink>
                <p class="text-lg text-primary-700 dark:text-primary-200 mb-6 leading-relaxed">{{ articles[0].description }}</p>
                <div class="flex flex-wrap gap-2 mb-6">
                  <span v-for="tag in articles[0].tags" :key="tag" class="px-3 py-1 bg-accent-green/10 dark:bg-accent-green-dark/20 text-sm rounded-full text-accent-green dark:text-accent-green-dark font-medium">
                    {{ tag }}
                  </span>
                </div>
                <NuxtLink :to="articles[0]._path" class="inline-flex items-center gap-2 text-accent-green dark:text-accent-green-dark hover:gap-3 transition-all font-medium">
                  Read article
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </NuxtLink>
              </article>
            </div>

            <!-- Regular articles grid -->
            <div v-if="articles.length > 1" class="space-y-8">
              <h2 class="text-xl font-title text-primary-800 dark:text-primary-200 pb-2 border-b border-primary-200 dark:border-primary-800">Recent Articles</h2>
              <div class="grid gap-6">
                <div v-for="article in articles.slice(1)" :key="article._path" class="group">
                  <PostCard :post="article" />
                </div>
              </div>
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