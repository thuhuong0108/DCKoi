/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "inner-top": "inset  0 10px 10px rgba(249, 214, 45, 0.7)",
      },
    },
  },
  plugins: [],
};
