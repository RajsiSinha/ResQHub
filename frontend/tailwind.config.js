/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#258cf4",
        "emergency-red": "#dc2626",
        "background-dark": "#101922",
      },
    },
  },
  plugins: [],
}
