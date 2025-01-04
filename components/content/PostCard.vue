<template>
  <NuxtLink :to="post._path" class="block group">
    <article class="p-6 -m-6 rounded-lg transition-colors hover:bg-primary-100 dark:hover:bg-primary-800">
      <div class="flex items-center gap-3 mb-2">
        <time :datetime="formatISODate(post.date)" class="text-sm text-accent-green/80">
          {{ formatDate(post.date) }}
        </time>
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in post.tags" :key="tag" 
            class="text-xs px-2 py-1 rounded-full bg-accent-green/10 dark:bg-accent-green-dark/10 text-accent-green dark:text-accent-green-dark">
            {{ tag }}
          </span>
        </div>
      </div>
      <h2 class="text-xl font-title mb-2 text-primary-900 dark:text-primary-50 group-hover:text-accent-green dark:group-hover:text-accent-green-dark transition-colors">
        {{ post.title }}
      </h2>
      <p class="text-primary-900 dark:text-primary-50 leading-relaxed">{{ post.description }}</p>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Post {
  _path: string
  title: string
  description: string
  date: string | Date
  tags?: string[]
}

defineProps<{
  post: Post
}>()

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
}</script>