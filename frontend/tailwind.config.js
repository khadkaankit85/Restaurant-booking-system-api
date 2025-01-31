/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rufinar: "",
      },
      colors: {
        lightGray: "#FFFFFF",
        olive: "#EBF0E4",
        background: "#233000",
      },
    },
  },
  plugins: [],
};
