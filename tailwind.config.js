/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        // Paleta Premium Nueva — clara, brillante, cálida
        primary: '#eb8b3a',        // Naranja cálido principal
        warm: '#fbcd86',           // Amarillo claro - fondos suaves
        dark: '#430000',           // Marrón muy oscuro - solo acentos puntuales
        accent: '#a11d00',         // Rojo-marrón - énfasis
        light: '#fff8f0',          // Crema muy clara - fondo base
        surface: '#faf5f0',        // Superficie clara
        muted: '#d9cfc4',          // Gris cálido
        text: '#2d1810',           // Texto oscuro
        textLight: '#6b5344',      // Texto secundario
        success: '#2d5016',        // Verde complementario
        gift: '#e0356f',           // Magenta/frambuesa vivo - sección Regalos
        giftSubtle: '#fdeaf1',     // Fondo suave rosado
        badgeNew: '#16a34a',       // Verde vivo - badge "Nuevo"
        gold: '#d4a017',           // Dorado suave - acentos premium
      },
      boxShadow: {
        'premium': '0 10px 40px rgba(235, 139, 58, 0.1)',
        'premium-lg': '0 20px 60px rgba(67, 0, 0, 0.15)',
        'premium-xl': '0 25px 80px rgba(161, 29, 0, 0.12)',
      },
      backdropBlur: {
        'premium': 'blur(10px)',
      },
    },
  },
  plugins: [],
}

