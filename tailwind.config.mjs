/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        void: "#02050d",
        stellar: "#07111f",
        plasma: "#22d3ee",
        signal: "#f7c948",
        comet: "#8bffca"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        "cosmic": "0 24px 80px rgba(1, 10, 24, 0.45)",
        "signal": "0 0 32px rgba(34, 211, 238, 0.18)"
      }
    }
  },
  plugins: []
};
