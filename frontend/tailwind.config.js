/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Clash Display', 'Outfit', 'system-ui', 'sans-serif'],
        body: ['Satoshi', 'Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          muted: 'var(--accent-muted)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'blob': 'blob 12s ease-in-out infinite',
        'grid-flow': 'grid-flow 20s linear infinite',
        'grid-flow-slow': 'grid-flow 35s linear infinite',
        'particle': 'particle 10s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
        'aurora': 'aurora 15s ease-in-out infinite',
        'morph-blob': 'morph-blob 12s ease-in-out infinite',
        'ring-pulse': 'ring-pulse 4s ease-in-out infinite',
        'float-slow': 'float-slow 20s ease-in-out infinite',
        'gradient-flow': 'gradient-flow 8s ease infinite',
        'globe-spin': 'globe-spin 25s linear infinite',
        'globe-spin-slow': 'globe-spin 40s linear infinite',
        'earth-rotate': 'earth-rotate 60s linear infinite',
        'earth-rotate-slow': 'earth-rotate 90s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -30px) scale(1.05)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '75%': { transform: 'translate(30px, 10px) scale(1.02)' },
        },
        'grid-flow': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(60px, 60px)' },
        },
        particle: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.3' },
          '25%': { transform: 'translate(10px, -20px) scale(1.2)', opacity: '0.6' },
          '50%': { transform: 'translate(-15px, 10px) scale(0.9)', opacity: '0.4' },
          '75%': { transform: 'translate(5px, 15px) scale(1.1)', opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'border-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        aurora: {
          '0%, 100%': { transform: ' translate(0, 0) scale(1) rotate(0deg)', opacity: '0.4' },
          '33%': { transform: 'translate(30px, -20px) scale(1.1) rotate(5deg)', opacity: '0.6' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95) rotate(-3deg)', opacity: '0.5' },
        },
        'morph-blob': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 30% 50% 60%' },
        },
        'ring-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.15' },
          '50%': { transform: 'scale(1.15)', opacity: '0.25' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -15px) rotate(2deg)' },
          '50%': { transform: 'translate(-5px, 10px) rotate(-1deg)' },
          '75%': { transform: 'translate(15px, 5px) rotate(1deg)' },
        },
        'gradient-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'globe-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'earth-rotate': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
