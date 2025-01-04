import type { Config } from 'tailwindcss'

export default {
  content: [],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        title: ['Newsreader', 'serif'],
      },
      colors: {
        primary: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        accent: {
          green: '#4a5944',
          'green-light': '#e5e9e3',
          'green-dark': '#d8ebd3',
          orange: '#c4704d',
          'orange-light': '#faf0eb',
          'orange-dark': '#ffc4a3',
          blue: '#4d6c7c',
          'blue-light': '#edf1f3',
          'blue-dark': '#bfd4df',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#44403c',
            maxWidth: '65ch',
            'h1, h2, h3, h4': {
              color: '#292524',
              fontFamily: 'Newsreader, serif',
              fontWeight: '500',
              letterSpacing: '-0.015em',
            },
            h1: {
              fontSize: '2.25rem',
            },
            h2: {
              fontSize: '1.875rem',
            },
            h3: {
              fontSize: '1.5rem',
            },
            a: {
              color: '#3d4838',
              textDecoration: 'none',
              borderBottom: '1px solid #e5e9e3',
              transition: 'border-color 0.2s ease',
              '&:hover': {
                borderColor: '#3d4838',
              },
            },
            pre: {
              backgroundColor: '#fafaf9',
              color: '#44403c',
              fontFamily: 'JetBrains Mono, monospace',
              border: '1px solid #e7e5e4',
            },
            code: {
              fontFamily: 'JetBrains Mono, monospace',
              color: '#b35a3a',
              '&::before': {
                content: '""',
              },
              '&::after': {
                content: '""',
              },
            },
            blockquote: {
              borderLeftColor: '#e5e9e3',
              color: '#3d4838',
              fontStyle: 'normal',
              fontFamily: 'Newsreader, serif',
            },
            ul: {
              color: '#44403c',
              'li::marker': {
                color: '#44403c',
              },
            },
            ol: {
              color: '#44403c',
              'li::marker': {
                color: '#44403c',
              },
            },
            li: {
              color: '#44403c',
              '&::marker': {
                color: '#44403c',
              },
            },
            strong: {
              color: '#292524',
              fontWeight: '600',
            },
          },
        },
        dark: {
          css: {
            color: '#f5f5f4',
            'h1, h2, h3, h4': {
              color: '#ffffff',
            },
            a: {
              color: '#d8ebd3',
              borderBottom: '1px solid #404840',
              '&:hover': {
                borderColor: '#d8ebd3',
              },
            },
            pre: {
              backgroundColor: '#1c1917',
              color: '#f5f5f4',
              border: '1px solid #404840',
            },
            code: {
              color: '#ffc4a3',
            },
            blockquote: {
              borderLeftColor: '#404840',
              color: '#d8ebd3',
            },
            strong: {
              color: '#ffffff',
              fontWeight: '600',
            },
            ul: {
              color: '#f5f5f4',
              'li::marker': {
                color: '#f5f5f4',
              },
            },
            ol: {
              color: '#f5f5f4',
              'li::marker': {
                color: '#f5f5f4',
              },
            },
            li: {
              color: '#f5f5f4',
              '&::marker': {
                color: '#f5f5f4',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
} satisfies Config