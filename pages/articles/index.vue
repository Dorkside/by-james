<template>
  <div class="max-w-3xl mx-auto">
    <!-- Header -->
    <div class="mb-16">
      <h1 class="text-5xl font-title mb-6 text-primary-900 dark:text-white">Articles</h1>
      <p class="text-xl text-primary-700 dark:text-primary-100 leading-relaxed max-w-2xl">
        Thoughts, insights, and experiences from my journey in software development.
      </p>
    </div>

    <!-- Articles List -->
    <div class="space-y-16">
      <ContentQuery path="/articles" :sort="{ date: -1 }" v-slot="{ data }">
        <PostCard v-for="article in data" :key="article._path" :post="article" />
      </ContentQuery>
    </div>
  </div>
</template>

<script setup>
// Articles are automatically sorted by date in descending order
</script>