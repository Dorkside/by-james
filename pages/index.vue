<template>
  <div class="max-w-2xl mx-auto">
    <!-- Hero Section -->
    <div class="mb-24">
      <h1 class="text-5xl font-title mb-6 text-primary-900 dark:text-white">Hi, I'm James</h1>
      <p class="text-xl text-primary-700 dark:text-primary-100 leading-relaxed">
        Welcome to my corner of the web where I document my software development journey. Here, I share practical insights from building production systems, explore technical challenges, and discuss the art of crafting meaningful solutions.
      </p>
    </div>
    
    <!-- Latest Articles Section -->
    <section class="mb-24">
      <div class="flex items-center justify-between mb-12">
        <h2 class="text-3xl font-title text-primary-900 dark:text-white">Latest Articles</h2>
        <NuxtLink 
          to="/articles" 
          class="inline-flex items-center text-sm font-medium text-accent-green dark:text-accent-green-dark hover:text-accent-green/80 dark:hover:text-accent-green-dark/80 transition-colors group"
        >
          View all articles
          <svg class="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none">
            <path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>
      <div class="space-y-12">
        <ContentQuery path="/articles" :sort="{ date: -1 }" :limit="3" v-slot="{ data }">
          <PostCard v-for="article in data" :key="article._path" :post="article" />
        </ContentQuery>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="mb-24">
      <div class="flex items-center justify-between mb-12">
        <h2 class="text-3xl font-title text-primary-900 dark:text-white">Featured Projects</h2>
        <NuxtLink 
          to="/portfolio" 
          class="inline-flex items-center text-sm font-medium text-accent-green dark:text-accent-green-dark hover:text-accent-green/80 dark:hover:text-accent-green-dark/80 transition-colors group"
        >
          View all projects
          <svg class="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none">
            <path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>
      <div class="space-y-12">
        <ContentQuery path="/portfolio" :where="{ featured: true }" v-slot="{ data }">
          <ProjectCard v-for="project in data" :key="project._path" :project="project" />
        </ContentQuery>
      </div>
    </section>
  </div>
</template>

<script setup>
// Content is automatically fetched using ContentQuery components
</script>