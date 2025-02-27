<template>
  <div class="tech-news-page">
    <ContentDoc v-slot="{ doc }">
      <div class="max-w-3xl mx-auto px-4 py-8">
        <div class="mb-6">
          <NuxtLink to="/" class="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Home
          </NuxtLink>
          <h1 class="text-3xl font-bold mt-2">{{ doc.title }}</h1>
          <div class="text-gray-500 mt-2">{{ formatDate(doc.date) }}</div>
        </div>
        
        <div class="prose dark:prose-invert max-w-none">
          <ContentRenderer :value="doc" />
        </div>
      </div>
    </ContentDoc>
  </div>
</template>

<script setup>
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