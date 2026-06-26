/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['JetBrains Mono', 'monospace'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand:   '#FFC801',
        saffron: '#FF9932',
        teal:    '#114C5A',
        noir:    '#172B36',
        powder:  '#F1F6F4',
        mint:    '#D9E8E2',
      },
    },
  },
  plugins: [],
};
