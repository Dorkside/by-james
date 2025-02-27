<template>
  <nav class="container mx-auto px-4 py-3 max-w-4xl">
    <div class="flex items-center justify-between">
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
            loading="eager"
          />
          <span class="text-lg font-title">ames</span>
        </span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <NuxtLink 
          to="/" 
          class="hover:text-accent-green dark:hover:text-accent-green-dark transition-colors"
        >
          Home
        </NuxtLink>
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

      <!-- Mobile Controls -->
      <div class="md:hidden flex items-center space-x-2">
        <UiDarkModeToggle />
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="p-1 hover:text-accent-green dark:hover:text-accent-green-dark transition-colors"
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              v-if="!isMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div 
      v-show="isMenuOpen"
      class="md:hidden py-2 flex flex-col space-y-2 items-center transition-all duration-300 ease-in-out"
    >
      <NuxtLink 
        to="/" 
        class="hover:text-accent-green dark:hover:text-accent-green-dark transition-colors w-full text-center py-1"
        @click="isMenuOpen = false"
      >
        Home
      </NuxtLink>
      <NuxtLink 
        to="/articles" 
        class="hover:text-accent-green dark:hover:text-accent-green-dark transition-colors w-full text-center py-1"
        @click="isMenuOpen = false"
      >
        Articles
      </NuxtLink>
      <NuxtLink 
        to="/portfolio" 
        class="hover:text-accent-green dark:hover:text-accent-green-dark transition-colors w-full text-center py-1"
        @click="isMenuOpen = false"
      >
        Portfolio
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const isMenuOpen = ref(false)

// Close menu when route changes
watch(() => useRoute().fullPath, () => {
  isMenuOpen.value = false
})

// Close menu when escape key is pressed
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      isMenuOpen.value = false
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>