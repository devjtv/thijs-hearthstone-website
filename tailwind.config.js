/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        demonHunter: "#A330C9",
        druid: "#FF7D0A",
        shaman: "#0070DE",
        priest: "#FFFFFF",
        paladin: "#F58CBA",
        hunter: "#ABD473",
        warlock: "#9482C9",
        mage: "#69CCF0",
        rogue: "#FFF569",
        warrior: "#C79C6E",
        deathKnight: "#C41F3B",
        highlight: "#F5CB5C",
        background: "#242423",
        backgroundLight: "#333533"
      }
    },
  },
  plugins: [],
};
