import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        "grey-light": "#FAFAFA",
        "red-primary": "#BB2253",
        "red-500": "#BB2253",
        "red-100": "#BB225340",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
