<template>
  <button
    class="p-2 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
    @click="toggleDark"
    aria-label="Toggle dark mode"
  >
    <svg
      v-if="isDark"
      class="w-5 h-5 text-accent-green-dark"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
    <svg
      v-else
      class="w-5 h-5 text-accent-green"
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
const { isDark, toggleDark } = useDarkMode()
</script> 