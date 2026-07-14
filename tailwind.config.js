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
        // Editorial "Italian operative studio" palette (new)
        paper: {
          DEFAULT: "#F1EADA",
          2: "#E8DFC8",
          3: "#DCD0B3",
        },
        ink: {
          DEFAULT: "#1B1916",
          2: "#3A342B",
          soft: "#6A6357",
          faint: "rgba(27,25,22,0.45)",
        },
        hairline: {
          DEFAULT: "rgba(27,25,22,0.16)",
          strong: "rgba(27,25,22,0.34)",
        },
        accent: {
          DEFAULT: "#A8412B",
          2: "#872E1B",
          leaf: "#5A6B3E",
          blue: "#3D5A6C",
        },
        exchange: {
          bull: "#2D6A4F",
          bear: "#A8412B",
          neutral: "#6A6357",
          ticker: "#7A5C1E",
          grid: "rgba(27,25,22,0.07)",
          tape: "#E8DFC8",
        },

        // farm.* values remapped to editorial palette — existing components
        // (HowIWork, Experience, WhyContactMe, TechnicalSkills, Search…)
        // automatically shift to the new look without code changes.
        farm: {
          bg: "#F1EADA",
          surface: "#FBF6E5",
          panel: "#E8DFC8",
          text: "#1B1916",
          secondary: "#6A6357",
          tertiary: "#B0A797",
          border: "#D4CCBC",
        },
        // Sage remapped to red/ink-ish so legacy CTA accents look intentional
        // in the new editorial palette rather than green.
        sage: {
          50: "#F4EEDF",
          100: "#EDE5CF",
          200: "#DCD0B3",
          300: "#C9624C",
          400: "#B54E36",
          500: "#A8412B",
          600: "#872E1B",
          DEFAULT: "#A8412B",
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
        // legacy
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
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        poppins: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['Arial', 'Helvetica', 'sans-serif'],
        script: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
