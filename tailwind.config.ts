import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
] as const;

const shadeMapping: Record<string, string> = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};
const filteredColors = Object.fromEntries(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(colors).filter(([_, value]) => typeof value === "object")
) as Record<string, Record<string, string>>;

const generateThemeObject = (
  colors: Record<string, Record<string, string>>, // Now correctly typed
  mapping: Record<string, string>,
  invert = false
): Record<string, Record<string, string>> => {
  const theme: Record<string, Record<string, string>> = {};

  baseColors.forEach((color) => {
    if (!colors[color]) return; // Prevent errors if a color is missing
    theme[color] = {};
    Object.entries(mapping).forEach(([key, value]) => {
      const shadeKey = invert ? value : key;
      theme[color][key] = colors[color][shadeKey] || "";
    });
  });

  return theme;
};

const lightTheme = generateThemeObject(filteredColors, shadeMapping);
const darkTheme = generateThemeObject(filteredColors, shadeMapping, true);

const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",
  },
  dark: {
    ...darkTheme,
    white: filteredColors.gray?.["950"] || "#0a0a0a",
    black: filteredColors.gray?.["50"] || "#fafafa",
  },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [createThemes(themes)],
};

export default config;