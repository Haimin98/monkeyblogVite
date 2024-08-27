/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(179.77deg, #6b6b6b 36.45%, rgba(163, 163, 163, 0.622265) 63.98%, rgba(255, 255, 255, 0) 99.8%)",
      },
      backgroundColor: {
        "current-color": "currentColor",
      },
      boxShadow: {
        custom1: "10px 10px 20px rgba(218, 213, 213, 0.15)",
      },
    },

    colors: {
      primary: "#2EBAC1",
      secondary: "#A4D96C",
      grayDark: "#292D32",
      grayLight: "#E7ECF3",
      tertiary: "#3A1097",
      accent: "#00D1ED",
      grayF3: "#F3EDFF",
      gray6B: "#6B6B6B",
      gray23: "#232323",
      gray4b: "#4B5264",
      grayF1: "#F1F1F3",
      gray80: "#808191",
      black: "#171725",
      white: "#FFFFFF",
      inherit: "inherit",
    },
  },
  plugins: [],
};
