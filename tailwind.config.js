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
        '88' : '352px',
        '92' : '368px',
        '124' : '496px'
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
      
      }
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
],
}
