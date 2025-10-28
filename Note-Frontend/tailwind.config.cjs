/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <-- Make sure 'class' mode is enabled for our toggle
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./srcD/**/*.{js,ts,jsx,tsx}", // <-- IMPORTANT: Scans your srcD folder
  ],
  theme: {
    extend: {
      colors: {
        // You can add your purple colors here later
      }
    },
  },
  plugins: [],
}
