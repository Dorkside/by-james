<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-16">
      <h1 class="text-5xl font-title mb-6 text-primary-900 dark:text-white">Portfolio</h1>
      <p class="text-xl text-primary-700 dark:text-primary-100 leading-relaxed max-w-2xl">
        A collection of projects I've built, focusing on clean design and practical solutions.
      </p>
    </div>

    <!-- Projects Grid -->
    <div class="grid gap-8 md:grid-cols-2">
      <ProjectCard v-for="project in projects" :key="project._path" :project="project" />
    </div>
  </div>
</template>

<script setup>
const { data: projects } = await useAsyncData('portfolio',
  () => queryContent('/portfolio').sort({ date: -1 }).find()
)
</script>