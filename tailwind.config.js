/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light": "#EFFBF7",
        "dark": "#082118",
        "accent": "#3CC8A0",
        "accent-light": "#C0EEE0",
      },
    },
    plugins: [],
  }
}