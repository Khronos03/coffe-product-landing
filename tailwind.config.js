/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        /*primary: '#7B1B1C',
        secondary: '#E5CFB8',
        accent: '#F9ECE4',*/
        complementary: '#5C4740',
        textdark: '#3E2723',
        
        primary: '#430f0f',
        secondary: '#F9ECE4',
        accent: '#FFFFFF',
      },
    },
  },
  plugins: [],
}

