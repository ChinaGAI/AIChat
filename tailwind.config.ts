import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: { preflight: false },
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
        "linear-sider": "var(--linear-sider)",
      },
      textColor: {
        primary: "var(--semi-color-primary)",
        "text-0": "var(--semi-color-text-0)",
        "text-1": "var(--semi-color-text-1)",
        "text-2": "var(--semi-color-text-2)",
        "text-3": "var(--semi-color-text-3)",
        danger: "var(--semi-color-danger)",
      },
      backgroundColor: {
        primary: "var(--semi-color-primary)",
        white: "var(--semi-color-bg-3)",
        active: "var(--semi-color-primary-light-default)",
        "gray-100": "var(--semi-color-default)",
        "gray-200": "var(--semi-color-bg-1)",
        "gray-300": "var(--semi-color-bg-2)",
        "fill-0": "var(--semi-color-fill-0)",
        "fill-1": "var(--semi-color-fill-1)",
        "brand-1": "rgb(var(--semi-brand-1))",
        "brand-2": "rgb(var(--semi-brand-2))",
        "brand-3": "rgb(var(--semi-brand-3))",
        "brand-4": "rgb(var(--semi-brand-4))",
        "brand-5": "rgb(var(--semi-brand-5))",
      },
      borderColor: {
        primary: "var(--semi-color-primary)",
        "brand-3": "rgb(var(--semi-brand-3))",
      },
    },
  },
  plugins: [],
};
export default config;
