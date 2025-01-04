<template>
  <div class="min-h-screen bg-primary-50 text-primary-900">
    <header class="border-b border-primary-200">
      <LayoutNavBar />
    </header>
    <main class="container mx-auto px-4 py-12 max-w-4xl">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap',
    },
  ],
})</script>