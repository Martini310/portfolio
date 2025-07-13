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
        // Light theme colors
        'light-bg': '#ffffff',
        'light-card': '#f8fafc',
        'light-border': '#e2e8f0',
        'light-text': '#1e293b',
        'light-text-secondary': '#64748b',
        'light-text-muted': '#94a3b8',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a0f2c 0%, #7c3aed 50%, #a21caf 100%)',
        'hero-gradient-light': 'linear-gradient(135deg, #f1f5f9 0%, #3b82f6 50%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [],
}; 