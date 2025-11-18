/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        mint: "#C0E4FF",
        lavender: "#F3E9FF",
        softblue: "#93C5FD",
        calmgray: "#F8FAFC",
      },
    },
  },
  plugins: [],
}
