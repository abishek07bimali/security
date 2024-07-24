/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'lg': '1200px',
        'mds': '800px',
        'xs': '320px',
        'xss': '280px',
        'sm': '350px',
      },
    },
  },
  plugins: [],
}