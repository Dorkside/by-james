<template>
  <div class="min-h-screen bg-primary-50 dark:bg-primary-900 text-primary-800 dark:text-primary-200 transition-colors flex flex-col relative overflow-x-hidden">
    <!-- Animated gradient orbs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-accent-green/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-orange/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-blue/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
    
    <!-- Subtle dot pattern -->
    <div class="fixed inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
    
    <header class="sticky top-0 z-10 border-b border-primary-100 dark:border-primary-800 bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-sm transition-all duration-300 hover:shadow-sm">
      <div class="max-w-5xl mx-auto px-6 py-4">
        <LayoutNavBar />
      </div>
    </header>

    <main class="flex-1 px-6 py-12 relative z-10">
      <NuxtPage />
    </main>

    <footer class="mt-auto border-t border-primary-100 dark:border-primary-800 relative z-10">
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

<style>
/* Smooth animations */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 20s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Custom selection */
::selection {
  background-color: rgb(74 89 68 / 0.3);
  color: inherit;
}

/* Custom focus styles */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid rgb(74 89 68 / 0.5);
  outline-offset: 2px;
  border-radius: 0.125rem;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgb(0 0 0 / 0.1);
  border-radius: 6px;
  border: 3px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(0 0 0 / 0.2);
  background-clip: content-box;
}

.dark ::-webkit-scrollbar-thumb {
  background: rgb(255 255 255 / 0.1);
  background-clip: content-box;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgb(255 255 255 / 0.2);
  background-clip: content-box;
}
</style>