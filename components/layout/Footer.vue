<template>
  <footer class="relative border-t border-primary-200 dark:border-primary-800 mt-24 overflow-hidden">
    <!-- Subtle decorative element -->
    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent-green/30 to-transparent"></div>
    
    <div class="container mx-auto px-4 py-12 max-w-4xl relative">
      <div class="flex flex-col items-center space-y-6">
        <NuxtLink 
          to="/" 
          class="hover:opacity-90 transition-all bg-accent-green/20 dark:bg-accent-green-dark/20 px-3 py-1.5 rounded-full group flex items-center space-x-2"
        >
          <span class="text-lg font-title">by</span>
          <span class="flex items-center">
            <NuxtImg
              src="/images/logo.png"
              alt="J"
              class="h-6 w-auto invert dark:invert-0 group-hover:scale-105 transition-transform"
              loading="lazy"
            />
            <span class="text-lg font-title">ames</span>
          </span>
        </NuxtLink>
        <UiSocialLinks />
        <nav class="flex items-center space-x-4 text-sm text-primary-800/60 dark:text-primary-50/60">
          <NuxtLink 
            to="/legal/privacy-policy"
            class="hover:text-accent-green dark:hover:text-accent-green-dark transition-colors"
          >
            Privacy Policy
          </NuxtLink>
          <span>·</span>
          <NuxtLink 
            to="/legal/terms"
            class="hover:text-accent-green dark:hover:text-accent-green-dark transition-colors"
          >
            Terms
          </NuxtLink>
        </nav>
        <div class="text-sm text-primary-800/60 dark:text-primary-50/60">
          © {{ new Date().getFullYear() }} James Martin. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template> 