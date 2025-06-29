/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0a0f2c',
        'violet': '#7c3aed',
        'purple': '#a21caf',
        'gradient-start': '#0a0f2c',
        'gradient-mid': '#7c3aed',
        'gradient-end': '#a21caf',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a0f2c 0%, #7c3aed 50%, #a21caf 100%)',
      },
    },
  },
  plugins: [],
}; 