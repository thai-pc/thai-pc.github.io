/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: '#1A56A0', light: '#E6F1FB', dark: '#4d8ed4' },
        surface: { DEFAULT: '#f8f9fa', dark: '#161b22' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
