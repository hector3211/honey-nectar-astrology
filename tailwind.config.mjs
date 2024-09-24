/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      dropShadow: {
        "custom-black": "0 1.2px 1.2px #00000080", // Hex code with opacity converted to rgba
      },
      colors: {
        primary: "#BF725E",
        secondary: "#784D5D",
        accent: "#F9BE33",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
