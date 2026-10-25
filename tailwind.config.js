/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#FBF8FF',
          100: '#F4EEFF',
          200: '#E9DEFF',
          300: '#D6C2FE',
          400: '#B896FD',
          500: '#9B6DF9',
          600: '#8247E5',
          700: '#6E2FD0',
          800: '#5A23AD',
          900: '#4B1C91',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#FAF9FE',
          card: '#FFFFFF',
          border: '#E8E4F3',
          darkText: '#1E1B4B',
          mutedText: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'clean': '0 1px 3px 0 rgba(75, 28, 145, 0.05), 0 1px 2px -1px rgba(75, 28, 145, 0.05)',
        'card': '0 4px 20px -2px rgba(130, 71, 229, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 10px 30px -4px rgba(130, 71, 229, 0.14), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'button': '0 4px 14px 0 rgba(130, 71, 229, 0.35)',
      }
    },
  },
  plugins: [],
}
