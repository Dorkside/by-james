<template>
  <nav class="container mx-auto px-4 py-6 flex items-center justify-between max-w-4xl">
    <NuxtLink 
      to="/" 
      class="text-lg font-title hover:text-accent-green dark:hover:text-accent-green-dark transition-colors"
    >
      by <span class="text-accent-green dark:text-accent-green-dark">James</span>
    </NuxtLink>
    <div class="flex items-center space-x-8">
      <NuxtLink 
        to="/articles" 
        class="hover:text-accent-green dark:hover:text-accent-green-dark transition-colors"
      >
        Articles
      </NuxtLink>
      <NuxtLink 
        to="/portfolio" 
        class="hover:text-accent-green dark:hover:text-accent-green-dark transition-colors"
      >
        Portfolio
      </NuxtLink>
      <UiDarkModeToggle />
    </div>
  </nav>
</template>