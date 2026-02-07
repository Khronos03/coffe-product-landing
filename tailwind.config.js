/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        // Paleta de colores Cumbre Café
        primary: '#1D342C', 
        primaryLight: '#254536',
        secondary: '#A8AE80', 
        tertiary: '#7F8C39', 
        accent: '#F5F0C8',
        background: '#D1D0AB', 
        text: '#535A28', 
        complementary: '#5C4740',
        textdark: '#3E2723',
      },
    },
  },
  plugins: [],
}

