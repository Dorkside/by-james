<template>
  <article class="border-b pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0">
    <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full mb-4">
    <h2 class="text-xl font-title mb-2">
      <NuxtLink :to="project._path">{{ project.title }}</NuxtLink>
    </h2>
    <p class="mb-2">{{ project.description }}</p>
    <div class="space-x-2">
      <span v-for="tech in project.technologies" :key="tech" class="text-sm">
        {{ tech }}
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Project {
  _path: string
  title: string
  description: string
  image?: string
  technologies: string[]
}

defineProps<{
  project: Project
}>()</script>