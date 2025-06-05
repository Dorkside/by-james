<template>
  <button
    class="relative p-2 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800 transition-all duration-500 group overflow-hidden border border-transparent hover:border-accent-green/30 dark:hover:border-accent-green-dark/30"
    @click="toggleColorMode"
    aria-label="Toggle dark mode"
  >
    <!-- Background glow effect -->
    <div class="absolute inset-0 rounded-full bg-gradient-to-br from-accent-green/20 to-accent-orange/20 dark:from-accent-green-dark/20 dark:to-accent-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <!-- Moon icon (dark mode) -->
    <svg
      v-if="colorMode.value === 'dark'"
      class="w-5 h-5 text-accent-green-dark relative z-10 transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
    
    <!-- Sun icon (light mode) -->
    <svg
      v-else
      class="w-5 h-5 text-accent-green relative z-10 transform transition-all duration-500 group-hover:rotate-90 group-hover:scale-110"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}</script> 