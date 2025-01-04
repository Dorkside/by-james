export const useDarkMode = () => {
  const isDark = useState('dark-mode', () => false)
  
  const toggleDark = () => {
    isDark.value = !isDark.value
    updateClass()
  }

  const updateClass = () => {
    if (process.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
      localStorage.setItem('dark-mode', isDark.value ? 'dark' : 'light')
    }
  }

  const initDarkMode = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('dark-mode')
      if (savedTheme) {
        isDark.value = savedTheme === 'dark'
      } else {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      updateClass()

      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('dark-mode')) {
          isDark.value = e.matches
          updateClass()
        }
      })
    }
  }

  return {
    isDark,
    toggleDark,
    initDarkMode
  }
} 