/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'peachy': '#f5efb5',
        'navy-blue': '#000033',
      },

    },
  },
  plugins: [],
}