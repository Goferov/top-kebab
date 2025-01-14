/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandRed: '#4B0000',
        brandRedLight: '#9A0000',
        brandBlack: '#1A1A1A',
        brandGray: '#D1D1D1',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'a:hover': {
          color: '#F87171',
        },
      });
    },
  ],
}

