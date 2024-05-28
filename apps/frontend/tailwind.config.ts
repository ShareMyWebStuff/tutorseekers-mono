import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      "0": "0",
      "2": "2",
      "3": "3",
    },

    extend: {
      backgroundImage: {
        "landing-tutor-selector":
          "linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('/images/landing/banner-4.jpg')",
      },
      colors: {
        blue: {
          // light: "#d2e6f3",
          // normal: "#1c4966",
          // dark: "#0e2443",
          light1: "#e8edf0",
          light2: "#d2dbe0",
          light3: "#bbc8d1",
          light4: "#a4b6c2",
          light: "#d2e6f3",
          normal: "#1c4966",
          dark: "#0e2443",
        },
        white: {
          500: "#9fa7b4",
          600: "#b7bdc7",
          700: "#cfd3d9",
          800: "#e7e9ec",
          900: "#ffffff",
        },
        "my-grey": "#4e4b44",
        "my-green": "#c7d6d5",
        gold: "#e6b25c",
        facebook: "#1877F2",
        email: "",
        twitter: "#1DA1F2",
        "input-border": "#E4E4E7",
        warning: "#ff6961",
        "disabled-bg": "#CDCDCD",

        "orange-logo": {
          500: "#ef4136",
          800: "#fac6c3",
          900: "#fdeceb",
        },
        "yellow-logo": {
          500: "#f7941d",
          800: "#fddfbb",
          900: "#fef4e8",
        },
        "blue-logo": {
          500: "#141464",
          800: "#b9b9d1",
          900: "#e8e8f0",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  zIndex: {
    "0": "0",
    "10": "10",
    "20": "20",
    "30": "30",
    "40": "40",
    "50": "50",
    "75": "75",
    "100": "100",
    "1000": "1000",
    "2000": "2000",
    "3000": "3000",
    auto: "auto",
  },
  screens: {
    sm: "576px",
    // => @media (min-width: 640px) { ... }

    md: "768px",
    // => @media (min-width: 768px) { ... }

    lg: "992px",
    // => @media (min-width: 1024px) { ... }

    xl: "1200px",
    // => @media (min-width: 1280px) { ... }
  },
  fontSize: {
    sm: "0.875rem",
    base: "1rem",
    xl: "1.125rem",
    "2xl": "1.25rem",
    "3xl": "1.5rem",
    "4xl": "1.75rem",
    "5xl": "2rem",
  },
  // fontSize: {
  //   sm: "0.8rem",
  //   base: "1rem",
  //   xl: "1.25rem",
  //   "2xl": "1.563rem",
  //   "3xl": "1.953rem",
  //   "4xl": "2.441rem",
  //   "5xl": "3.052rem",
  // },
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
