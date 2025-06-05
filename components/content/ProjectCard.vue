<template>
  <NuxtLink :to="project._path" class="block group">
    <article class="p-6 -m-6 rounded-lg transition-all duration-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-primary-200 dark:hover:border-primary-700">
      <div class="mb-4 overflow-hidden rounded-lg border border-primary-200 dark:border-primary-800">
        <NuxtImg
          v-if="project.image"
          :src="project.image"
          :alt="project.title"
          class="w-full h-48 object-cover bg-primary-100 dark:bg-primary-800 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          placeholder
          sizes="sm:100vw md:50vw lg:400px"
        />
      </div>
      <div class="flex items-center gap-3 mb-3">
        <span v-if="project.status" class="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-100">
          {{ project.status }}
        </span>
        <div class="flex flex-wrap gap-2">
          <span v-for="tech in project.technologies" :key="tech" 
            class="text-xs px-2 py-1 rounded-full bg-accent-green/10 dark:bg-accent-green-dark/20 text-accent-green dark:text-accent-green-dark">
            {{ tech }}
          </span>
        </div>
      </div>
      <h2 class="text-xl font-title mb-2 text-primary-900 dark:text-white group-hover:text-accent-green dark:group-hover:text-accent-green-dark transition-colors">
        {{ project.title }}
      </h2>
      <p class="text-primary-700 dark:text-primary-100 leading-relaxed">{{ project.description }}</p>
    </article>
  </NuxtLink>
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