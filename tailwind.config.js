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
        paper: {
          DEFAULT: "#FFFFFF",
          2: "#F9F8F6",
          3: "#F3F2EF",
        },
        ink: {
          DEFAULT: "#0A0A0A",
          2: "#3A3A3A",
          soft: "#7D8187",
          faint: "rgba(10,10,10,0.45)",
        },
        hairline: {
          DEFAULT: "rgba(213,217,226,0.9)",
          strong: "#D5D9E2",
        },
        accent: {
          DEFAULT: "#69557B",
          2: "#564463",
          leaf: "#5A6B3E",
          blue: "#3D5A6C",
        },
        working: {
          DEFAULT: "#E57A2E",
        },
        exchange: {
          bull: "#2D6A4F",
          bear: "#C45C4A",
          neutral: "#7D8187",
          ticker: "#69557B",
          grid: "rgba(10,10,10,0.06)",
          tape: "#F3F2EF",
        },
        farm: {
          bg: "#FFFFFF",
          surface: "#F9F8F6",
          panel: "#F3F2EF",
          text: "#0A0A0A",
          secondary: "#7D8187",
          tertiary: "#B0B3B8",
          border: "#D5D9E2",
        },
        sage: {
          50: "#F5F2F7",
          100: "#EBE4F0",
          200: "#D4C6DD",
          300: "#A889B8",
          400: "#8B7399",
          500: "#69557B",
          600: "#564463",
          DEFAULT: "#69557B",
        },
        terra: {
          50: "#F5F2F7",
          100: "#EBE4F0",
          200: "#D4C6DD",
          300: "#A889B8",
          400: "#8B7399",
          500: "#69557B",
          DEFAULT: "#69557B",
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
          DEFAULT: "#69557B",
        },
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
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "Arial", "Helvetica", "sans-serif"],
        poppins: ["var(--font-satoshi)", "Arial", "Helvetica", "sans-serif"],
        serif: ["var(--font-satoshi)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        script: ["var(--font-satoshi)", "Arial", "Helvetica", "sans-serif"],
      },
      borderRadius: {
        grok: "24px",
      },
    },
  },
  plugins: [],
};
