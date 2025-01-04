<template>
  <article v-if="data" class="max-w-3xl mx-auto">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">{{ data.title }}</h1>
      <div class="flex items-center gap-3 mb-4">
        <span v-if="data.status" class="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-50">
          {{ data.status }}
        </span>
        <div class="flex flex-wrap gap-2">
          <span v-for="tech in data.technologies" :key="tech" 
            class="text-xs px-2 py-1 rounded-full bg-accent-green/10 dark:bg-accent-green-dark/10 text-accent-green dark:text-accent-green-dark">
            {{ tech }}
          </span>
        </div>
      </div>
      <p class="text-lg text-primary-900 dark:text-primary-50">{{ data.description }}</p>
    </div>
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <ContentRenderer :value="data" />
    </div>
  </article>
</template>

<script setup>
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne())</script> 