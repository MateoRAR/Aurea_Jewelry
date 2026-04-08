/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9922B',
          light: '#E8B86D',
          tint: 'rgba(201,146,43,0.12)',
          border: 'rgba(201,146,43,0.2)',
        },
        cream: {
          DEFAULT: '#FAF8F0',
          mid: '#F5EDD8',
          dark: '#EDE0C4',
        },
        espresso: {
          DEFAULT: '#2C2416',
          soft: '#6B5C3E',
        },
      },
      fontFamily: {
        display: ['Britney', 'Georgia', 'serif'],
        body: ['Quicksand', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        glass: '16px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(201,146,43,0.08)',
        'glass-hover': '0 16px 48px rgba(201,146,43,0.15)',
        card: '0 2px 16px rgba(44,36,22,0.08)',
      },
      backgroundImage: {
        'aurea-gradient': 'linear-gradient(135deg, #FAF8F0 0%, #F5EDD8 50%, #EDE0C4 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(201,146,43,0.3), transparent)',
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out',
        float: 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 12s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
