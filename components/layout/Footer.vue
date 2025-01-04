<template>
  <footer class="border-t border-primary-200 dark:border-primary-800 mt-24">
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="flex flex-col items-center space-y-6">
        <NuxtLink 
          to="/" 
          class="text-sm font-title hover:text-accent-green dark:hover:text-accent-green-dark transition-colors"
        >
          by <span class="text-accent-green dark:text-accent-green-dark">James</span>
        </NuxtLink>
        <UiSocialLinks />
        <div class="text-sm text-primary-800/60 dark:text-primary-50/60">
          © {{ new Date().getFullYear() }} James Martin. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template> 