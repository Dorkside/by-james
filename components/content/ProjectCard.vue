<template>
  <article class="group">
    <div class="mb-4 overflow-hidden rounded-lg border border-primary-200 dark:border-primary-800">
      <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full h-48 object-cover bg-primary-100 dark:bg-primary-800">
    </div>
    <div class="flex items-center gap-3 mb-3">
      <span v-if="project.status" class="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-50">
        {{ project.status }}
      </span>
      <div class="flex flex-wrap gap-2">
        <span v-for="tech in project.technologies" :key="tech" 
          class="text-xs px-2 py-1 rounded-full bg-accent-green/10 dark:bg-accent-green-dark/10 text-accent-green dark:text-accent-green-dark">
          {{ tech }}
        </span>
      </div>
    </div>
    <h2 class="text-xl font-title mb-2">
      <NuxtLink :to="project._path" class="hover:text-accent-green dark:hover:text-accent-green-dark transition-colors">
        {{ project.title }}
      </NuxtLink>
    </h2>
    <p class="text-primary-900 dark:text-primary-50 leading-relaxed">{{ project.description }}</p>
  </article>
</template>

<script setup lang="ts">
interface Project {
  _path: string
  title: string
  description: string
  image?: string
  status?: string
  technologies?: string[]
}

defineProps<{
  project: Project
}>()</script>