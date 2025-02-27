<template>
  <div class="tech-news-index">
    <div class="max-w-3xl mx-auto px-4 py-8">
      <div class="mb-6">
        <NuxtLink to="/" class="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </NuxtLink>
        <h1 class="text-3xl font-bold mt-2">Tech News Archive</h1>
        <p class="text-gray-500 mt-2">Daily updates on web development, insurtech, and software legislation</p>
      </div>
      
      <div v-if="pending" class="text-center py-8">
        <p>Loading tech news...</p>
      </div>
      <div v-else-if="error" class="text-center py-8 text-red-500">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="!techNews.length" class="text-center py-8">
        <p>No tech news available yet.</p>
      </div>
      <div v-else class="space-y-8">
        <div v-for="news in techNews" :key="news._path" class="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-0">
          <h2 class="text-2xl font-bold">
            <NuxtLink :to="news._path" class="hover:text-blue-600">
              {{ news.title }}
            </NuxtLink>
          </h2>
          <div class="text-gray-500 mt-1 mb-4">{{ formatDate(news.date) }}</div>
          
          <div class="prose dark:prose-invert max-w-none line-clamp-3">
            <p>{{ news.description }}</p>
          </div>
          
          <NuxtLink :to="news._path" class="text-blue-600 hover:underline mt-4 inline-block">
            Read full update
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: techNews, pending, error } = await useAsyncData('techNewsIndex', () => 
  queryContent('tech-news')
    .sort({ date: -1 })
    .find()
);

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