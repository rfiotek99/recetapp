/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12' },
        secondary: { 50: '#ecfdf5', 100: '#d1fae5', 500: '#10b981', 600: '#059669', 700: '#047857' },
        accent: { 100: '#fee2e2', 400: '#f87171', 500: '#ef4444', 600: '#dc2626' },
        yellow: { 50: '#fefce8', 100: '#fef9c3', 300: '#fde047', 400: '#facc15', 500: '#eab308', 800: '#854d0e', 900: '#713f12' },
      },
      backgroundImage: { 'food-gradient': 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)' },
      boxShadow: { 'food': '0 10px 40px rgba(249, 115, 22, 0.2)' },
    },
  },
  plugins: [],
}
