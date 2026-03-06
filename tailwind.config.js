/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors for linktree/blog pages
        green: {
          50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac",
          400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d",
          800: "#166534", 900: "#14532d",
        },
        sand: {
          50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047",
          400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207",
          800: "#854d0e", 900: "#713f12",
        },
        // Agriculture watercolor palette
        farm: {
          bg: "#FDFBF6",
          surface: "#FFFFFF",
          panel: "#F7F3EC",
          text: "#2C2417",
          secondary: "#7D7265",
          tertiary: "#D5CEBF",
          border: "#E8E2D6",
        },
        sage: {
          50: "#F2F6EF",
          100: "#E1EADA",
          200: "#C5D6B8",
          300: "#A3BE93",
          400: "#82A66E",
          500: "#6B8F57",
          600: "#547243",
          DEFAULT: "#6B8F57",
        },
        terra: {
          50: "#FBF3ED",
          100: "#F3DFD0",
          200: "#E8C4A8",
          300: "#D4A07A",
          400: "#C08558",
          500: "#A96F42",
          DEFAULT: "#C08558",
        },
        wheat: {
          50: "#FDFAF0",
          100: "#F9F0D6",
          200: "#F0DFA8",
          300: "#E5CB77",
          400: "#D4B44E",
          500: "#B89A35",
          DEFAULT: "#D4B44E",
        },
        lavender: {
          50: "#F5F0F9",
          100: "#E8DDF0",
          200: "#D4C1E3",
          300: "#B99AD0",
          400: "#A07ABD",
          DEFAULT: "#A07ABD",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
