<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-16">
      <h1 class="text-4xl font-title mb-4">Hi, I'm James</h1>
      <p class="text-lg text-primary-700 dark:text-primary-100 leading-relaxed">
        Welcome to my corner of the web where I document my software development journey. Here, I share practical insights from building production systems, explore technical challenges, and discuss the art of crafting meaningful solutions.
      </p>
    </div>
    
    <section class="mb-16">
      <h2 class="text-2xl font-title mb-8">Latest Articles</h2>
      <div class="space-y-8">
        <ContentQuery path="/articles" :sort="{ date: -1 }" :limit="3" v-slot="{ data }">
          <PostCard v-for="article in data" :key="article._path" :post="article" />
        </ContentQuery>
      </div>
      <NuxtLink 
        to="/articles" 
        class="inline-flex items-center mt-8 text-sm font-medium text-accent-green dark:text-accent-green-dark hover:text-accent-green/80 dark:hover:text-accent-green-dark/80 transition-colors"
      >
        View all articles
        <svg class="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none">
          <path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </section>

    <section>
      <h2 class="text-2xl font-title mb-8">Featured Projects</h2>
      <div class="space-y-8">
        <ContentQuery path="/portfolio" :where="{ featured: true }" v-slot="{ data }">
          <ProjectCard v-for="project in data" :key="project._path" :project="project" />
        </ContentQuery>
      </div>
      <NuxtLink 
        to="/portfolio" 
        class="inline-flex items-center mt-8 text-sm font-medium text-accent-green dark:text-accent-green-dark hover:text-accent-green/80 dark:hover:text-accent-green-dark/80 transition-colors"
      >
        View all projects
        <svg class="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none">
          <path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
// Content is automatically fetched using ContentQuery components
</script>