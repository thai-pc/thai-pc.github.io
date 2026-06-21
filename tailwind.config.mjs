/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: '#8957e5', light: '#F1EAFB', dark: '#a98aec' },
        surface: { DEFAULT: '#f8f9fa', dark: 'var(--bg-page)' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
