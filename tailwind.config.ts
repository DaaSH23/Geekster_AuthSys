import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'LGreen': '#29b475', 
      'Dbalck': '#000000',
      'Bbacg': '#001219',
      'BBgg': '#18181b',
      'CardBB': '#343a40',
      'redd': '#C62300'
    },
  },
  plugins: [],
};
export default config;
