<template>
  <article v-if="data" class="max-w-3xl mx-auto">
    <div class="mb-8">
      <h1 class="text-4xl font-title mb-4 text-primary-900 dark:text-white">{{ data.title }}</h1>
      <div class="flex items-center gap-3 mb-4">
        <span v-if="data.status" class="text-sm px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-100">
          {{ data.status }}
        </span>
        <div class="flex flex-wrap gap-2">
          <span v-for="tech in data.technologies" :key="tech" 
            class="text-xs px-2 py-1 rounded-full bg-accent-green/10 dark:bg-accent-green-dark/20 text-accent-green dark:text-accent-green-dark">
            {{ tech }}
          </span>
        </div>
      </div>
      <p class="text-lg text-primary-700 dark:text-primary-100 leading-relaxed">{{ data.description }}</p>
    </div>
    <div class="prose prose-lg dark:prose-invert prose-headings:text-primary-900 dark:prose-headings:text-white prose-p:text-primary-700 dark:prose-p:text-primary-100 prose-a:text-accent-green dark:prose-a:text-accent-green-dark prose-strong:text-primary-900 dark:prose-strong:text-white prose-li:text-primary-700 dark:prose-li:text-primary-100 prose-ul:text-primary-700 dark:prose-ul:text-primary-100 prose-ol:text-primary-700 dark:prose-ol:text-primary-100 max-w-none">
      <ContentRenderer :value="data" />
    </div>
  </article>
</template>

<script setup lang="ts">
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne())</script> 