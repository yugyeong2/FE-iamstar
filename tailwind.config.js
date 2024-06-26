/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'seoulhangang': ['SeoulHangang', 'sans-serif'],
        'charmonman': ['Charmonman', 'cursive'],
      },
    },
  },
  plugins: [],
}

