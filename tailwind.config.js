/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#080C15',
          card: '#0F1626',
          hover: '#182238',
          border: '#1F2E4D',
          accent: '#F59E0B', // Signal amber
          cyber: '#10B981', // Emerald cyber
          indigo: '#6366F1', // Royal indigo
          rose: '#F43F5E', // Knockout crimson
          blue: '#38BDF8', // Sky
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [],
}
