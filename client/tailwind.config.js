/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '600px',
      // => @media (min-width: 576px) { ... }

      'md': '905px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
      'xl': '1648px',
      '2xl': '1920px',
    },
  },
  plugins: [],
}

