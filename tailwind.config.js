/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F1C20",   // Darkest Green/Black (Background)
        secondary: "#1F4E56", // Card Background
        accent: "#66C7B9",    // Light Teal (Highlights)
        highlight: "#FCA311", // Orange/Gold (Buttons/Icons)
        textLight: "#E0E6ED", // White/Grey text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}