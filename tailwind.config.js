/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '320px',
      // => @media (min-width: 320px) { ... }

      'md': '640px',
      // => @media (min-width: 640px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
