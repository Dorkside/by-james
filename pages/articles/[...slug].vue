<template>
  <article v-if="data" class="max-w-3xl mx-auto">
    <div class="mb-8">
      <h1 class="text-4xl font-title mb-4 text-primary-900 dark:text-white">{{ data.title }}</h1>
      <div class="flex items-center gap-3 mb-4">
        <time :datetime="formatISODate(data.date)" class="text-sm text-primary-700 dark:text-primary-100">
          {{ formatDate(data.date) }}
        </time>
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in data.tags" :key="tag" 
            class="text-xs px-2 py-1 rounded-full bg-accent-green/10 dark:bg-accent-green-dark/20 text-accent-green dark:text-accent-green-dark">
            {{ tag }}
          </span>
        </div>
      </div>
      <p class="text-lg text-primary-700 dark:text-primary-100 leading-relaxed">{{ data.description }}</p>
    </div>
    <div class="prose prose-lg dark:prose-invert prose-headings:text-primary-900 dark:prose-headings:text-white prose-p:text-primary-700 dark:prose-p:text-primary-100 prose-a:text-accent-green dark:prose-a:text-accent-green-dark prose-strong:text-primary-900 dark:prose-strong:text-white prose-li:text-primary-700 dark:prose-li:text-primary-100 prose-ul:text-primary-700 dark:prose-ul:text-primary-100 prose-ol:text-primary-700 dark:prose-ol:text-primary-100 max-w-none">
      <ContentRenderer :value="data" />
    </div>
  </article>
</template>

<script setup lang="ts">
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne())

const formatDate = (date: string | Date): string => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatISODate = (date: string | Date): string => {
  return new Date(date).toISOString()
}
</script> 