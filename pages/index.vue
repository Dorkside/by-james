<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-16">
      <h1 class="text-4xl font-title mb-4">Hi, I'm James</h1>
      <p class="text-lg text-primary-900 leading-relaxed">
        I write about software development and share my projects here. My focus is on practical insights and real-world experiences in software engineering.
      </p>
    </div>
    
    <section class="mb-16">
      <h2 class="text-2xl font-title mb-8">Latest Articles</h2>
      <div class="space-y-8">
        <ContentCard v-for="post in articles" :key="post._path" :post="post" />
      </div>
      <NuxtLink 
        to="/articles" 
        class="inline-flex items-center mt-8 text-sm font-medium text-accent-green hover:text-accent-green/80 transition-colors"
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
        <ProjectCard v-for="project in projects" :key="project._path" :project="project" />
      </div>
      <NuxtLink 
        to="/portfolio" 
        class="inline-flex items-center mt-8 text-sm font-medium text-accent-green hover:text-accent-green/80 transition-colors"
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
const { data: articles } = await useAsyncData('latest-articles', 
  () => queryContent('/articles').sort({ date: -1 }).limit(3).find()
)

const { data: projects } = await useAsyncData('featured-projects',
  () => queryContent('/portfolio').where({ featured: true }).find()
)
</script>