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
        'paris-m': {
          '50': '#f4f3ff',
          '100': '#ebe9fe',
          '200': '#dad5ff',
          '300': '#bdb4fe',
          '400': '#9d89fc',
          '500': '#7d59f9',
          '600': '#6c37f0',
          '700': '#5d25dc',
          '800': '#4d1eb9',
          '900': '#421b97',
          '950': '#280f6b',
        },
        'emerald': {
          '50': '#ecfdf5',
          '100': '#d1fae5',
          '200': '#a7f3d0',
          '300': '#6ee7b7',
          '400': '#34d399',
          '500': '#10b981',
          '600': '#059669',
          '700': '#047857',
          '800': '#065f46',
          '900': '#064e3b',
          '950': '#022c22',
        },
        primary: '#7d59f9', // paris-m-500
        'primary-dark': '#6c37f0', // paris-m-600
        'background-light': '#f4f3ff', // paris-m-50
        background: {
          dark: '#1E0B32', // Deep purple
          DEFAULT: '#2D1B4D', // Mid purple
          light: '#3D2B6D', // Light purple
        },
        accent: {
          primary: '#B44BF2', // Bright purple
          secondary: '#8B31E3', // Medium purple
          glow: '#CF74FF', // Light purple for glow effects
          green: '#10b981', // Emerald-500
          'green-glow': '#6ee7b7', // Emerald-300
        },
        content: {
          primary: '#FFFFFF', // Pure white
          secondary: '#E1E1E1', // Light gray
          muted: '#A5A5A5', // Muted text
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui'],
        display: ['var(--font-plus-jakarta)', 'var(--font-inter)', 'system-ui'],
      },
      boxShadow: {
        'glow-sm': '0 2px 20px -2px rgba(180, 75, 242, 0.3)',
        'glow-md': '0 4px 30px -2px rgba(180, 75, 242, 0.4)',
        'glow-lg': '0 8px 40px -4px rgba(180, 75, 242, 0.5)',
        'button': '0 4px 20px rgba(180, 75, 242, 0.5)',
        'green-glow': '0 0 20px rgba(16, 185, 129, 0.5)',
        'green-glow-lg': '0 0 30px rgba(16, 185, 129, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top right, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #B44BF2 0%, #8B31E3 100%)',
        'gradient-dark': 'linear-gradient(135deg, #2D1B4D 0%, #1E0B32 100%)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'gradient-start': '#7d59f9', // paris-m-500
        'gradient-end': '#4d1eb9', // paris-m-800
      }),
    },
  },
  plugins: [],
} 