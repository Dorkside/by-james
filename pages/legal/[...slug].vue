<template>
  <article v-if="data" class="max-w-3xl mx-auto">
    <div class="prose prose-lg dark:prose-invert prose-headings:text-primary-900 dark:prose-headings:text-white prose-p:text-primary-700 dark:prose-p:text-primary-100 prose-a:text-accent-green dark:prose-a:text-accent-green-dark prose-strong:text-primary-900 dark:prose-strong:text-white prose-li:text-primary-700 dark:prose-li:text-primary-100 prose-ul:text-primary-700 dark:prose-ul:text-primary-100 prose-ol:text-primary-700 dark:prose-ol:text-primary-100 max-w-none">
      <ContentRenderer :value="data" />
    </div>
  </article>
</template>

<script setup lang="ts">
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne())</script> 