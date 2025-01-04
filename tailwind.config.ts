import type { Config } from 'tailwindcss'

export default {
  content: [],
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
          900: '#292524',
        },
        accent: {
          green: '#4a5944',
          'green-light': '#e5e9e3',
          orange: '#c4704d',
          'orange-light': '#faf0eb',
          blue: '#4d6c7c',
          'blue-light': '#edf1f3',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#57534e',
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
              color: '#4a5944',
              textDecoration: 'none',
              borderBottom: '1px solid #e5e9e3',
              transition: 'border-color 0.2s ease',
              '&:hover': {
                borderColor: '#4a5944',
              },
            },
            pre: {
              backgroundColor: '#fafaf9',
              color: '#57534e',
              fontFamily: 'JetBrains Mono, monospace',
              border: '1px solid #e7e5e4',
            },
            code: {
              fontFamily: 'JetBrains Mono, monospace',
              color: '#c4704d',
              '&::before': {
                content: '""',
              },
              '&::after': {
                content: '""',
              },
            },
            blockquote: {
              borderLeftColor: '#e5e9e3',
              color: '#4a5944',
              fontStyle: 'normal',
              fontFamily: 'Newsreader, serif',
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