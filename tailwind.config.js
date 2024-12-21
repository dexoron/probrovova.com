/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./pages/**/*.html"],
  theme: {
    screens: {
      mobile: "360px",
      tablet: "560px",
      tablet2: "820px",
      desktop: "1024px"
    },
    extend: {}
  },
  plugins: []
};
