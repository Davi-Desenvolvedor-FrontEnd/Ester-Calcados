import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5f8',
          100: '#ffe8f0',
          200: '#ffd0e0',
          300: '#ffa9c6',
          400: '#fb75a3',
          500: '#f0447e',
          600: '#dc2b64',
          700: '#b81d4f',
          800: '#981b45',
          900: '#7f1a3d',
        },
        plum: {
          50: '#f6f3fb',
          100: '#ede6f6',
          200: '#dccdee',
          300: '#c1a6e0',
          400: '#a476cd',
          500: '#8752b9',
          600: '#7139a0',
          700: '#5e2e84',
          800: '#4d276c',
          900: '#40225a',
        },
        cream: '#fffaf9',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        script: ['"Pacifico"', 'cursive'],
        sans: ['"Poppins"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(120, 40, 90, 0.12)',
        card: '0 2px 12px -2px rgba(120, 40, 90, 0.10)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
} satisfies Config
