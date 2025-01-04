<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Portfolio</h1>
    <div class="grid gap-6 md:grid-cols-2">
      <ProjectCard v-for="project in projects" :key="project._path" :project="project" />
    </div>
  </div>
</template>

<script setup>
const { data: projects } = await useAsyncData('portfolio',
  () => queryContent('/portfolio').sort({ date: -1 }).find()
)
</script>