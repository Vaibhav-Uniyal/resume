/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#a78bfa', // Light purple
          DEFAULT: '#7c3aed', // Vivid purple
          dark: '#5b21b6', // Dark purple
        },
        secondary: {
          light: '#818cf8', // Light indigo
          DEFAULT: '#4f46e5', // Vivid indigo
          dark: '#3730a3', // Dark indigo
        },
        accent: {
          light: '#93c5fd', // Light blue
          DEFAULT: '#3b82f6', // Blue
          dark: '#1d4ed8', // Dark blue
        },
        background: {
          light: '#1e1b4b', // Dark indigo
          DEFAULT: '#0f172a', // Very dark blue
          dark: '#020617', // Almost black
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-poppins)'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(124, 58, 237, 0.5)',
        'glow-strong': '0 0 30px rgba(124, 58, 237, 0.8)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
} 