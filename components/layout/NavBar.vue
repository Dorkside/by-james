<template>
  <nav class="container mx-auto px-4 py-6 flex items-center justify-between max-w-4xl">
    <NuxtLink to="/" class="text-lg font-title hover:text-accent-green transition-colors">
      by <span class="text-accent-green">James</span>
    </NuxtLink>
    <div class="space-x-8">
      <NuxtLink to="/articles" class="hover:text-accent-green transition-colors">Articles</NuxtLink>
      <NuxtLink to="/portfolio" class="hover:text-accent-green transition-colors">Portfolio</NuxtLink>
    </div>
  </nav>
</template>