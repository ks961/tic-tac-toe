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
        "text": "hsl(var(--text))",
        "background": "hsl(var(--background))",
        "primary": "hsl(var(--primary))",
        "secondary": "hsl(var(--secondary))",
        "accent": "hsl(var(--accent))",
        "black": "#0f0f0f",
      },
      fontFamily: {
        "lato": ['"Lato", sans-serif'],
        "playwrite-cuba": ['"Playwrite CU", cursive'],
      }
    },
  },
  plugins: [],
}