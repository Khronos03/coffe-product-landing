/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        primary: '#1b342f',
        secondary: '#790f01',
        accent: '#FFF8E1',
        complementary: '#5C4740',
        textdark: '#3E2723'        
      },
    },
  },
  plugins: [],
}

