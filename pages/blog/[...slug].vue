<template>
  <article class="max-w-3xl mx-auto">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">{{ data.title }}</h1>
      <FormattedDate :date="data.date" className="text-gray-600" />
    </div>
    <div class="prose prose-lg max-w-none">
      <ContentRenderer :value="data" />
    </div>
  </article>
</template>

<script setup lang="ts">
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne())</script>