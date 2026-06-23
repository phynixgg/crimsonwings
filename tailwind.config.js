/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // near-black / charcoal background scale
        ink: {
          950: "#070708",
          900: "#0B0B0E",
          800: "#121216",
          700: "#1A1A20",
          600: "#24242C",
          500: "#33333D",
        },
        // metallic gold accent scale
        gold: {
          300: "#F6E6AE",
          400: "#E9CD74",
          500: "#D4AF37", // primary accent
          600: "#B8902A",
          700: "#8C6C1E",
          800: "#5E4912",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "var(--font-noto-tc)", "sans-serif"],
        tech: ["var(--font-rajdhani)", "var(--font-noto-tc)", "sans-serif"],
        body: ["var(--font-inter)", "var(--font-noto-tc)", "sans-serif"],
        tc: ["var(--font-noto-tc)", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
        widest2: "0.32em",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(212,175,55,0.25), 0 12px 40px -12px rgba(212,175,55,0.35)",
        goldsoft: "0 18px 60px -24px rgba(212,175,55,0.45)",
      },
      backgroundImage: {
        "gold-grad":
          "linear-gradient(135deg, #F6E6AE 0%, #D4AF37 42%, #8C6C1E 100%)",
        "ink-fade":
          "radial-gradient(120% 120% at 50% 0%, rgba(212,175,55,0.10) 0%, rgba(7,7,8,0) 55%)",
      },
      keyframes: {
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.85" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        scan: "scan 6s linear infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "float-y": "float-y 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
