<template>
  <article class="group">
    <FormattedDate :date="post.date" className="text-sm text-accent-green/80 mb-2" />
    <h2 class="text-xl font-title mb-2">
      <NuxtLink :to="post._path" class="hover:text-accent-green transition-colors">{{ post.title }}</NuxtLink>
    </h2>
    <p class="text-primary-900 leading-relaxed">{{ post.description }}</p>
  </article>
</template>

<script setup lang="ts">
interface Post {
  _path: string
  title: string
  description: string
  date: string | Date
}

defineProps<{
  post: Post
}>()</script>