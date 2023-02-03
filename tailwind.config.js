/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      bdazzledblue: '#3d5a80',
      darkskyblue: '#98c1d9',
      lightcyan: '#e0fbfc',
      burntsienna: '#ee6c4d',
      gunmetal: '#293241',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
