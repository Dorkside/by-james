<template>
  <div class="tech-news-page">
    <ContentDoc v-slot="{ doc }">
      <div class="max-w-3xl mx-auto px-4 py-8">
        <div class="mb-6">
          <NuxtLink to="/tech-news" class="text-accent-green hover:text-accent-green/80 dark:text-accent-green-dark dark:hover:text-accent-green-dark/80 hover:underline mb-4 inline-block">
            &larr; Back to Tech News
          </NuxtLink>
          <h1 class="text-3xl font-bold mt-2 text-accent-green dark:text-accent-green-dark">{{ doc.title }}</h1>
          <div class="text-primary-500 dark:text-primary-400 mt-2">{{ formatDate(doc.date) }}</div>
        </div>
        
        <div class="prose dark:prose-invert prose-headings:text-accent-green dark:prose-headings:text-accent-green-dark prose-a:text-accent-green dark:prose-a:text-accent-green-dark max-w-none">
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