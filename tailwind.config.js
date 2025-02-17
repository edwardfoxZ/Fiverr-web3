/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        agbalumo: ["Agbalumo", "serif"],
      },
      backgroundImage: {
        "hover-gardient-card":
          "radial-gradient(circle, rgba(147, 255, 172, 0.677) 0%, rgba(141, 255, 170, 0.678) 4%, rgba(159, 255, 183, 0.653) 12%, rgba(189, 255, 205, 0.654) 28%, rgba(255, 255, 255, 1) 51%, rgba(255, 255, 255, 1) 100%)",
      },
    },
  },
  plugins: [],
};
