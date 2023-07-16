/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif']
      },
      spacing: {
        '88': '352px',
        '92': '368px',
        '124': '496px'
      },
      colors: {
        'oxford-blue': {
          '50': '#f6f7f9',
          '100': '#eceef2',
          '200': '#d4dae3',
          '300': '#afbaca',
          '400': '#8495ac',
          '500': '#647793',
          '600': '#506079',
          '700': '#414e63',
          '800': '#374151',
          '900': '#333b47',
          '950': '#22272f',
        },
        'zinc': {
          '50': '#fafafa',
          '100': '#f4f4f5',
          '200': '#e4e4e7',
          '300': '#d4d4d8',
          '400': '#a1a1aa',
          '500': '#71717a',
          '600': '#52525b',
          '700': '#3f3f46',
          '800': '#27272a',
          '900': '#18181b',
          '950': '#09090b',
        },


      }
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
  ],
  darkMode: 'class'

}
