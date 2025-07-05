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
        'gold': '#FD5D00',
        'neutral-dark': '#121212',
        'neutral-light': '#E0E0E0',
        'secure-teal': '#00BFA6',
        'threat-blue': '#2C84D8',
        'alert-amber': '#FC6000',
        'adversary-red': '#E63946',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};