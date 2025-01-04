<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-4xl font-bold mb-4">Hi, I'm James</h1>
    <p class="text-xl text-gray-600 mb-8">
      I write about software development and share my projects here.
    </p>
    
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Latest Articles</h2>
      <div class="grid gap-6">
        <ContentCard v-for="post in articles" :key="post._path" :post="post" />
      </div>
      <NuxtLink to="/articles" class="inline-block mt-4 text-blue-600 hover:underline">
        View all articles →
      </NuxtLink>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-6">Featured Projects</h2>
      <div class="grid gap-6">
        <ProjectCard v-for="project in projects" :key="project._path" :project="project" />
      </div>
      <NuxtLink to="/portfolio" class="inline-block mt-4 text-blue-600 hover:underline">
        View all projects →
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