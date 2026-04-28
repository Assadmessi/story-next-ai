/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#5DB9FF",
          yellow: "#FFD166",
          coral: "#FF6B6B",
          cream: "#FFF8E7",
          navy: "#1E2A38",
          ink: "#223042",
          mist: "#EEF6FF",
        },
      },
    },
  },
  plugins: [],
};
