<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Articles</h1>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ContentCard v-for="post in posts" :key="post._path" :post="post" />
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData('articles', 
  () => queryContent('/articles').sort({ date: -1 }).find()
)
</script>