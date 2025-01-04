<template>
  <div class="max-w-3xl mx-auto">
    <div class="mb-12">
      <h1 class="text-4xl font-title mb-4">Articles</h1>
      <p class="text-lg text-primary-900 dark:text-primary-50 leading-relaxed">
        Thoughts, insights, and experiences from my journey in software development.
      </p>
    </div>
    <div class="space-y-12">
      <ContentQuery path="/articles" :sort="{ date: -1 }" v-slot="{ data }">
        <PostCard v-for="article in data" :key="article._path" :post="article" />
      </ContentQuery>
    </div>
  </div>
</template>

<script setup>
// Articles are automatically sorted by date in descending order
</script>