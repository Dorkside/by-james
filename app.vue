<template>
  <div class="min-h-screen bg-primary-50 dark:bg-primary-900 text-primary-800 dark:text-primary-200 transition-colors flex flex-col">
    <header class="sticky top-0 z-10 border-b border-primary-100 dark:border-primary-800 bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-sm">
      <div class="max-w-5xl mx-auto px-6 py-4">
        <LayoutNavBar />
      </div>
    </header>

    <main class="flex-1 px-6 py-12">
      <NuxtPage />
    </main>

    <footer class="mt-auto border-t border-primary-100 dark:border-primary-800">
      <div class="max-w-5xl mx-auto px-6 py-8">
        <LayoutFooter />
      </div>
    </footer>
  </div>
</template>

<script setup>
// Add Google Fonts
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap',
    },
  ],
})</script>