/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rufinar: "",
      },
      colors: {
        lightGray: "#D8D4D4",
        olive: "#EBF0E4",
      },
    },
  },
  plugins: [],
};
