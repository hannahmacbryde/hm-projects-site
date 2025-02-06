/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'shop-desk': "url('/img/beige-bg2.jpeg')",
        'shop-mob': "url('/img/beige-bg2.jpeg')",
      },
      fontFamily: {
        dosis: ['"Dosis"', 'sans-serif'],
        lobster: ['"Lobster"', 'sans-serif'],
        laisha: ['laisha', 'sans-serif'],
      },
      colors: {
        lightGreen: "#aaffaa",
        lightBeige: "#f5ebe0",
      },
      zIndex: {
        '1': '1',
        '3': '3',
      },
      spacing: {
        '50px': '50px',
        '62px': '62px',
        '68': '68px',
        '75px': '75px',
      }
    },
  },
  plugins: [],
};

