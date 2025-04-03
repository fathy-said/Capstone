/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "16px",
        screens: {
          lg: "1200px",
        },
      },

      fontSize: {
        xxs: ["10px", "12px"],
      },
      fontFamily: {
        base: ["IBM Plex Sans Arabic", "sans-serif"],
      },
      screens: {
        xs: "400px",
      },

      height: {
        13: "52px",
      },

      width: {
        13: "52px",
      },

      colors: {
        red: {
          100: "#FEEDEC",
          200: "#FAA39E",
          400: "#DC3545",
          450: "#E63469",
          500: "#D03232",
          600: "#DF0707",
        },

        purple: {
          50: "#fcfaff",
          100: "#F9F5FF",
          200: "#E9D7FE",
          400: "#7F56D9",
          500: "#6941C6",
        },

        blue: {
          100: "#ECF6FE",
          200: "#9ED1FA",
          400: "#2296F3",
          450: "#2E90FA",
          480: "#1886CC",
          500: "#344054",
          600: "#101828",
        },

        gray: {
          50: "#EAECF0",
          100: "#F9FAFB",
          150: "#d0d5dd4f",
          200: "#D0D5DD",
          250: "#B7B7B8",
          300: "#6E6E70",
          400: "#667085",
          450: "#475467",
          480: "#5D6481",
          500: "#101828",
        },

        yellow: {
          100: "#FFF7EB",
          200: "#FFD699",
          400: "#E4B702",
          500: "#F59E0B",

          600: "#FF9800",
        },

        brown: {
          100: "#F5F5F5",
          150: "#f9f9fb",
          200: "#CCCCCC",
          300: "#9E9E9E",
        },

        orange: {
          400: "#F4760B",
        },

        green: {
          100: "#ECFDF3",
          200: "#ABEFC6",
          250: "#11A191",
          300: "#17B26A",
          500: "#067647",
        },
      },
      lineHeight: {
        normal: "normal",
      },
      borderRadius: {
        xl: "22px",
        "2xl": "28px",
      },
    },
  },
  plugins: [],
};
