/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['"Press Start 2P"', 'cursive'], // Example retro font
      },
      colors: {
        'nano-pink': '#ff00ff',
        'nano-cyan': '#00ffff',
        'nano-yellow': '#ffff00',
        'nano-black': '#1a1a1a',
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(0,0,0,1)',
        'retro-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}
