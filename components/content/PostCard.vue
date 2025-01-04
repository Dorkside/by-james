<template>
  <article class="border-b pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0">
    <h2 class="text-xl font-title mb-2">
      <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
    </h2>
    <p class="mb-2">{{ post.description }}</p>
    <FormattedDate :date="post.date" />
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