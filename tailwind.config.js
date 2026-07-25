/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          50: "var(--c-slate-50)",
          100: "var(--c-slate-100)",
          200: "var(--c-slate-200)",
          300: "var(--c-slate-300)",
          400: "var(--c-slate-400)",
          500: "var(--c-slate-500)",
          600: "var(--c-slate-600)",
          700: "var(--c-slate-700)",
          800: "var(--c-slate-800)",
          900: "var(--c-slate-900)",
          950: "var(--c-slate-950)",
        },
      },
    },
  },
  plugins: [],
};
