/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "inner-top": "inset  0 10px 10px rgba(9, 139, 222, 0.7)",
      },
    },
  },
  plugins: [],
};
