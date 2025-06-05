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
              borderLeftWidth: '4px',
              borderLeftColor: '#4a5944',
              backgroundColor: '#f8f9f8',
              color: '#3d4838',
              fontStyle: 'italic',
              fontFamily: 'Newsreader, serif',
              padding: '1.5rem 2rem',
              margin: '2rem 0',
              borderRadius: '0 0.5rem 0.5rem 0',
              position: 'relative',
              '&::before': {
                content: '"„"',
                position: 'absolute',
                top: '-0.5rem',
                left: '1rem',
                fontSize: '3rem',
                color: '#4a5944',
                opacity: '0.3',
                fontFamily: 'Newsreader, serif',
              },
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
            'p:first-of-type:first-letter': {
              float: 'left',
              fontSize: '3.5rem',
              lineHeight: '3rem',
              paddingRight: '0.5rem',
              paddingTop: '0.25rem',
              fontFamily: 'Newsreader, serif',
              fontWeight: '500',
              color: '#4a5944',
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
              borderLeftWidth: '4px',
              borderLeftColor: '#d8ebd3',
              backgroundColor: '#1a1917',
              color: '#d8ebd3',
              fontStyle: 'italic',
              fontFamily: 'Newsreader, serif',
              padding: '1.5rem 2rem',
              margin: '2rem 0',
              borderRadius: '0 0.5rem 0.5rem 0',
              position: 'relative',
              '&::before': {
                content: '"„"',
                position: 'absolute',
                top: '-0.5rem',
                left: '1rem',
                fontSize: '3rem',
                color: '#d8ebd3',
                opacity: '0.3',
                fontFamily: 'Newsreader, serif',
              },
            },
            strong: {
              color: '#ffffff',
              fontWeight: '600',
            },
            'p:first-of-type:first-letter': {
              float: 'left',
              fontSize: '3.5rem',
              lineHeight: '3rem',
              paddingRight: '0.5rem',
              paddingTop: '0.25rem',
              fontFamily: 'Newsreader, serif',
              fontWeight: '500',
              color: '#d8ebd3',
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